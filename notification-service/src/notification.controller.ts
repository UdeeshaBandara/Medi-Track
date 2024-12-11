import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @MessagePattern('trigger_notification')
  async triggerSNSNotification(@Body() payload: { topicArn: string; message: string }) {
    await this.notificationService.sendPushNotificationToSNS(payload.topicArn, payload.message);
    return { message: 'Notification triggered successfully' };
  }

  
}
