import { MigrationInterface, QueryRunner } from 'typeorm'

const TriggersData = [
  {
    name: 'trigger_reverse_cascade_employee',
    when: 'AFTER DELETE',
    table: 'employees',
    sql: 'DELETE FROM addresses WHERE ID = OLD.address_id',
    functionName: 'delete_employee_address()'
  },

  {
    name: 'trigger_reverse_cascade_health_Insurance',
    when: 'AFTER DELETE',
    table: ' health_insurances',
    sql: 'DELETE FROM bank_datas WHERE id = OLD.bank_data_id',
    functionName: 'delete_health_insurance_bank_datas()'
  },

  {
    name: 'trigger_reverse_cascade_lab',
    when: 'AFTER DELETE',
    table: 'labs',
    sql: 'DELETE FROM addresses WHERE id = OLD.address_id',
    functionName: 'delete_labs_address()'
  },

  {
    name: 'trigger_reverse_cascade_patient',
    when: 'AFTER DELETE',
    table: 'patients',
    sql: 'DELETE FROM addresses WHERE id = OLD.address_id',
    functionName: 'delete_patients_address()'
  }
]

export class CreateTriggers1632158922515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    TriggersData.forEach(async ({ name, when, table, functionName, sql }) => {
      await queryRunner.query(
        `CREATE OR REPLACE FUNCTION ${functionName} ` +
        'RETURNS TRIGGER LANGUAGE PLPGSQL AS $$ ' +
        'BEGIN ' +
        `${sql}; ` +
        'END;' +
        '$$;' +
        `CREATE TRIGGER ${name} ` +
        `${when} ` +
        `ON ${table} ` +
        'FOR EACH ROW ' +
        `EXECUTE PROCEDURE ${functionName};`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    TriggersData.forEach(async ({ name, functionName, table }) => {
      await queryRunner.query(`DROP TRIGGER IF EXISTS ${name} on ${table};`)
      await queryRunner.query(`DROP FUNCTION IF EXISTS ${functionName};`)
    })
  }
}
