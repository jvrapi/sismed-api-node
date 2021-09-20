import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateClinicalRecordsTable1632156065763
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clinical_records',
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
            name: 'description',
            type: 'varchar'
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
            name: 'schedule_id',
            type: 'int',
            isNullable: true
          }
        ],
        foreignKeys: [
          {
            name: 'FKClinicalRecords_Employees',
            columnNames: ['employee_id'],
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKClinicalRecords_Patients',
            columnNames: ['patient_id'],
            referencedTableName: 'patients',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKClinicalRecords_Schedules',
            columnNames: ['schedule_id'],
            referencedTableName: 'schedules',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clinical_records')
  }
}
