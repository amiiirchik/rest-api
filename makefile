help: ## Показать доступные команды для make
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
logs: ## Посмотреть логи всех контейнеров: make logs; логи контейнера контейнера: make logs c=CONTAINER_NAME
	docker-compose logs --tail=200 -f $(c)
ps: ## Cписок запущенных контейнеров
	docker ps --size
shell: ## Запустить терминал в контейнере: make shell c=CONTAINER_NAME
	docker exec -it --user root $(c) /bin/sh

up-all: ## Запускаем все сервисы и базы данных
ifeq (dev, $(filter dev,$(MAKECMDGOALS)))
		@echo 'run all services in dev mode'
		docker-compose --env-file .env.dev --profile all up --build
else
		@echo 'run all services in prod mode'
		docker-compose --profile all up --build
endif
		@echo run command $(if $(filter dev,$(MAKECMDGOALS)),--verbose,--normally)
%:
		@:

show: docker-ps docker-images docker-volumes docker-network ## Показать всю информацию о контейнерах, дисках, сетях, образах
remove: docker-down-clear docker-down-images docker-remove-cont ## Удалить все образы, диски, сети, контейнеры

docker-ps:
	@printf "\033[0;31m\n" && docker ps -a && printf "\033[1;37m\n"

docker-images:
	@printf "\033[0;31m\n" && docker images && printf "\033[1;37m\n"

docker-volumes:
	@printf "\033[0;31m\n" && docker volume ls && printf "\033[1;37m\n"

docker-network:
	@printf "\033[0;31m\n" && docker network ls && printf "\033[1;37m\n"

docker-up: ## Запусить контейнеры
	docker-compose up --build

docker-down: ## Остановить контейнеры
	docker-compose down

docker-remove-cont: ## Остановить контейнеры и удалить их
	docker-compose down --remove-orphans

docker-down-clear: ## Остановить контейнеры, удалить их и удалить volumes
	docker-compose down -v --remove-orphans

docker-down-images:
	docker system prune -af --volumes

docker-pull: ## Cкачать указанные образы
	docker-compose pull

docker-build: ## Сборка образа из Dockerfile
	docker-compose build

docker-restart:
	docker-compose restart