dpl ?= .env
include $(dpl)

start: ## Run server on debug mode
	docker-compose up

bash_app: ## Run bash
	docker exec -it desafio-tecnico /bin/bash

bash_db: ## Run bash
	docker exec -it desafio-db /bin/bash
