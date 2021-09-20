import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateExamsTable1632157518545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exams',
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
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'collection_date',
            type: 'date'
          },
          {
            name: 'send_date',
            type: 'date'
          },
          {
            name: 'return_date',
            type: 'date',
            isNullable: true
          },
          {
            name: 'lab_employee',
            type: 'varchar'
          },
          {
            name: 'value',
            type: 'float'
          },
          {
            name: 'patient_id',
            type: 'int'
          },
          {
            name: 'lab_id',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'FKExams_Patients',
            columnNames: ['patient_id'],
            referencedTableName: 'patients',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKExams_Labs',
            columnNames: ['lab_id'],
            referencedTableName: 'labs',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exams')
  }
}
