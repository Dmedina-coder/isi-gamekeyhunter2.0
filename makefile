# Variables
PYTHON = python
MICROSERVICIO1 = ./src/steam.py
MICROSERVICIO2 = ./src/epicgames.py
MICROSERVICIO3 = ./src/cheapshark.py
MICROSERVICIO4 = ./src/BBDD.py

# Puertos
PORT1 = 5030
PORT2 = 5010
PORT3 = 5020
PORT4 = 5040

# Reglas
all: start_microservices

start_microservices: start_microservice1 start_microservice2 start_microservice3 start_microservice4 start_frontend

start_microservice1:
	@echo "Iniciando Microservicio 1 en el puerto $(PORT1)..."
	FLASK_APP=$(MICROSERVICIO1) flask run --port=$(PORT1) &

start_microservice2:
	@echo "Iniciando Microservicio 2 en el puerto $(PORT2)..."
	FLASK_APP=$(MICROSERVICIO2) flask run --port=$(PORT2) &

start_microservice3:
	@echo "Iniciando Microservicio 3 en el puerto $(PORT3)..."
	FLASK_APP=$(MICROSERVICIO3) flask run --port=$(PORT3) &

start_microservice4:
	@echo "Iniciando Microservicio 4 en el puerto $(PORT4)..."
	FLASK_APP=$(MICROSERVICIO4) flask run --port=$(PORT4) &

start_frontend:
	@echo "Iniciando el frontend con npm start..."
	cd reactjs && npm start &


stop_microservices:
	@echo "Deteniendo todos los microservicios..."
	@pkill -f $(MICROSERVICIO1) || true
	@pkill -f $(MICROSERVICIO2) || true
	@pkill -f $(MICROSERVICIO3) || true
	@pkill -f $(MICROSERVICIO4) || true
	@pkill -f "npm start" || true

restart_microservices: stop_microservices start_microservices

.PHONY: all start_microservices stop_microservices restart_microservices
