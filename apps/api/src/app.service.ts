import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDatabaseHealth() {
    const result = await this.prisma.$queryRaw<{ status: number }[]>`
      SELECT 1 as status
    `;

    return {
      status: 'ok',
      database: 'connected',
      result: result[0]?.status,
    };
  }
}