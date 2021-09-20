import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateHeathInsuranceTypeTable1632105423422
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'health_insurances_types',
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
            name: 'health_insurance_id',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'FKHealthInsuranceType_HealthInsurance',
            columnNames: ['health_insurance_id'],
            referencedTableName: 'health_insurances',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('health_insurance_type')
  }
}
