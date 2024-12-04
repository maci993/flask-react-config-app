from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)

CONFIG_FILE = "config.json"
CORS(app)

def load_config():
    try:
        with open(CONFIG_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {"username": "admin", "password": "password"}

def save_config(data):
    with open(CONFIG_FILE, "w") as file:
        json.dump(data, file, indent=4)

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Flask app!"})


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    config = load_config()
    if data["username"] == config["username"] and data["password"] == config["password"]:
        return jsonify({"message": "Login successful!"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/api/config", methods=["GET"])
def get_config():
    return jsonify(load_config()), 200

@app.route("/api/config", methods=["POST"])
def update_config():
    data = request.json
    save_config(data)
    return jsonify({"message": "Configuration updated successfully!"}), 200

if __name__ == "__main__":
    app.run(debug=True)