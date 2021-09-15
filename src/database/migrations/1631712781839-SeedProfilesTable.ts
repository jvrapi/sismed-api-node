import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedProfilesTable1631712781839 implements MigrationInterface {
  profiles = ['Admin', 'Médic', 'Other']

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.profiles.forEach(
      async profile =>
        await queryRunner.query('INSERT INTO profiles (type) VALUES ($1)', [
          profile
        ])
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM profiles CASCADE')
  }
}
