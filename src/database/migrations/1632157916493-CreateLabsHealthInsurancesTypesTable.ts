import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateLabsHealthInsurancesTypesTable1632157916493
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'labs_health_insurances_types',
        columns: [
          {
            name: 'lab_id',
            type: 'int'
          },
          {
            name: 'health_insurance_type_id',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'FKLabsHealthInsurancesTypes_Labs',
            columnNames: ['lab_id'],
            referencedTableName: 'labs',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          {
            name: 'FKLabsHealthInsurancesTypes_HealthInsurancesTypes',
            columnNames: ['health_insurance_type_id'],
            referencedTableName: 'health_insurances_types',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('labs_health_insurances_types')
  }
}
