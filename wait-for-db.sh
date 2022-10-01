#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z db 5432; do
  sleep 0.1
  echo "trying to connect..."
done

echo "PostgreSQL started"

npm run migrate

exec "$@"
