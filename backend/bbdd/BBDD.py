#version 0.1.0

from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

databasePath=os.path.join(os.path.abspath(os.path.dirname(__file__)),"./BBDD.db")

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", f"sqlite:///{databasePath}")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["SECRET_KEY"] = "SecretKeyExample"  #Pendiente de rehacer

db = SQLAlchemy(app)

#Clases del programa

class Usuarios(db.Model):
    ID = db.Column(db.Integer, primary_key = True)
    Nombre = db.Column(db.String(100))
    Apellidos = db.Column(db.String(100))
    Email = db.Column(db.String(100))
    Password = db.Column(db.String(100))
    Direccion = db.Column(db.String(100))
    Provincia = db.Column(db.String(100))
    Ciudad = db.Column(db.String(100))
    CP = db.Column(db.String(100))
    RangoEdad = db.Column(db.Integer, db.ForeignKey("rango_edades.ID_Edad"))

class Juegos(db.Model):
    ID = db.Column(db.Integer, primary_key = True)
    Nombre = db.Column(db.String(100))
    IDsteam = db.Column(db.Integer)

class Usuario_Juego(db.Model):
    ID_UJ = db.Column(db.Integer, primary_key = True)
    ID_Usuario = db.Column(db.Integer, db.ForeignKey("usuarios.ID"))
    ID_Juego = db.Column(db.Integer, db.ForeignKey("juegos.ID"))

class Rango_edades(db.Model):
    ID_Edad = db.Column(db.Integer, primary_key = True)
    Descripcion = db.Column(db.String(100))

class Usuario_Genero(db.Model):
    ID_UG = db.Column(db.Integer, primary_key = True)
    ID_Usuario = db.Column(db.Integer, db.ForeignKey("usuarios.ID"))
    ID_Genero = db.Column(db.Integer, db.ForeignKey("generos.ID_Genero"))

class Generos(db.Model):
    ID_Genero = db.Column(db.Integer, primary_key = True)
    Nombre = db.Column(db.String(100))

#Metodo para crear tablas en caso de que no existan

def generarTablas():
    with app.app_context():
        db.create_all()

#se asegura el programa de que las tablas siempre esten creadas

@app.before_request
def crear_tablas():
    generarTablas()

#endpoint para comprobar que existen las tablas

@app.route("/api/v1/getTables", methods=['GET'])
def get_tables():
    with app.app_context():
        # Obtener los nombres de las tablas en la base de datos
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()
    return jsonify({"tables": tables}), 200

#endpoint para registrar a un usuario nuevo
#curl -X POST http://localhost:5040/api/v1/registerUser \
#-H "Content-Type: application/json" \
#-d '{
#  "Nombre": "",
#  "Apellidos": "",
#  "Email": "",
#  "Password": "",
#  "Direccion": "",
#  "Provincia": "",
#  "Ciudad": "",
#  "CP": "",
#  "RangoEdad": ""
#}'

@app.route("/api/v1/registerUser", methods=['POST'])
def register():
    data=request.json

    required_fields = ["Nombre", "Apellidos", "Email", "Password", "Direccion", "Provincia", "Ciudad", "CP", "RangoEdad"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Falta el campo '{field}'"}), 400
       
    user = Usuarios.query.filter_by(Email=data["Email"]).first()

    if user:
        return jsonify({"error": "Usuario ya registrado"}), 409   
     
    user = Usuarios(
        Nombre=data["Nombre"],
        Apellidos=data["Apellidos"],
        Email=data["Email"],
        Password=generate_password_hash(data["Password"]),
        Direccion=data["Direccion"],
        Provincia=data["Provincia"],
        Ciudad=data["Ciudad"],
        CP=data["CP"],
        RangoEdad = data["RangoEdad"],
    )

    db.session.add(user)
    db.session.commit()
    
    return jsonify({"result":"ok", "ID_Usuario": user.ID})

#endpoint para añadir un juego
# curl -X POST http://localhost:5040/api/v1/addGame \
# -H "Content-Type: application/json" \
# -d '{
#   "ID_Usuario": 1,
#   "NombreJuego": "Super Mario Odyssey"
# }'

@app.route("/api/v1/addGame", methods=['POST'])
def addGame():
    data = request.json  # Obtener datos del request

    # Validar que los campos requeridos estén presentes
    required_fields = ["ID_Usuario", "NombreJuego", "SteamID"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Falta el campo '{field}'"}), 400
        
    user = Usuarios.query.get(data["ID_Usuario"])

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    game = Juegos.query.filter_by(Nombre=data["NombreJuego"]).first()
    if not game:
        game = Juegos(
            Nombre=data["NombreJuego"],
            IDsteam=data["SteamID"]
        )
        db.session.add(game)
        db.session.commit()
        
    relacion = Usuario_Juego.query.filter_by(ID_Usuario=user.ID,ID_Juego=game.ID).first()
    if not relacion:
        userGame = Usuario_Juego(
        ID_Usuario=user.ID,
        ID_Juego=game.ID
    )

    db.session.add(userGame)
    db.session.commit()
    return jsonify({"result":"ok"})

#endpoint para añadir un genero
# curl -X POST http://localhost:5040/api/v1/addGenre \
# -H "Content-Type: application/json" \
# -d '{
#   "ID_Usuario": 1,
#   "ID_Genero": 1
# }'

@app.route("/api/v1/addGenre", methods=['POST'])
def addGenre():
    data = request.json  # Obtener datos del request

    # Validar que los campos requeridos estén presentes
    required_fields = ["ID_Usuario", "ID_Genero"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Falta el campo '{field}'"}), 400
        
    user = Usuarios.query.get(data["ID_Usuario"])

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    userGenre = Usuario_Genero(
        ID_Usuario=user.ID,
        ID_Genero=data["ID_Genero"]
    )

    db.session.add(userGenre)
    db.session.commit()
    return jsonify({"result":"ok"})

@app.route("/api/v1/latestGames", methods=["GET"])
def latest_games():
    # Obtener los últimos 5 juegos ordenados por ID descendente (los más recientes primero)
    games = Juegos.query.order_by(Juegos.ID.desc()).limit(5).all()

    # Formatear la respuesta en JSON
    games_list = [{"ID": game.ID, "Nombre": game.Nombre, "IDsteam": game.IDsteam} for game in games]

    return jsonify({"juegos": games_list})

from sqlalchemy import func

@app.route("/api/v1/mostPopularGames", methods=["GET"])
def most_popular_games():
    # Contar cuántas veces cada juego aparece en la tabla Usuario_Juego
    popular_games = (
        db.session.query(Juegos.Nombre, func.count(Usuario_Juego.ID_Juego).label("Cantidad"), Juegos.IDsteam)
        .join(Usuario_Juego, Juegos.ID == Usuario_Juego.ID_Juego)
        .group_by(Juegos.ID)
        .order_by(func.count(Usuario_Juego.ID_Juego).desc())  # Orden descendente
        .limit(5)  # Limitar a los 5 más repetidos
        .all()
    )

    # Formatear la respuesta en JSON
    games_list = [{"Nombre": game.Nombre, "VecesJugado": game.Cantidad, "IDsteam": game.IDsteam} for game in popular_games]

    return jsonify({"juegos": games_list})

@app.route("/api/v1/username/<int:user_id>", methods=["GET"])
def nombre_usuario(user_id):
    # Buscar el usuario por ID
    user = Usuarios.query.get(user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Devolver el nombre del usuario
    return jsonify({"Nombre": user.Nombre})

#endpoint para iniciar sesión

# curl -X POST http://localhost:5040/api/v1/login \
# -H "Content-Type: application/json" \
# -d '{
#   "Email": "",
#   "Password": ""
# }'


@app.route("/api/v1/login", methods=["POST"])
def login():
    data = request.json

    # Verificar que los campos requeridos estén presentes
    required_fields = ["Email", "Password"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Falta el campo '{field}'"}), 400

    # Buscar usuario por Email
    user = Usuarios.query.filter_by(Email=data["Email"]).first()

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Verificar la contraseña
    if not check_password_hash(user.Password, data["Password"]):
        return jsonify({"error": "Contraseña incorrecta"}), 401

    return jsonify({"ID_Usuario": user.ID})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5040, debug=True)