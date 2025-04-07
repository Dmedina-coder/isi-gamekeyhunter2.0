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
@app.route("/api/v1/cheapshark/populargames", methods=['POST'])
def mostsearched():
    
# Obtener el JSON enviado en el cuerpo de la solicitud
    request_data = request.get_json()
    if not request_data or 'response' not in request_data:
        return jsonify({"error": "No se envió un JSON válido con la clave 'response'"}), 400

    # Obtener el JSON enviado bajo la clave 'response'
    response_data = request_data['response']

    # Procesar los datos (ejemplo)
    custom_json = []
    for game in response_data.get("juegos", []):
        
        idSteam = game.get("IDsteam", 730)
        
        # Buscamos imagen miniatura
        responseIMG = requests.get(
             "https://store.steampowered.com/api/appdetails?appids="+str(idSteam)+"&cc=EU&l=es"
    	)
        datosImagen = responseIMG.json()
        
        custom_json.append({
            "name": game.get("Nombre", "Sin nombre"),  
            "price": datosImagen.get(idSteam, {}).get("data", {}).get("price_overview", {}).get("final_formatted", "99,99"),  
            #"img": datosImagen.get(idSteam, {}).get("data", {}).get("header_image", None)
            "img": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/"+str(idSteam)+"/header.jpg"
        })

    return jsonify(custom_json)
#curl "http://127.0.0.1:5020/api/v1/cheapshark/lastgames"
@app.route("/api/v1/cheapshark/lastgames", methods=['POST'])
def lastsearched():
    # Obtener el JSON enviado en el cuerpo de la solicitud
    request_data = request.get_json()
    if not request_data or 'response' not in request_data:
        return jsonify({"error": "No se envió un JSON válido con la clave 'response'"}), 400

    # Obtener el JSON enviado bajo la clave 'response'
    response_data = request_data['response']

    # Procesar los datos (ejemplo)
    custom_json = []
    for game in response_data.get("juegos", []):

        idSteam = game.get("IDsteam", 730)
        
        # Buscamos imagen miniatura
        responseIMG = requests.get(
             "https://store.steampowered.com/api/appdetails?appids="+str(idSteam)+"&cc=EU&l=es"
    	)
        datosImagen = responseIMG.json()
        
        custom_json.append({
            "name": game.get("Nombre", "Sin nombre"),  
            "price": datosImagen.get(idSteam, {}).get("data", {}).get("price_overview", {}).get("final_formatted", "99,99"),  
            "img": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/"+str(idSteam)+"/header.jpg"
        })

    return jsonify(custom_json)

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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5020, debug=True)