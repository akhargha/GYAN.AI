from flask import Flask, jsonify
import json
from openai import OpenAI
import requests
import json
from flask_cors import CORS  # Import CORS
import os

app = Flask(__name__)

CORS(app)

client = OpenAI(api_key="") # GPT Key

def generate_study_plan(prompt_notes):
    response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt_notes,
        temperature=0.5,
        max_tokens=1024
    )
    notes = response.choices[0].text
    print("TESTING 2" + notes)
    return notes

@app.route('/generate-study-plan', methods=['GET'])
def get_study_plan():
    try:
        # Load the topic from notes.json
        with open('uploads/transcript.json', 'r') as file:
            notes = json.load(file)

        topic = notes.get('transcript')  # Assuming 'transcript' is the correct key

        # Generate the study plan
        # Prepare the prompt for the GPT model based on the topic
        prompt_text = f"{topic} Generate a well-structured brief study plan with time-line for the given topic."
        print(prompt_text + "TESTING")
        study_plan = generate_study_plan(prompt_text)


        # Save the study plan to strategy.json
        with open(os.path.join('uploads', 'strategy.json'), 'w') as f:
            json.dump(study_plan, f, indent=4)

        return jsonify({"study_plan": study_plan})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5007)
