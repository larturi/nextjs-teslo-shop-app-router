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
2. Install the dependencies: ```npm install```
3. Create the .env file based in .env.template
4. Start the Postgres Container: ```docker-compose up -d```
5. Run Prisma migrations: ```npx prisma migrate dev```
6. Run the seed to populate the database: ```npm run seed```
7. Start the server: ```npm run dev```
