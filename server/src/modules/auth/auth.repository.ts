import { prisma } from '../../config/prisma.js';
import type { RegisterInput } from './auth.validator.js';

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async createUser(input: RegisterInput & { passwordHash: string }) {
    // Ensure default CUSTOMER role exists
    let customerRole = await prisma.role.findUnique({
      where: { name: 'CUSTOMER' },
    });

    if (!customerRole) {
      customerRole = await prisma.role.create({
        data: {
          name: 'CUSTOMER',
          description: 'Standard retail customer',
        },
      });
    }

    return prisma.user.create({
      data: {
        email: input.email,
        passwordHash: input.passwordHash,
        fullName: input.fullName,
        phone: input.phone,
        roles: {
          create: {
            roleId: customerRole.id,
          },
        },
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async createRefreshToken(userId: string, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async revokeRefreshToken(token: string) {
    return prisma.refreshToken.update({
      where: { token },
      data: { isRevoked: true },
    });
  }
}
