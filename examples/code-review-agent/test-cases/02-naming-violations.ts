// Naming Convention Violations
// This file intentionally violates TypeScript naming conventions

import { Request, Response } from 'express';
import { z } from 'zod';

import { DatabaseService } from '../services/database';
import { logger } from '../utils/logger';

// VIOLATION: Constants should use UPPER_CASE
const max_retry_attempts = 3;
const default_timeout_ms = 5000;

// VIOLATION: Interface should use PascalCase, properties should use camelCase
interface user_credentials {
  user_name: string;  // VIOLATION: should be userName
  password: string;
  remember_me: boolean;  // VIOLATION: should be rememberMe
}

// VIOLATION: Type alias should use PascalCase
type auth_result = {
  success: boolean;
  token: string | null;
  expires_at: Date | null;  // VIOLATION: should be expiresAt
};

// VIOLATION: Class should use PascalCase
class authenticationService {
  // VIOLATION: Private properties using snake_case
  private readonly database_service: DatabaseService;
  private readonly session_timeout: number;

  constructor(database_service: DatabaseService, session_timeout: number = default_timeout_ms) {
    this.database_service = database_service;
    this.session_timeout = session_timeout;
  }

  // VIOLATION: Method using snake_case instead of camelCase
  public async authenticate_user(credentials: user_credentials): Promise<auth_result> {
    try {
      const user = await this.database_service.findUserByUsername(credentials.user_name);

      if (!user) {
        logger.warn(`Authentication failed: user not found - ${credentials.user_name}`);
        return {
          success: false,
          token: null,
          expires_at: null,
        };
      }

      const is_password_valid = await this.verify_password(
        credentials.password,
        user.passwordHash
      );

      if (!is_password_valid) {
        logger.warn(`Authentication failed: invalid password - ${credentials.user_name}`);
        return {
          success: false,
          token: null,
          expires_at: null,
        };
      }

      const token = await this.generate_token(user.id, credentials.remember_me);
      const expires_at = this.calculate_expiration(credentials.remember_me);

      logger.info(`User authenticated successfully: ${credentials.user_name}`);

      return {
        success: true,
        token,
        expires_at,
      };
    } catch (error) {
      logger.error('Authentication error:', error);
      throw error;
    }
  }

  // VIOLATION: Private methods using snake_case
  private async verify_password(password: string, hash: string): Promise<boolean> {
    return true;
  }

  private async generate_token(user_id: string, remember_me: boolean): Promise<string> {
    return 'token';
  }

  private calculate_expiration(remember_me: boolean): Date {
    const expiration_ms = remember_me ? 30 * 24 * 60 * 60 * 1000 : this.session_timeout;
    return new Date(Date.now() + expiration_ms);
  }
}

// VIOLATION: Function using snake_case instead of camelCase
export function create_authentication_handler(
  auth_service: authenticationService
): (req: Request, res: Response) => Promise<void> {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const credentials = req.body as user_credentials;
      const result = await auth_service.authenticate_user(credentials);

      if (result.success) {
        res.json({
          token: result.token,
          expires_at: result.expires_at,
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

export { authenticationService };
