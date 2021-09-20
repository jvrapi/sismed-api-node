import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePatientsTable1632154422572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'patients',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'address_id',
            type: 'int'
          },
          {
            name: 'health_insurance_type_id',
            type: 'int'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'rg',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'emitting_organ',
            type: 'varchar'
          },
          {
            name: 'emitting_date',
            type: 'date'
          },
          {
            name: 'phone',
            type: 'varchar'
          },
          {
            name: 'job_phone',
            type: 'varchar'
          },
          {
            name: 'cell_number',
            type: 'varchar'
          },
          {
            name: 'sex',
            type: 'varchar'
          },
          {
            name: 'date_birth',
            type: 'date'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'marital_status',
            type: 'varchar'
          },
          {
            name: 'schooling',
            type: 'varchar'
          },
          {
            name: 'naturalness',
            type: 'varchar'
          },
          {
            name: 'nationality',
            type: 'varchar'
          },
          {
            name: 'profession',
            type: 'varchar'
          },
          {
            name: 'situation',
            type: 'varchar',
            default: "'A'"
          },
          {
            name: 'recommendation',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'health_insurance_number',
            type: 'varchar'
          },
          {
            name: 'health_insurance_validity',
            type: 'date'
          }
        ],
        foreignKeys: [
          {
            name: 'FKPatients_Addresses',
            columnNames: ['address_id'],
            referencedTableName: 'addresses',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKPatients_HealthInsuranceType',
            columnNames: ['health_insurance_type_id'],
            referencedTableName: 'health_insurances_types',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients')
  }
}
