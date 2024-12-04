import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class NotificationService {

  private sns: AWS.SNS;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    this.sns = new AWS.SNS({
      region,
      accessKeyId,
      secretAccessKey
    });
  }

  async sendPushNotificationToSNS(topicArn: string, message: string): Promise<void> {
    try {
      const params = {
        Message: message,
        TopicArn: topicArn,
      };
      await this.sns.publish(params).promise();
    } catch (error) {
      throw error;
    }
  }

  async addSubscription(topicArn: string, protocol: string, endpoint: string): Promise<AWS.SNS.SubscribeResponse> {
    try {
      const params: AWS.SNS.SubscribeInput = {
        TopicArn: topicArn,
        Protocol: protocol,// (email, sms, https, sqs, etc.)
        Endpoint: endpoint,// destination email address, URL, phone number,
        ReturnSubscriptionArn: true,
      };

      const response = await this.sns.subscribe(params).promise(); 
      return response; 
    } catch (error) { 
      throw error;
    }
  }

  async confirmSubscription(topicArn: string, token: string): Promise<AWS.SNS.ConfirmSubscriptionResponse> {
    try {
      const params: AWS.SNS.ConfirmSubscriptionInput = {
        TopicArn: topicArn,
        Token: token,
      };

      const response = await this.sns.confirmSubscription(params).promise(); 
      return response; 
    } catch (error) {
      throw error;
    }
  }

}
