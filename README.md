# G(Y)AN.AI

## Bridging Educational Gaps with AI

GYAN.AI is a cutting-edge educational platform designed to empower students with learning and hearing disabilities, facilitating a more inclusive learning environment. By leveraging advanced AI technologies, GYAN.AI offers a comprehensive solution to the challenges faced by individuals in their educational journey due to disabilities, inconsistent note-taking support, and limited resources.

### Key Features

- **Video to Structured Notes**: Converts educational videos into structured notes, making content accessible in English, Spanish, German, and Italian.
- **AI-Powered ChatBot**: Engage with an AI ChatBot for practicing questions and reinforcing learning concepts in a conversational manner.
- **Summarization Tool**: Utilizes the Hyperparameter Fine-Tuned Google Gemma 2 B model for generating concise summaries of educational content.
- **Text-to-Speech**: Enhances learning with text-to-speech functionality, available in all supported languages, aiding visually impaired students.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Python 3.x installed on your system.
- Pip (Python Package Installer).
- Git (optional, for cloning the repository).
- [Any other prerequisites].

## Installation

Follow these steps to install the application:

1. **Clone the repository (optional):**
   ```bash
   git clone https://github.com/akhargha/GYAN.AI
   

2. **Go to the directory**
   '''bash
   cd GYAN.AI
   pip install -r requirements.txt


### Technologies & AI Models Used

#### Backend: Flask

Flask is a lightweight WSGI web application framework in Python, offering simplicity, flexibility, and fine-grained control. It serves as the backbone of GYAN.AI, handling server-side operations, APIs, and integration with AI models. Its minimalistic and modular design allows for rapid development and deployment of web services.

#### Frontend: React, Vite, NextUI

- **React**: A declarative, efficient, and flexible JavaScript library for building user interfaces. React enables GYAN.AI to have a dynamic and responsive front-end, enhancing user experience by making the interface intuitive and interactive.
- **Vite**: A modern front-end build tool that significantly improves the development experience. Vite leverages esbuild for fast cold starts and hot module replacement (HMR), making the development process faster and more efficient.
- **NextUI**: A React UI library that provides beautifully designed and high-performance components out of the box. NextUI is used to craft the aesthetic elements of GYAN.AI, ensuring that the application is not only functional but also visually appealing.

#### Fine-Tuned LLMs

Google T-5 LLM was fine-tuned for the summarizer funcationality to reduce its creativity & Mistral-7B-v01 was fine tuned as well to provide better quiz functionality & accuracy. These LLMs were fine-tuned by Supervised Training using informational & news datasets. Pipelines & transformers were used to augment the LLMs such that their answers become more oriented towards the input provided.

The links to these models are as:
##### https://huggingface.co/Lucas-Hyun-Lee/T5_small_lecture_summarization #####
<img width="742" alt="Screenshot 2024-03-31 at 9 28 00 AM" src="https://github.com/akhargha/GYAN.AI/assets/50960480/453e7eaf-550a-4432-bd29-c0e17ce95f04">

This is the rouge score of our finetuned model.
And A good ROUGE score varies by summarization task and metric. ROUGE-1 scores are excellent around 0.5, with scores above 0.5 considered good and 0.4 to 0.5 moderate. For ROUGE-2, scores above 0.4 are good, and 0.2 to 0.4 are moderate. ROUGE-L scores are good around 0.4 and low at 0.3 to 0.4

##### https://huggingface.co/Lucas-Hyun-Lee/Mistral_7b_question_generation_v1 #####

#### AI & ML Models

- **OpenAI Whisper**: An automatic speech recognition (ASR) system designed for robustness and versatility across different types of audio. In GYAN.AI, Whisper is used to transcribe educational videos with high accuracy, facilitating the creation of structured notes and making content accessible to hearing-impaired learners.
- **GPT-4 Turbo**: An advanced iteration of OpenAI's language models, offering powerful natural language understanding and generation. It powers the ChatBot in GYAN.AI, providing users with interactive learning experiences and personalized practice questions.
- **Facebook Text to Speech**: A state-of-the-art text-to-speech (TTS) technology that converts written text into natural-sounding speech in multiple languages. This feature supports visually impaired students by reading out content in the language of their choice.
- **DeepL**: Renowned for its quality and accuracy in translations, DeepL supports language translation within GYAN.AI, ensuring that notes and educational materials are accessible in English, Spanish, German, and Italian.
- **Google Gemma 2 B**: A model fine-tuned for summarization tasks, Gemma 2 B is used to distill lengthy educational materials into concise summaries. This aids in quick revision and understanding of key concepts, benefiting all learners, especially those with learning disabilities.

### Conclusion

The integration of these technologies and AI models makes GYAN.AI a powerful platform for educational accessibility. By leveraging Flask's flexibility, React's dynamic interfaces, and cutting-edge AI for content transcription, translation, summarization, and interaction, GYAN.AI offers a comprehensive and inclusive learning experience for students with disabilities, ensuring no learner is left behind.
