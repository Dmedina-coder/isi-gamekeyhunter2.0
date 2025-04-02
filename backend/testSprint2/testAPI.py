"""Este archivo comprueba que funciona correctamente cada API del programa, en caso de que de error, comprueba que las credenciales
son correctas"""



from flask import Flask, jsonify, request
import time
import requests

app=Flask(__name__)

access_token = None
token_expiry_time = 0
strResult=""

token_url= "https://sandboxapi.g2a.com/oauth/token"

#escribe aqui las credenciales de g2a
g2a_cli = ""
g2a_secret = ""

token2_url = "https://api.isthereanydeal.com"


def get_g2a_token():
    global access_token, token_expiry_time

    response = requests.post(
        token_url,
        data={"grant_type": "client_credentials",
              "client_id": g2a_cli,
              "client_secret": g2a_secret
              }
    )

    if response.status_code == 200:
        data = response.json()
        access_token = data["access_token"]
        token_expiry_time = time.time() + data['expires_in']

def access_token():
    global access_token, token_expiry_time

    if access_token is None or time.time() >= token_expiry_time:
        get_g2a_token()
    
    return access_token

@app.route("/")
def index():
    global strResult
    token = access_token()

    response = requests.get(
        "https://sandboxapi.g2a.com/v1/products",
        headers={"Authorization": f"Bearer {token}"},
        params=({"id":"10000001000001"})
    )

    if response.status_code != 200:
        strResult += "Error: No se pudo mostrar los datos de la API de G2A. Abortando", response.status_code
        
    else:
        strResult += "Resultados del juego Diablo 3 Battlechest Battle.net: "+str(response.json())
    response = requests.get(
    "https://store.steampowered.com/api/appdetails?appids=730&cc=EU&l=es"
    )

    if response.status_code != 200:
        return "Error: No se pudo mostrar los datos de la API de Steam. Abortando", response.status_code

    else:
        strResult += "Resultados del juego Counter Strike:"+str(response.json())
    response = requests.get(
    "https://www.cheapshark.com/api/1.0/games?id=612"
    )

    if response.status_code != 200:
        strResult = "Error: No se pudo mostrar los datos de la API de CheapShark. Abortando", response.status_code
    else:
        strResult += "Resultados del juego Lego Batman: "+str(response.json())
        
    response = requests.get(
        "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions"
    )
    
    if response.status_code != 200:
        strResult += "Error: No se pudo mostrar los datos de la API de Epic Games", response.status_code
            
    else:
        strResult += "Resultados de los juegos gratuitos de la semana de Epic Games: "+str(response.json())
    return jsonify(strResult)