import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

export @Injectable()
class MockJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Mock logic: Allow all requests or conditionally mock behavior
    return true;
  }
}
