from flask import Flask, render_template, request, jsonify
from chatbot import get_response

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "reply": "Please enter a message."
        }), 400

    response = get_response(message)

    return jsonify({
        "reply": response
    })


if __name__ == "__main__":
    app.run(debug=True)