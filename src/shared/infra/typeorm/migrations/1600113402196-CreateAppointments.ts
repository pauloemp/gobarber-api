import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1600113402196
  implements MigrationInterface {
  private table = new Table({
    name: 'appointments',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'provider',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'date',
        type: 'timestamp with time zone',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
