import {
  BadRequestException,
  CallHandler,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { map } from 'rxjs/operators';

export const Public = () => SetMetadata('publicRoute', true);

export function jwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error(
      'JWT_SECRET must be a new random secret of at least 32 bytes',
    );
  }
  return secret;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    if (
      this.reflector.getAllAndOverride<boolean>('publicRoute', [
        context.getHandler(),
        context.getClass(),
      ])
    )
      return true;
    return super.canActivate(context);
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    if (context.switchToHttp().getRequest().user?.role !== 'ADMIN')
      throw new ForbiddenException();
    return true;
  }
}

// Defense in depth: remove credential fields even from nested Prisma includes.
export function redactCredentials(value: any): any {
  if (
    value instanceof Date ||
    Buffer.isBuffer(value) ||
    value === null ||
    typeof value !== 'object'
  )
    return value;
  if (Array.isArray(value)) return value.map(redactCredentials);
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !['password', 'passwordHash'].includes(key))
      .map(([key, item]) => [key, redactCredentials(item)]),
  );
}

@Injectable()
export class CredentialsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map(redactCredentials));
  }
}

export function productIds(data: unknown, selectedOnly = false): number[] {
  if (!data || typeof data !== 'object' || Array.isArray(data))
    throw new BadRequestException('Invalid product selection');
  const entries = Object.entries(data);
  if (
    entries.length > 100 ||
    entries.some(
      ([key, value]) =>
        !/^[1-9]\d*$/.test(key) ||
        !Number.isSafeInteger(Number(key)) ||
        typeof value !== 'boolean',
    )
  )
    throw new BadRequestException('Invalid product selection');
  return entries
    .filter(([, value]) => !selectedOnly || value)
    .map(([key]) => Number(key));
}

export async function requireOwnedProducts(
  prisma: any,
  userId: number,
  ids: number[],
) {
  if (ids.some((id) => !Number.isSafeInteger(id) || id < 1))
    throw new BadRequestException('Invalid product ID');
  const found = await prisma.product.count({
    where: { id: { in: ids }, SellingList: { userId } },
  });
  if (found !== new Set(ids).size)
    throw new ForbiddenException('Product ownership required');
}

export const publicUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  profile: { select: { nickname: true, imageUrl: true } },
};
