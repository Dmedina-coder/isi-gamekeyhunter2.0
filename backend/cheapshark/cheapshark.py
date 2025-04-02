from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import requests

app=Flask(__name__)
CORS(app)

#curl "http://127.0.0.1:5020/api/v1/cheapshark/find?title=???"
@app.route("/api/v1/cheapshark/find", methods=['GET'])
def cheapShark():
    
    global strResult
    responseID = requests.get(
    "http://127.0.0.1:5020/api/v1/cheapshark/gameid?title="+request.args["title"]
    )
    response = requests.get(
    "https://www.cheapshark.com/api/1.0/games?id="+str(responseID.json())
    )
    
    if response.status_code != 200:
        strResult = "Error: No se pudo mostrar los datos de la API de CheapShark. Abortando", response.status_code
    else:
        strResult = response.json()
    return strResult

#curl "http://127.0.0.1:5020/api/v1/cheapshark/populargames"
@app.route("/api/v1/cheapshark/populargames", methods=['GET'])
def mostsearched():
    
    global strResult
    response = requests.get(
        "http://127.0.0.1:5040/api/v1/mostPopularGames"
    )
    
    if response.status_code == 200:
        # Crear un nuevo JSON con los valores deseados
        data = response.json().get("juegos", [])
        custom_json = []
        for game in data:
            responseJuego = requests.get(
            "http://127.0.0.1:5020/api/v1/cheapshark/find?title="+(game.get("Nombre").replace("-",""))
            )
            
            datosJuegos = responseJuego.json()
            
            idSteam = datosJuegos.get("info", {}).get("steamAppID", "730")
            
            responseIMG = requests.get(
            "http://127.0.0.1:5000/api/v1/steam/findid?id="+idSteam
            )
            datosImagen = responseIMG.json()
            
            custom_json.append({
                "name": game.get("Nombre", "Sin nombre"),  
                "price": datosJuegos.get("deals", [])[0].get("price", "99,99€"),  
                "img": datosImagen.get(idSteam, []).get("data", {}).get("header_image", None)
            })

        ##print(response.json())
    else:
        print(f"Error al obtener los datos: {response.status_code}")
        
    return custom_json

#curl "http://127.0.0.1:5020/api/v1/cheapshark/lastgames"
@app.route("/api/v1/cheapshark/lastgames", methods=['GET'])
def lastsearched():
    
    global strResult
    response = requests.get(
        "http://127.0.0.1:5040/api/v1/latestGames"
    )
    
    if response.status_code == 200:
        # Crear un nuevo JSON con los valores deseados
        data = response.json().get("juegos", [])
        custom_json = []
        for game in data:
            responseJuego = requests.get(
            "http://127.0.0.1:5020/api/v1/cheapshark/find?title="+(game.get("Nombre").replace("-",""))
            )
            
            datosJuegos = responseJuego.json()
            
            idSteam = datosJuegos.get("info", {}).get("steamAppID", "730")
            
            responseIMG = requests.get(
            "http://127.0.0.1:5000/api/v1/steam/findid?id="+idSteam
            )
            datosImagen = responseIMG.json()
            
            custom_json.append({
                "name": game.get("Nombre", "Sin nombre"),  
                "price": datosJuegos.get("deals", [])[0].get("price", "99,99€"),  
                "img": datosImagen.get(idSteam, []).get("data", {}).get("header_image", None)
            })

        ##print(response.json())
    else:
        print(f"Error al obtener los datos: {response.status_code}")
        
    return custom_json 

#curl "http://127.0.0.1:5020/api/v1/cheapshark/steamid?title=???"
@app.route("/api/v1/cheapshark/steamid", methods=['GET'])
def cheapSharkGameID():
    
    global strResult
    response = requests.get(
    "https://www.cheapshark.com/api/1.0/games?title="+request.args["title"]
    )
    
    if response.status_code != 200:
        strResult = "Error: No se pudo mostrar los datos de la API de CheapShark. Abortando", response.status_code
    else:
        strResult = str(response.json()[0]["steamAppID"])
    
    return str(response.json()[0]["steamAppID"])

#curl "http://127.0.0.1:5020/api/v1/cheapshark/steamidJson?title=???"
@app.route("/api/v1/cheapshark/steamidJson", methods=['GET'])
def cheapSharkGameIDJSON():
    
    global strResult
    response = requests.get(
    "https://www.cheapshark.com/api/1.0/games?title="+request.args["title"]
    )
    
    if response.status_code != 200:
        strResult = "Error: No se pudo mostrar los datos de la API de CheapShark. Abortando", response.status_code
    else:
        strResult = str(response.json()[0]["steamAppID"])
    
    return jsonify({"steamAppID":strResult})

#curl "http://127.0.0.1:5020/api/v1/cheapshark/gameid?title=???"
@app.route("/api/v1/cheapshark/gameid", methods=['GET'])
def cheapSharkID():
    
    global strResult
    response = requests.get(
    "https://www.cheapshark.com/api/1.0/games?title="+request.args["title"]
    )
    
    if response.status_code != 200:
        strResult = "Error: No se pudo mostrar los datos de la API de CheapShark. Abortando", response.status_code
    else:
        strResult = response.json()[0]["gameID"]
    
    return strResult


