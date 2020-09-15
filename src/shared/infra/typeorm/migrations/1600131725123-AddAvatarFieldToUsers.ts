import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarFieldToUsers1600131725123
  implements MigrationInterface {
  private avatarColumn = new TableColumn({
    name: 'avatar',
    type: 'varchar',
    isNullable: true,
    default: null,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', this.avatarColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', this.avatarColumn);
  }
}
