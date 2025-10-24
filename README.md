# LinguaSpeak

A voice translation tool built with Next.js that allows users to speak into the microphone, translate the spoken text to another language, and playback the translation.

## Features

- Speech recognition using Web Speech API
- Text translation using OpenAI's GPT-4
- Audio playback of translated text
- File upload with RTF support
- URL content fetching and translation
- Language selection
- Copy to clipboard functionality
- Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API
- Web Speech API

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Create a `.env` file with your OpenAI API key:
   ```env
   NEXT_PUBLIC_API_KEY=your-openai-api-key
   ```

3. Run the development server:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Learn More

This project was built following best practices for Next.js and TypeScript development.
