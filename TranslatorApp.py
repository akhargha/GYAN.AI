import os
import json
from flask import Flask, Response
from flask_restx import Api, Resource
import deepl
import requests

app = Flask(__name__)
api = Api(app, version='1.0', title='Translation API',
          description='Translates a fixed string to Spanish using DeepL API')

# Ensure the uploads directory exists
os.makedirs('uploads', exist_ok=True)

# Your DeepL API Key - ensure this is kept secure
DEEPL_KEY = "78e6dd86-17eb-4f2a-a403-c664b6e42013:fx"
translator = deepl.Translator(DEEPL_KEY)

# Hugging Face API details for TTS model
TTS_API_URL = "https://api-inference.huggingface.co/models/facebook/mms-tts-eng"
TTS_HEADERS = {"Authorization": "Bearer"} # Put your changes for Key here

# Define the namespace
ns = api.namespace('translation', description='Translation services')

with open('uploads/english.json', 'r') as f:
    data = json.load(f)
FIXED_STRING = data.get('notes')

def save_translation_as_json(filename, translated_text):
    filepath = os.path.join('uploads', filename)
    data = {
        "notes": translated_text
    }
    with open(filepath, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def text_to_speech(text):
    try:
        response = requests.post(TTS_API_URL, headers=TTS_HEADERS, json={"inputs": text})
        if response.status_code == 200:
            return response.content  # Return the audio bytes
        else:
            return None
    except Exception as e:
        print(f"An error occurred in text-to-speech conversion: {e}")
        return None

@ns.route('/get-spanish')
class TranslateToSpanish(Resource):
    def get(self):
        try:
            result = translator.translate_text(FIXED_STRING, target_lang="ES")
            save_translation_as_json('spanish.json', result.text)
            return {'original_text': FIXED_STRING, 'translated_text': result.text}
        except Exception as e:
            return {'error': f"An error occurred: {str(e)}"}, 500

@ns.route('/get-french')
class TranslateToFrench(Resource):
    def get(self):
        try:
            result = translator.translate_text(FIXED_STRING, target_lang="FR")
            save_translation_as_json('french.json', result.text)
            return {'original_text': FIXED_STRING, 'translated_text': result.text}
        except Exception as e:
            return {'error': f"An error occurred: {str(e)}"}, 500

@ns.route('/get-german')
class TranslateToGerman(Resource):
    def get(self):
        try:
            result = translator.translate_text(FIXED_STRING, target_lang="DE")
            save_translation_as_json('german.json', result.text)
            return {'original_text': FIXED_STRING, 'translated_text': result.text}
        except Exception as e:
            return {'error': f"An error occurred: {str(e)}"}, 500

@ns.route('/get-spanish-tts')
class TranslateToSpanishTTS(Resource):
    def get(self):
        try:
            result = translator.translate_text(FIXED_STRING, target_lang="ES")
            translated_text = result.text
            audio_bytes = text_to_speech(translated_text)
            if audio_bytes:
                filename = "spanish_tts.wav"
                filepath = os.path.join('uploads', filename)
                with open(filepath, 'wb') as audio_file:
                    audio_file.write(audio_bytes)
                return {'message': f"Audio saved as {filename}"}
            else:
                return {'error': "Failed to convert text to speech"}, 500
        except Exception as e:
            return {'error': f"An error occurred: {str(e)}"}, 500

@ns.route('/get-french-tts')
class TranslateToSpanishTTS(Resource):
    def get(self):
        try:
            result = translator.translate_text(FIXED_STRING, target_lang="FR")
            translated_text = result.text
            audio_bytes = text_to_speech(translated_text)
            if audio_bytes:
                filename = "french_tts.wav"
                filepath = os.path.join('uploads', filename)
                with open(filepath, 'wb') as audio_file:
                    audio_file.write(audio_bytes)
                return {'message': f"Audio saved as {filename}"}
            else:
                return {'error': "Failed to convert text to speech"}, 500
        except Exception as e:
            return {'error': f"An error occurred: {str(e)}"}, 500

@ns.route('/get-german-tts')
class TranslateToSpanishTTS(Resource):
    def get(self):
        try:
            result = translator.translate_text(FIXED_STRING, target_lang="DE")
            translated_text = result.text
            audio_bytes = text_to_speech(translated_text)
            if audio_bytes:
                filename = "german_tts.wav"
                filepath = os.path.join('uploads', filename)
                with open(filepath, 'wb') as audio_file:
                    audio_file.write(audio_bytes)
                return {'message': f"Audio saved as {filename}"}
            else:
                return {'error': "Failed to convert text to speech"}, 500
        except Exception as e:
            return {'error': f"An error occurred: {str(e)}"}, 500

@ns.route('/get-english-tts')
class TranslateToSpanishTTS(Resource):
    def get(self):
        try:
            result = translator.translate_text(FIXED_STRING, target_lang="EN-US")
            translated_text = result.text
            audio_bytes = text_to_speech(translated_text)
            if audio_bytes:
                filename = "english_tts.wav"
                filepath = os.path.join('uploads', filename)
                with open(filepath, 'wb') as audio_file:
                    audio_file.write(audio_bytes)
                return {'message': f"Audio saved as {filename}"}
            else:
                return {'error': "Failed to convert text to speech"}, 500
        except Exception as e:
            return {'error': f"An error occurred: {str(e)}"}, 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
