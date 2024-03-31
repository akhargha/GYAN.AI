from flask import Flask, jsonify
import json
from openai import OpenAI
import os
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

client = OpenAI(api_key="")  # Initialize OpenAI client with your API key

def generate_study_plan(prompt_notes):
    response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt_notes,
        temperature=0.5,
        max_tokens=1024
    )
    notes = response.choices[0].text
    return notes

@app.route('/generate-study-plan', methods=['GET'])
def get_study_plan():
    try:
        # Load the topic from notes.json
        with open('uploads/transcript.json', 'r') as file:
            notes = json.load(file)

        topic = notes.get('transcript')  # Assuming 'transcript' is the correct key for your topic text

        # Generate the study plan
        prompt_text = f"{topic} Generate a well-structured brief study plan with timeline for the given topic."
        study_plan = generate_study_plan(prompt_text)

        # Ensure the uploads directory exists
        if not os.path.exists('uploads'):
            os.makedirs('uploads')

        # Save the study plan to strategy.json
        with open(os.path.join('uploads', 'strategy.json'), 'w') as f:
            # Wrap study_plan in a dictionary for proper JSON format
            json.dump({"study_plan": study_plan}, f, indent=4)

        return jsonify({"study_plan": study_plan})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5007)
