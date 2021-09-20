import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateBankDataTable1632104398691 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bank_datas',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'bank',
            type: 'varchar'
          },
          {
            name: 'agency',
            type: 'varchar'
          },
          {
            name: 'account',
            type: 'varchar'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bank_data')
  }
}
