from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
import json
from openai import OpenAI

app = Flask(__name__)
api = Api(app, version='1.0', title='ChatGPT API',
          description='API for interacting with OpenAI GPT models')

# Initialize the ChatGPT client with your OpenAI API key
client = OpenAI(api_key="")

# Define the request model for Swagger documentation
chat_model = api.model('ChatRequest', {
    'question': fields.String(required=True, description='The user question'),
})

# Load initial conversation history from a JSON file
def load_conversations():
    try:
        with open('conversations.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

conversations = load_conversations()

# Function to append conversation to a JSON file
def save_conversation(question, answer):
    conversations.append({"question": question, "answer": answer})
    with open('conversations.json', 'w') as file:
        json.dump(conversations, file, indent=4)

# Function to load notes from Notes.json
def load_notes():
    try:
        with open('uploads/notes.json', 'r') as file:
            notes = json.load(file)
            # Assuming the contents are a string or can be converted to a string
            return json.dumps(notes)
    except FileNotFoundError:
        return ""

# Define the API resource
@api.route('/ask')
class Chat(Resource):
    @api.expect(chat_model)
    def post(self):
        data = request.json
        question = data.get('question')

        # Load notes and append to the user's question
        notes = load_notes()
        prompt = f"{notes}\n\n{question}"

        # ChatGPT API call
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "Your name is GyanBot and you only answer questions form the knowledge you get from the fed information."},
                {"role": "user", "content": prompt}
            ]
        )

        # Extract the response content
        answer = response.choices[0].message.content

        # Save the conversation
        save_conversation(question, answer)

        # Return the answer
        return {"answer": answer}

if __name__ == '__main__':
    app.run(debug=True)