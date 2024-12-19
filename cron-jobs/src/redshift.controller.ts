import { Controller, Post, Body } from '@nestjs/common';
import { RedshiftService } from './redshift.service';

@Controller('redshift')
export class RedshiftController {
  constructor(private readonly redshiftService: RedshiftService) {}

  @Post('insert')
  async insertData(@Body() body: { table: string; data: Record<string, any> }) {
    const { table, data } = body;
    await this.redshiftService.insertData(table, data);
    return { message: 'Data inserted successfully' };
  }
}
