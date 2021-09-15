import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateEmployeesTable1631713318454 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
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
            name: 'begin_date',
            type: 'date'
          },
          {
            name: 'dismissal_date',
            type: 'date',
            isNullable: true
          },
          {
            name: 'crm',
            type: 'varchar',
            isNullable: true,
            isUnique: true
          },
          {
            name: 'specialty',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'recovery_code',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'address_id',
            type: 'int'
          },
          {
            name: 'profile_id',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'FKEmployees_Address',
            columnNames: ['address_id'],
            referencedTableName: 'addresses',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKEmployees_Profile',
            columnNames: ['profile_id'],
            referencedTableName: 'profiles',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees')
  }
}
