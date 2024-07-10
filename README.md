# Teslo Shop - Tesla Clone with Next.14 App Router

## Technologies

- Next 14 (App Router)
- Node 20
- Postgres
- Prisma
- Zustand
- Docker

## Start in Dev Mode

1. Clone the repository
2. Set Node v20: ```nvm use 20```
3. Install the dependencies: ```npm install```
4. Create the .env file based in .env.template
5. Start the Postgres Container: ```docker-compose up -d```
6. Run Prisma migrations: ```npx prisma migrate dev```
7. Run the seed to populate the database: ```npm run seed```
8. Start the server: ```npm run dev```
