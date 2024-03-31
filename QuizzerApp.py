from flask import Flask, jsonify
import json
from openai import OpenAI

app = Flask(__name__)
client = OpenAI(api_key="")

def generate_quiz_question(prompt_notes):
    response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt_notes,
        temperature=0.5,
        max_tokens=1024
    )
    notes = response.choices[0].text
    return notes

@app.route('/generate-quiz-question', methods=['GET'])
def get_study_plan():
    try:
        # Load the topic from notes.json
        with open('transcript.json', 'r') as file:
            notes = json.load(file)

        topic = notes.get('transcript')  # Assuming 'transcript' is the correct key

        # Generate the study plan
        # Prepare the prompt for the GPT model based on the topic
        prompt_text = f"{topic} Do not rewrite script. Only  Generate 5 Multiple choice question from the given text which has 4 options each."
        study_plan = generate_quiz_question(prompt_text)


        # Save the study plan to strategy.json
        with open('question.json', 'w') as outfile:
            json.dump({"question": study_plan}, outfile, indent=4)

        return jsonify({"question": study_plan})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
