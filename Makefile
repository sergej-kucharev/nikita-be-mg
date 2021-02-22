
db-up:
	@docker-compose up -d

db-down:
	@docker-compose down

db-migrate-generate:
	@npx sequelize migration:generate --name xxx

db-migrate-run:
	@npx sequelize db:migrate

db-migrate-status:
	@npx sequelize db:migrate:status

db-migrate-undo:
	@npx sequelize db:migrate:undo --name file.js

db-migrate-undo-all:
	@npx sequelize db:migrate:undo:all

db-model-generate:
	@npx sequelize model:generate --name xxx --attributes xxx:string

db-seed-run:
	@npx sequelize db:seed --seed file-1.js file-2.js

db-seed-undo:
	@npx sequelize db:seed:undo --seed file-1.js file-2.js

db-seed-run-all:
	@npx sequelize db:seed:all

db-seed-undo-all:
	@npx sequelize db:seed:undo:all

db-seed-generate:
	@npx sequelize seed:generate --name xxx

