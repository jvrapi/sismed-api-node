import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateEmployeesHealthInsurancesTypesTable1632106861585
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees_health_insurances_types',
        columns: [
          {
            name: 'employee_id',
            type: 'int'
          },
          {
            name: 'health_insurance_type_id',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'FKEmployeesHealthInsurancesTypes_Employees',
            columnNames: ['employee_id'],
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKEmployeesHealthInsurancesTypes_HealthInsurancesTypes',
            columnNames: ['health_insurance_type_id'],
            referencedTableName: 'health_insurances_types',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees_health_insurances_types')
  }
}
