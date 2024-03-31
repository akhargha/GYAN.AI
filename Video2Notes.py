from flask import Flask, request, jsonify
from flask_cors import CORS
from moviepy.editor import VideoFileClip
from openai import OpenAI
import os
import json

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key="") #Add the API Key here

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        # Save the uploaded video file
        video_path = os.path.join('uploads', file.filename)
        file.save(video_path)
        
        # Convert video to audio
        with VideoFileClip(video_path) as video_clip:
            audio_path = video_path + ".mp3"
            video_clip.audio.write_audiofile(audio_path)

        # Transcribe audio to text using OpenAI
        with open(audio_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                response_format="text"
            )
        print(transcription)

        transcript_data = {"transcript": transcription}
        with open(os.path.join('uploads', 'transcript.json'), 'w') as f:
            json.dump(transcript_data, f, indent=4)

        prompt_notes = "Consider yourself a student. Now create structured and detailed notes with bullet points. Please give me inferred bulleted points, not transcript " + transcription
        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt_notes,
            temperature=0.5,
            max_tokens=1024
        )
        notes = response.choices[0].text

        print(notes)

        # Serialize and save the notes to a local JSON file
        notes_data = {"notes": notes}
        with open(os.path.join('uploads', 'notes.json'), 'w') as f:
            json.dump(notes_data, f, indent=4)

        # Cleanup: remove video and audio files after processing
        os.remove(video_path)
        os.remove(audio_path)
        
        # Return generated notes
        return jsonify(notes_data), 200

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.mkdir('uploads')
    app.run(debug=True, port=5000)