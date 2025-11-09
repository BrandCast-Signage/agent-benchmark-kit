// Multiple Violations - Comprehensive Test
// This file combines naming, import, type, and formatting issues

// VIOLATION: Imports disorganized
import { z } from 'zod';
import { logger } from '../utils/logger';
import { Request, Response } from 'express';
import { DatabaseService } from '../services/database';

// VIOLATION: Constants using snake_case instead of UPPER_CASE
const max_retry = 3;
const timeout = 5000;

// VIOLATION: Interface using snake_case
interface user_creds {
  user_name: string;  // VIOLATION: snake_case
  password: string;
  remember?: boolean;
}

// VIOLATION: Type using snake_case and 'any'
type auth_result = {
  success: boolean;
  token: string | null;
  data?: any;  // VIOLATION: Using 'any'
};

// VIOLATION: Class using camelCase instead of PascalCase
class authService {
  // VIOLATION: Properties using snake_case
  private db_service: DatabaseService;  // VIOLATION: Also missing 'readonly'
  private session_time: number;

  // VIOLATION: Constructor parameter without type annotation
  constructor(db_service: DatabaseService, session_time = timeout) {
    this.db_service = db_service;
    this.session_time = session_time;
  }

  // VIOLATION: Method using snake_case, missing return type
  public async login_user(creds: user_creds) {
    try {
      // VIOLATION: Variable using snake_case
      const user_data = await this.db_service.findUserByUsername(creds.user_name);

      if (!user_data) {
        logger.warn(`Login failed: ${creds.user_name}`);
        return {
          success: false,
          token: null,
        };
      }

      // VIOLATION: Using 'let' instead of 'const' for non-reassigned variable
      let is_valid = await this.check_password(creds.password, user_data.passwordHash);

      if (!is_valid) {
        logger.warn(`Bad password: ${creds.user_name}`);
        return {
          success: false,
          token: null,
        };
      }

      // VIOLATION: Using 'var' (should never use var in modern TypeScript)
      var token = await this.make_token(user_data.id, creds.remember);
      var expires = this.get_expiry(creds.remember);

      logger.info(`Login OK: ${creds.user_name}`);

      return {
        success: true,
        token,
        data: expires,
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  // VIOLATION: Missing parameter types and return type
  private async check_password(pwd, hash) {
    return true;
  }

  // VIOLATION: Missing return type
  private async make_token(user_id: string, remember: boolean) {
    return 'token';
  }

  // VIOLATION: Missing return type
  private get_expiry(remember: boolean) {
    // VIOLATION: Using 'let' for constant value
    let expiry_time = remember ? 30 * 24 * 60 * 60 * 1000 : this.session_time;
    return new Date(Date.now() + expiry_time);
  }

  // VIOLATION: Inconsistent spacing and formatting
  public async refresh(old_token:string){return'new-token';}
}

// VIOLATION: Function using snake_case, missing return type
export function make_handler(service: authService) {
  // VIOLATION: Missing parameter types, return type
  return async (req, res) => {
    try {
      // VIOLATION: Type assertion without validation
      const creds = req.body;
      const result = await service.login_user(creds);

      if (result.success) {
        res.json({
          token: result.token,
          data: result.data,
        });
      } else {
        res.status(401).json({
          error: 'Bad creds',
        });
      }
    } catch (error) {
      logger.error('Error:', error);
      res.status(500).json({
        error: 'Server error',
      });
    }
  };
}

// VIOLATION: Function without types
export function check_token(tok) {
  if(!tok)return false;return true;  // VIOLATION: Missing spacing
}

// VIOLATION: Export using wrong case
export { authService };
