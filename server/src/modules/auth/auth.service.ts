import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../config/index.js';
import { AuthRepository } from './auth.repository.js';
import { ConflictError, AuthenticationError } from '../../errors/AppError.js';
import type { RegisterInput, LoginInput } from './auth.validator.js';

export class AuthService {
  private authRepository = new AuthRepository();

  async register(input: RegisterInput) {
    const existing = await this.authRepository.findUserByEmail(input.email);
    if (existing) {
      throw new ConflictError('User with this email already exists');
    }

    const passwordHash = await argon2.hash(input.password);
    const user = await this.authRepository.createUser({
      ...input,
      passwordHash,
    });

    const tokens = await this.generateTokens(user.id, user.email, user.roles.map((r) => r.role.name));
    return { user, tokens };
  }

  async login(input: LoginInput) {
    const user = await this.authRepository.findUserByEmail(input.email);
    if (!user || !user.passwordHash) {
      throw new AuthenticationError('Invalid email or password');
    }

    const validPassword = await argon2.verify(user.passwordHash, input.password);
    if (!validPassword) {
      throw new AuthenticationError('Invalid email or password');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.roles.map((r) => r.role.name));
    return { user, tokens };
  }

  async refreshToken(refreshToken: string) {
    const storedToken = await this.authRepository.findRefreshToken(refreshToken);
    if (!storedToken || storedToken.isRevoked || storedToken.expiresAt < new Date()) {
      throw new AuthenticationError('Invalid or expired refresh token');
    }

    await this.authRepository.revokeRefreshToken(refreshToken);

    const user = await this.authRepository.findUserById(storedToken.userId);
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    return this.generateTokens(user.id, user.email, user.roles.map((r) => r.role.name));
  }

  private async generateTokens(userId: string, email: string, roles: string[]) {
    const accessToken = jwt.sign({ id: userId, email, roles }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN as any,
    });

    const refreshToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

    await this.authRepository.createRefreshToken(userId, refreshToken, expiresAt);

    return { accessToken, refreshToken };
  }
}
