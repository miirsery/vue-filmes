# React + Express

## Start project
```
Install dependencies
npm i

Watch
npm run dev
```

## Run in docker (recommended)
```
Up the containers
docker-compose up -d --build

# Down the containers
docker-compose down -v
```

## Dump sql
```
docker exec -t db pg_dump --no-owner -U socialUser social_db > dump.sql
```

## Load sql
```
cat dump.sql | docker exec -i db psql -U socialUser -d social_db
```