import {
  Controller, Get, Post, Body,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post('trigger')
  createLabResult(@Body() notificationPayload: any) {
    return this.notificationService.triggerNotification(notificationPayload);
  }
}
