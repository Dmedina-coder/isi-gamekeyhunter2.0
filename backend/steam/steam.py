from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import requests

app=Flask(__name__)
CORS(app)

#curl "http://127.0.0.1:5000/api/v1/steam/find?title=???"
@app.route("/api/v1/steam/find", methods=['GET'])
def steam():
    
    global strResult
    responseID = requests.get(
    "http://127.0.0.1:5020/api/v1/cheapshark/steamid?title="+request.args["title"]
    )
    
    response = requests.get(
    "https://store.steampowered.com/api/appdetails?appids="+str(responseID.json())+"&cc=EU&l=es"
    )

    if response.status_code != 200:
        return "Error: No se pudo mostrar los datos de la API de Steam. Abortando", response.status_code

    else:
        strResult = response.json()
    
    return strResult    

#curl "http://127.0.0.1:5000/api/v1/steam/findid?id=???"
@app.route("/api/v1/steam/findid", methods=['GET'])
def steamidgame():
    
    global strResult
    
    response = requests.get(
    "https://store.steampowered.com/api/appdetails?appids="+request.args["id"]+"&cc=EU&l=es"
    )

    if response.status_code != 200:
        return "Error: No se pudo mostrar los datos de la API de Steam. Abortando", response.status_code

    else:
        strResult = response.json()
    
    return strResult  


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)