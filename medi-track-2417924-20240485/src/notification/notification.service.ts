import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationService {

  private readonly users: any[] = [];

  constructor(
  
    @Inject('NOTIFICATIONS') private readonly notificationClient: ClientProxy,
  ) { }



  async triggerNotification(notificationPayload: any) {

    return await this.notificationClient.send(
      'trigger_notification',
      notificationPayload
    );

  }
}
