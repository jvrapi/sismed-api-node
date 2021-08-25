import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAddressesTable1629845616749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'zip_code',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'number',
            type: 'smallint',
            isNullable: true
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('addresses')
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"')
  }
}
