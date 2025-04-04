from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import requests

app=Flask(__name__)
CORS(app)

#curl "http://127.0.0.1:5010/api/v1/epicgames"
@app.route("/api/v1/epicgames", methods=['GET'])
def epicGames():
    
    global strResult
    response = requests.get(
     "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions"
    )
    
    if response.status_code != 200:
        strResult = "Error: No se pudo mostrar los datos de la API de CheapShark. Abortando", response.status_code
    else:
        strResult = response.json()
    
    return response.json()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5010, debug=True)
