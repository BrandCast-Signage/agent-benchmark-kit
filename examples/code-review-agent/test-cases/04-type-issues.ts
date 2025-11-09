// Type Annotation Issues
// This file has missing or weak type annotations

import { Request, Response } from 'express';
import { z } from 'zod';

import { DatabaseService } from '../services/database';
import { logger } from '../utils/logger';

const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 5000;

interface UserCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

// VIOLATION: Using 'any' type instead of explicit type
type AuthResult = {
  success: boolean;
  token: string | null;
  expiresAt: Date | null;
  metadata?: any;  // VIOLATION: Should be explicitly typed
};

const credentialsSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
  rememberMe: z.boolean().optional().default(false),
});

class AuthenticationService {
  private readonly databaseService: DatabaseService;
  private readonly sessionTimeout: number;

  constructor(databaseService: DatabaseService, sessionTimeout = DEFAULT_TIMEOUT_MS) {  // VIOLATION: Missing type annotation for sessionTimeout parameter
    this.databaseService = databaseService;
    this.sessionTimeout = sessionTimeout;
  }

  // VIOLATION: Missing return type annotation
  public async authenticate(credentials: UserCredentials) {
    try {
      const validatedCredentials = credentialsSchema.parse(credentials);

      // VIOLATION: Implicit 'any' type for user
      const user = await this.databaseService.findUserByUsername(validatedCredentials.username);

      if (!user) {
        logger.warn(`Authentication failed: user not found - ${validatedCredentials.username}`);
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
        return {
          success: false,
          token: null,
          expiresAt: null,
        };
      }

      const token = await this.generateToken(user.id, validatedCredentials.rememberMe);
      const expiresAt = this.calculateExpiration(validatedCredentials.rememberMe);

      // VIOLATION: metadata is typed as 'any'
      const metadata = await this.getUserMetadata(user.id);

      logger.info(`User authenticated successfully: ${validatedCredentials.username}`);

      return {
        success: true,
        token,
        expiresAt,
        metadata,
      };
    } catch (error) {
      logger.error('Authentication error:', error);
      throw error;
    }
  }

  // VIOLATION: Missing return type
  private async verifyPassword(password, hash) {  // VIOLATION: Missing parameter types
    return true;
  }

  // VIOLATION: Missing return type
  private async generateToken(userId: string, rememberMe: boolean) {
    return 'token';
  }

  // VIOLATION: Missing return type
  private calculateExpiration(rememberMe: boolean) {
    const expirationMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : this.sessionTimeout;
    return new Date(Date.now() + expirationMs);
  }

  // VIOLATION: Returns 'any' type
  private async getUserMetadata(userId: string): Promise<any> {
    return {
      lastLogin: new Date(),
      loginCount: 42,
    };
  }

  // VIOLATION: No parameter types, no return type
  public async refreshToken(oldToken) {
    // Implementation
    return 'new-token';
  }
}

// VIOLATION: Missing return type annotation
export function createAuthenticationHandler(authService: AuthenticationService) {
  // VIOLATION: Missing parameter types and return type
  return async (req, res) => {
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

// VIOLATION: Function without parameter or return types
export function validateToken(token) {
  if (!token) {
    return false;
  }
  return true;
}

export { AuthenticationService };
