from flask import Flask, request
from flask_restx import Api, Resource, fields
import requests

app = Flask(__name__)
api = Api(app, version='1.0', title='Question Generator API',
          description='Generates a Multiple Choice Question based on the input text')

ns = api.namespace('question', description='Question operations')

input_model = api.model('InputText', {
    'text': fields.String(required=True, description='Input text to generate a question from'),
})

# Hugging Face API details for remote model
API_URL = "https://api-inference.huggingface.co/models/google/gemma-7b"
headers = {"Authorization": ""}

@ns.route('/generate-api')
class APIQuestionGenerator(Resource):
    @ns.expect(input_model)
    def post(self):
        '''Generate a Multiple Choice Question using the Hugging Face API based on the input text'''
        input_text = request.json['text']
        if not input_text:
            api.abort(400, 'No text provided')

        # Append the prompt to the input text
        prompt_text = input_text.strip() + " Summarize the given text on the basis of above mentioned notes."

        data = {
            "inputs": prompt_text,
            "parameters": {
                "max_new_tokens": 200,  # Adjust based on your needs
                "max_length": 400  # Optionally, adjust the max length if necessary
            },
            "options": {"wait_for_model": True}
        }

        response = requests.post(API_URL, headers=headers, json=data)

        if response.status_code != 200:
            return {'error': 'Failed to generate question via API', 'message': response.text}, response.status_code

        return response.json()

if __name__ == '__main__':
    app.run(debug=True)
