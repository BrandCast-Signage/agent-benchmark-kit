// Import Organization Issues
// This file has disorganized imports that should be grouped and sorted

// VIOLATION: Imports are not sorted alphabetically
import { z } from 'zod';
import { Request, Response } from 'express';

// VIOLATION: Local imports mixed with third-party imports (should be grouped)
import { logger } from '../utils/logger';

// VIOLATION: Another third-party import after local imports
import axios from 'axios';

// VIOLATION: More local imports scattered throughout
import { DatabaseService } from '../services/database';
import { CacheService } from '../services/cache';

// VIOLATION: Built-in Node.js imports should come first
import { EventEmitter } from 'events';
import * as fs from 'fs';

// VIOLATION: Type imports not using 'import type' syntax
import { UserProfile } from '../types/user';
import { AuthConfig } from '../types/config';

const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 5000;

interface UserCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

type AuthResult = {
  success: boolean;
  token: string | null;
  expiresAt: Date | null;
};

const credentialsSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
  rememberMe: z.boolean().optional().default(false),
});

class AuthenticationService extends EventEmitter {
  private readonly databaseService: DatabaseService;
  private readonly cacheService: CacheService;
  private readonly sessionTimeout: number;
  private readonly config: AuthConfig;

  constructor(
    databaseService: DatabaseService,
    cacheService: CacheService,
    config: AuthConfig,
    sessionTimeout: number = DEFAULT_TIMEOUT_MS
  ) {
    super();
    this.databaseService = databaseService;
    this.cacheService = cacheService;
    this.config = config;
    this.sessionTimeout = sessionTimeout;
  }

  public async authenticate(credentials: UserCredentials): Promise<AuthResult> {
    try {
      const validatedCredentials = credentialsSchema.parse(credentials);

      const cachedUser = await this.cacheService.get(`user:${validatedCredentials.username}`);

      const user = cachedUser || await this.databaseService.findUserByUsername(validatedCredentials.username);

      if (!user) {
        logger.warn(`Authentication failed: user not found - ${validatedCredentials.username}`);
        this.emit('auth:failed', { username: validatedCredentials.username, reason: 'user_not_found' });
        return {
          success: false,
          token: null,
          expiresAt: null,
        };
      }

      const isPasswordValid = await this.verifyPassword(
        validatedCredentials.password,
        user.passwordHash
      );

      if (!isPasswordValid) {
        logger.warn(`Authentication failed: invalid password - ${validatedCredentials.username}`);
        this.emit('auth:failed', { username: validatedCredentials.username, reason: 'invalid_password' });
        return {
          success: false,
          token: null,
          expiresAt: null,
        };
      }

      const token = await this.generateToken(user.id, validatedCredentials.rememberMe);
      const expiresAt = this.calculateExpiration(validatedCredentials.rememberMe);

      await this.cacheService.set(`user:${validatedCredentials.username}`, user, 3600);

      logger.info(`User authenticated successfully: ${validatedCredentials.username}`);
      this.emit('auth:success', { username: validatedCredentials.username });

      return {
        success: true,
        token,
        expiresAt,
      };
    } catch (error) {
      logger.error('Authentication error:', error);
      this.emit('auth:error', { error });
      throw error;
    }
  }

  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    return true;
  }

  private async generateToken(userId: string, rememberMe: boolean): Promise<string> {
    return 'token';
  }

  private calculateExpiration(rememberMe: boolean): Date {
    const expirationMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : this.sessionTimeout;
    return new Date(Date.now() + expirationMs);
  }
}

export function createAuthenticationHandler(
  authService: AuthenticationService
): (req: Request, res: Response) => Promise<void> {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const credentials = req.body as UserCredentials;
      const result = await authService.authenticate(credentials);

      if (result.success) {
        res.json({
          token: result.token,
          expiresAt: result.expiresAt,
        });
      } else {
        res.status(401).json({
          error: 'Invalid credentials',
        });
      }
    } catch (error) {
      logger.error('Handler error:', error);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
}

export { AuthenticationService };
