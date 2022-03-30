const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class initial1645753352977 {
  name = 'initial1645753352977';

  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.query(`
            CREATE TABLE "art_class" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_43db520313ca6ef163fd1dcfd59" UNIQUE ("name"),
                CONSTRAINT "UQ_f221aac2821ce6ee9bd88366e7e" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_a26fa042c98259a3308ef8e740f" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "bottom_form" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_186dc10fb0e4a0a3907f101ff8e" UNIQUE ("name"),
                CONSTRAINT "UQ_5f139afb38667f30f94664c315e" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_54be5c2b5dc06fcf401fe63db87" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "drop_number" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_008e5017d21ecfc882b509c2dc3" UNIQUE ("name"),
                CONSTRAINT "UQ_335a42d3cd47cd957c1aa9d6d46" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_ad83b567683fad027212aa37087" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "form" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e2b5265b1797dcc0f22ad187985" UNIQUE ("name"),
                CONSTRAINT "UQ_54113c71b400a6e4d7e379604d4" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "height" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_801155a2580e97de999123a20d4" UNIQUE ("name"),
                CONSTRAINT "UQ_2995d4ca0977b8a90f40c3117d5" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_90f1773799ae13708b533416960" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "intercenter" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_951fcb1edaf967f1f10dfcf9989" UNIQUE ("name"),
                CONSTRAINT "UQ_90da47fdde3557bd0f563504d24" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_e61ba14025a69b0b88f2a7801b0" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "nominal_volume" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_f2da56a058c6d07f666dc9e6962" UNIQUE ("name"),
                CONSTRAINT "UQ_9664161311e4bfad26b3280d62c" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_f45b93acf0b86cabb3f8d0ca231" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "product_type" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_8978484a9cee7a0c780cd259b88" UNIQUE ("name"),
                CONSTRAINT "UQ_fd1712194bf2d7838c647932e5c" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_e0843930fbb8854fe36ca39dae1" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "production_method" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_c08bae11e981848743ad78529aa" UNIQUE ("name"),
                CONSTRAINT "UQ_e90a6321a6b050b31309d7d52df" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_018b710aed3f8fd41338d44bfa9" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "ring_type" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_7ee51802c782b17960fdad94212" UNIQUE ("name"),
                CONSTRAINT "UQ_6638a18b07d9d2fdf4b94d84611" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_cfbac3daf7b7451f5ec2060ff4f" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "sfm" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "valueOrder" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_f5e587be3cbd9292f531f5fc1a7" UNIQUE ("name"),
                CONSTRAINT "UQ_93fda3a755e1f27dd2720c209ce" UNIQUE ("valueOrder"),
                CONSTRAINT "PK_f5a9acb30984bc2b8db8f3787fb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "customer" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e" UNIQUE ("name"),
                CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "factory" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_aa5d056bdebd2f62b83fcd9f018" UNIQUE ("name"),
                CONSTRAINT "PK_1372e5a7d114a3fa80736ba66bb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "project" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" text NOT NULL,
                "internal" boolean NOT NULL DEFAULT true,
                "hasDesignDoc" boolean NOT NULL DEFAULT false,
                "sfm" text,
                "dropNumber" text,
                "intercenter" text,
                "factoryId" uuid,
                "customerId" uuid,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"),
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "art" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" text NOT NULL,
                "internal" boolean NOT NULL DEFAULT true,
                "projectId" uuid,
                "bottomForm" text,
                "artClass" text,
                "form" text,
                "nominalVolume" text,
                "height" text,
                "productType" text,
                "productionMethod" text,
                "ringType" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_b79244653524aa4498d1991b2f7" UNIQUE ("name"),
                CONSTRAINT "PK_d7867f9fa7239b188ec631066bb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_b1f943542bccfc6de53342fa2e" ON "art" ("projectId")
        `);
    await queryRunner.query(`
            CREATE TABLE "art_file" (
                "artId" uuid NOT NULL,
                "originalPath" text NOT NULL,
                "watermarkPath" text NOT NULL,
                "uploadedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_ba1de964e765e0491aaa1d80d01" PRIMARY KEY ("artId")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "session" (
                "sid" uuid NOT NULL,
                "sess" jsonb NOT NULL,
                "expire" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "PK_7575923e18b495ed2307ae629ae" PRIMARY KEY ("sid")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'USER')
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" text NOT NULL,
                "fullName" text NOT NULL,
                "role" "public"."user_role_enum" NOT NULL,
                "password" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_a31d1c8bf3a42d68e8ef6d0fa1f" FOREIGN KEY ("sfm") REFERENCES "sfm"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_cb4a5f99ab1f14d8915c6408755" FOREIGN KEY ("dropNumber") REFERENCES "drop_number"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_da28e57152690879fc4ed33a0dc" FOREIGN KEY ("intercenter") REFERENCES "intercenter"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_a0407fa48bcabe7abe1bbf67f5a" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "art"
            ADD CONSTRAINT "FK_b1f943542bccfc6de53342fa2e1" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "art"
            ADD CONSTRAINT "FK_b9015a2bba4142487c8df44187b" FOREIGN KEY ("bottomForm") REFERENCES "bottom_form"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "art"
            ADD CONSTRAINT "FK_4fcd0b5c2fac549fa1a77d8071f" FOREIGN KEY ("artClass") REFERENCES "art_class"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "art"
            ADD CONSTRAINT "FK_a1991f9684ec12aac103e90a6f9" FOREIGN KEY ("form") REFERENCES "form"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "art"
            ADD CONSTRAINT "FK_90aaa74c0e36383a74cd91381c8" FOREIGN KEY ("nominalVolume") REFERENCES "nominal_volume"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "art"
            ADD CONSTRAINT "FK_13a46770aec2f6b468c545df28d" FOREIGN KEY ("height") REFERENCES "height"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "art"
            ADD CONSTRAINT "FK_080ea27feb10895781f4f7b9a42" FOREIGN KEY ("productType") REFERENCES "product_type"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "art"
            ADD CONSTRAINT "FK_8b11945309959c67c52c107b8b5" FOREIGN KEY ("productionMethod") REFERENCES "production_method"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "art"
            ADD CONSTRAINT "FK_acc98fcdb14f9aa2068497dfe2c" FOREIGN KEY ("ringType") REFERENCES "ring_type"("name") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "art_file"
            ADD CONSTRAINT "FK_ba1de964e765e0491aaa1d80d01" FOREIGN KEY ("artId") REFERENCES "art"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
						INSERT INTO "user"("username", "fullName", "role", "password", "active")
							VALUES ('ADMIN', 'Администратор', 'ADMIN', '$2b$10$JBPxd6tvJ8Zg/5sblPBKD.nB/ewvMl8oT730QJh.TQby/.9eVIoi2', true)
				`);
    await queryRunner.query(`
						INSERT INTO "sfm"("name", "active", "valueOrder")
							VALUES 
								('EMHART', TRUE, 1), 
								('Bottero', TRUE, 2), 
								('BDF', TRUE,3), 
								('AL', TRUE, 4), 
								('U-8M', TRUE, 5), 
								('U-8K', TRUE, 6), 
								('R-7', TRUE, 7), 
								('BR-7', TRUE, 8), 
								('S-10', TRUE,9), 
								('Cuda', TRUE, 10), 
								('IS', TRUE, 11), 
								('GPS', TRUE, 12)
				`);
    await queryRunner.query(`
						INSERT INTO "drop_number"("name", "active", "valueOrder")
							VALUES 
								('SG', TRUE, 1),
								('DG', TRUE, 2),
								('TG', TRUE, 3)
				`);
    await queryRunner.query(`
						INSERT INTO "intercenter"("name", "active", "valueOrder")
							VALUES 
								('4 ¼', TRUE, 1),
								('5', TRUE, 2),
								('5 ½', TRUE, 3),
								('6', TRUE, 4),
								('6 ¼', TRUE, 5)
		`);
    await queryRunner.query(`
						INSERT INTO "bottom_form"("name", "active", "valueOrder")
							VALUES 
								('прогиб дна менее 16мм', TRUE, 1),
								('прогиб дна более 16мм', TRUE, 2),
								('толстое дно', TRUE, 3),
								('фигурное дно', TRUE, 4),
								('обычное дно', TRUE, 5)
		`);
    await queryRunner.query(`
						INSERT INTO "art_class"("name", "active", "valueOrder")
							VALUES
								('бутылка', TRUE, 1), 
								('банка', TRUE, 2), 
								('молочка', TRUE, 3),
								('кетчуп', TRUE, 4),
								('кровь', TRUE, 5), 
								('сок',TRUE, 6),
								('пробка',TRUE, 7),
								('парфюм',TRUE, 8),
								('PET',TRUE, 9),
								('стакан-кружка',TRUE,10),
								('ручкой',TRUE, 11),
								('прочее',TRUE, 12)
		`);
    await queryRunner.query(`
					INSERT INTO "form"("name", "active", "valueOrder")
						VALUES
							('круглая', TRUE, 1), 
							('овальная', TRUE, 2), 
							('фляжка', TRUE, 3),
							('штоф', TRUE, 4),
							('прочее', TRUE, 5), 
							('ручкой',TRUE, 6),
							('треугольная',TRUE, 7),
							('пробка/крышка',TRUE, 8)
		`);
		await queryRunner.query(`
					INSERT INTO "height"("name", "active", "valueOrder")
						VALUES
							('0-100', TRUE, 1), 
							('101-200', TRUE, 2), 
							('201-300', TRUE, 3),
							('201-240', TRUE, 4),
							('241-270', TRUE, 5), 
							('271-300',TRUE, 6),
							('301-400',TRUE, 7),
							('401-500',TRUE, 8),
							('свыше 500',TRUE, 9)
		`);
		await queryRunner.query(`
					INSERT INTO "nominal_volume"("name", "active", "valueOrder")
						VALUES
							('0-0,05', TRUE, 1), 
							('0,051-0,15', TRUE, 2), 
							('0-0,15', TRUE, 3),
							('0,16-0,25', TRUE, 4),
							('0,26-0,49', TRUE, 5), 
							('0,5-0,69',TRUE, 6),
							('0,7-0,99',TRUE, 7),
							('1,0-1,5',TRUE, 8),
							('Более 1,5',TRUE, 9)
		`);
		await queryRunner.query(`
					INSERT INTO "production_method"("name", "active", "valueOrder")
						VALUES
							('BB', TRUE, 1), 
							('PB', TRUE, 2), 
							('NNPB', TRUE, 3),
							('LPBB (безворонковый)', TRUE, 4),
							('пресс', TRUE, 5), 
							('прочее',TRUE, 6)
		`);
		await queryRunner.query(`
					INSERT INTO "product_type"("name", "active", "valueOrder")
						VALUES
							('водка', true, 1),
							('вино', true, 2),
							('кетчуп-соус', true, 3),
							('пиво-сидр', true, 4),
							('шампанское-игристое', true, 5),
							('молоко', true, 6),
							('лимонад', true, 7),
							('виски, бренди, коньяк', true, 8),
							('парфюм', true, 9),
							('консервы', true, 10),
							('прочее', true, 11),
							('сок', true, 12),
							('кровь', true, 13)
		`);
		await queryRunner.query(`
					INSERT INTO "ring_type"("name", "active", "valueOrder")
						VALUES
							('П (камю)', true, 1),
							('винт', true, 2),
							('GPI', true, 3),
							('СКО', true, 4),
							('ТО', true, 5),
							('минералка (Вн-28, MCA)', true, 6),
							('пиво (КП, ВКП)', true, 7),
							('бугель', true, 8),
							('КПМ', true, 9),
							('Ш, КПШ', true, 10),
							('прочее', true, 11)
		`);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DELETE FROM "user"
        `);
    await queryRunner.query(`
            ALTER TABLE "art_file" DROP CONSTRAINT "FK_ba1de964e765e0491aaa1d80d01"
        `);
    await queryRunner.query(`
            ALTER TABLE "art" DROP CONSTRAINT "FK_acc98fcdb14f9aa2068497dfe2c"
        `);
    await queryRunner.query(`
            ALTER TABLE "art" DROP CONSTRAINT "FK_8b11945309959c67c52c107b8b5"
        `);
    await queryRunner.query(`
            ALTER TABLE "art" DROP CONSTRAINT "FK_080ea27feb10895781f4f7b9a42"
        `);
    await queryRunner.query(`
            ALTER TABLE "art" DROP CONSTRAINT "FK_13a46770aec2f6b468c545df28d"
        `);
    await queryRunner.query(`
            ALTER TABLE "art" DROP CONSTRAINT "FK_90aaa74c0e36383a74cd91381c8"
        `);
    await queryRunner.query(`
            ALTER TABLE "art" DROP CONSTRAINT "FK_a1991f9684ec12aac103e90a6f9"
        `);
    await queryRunner.query(`
            ALTER TABLE "art" DROP CONSTRAINT "FK_4fcd0b5c2fac549fa1a77d8071f"
        `);
    await queryRunner.query(`
            ALTER TABLE "art" DROP CONSTRAINT "FK_b9015a2bba4142487c8df44187b"
        `);
    await queryRunner.query(`
            ALTER TABLE "art" DROP CONSTRAINT "FK_b1f943542bccfc6de53342fa2e1"
        `);
    await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b"
        `);
    await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_a0407fa48bcabe7abe1bbf67f5a"
        `);
    await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_da28e57152690879fc4ed33a0dc"
        `);
    await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_cb4a5f99ab1f14d8915c6408755"
        `);
    await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_a31d1c8bf3a42d68e8ef6d0fa1f"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "session"
        `);
    await queryRunner.query(`
            DROP TABLE "art_file"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_b1f943542bccfc6de53342fa2e"
        `);
    await queryRunner.query(`
            DROP TABLE "art"
        `);
    await queryRunner.query(`
            DROP TABLE "project"
        `);
    await queryRunner.query(`
            DROP TABLE "factory"
        `);
    await queryRunner.query(`
            DROP TABLE "customer"
        `);
    await queryRunner.query(`
            DROP TABLE "sfm"
        `);
    await queryRunner.query(`
            DROP TABLE "ring_type"
        `);
    await queryRunner.query(`
            DROP TABLE "production_method"
        `);
    await queryRunner.query(`
            DROP TABLE "product_type"
        `);
    await queryRunner.query(`
            DROP TABLE "nominal_volume"
        `);
    await queryRunner.query(`
            DROP TABLE "intercenter"
        `);
    await queryRunner.query(`
            DROP TABLE "height"
        `);
    await queryRunner.query(`
            DROP TABLE "form"
        `);
    await queryRunner.query(`
            DROP TABLE "drop_number"
        `);
    await queryRunner.query(`
            DROP TABLE "bottom_form"
        `);
    await queryRunner.query(`
            DROP TABLE "art_class"
        `);
  }
};
