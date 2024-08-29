#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Wait for the backend to be up, if we know where it is.
if [ -n "$POSTGRES_HOST" ]; then
  /usr/src/backend/wait-for-it.sh "$POSTGRES_HOST:${POSTGRES_PORT:-5432}"
fi

# Run migrations
echo "Running migrations..."
python manage.py migrate --noinput

# Collect static files (optional, but recommended for production)
# echo "Collecting static files..."
# python manage.py collectstatic --noinput

# Execute the command passed as arguments to the script
exec "$@"
