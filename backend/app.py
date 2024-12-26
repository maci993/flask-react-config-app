from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
# se sozdava instanca koja e osnovata na aplikacijata

CONFIG_FILE = "config.json" #definiranje na patekata do konfiguraciska datoteka
CORS(app) #ovozmozuva drugi web stranici ili aplikacii da isprakjaat barawa do ovoj server

def load_config(): #vcituvanje na konfiguracijata
    try:
        with open(CONFIG_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {"username": "admin", "password": "password"}

def save_config(data): # zacuvuvanje na konfiguracijata vo config.json
    with open(CONFIG_FILE, "w") as file:
        json.dump(data, file, indent=4) # indent=4 za podobra citlivost

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Flask app!"})


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json # ja zema json sodrzinata od teloto
    config = load_config() # vcituva momentalna konfiguracija
    if data["username"] == config["username"] and data["password"] == config["password"]:
        return jsonify({"message": "Login successful!"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# @app.route("/api/config", methods=["GET"])
# def get_config():
#     return jsonify(load_config()), 200

# @app.route("/api/config", methods=["POST"])
# def update_config(): #azuriranje na konfiguracijata
#     data = request.json # gi zema novite vrednosti za konfiguracija
#     save_config(data)
#     return jsonify({"message": "Configuration updated successfully!"}), 200

@app.route('/api/device-configuration', methods=['POST'])
def save_device_configuration():
    data = request.json
    print("Received Device Configuration:", data)
    return jsonify({"message": "Configuration saved successfully!"}), 200

if __name__ == "__main__":
    app.run(debug=True) # startuva lokalen server so debug mode, ovozmozuva restartiranje i prikaz na greskite