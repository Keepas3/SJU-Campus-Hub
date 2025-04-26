import os
from pytubefix import YouTube
from youtube_transcript_api import YouTubeTranscriptApi
from sentence_transformers import SentenceTransformer
import requests
import numpy as np
import json
import re

#utilizes openrouter api key in system environment
openrouter_api_key = os.getenv('openrouter_api_key')

# Load a Hugging Face model can be found on operouter.ai/models
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

#removes unnecessary characters that would mess up the file name
def clean_filename(filename):
    return re.sub(r'[<>:"/\\|?*]', '_', filename)

# Ensure the summary directory exists, creates one if it doesn't
def check_directory_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory) 

def transcribe_and_save(video_url):
    try:
        project_directory = os.path.dirname(os.path.abspath(__file__)) 
        summary_directory = os.path.join(project_directory, 'Summary')
        check_directory_exists(summary_directory)

        # Get YouTube video
        print("Starting transcription process...")
        
        yt = YouTube(video_url, use_po_token=True)
        print(f"Fetched video: {yt.title}")

        sanitized_title = clean_filename(yt.title)
        output_file = os.path.join(summary_directory, f"Summary_{sanitized_title}.txt")        
        
        # Get transcript
        transcripts = YouTubeTranscriptApi.get_transcript(yt.video_id, languages=['en'])
        if not transcripts:
            print("Error: No transcripts available for this video.")
            return
        print("Transcript fetched successfully. Total lines: ", len(transcripts))        
       # print(transcripts)
        
        # Combine transcript into a single string
        full_transcript = " ".join([transcript['text'] for transcript in transcripts if 'text' in transcript])      
      #  print("Full Transcript:", full_transcript)
        
        # Prepare prompt for the OpenAI API
        prompt = f""" Summarize the main points. Give examples if provided.

        CONTEXT:
        {full_transcript}
        """
        
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {openrouter_api_key}",
                "Content-Type": "application/json"
            },
            data=json.dumps({
                "model": "google/gemini-2.0-flash-001",
                "messages": [
                    {"role": "user", 
                    "content": prompt}
                ]
            })
        )

        # Ensure the response is valid
        if response.status_code == 200:
            response_data = response.json()
            choices = response_data.get("choices",[])
            if len(choices) ==0:
                print("Error: No choices returned from the model.")
                return
            llm_response = choices[0].get('message', {}).get("content",None)
            if llm_response:
                # Write summary to file
                with open(output_file, 'w', encoding='utf-8') as file:
                    file.write(llm_response)
                    print(f"Summary written to file: {output_file}")
            else:
                print("Error: No content returned from the model.")
        else:
            print(f"Error: Failed to get a valid response from the model. Status code: {response.status_code}")
            print("Response content:", response.content)
        
    except Exception as e:
        print("Error:", str(e))



# Example usage
video_url = input("Enter YouTube URL:")
transcribe_and_save(video_url)
if transcribe_and_save: 
    print("Transcription process completed.")
