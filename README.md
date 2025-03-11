HOW TO RUN:

1. Run a PostgreSQL docker container:
```
docker run --name task-internship-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:alpine
```

2. Install dependencies

```
bun install
```

3. Create a *.env* file from the following template

```
JWT_SECRET="super-secret"
JWT_EXPIRES_IN="1d"
DATABASE_URL="postgresql://postgres:password@localhost:5432/db?schema=public"
```


4. Push Prisma schema to PostgreSQL

```
bunx prisma db push
```


5. Run Application

```
bun run dev
```

6. Access swagger through [http://localhost:3000/v1/swagger](http://localhost:3000/v1/swagger)
