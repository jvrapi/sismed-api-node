import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProcedureTable1632106111215 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'procedures',
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
            name: 'value',
            type: 'float'
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
    await queryRunner.dropTable('procedure')
  }
}
