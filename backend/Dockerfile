FROM python:3.8-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

# # Make entrypoint script accessible from app/backend
# COPY entrypoint.sh /app/backend/

# # Make the entrypoint script executable.
# RUN chmod +x /app/backend/entrypoint.sh

# # Expose the port the app runs on.
# EXPOSE 8000

# # Set the entrypoint to run the entrypoint script.
# ENTRYPOINT ["sh", "/app/backend/entrypoint.sh"]

# Build psycopg2-binary from source -- add required required dependencies
RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev libffi-dev && \
        pip install --no-cache-dir -r requirements.txt && \
        apk --purge del .build-deps

COPY . /app/backend/

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]