import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InstructorContentAuthorizationService } from '../../../../infrastructure/ai/instructor-content-authorization.service';
@Injectable()
export class InstructorAiGuard implements CanActivate {
  constructor(
    private readonly authorization: InstructorContentAuthorizationService,
  ) {}
  async canActivate(context: ExecutionContext) {
    await this.authorization.assertInstructor(
      context.switchToHttp().getRequest().user.userId,
    );
    return true;
  }
}
