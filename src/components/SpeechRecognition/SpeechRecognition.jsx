import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognitionComponent = ({ setSourceText, isListening, onListeningChange }) => {
  const [isClient, setIsClient] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setSourceText(transcript);
  }, [transcript, setSourceText]);

  useEffect(() => {
    if (!isClient) return;
    
    if (isListening && !listening) {
      SpeechRecognition.startListening({ continuous: true });
    } else if (!isListening && listening) {
      SpeechRecognition.stopListening();
    }
  }, [isListening, listening, isClient]);

  if (!isClient) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="text-red-500 text-sm">
        Speech recognition not supported in this browser
      </div>
    );
  }

  return null;
};

export default SpeechRecognitionComponent;