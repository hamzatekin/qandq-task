import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1672048126981 implements MigrationInterface {
    name = 'migration1672048126981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_favorite_movies_movie" ("userId" varchar NOT NULL, "movieId" varchar NOT NULL, PRIMARY KEY ("userId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fd3b302e11cd9dd25b45976256" ON "user_favorite_movies_movie" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bb63be83fc2fc1b144635241d" ON "user_favorite_movies_movie" ("movieId") `);
        await queryRunner.query(`DROP INDEX "IDX_fd3b302e11cd9dd25b45976256"`);
        await queryRunner.query(`DROP INDEX "IDX_2bb63be83fc2fc1b144635241d"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_favorite_movies_movie" ("userId" varchar NOT NULL, "movieId" varchar NOT NULL, CONSTRAINT "FK_fd3b302e11cd9dd25b45976256f" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_2bb63be83fc2fc1b144635241d1" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "movieId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_favorite_movies_movie"("userId", "movieId") SELECT "userId", "movieId" FROM "user_favorite_movies_movie"`);
        await queryRunner.query(`DROP TABLE "user_favorite_movies_movie"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_favorite_movies_movie" RENAME TO "user_favorite_movies_movie"`);
        await queryRunner.query(`CREATE INDEX "IDX_fd3b302e11cd9dd25b45976256" ON "user_favorite_movies_movie" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bb63be83fc2fc1b144635241d" ON "user_favorite_movies_movie" ("movieId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2bb63be83fc2fc1b144635241d"`);
        await queryRunner.query(`DROP INDEX "IDX_fd3b302e11cd9dd25b45976256"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_movies_movie" RENAME TO "temporary_user_favorite_movies_movie"`);
        await queryRunner.query(`CREATE TABLE "user_favorite_movies_movie" ("userId" varchar NOT NULL, "movieId" varchar NOT NULL, PRIMARY KEY ("userId", "movieId"))`);
        await queryRunner.query(`INSERT INTO "user_favorite_movies_movie"("userId", "movieId") SELECT "userId", "movieId" FROM "temporary_user_favorite_movies_movie"`);
        await queryRunner.query(`DROP TABLE "temporary_user_favorite_movies_movie"`);
        await queryRunner.query(`CREATE INDEX "IDX_2bb63be83fc2fc1b144635241d" ON "user_favorite_movies_movie" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd3b302e11cd9dd25b45976256" ON "user_favorite_movies_movie" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_2bb63be83fc2fc1b144635241d"`);
        await queryRunner.query(`DROP INDEX "IDX_fd3b302e11cd9dd25b45976256"`);
        await queryRunner.query(`DROP TABLE "user_favorite_movies_movie"`);
    }

}
