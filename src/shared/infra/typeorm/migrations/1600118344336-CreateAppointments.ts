import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAppointments1600118344336
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
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'date',
        type: 'timestamptz',
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

  private providerRelation = new TableForeignKey({
    columnNames: ['provider_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.providerRelation);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.table, this.providerRelation);
    await queryRunner.dropTable(this.table);
  }
}
