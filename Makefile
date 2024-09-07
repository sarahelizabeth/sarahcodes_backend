DOCKER_COMPOSE_CMD_PROD = docker compose -f docker-compose.prod.yml

build:
	$(DOCKER_COMPOSE_CMD_PROD) build

up:
	$(DOCKER_COMPOSE_CMD_PROD) up --wait

up-force:
	$(DOCKER_COMPOSE_CMD_PROD) up --wait --force-recreate

down:
	$(DOCKER_COMPOSE_CMD_PROD) down

logs:
	$(DOCKER_COMPOSE_CMD_PROD) logs -f

make-su:
	$(DOCKER_COMPOSE_CMD_PROD) exec web python manage.py createsuperuser
