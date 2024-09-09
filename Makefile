# Base command for Docker Compose in production mode
DOCKER_COMPOSE_CMD_PROD = docker compose -f docker-compose.prod.yml

# Build the Docker image for the specified service (C=service)
# If no service is specified, it builds all services
build:
	$(DOCKER_COMPOSE_CMD_PROD) build $(C)

# Start all services in the production environment
# The --wait flag ensures services wait for dependencies to be healthy
up:
	$(DOCKER_COMPOSE_CMD_PROD) up --wait

# Rebuild the web service and start the environment
# Only rebuilds the 'web' service before starting the entire environment
up-web-rebuild:
	$(DOCKER_COMPOSE_CMD_PROD) build web && \
	$(DOCKER_COMPOSE_CMD_PROD) up --wait

# Force recreate the specified service (C=service), or all services if C is not provided
# Also removes orphan containers (containers that are no longer part of the Compose file)
up-force:
	$(DOCKER_COMPOSE_CMD_PROD) up --wait --force-recreate --remove-orphans $(C)

# Restart the specified service (C=service) or all services if C is not provided
restart:
	$(DOCKER_COMPOSE_CMD_PROD) restart $(C)

# Execute a command inside the specified service (C=service)
# The CMD variable specifies the command to run
exec:
	$(DOCKER_COMPOSE_CMD_PROD) exec $(C) $(CMD)

# Stop and remove all containers, networks, and volumes
down:
	$(DOCKER_COMPOSE_CMD_PROD) down

# Follow and display logs for all services in real-time
logs:
	$(DOCKER_COMPOSE_CMD_PROD) logs -f

# Create a Django superuser inside the 'web' service
make-su:
	$(DOCKER_COMPOSE_CMD_PROD) exec web python manage.py createsuperuser
