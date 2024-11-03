# app.py

from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__)

# Endpoint to receive mouse data and save to heatmap.json
@app.route('/track', methods=['POST'])
def track_mouse():
    data = request.json
    # Append new data to heatmap.json
    with open('heatmap.json', 'a') as file:
        json.dump(data, file)
        file.write("\n")  # Add new line to separate entries
    return jsonify({"status": "success"}), 200

# Endpoint to serve the front-end
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # Create heatmap.json if it doesn't exist
    if not os.path.exists('heatmap.json'):
        open('heatmap.json', 'w').close()
    app.run(debug=True)
