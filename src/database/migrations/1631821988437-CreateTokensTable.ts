import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTokensTable1631821988437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_tokens',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'expires_in',
            type: 'int'
          },
          {
            name: 'employee_id',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'FKTokens_Employees',
            columnNames: ['employee_id'],
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('refresh_tokens')
  }
}
