from flask import Flask, jsonify
import openai
import json
import os
from openai import OpenAI

app = Flask(__name__)
client = OpenAI(api_key="") # GPT Key

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

        topic = notes.get('transcript')  # Assuming 'transcript' is the correct key

        # Generate the study plan
        # Prepare the prompt for the GPT model based on the topic
        prompt_text = f"{topic} Generate a well-structured brief study plan with time-line for the given topic."
        study_plan = generate_study_plan(topic)


        # Save the study plan to strategy.json
        with open('uploads/strategy.json', 'w') as outfile:
            json.dump({"study_plan": study_plan}, outfile, indent=4)

        return jsonify({"study_plan": study_plan})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
