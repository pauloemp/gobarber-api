import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1600118337128 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'name',
        type: 'varchar',
      },
      {
        name: 'email',
        type: 'varchar',
        isUnique: true,
      },
      {
        name: 'password',
        type: 'varchar',
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        default: 'now()',
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
