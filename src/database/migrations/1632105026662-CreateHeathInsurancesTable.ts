import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateHeathInsuranceTable1632105026662
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'health_insurances',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'accession_date',
            type: 'date'
          },
          {
            name: 'cnpj',
            type: 'varchar'
          },
          {
            name: 'bank_data_id',
            type: 'int',
            isNullable: true
          }
        ],
        foreignKeys: [
          {
            name: 'FKHealthInsurance_BankData',
            columnNames: ['bank_data_id'],
            referencedTableName: 'bank_datas',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('health_insurance')
  }
}
