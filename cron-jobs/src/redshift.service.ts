import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class RedshiftService {
    
  constructor(@Inject('REDSHIFT_POOL') private readonly pool: Pool) {}

  async executeQuery(query: string, params: any[] = []): Promise<any> {
    try {
      const client = await this.pool.connect();
      try {
        const result = await client.query(query, params);
        return result.rows;
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async insertData(table: string, data: Record<string, any>): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');

    const query = `
      INSERT INTO ${table} (${keys.join(', ')})
      VALUES (${placeholders})
    `;
    await this.executeQuery(query, values);
  }
}
