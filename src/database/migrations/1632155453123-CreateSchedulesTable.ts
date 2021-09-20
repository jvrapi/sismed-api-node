import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSchedulesTable1632155453123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schedules',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'date',
            type: 'date'
          },
          {
            name: 'time',
            type: 'time'
          },
          {
            name: 'first_time',
            type: 'boolean',
            isNullable: true
          },
          {
            name: 'attended',
            type: 'boolean',
            isNullable: true
          },
          {
            name: 'paid',
            type: 'boolean',
            isNullable: true
          },
          {
            name: 'rescheduled',
            type: 'boolean',
            isNullable: true
          },
          {
            name: 'finished',
            type: 'boolean',
            isNullable: true
          },
          {
            name: 'notes',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'employee_id',
            type: 'int'
          },
          {
            name: 'patient_id',
            type: 'int'
          },
          {
            name: 'health_insurance_type_id',
            type: 'int'
          },
          {
            name: 'procedure_id',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'FKSchedules_Employees',
            columnNames: ['employee_id'],
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKSchedules_Patients',
            columnNames: ['patient_id'],
            referencedTableName: 'patients',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKSchedules_HealthInsuranceType',
            columnNames: ['health_insurance_type_id'],
            referencedTableName: 'health_insurances_types',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKSchedules_Procedure',
            columnNames: ['procedure_id'],
            referencedTableName: 'procedures',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('schedules')
  }
}
