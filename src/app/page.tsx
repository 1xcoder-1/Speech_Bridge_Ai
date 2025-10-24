"use client";
import "regenerator-runtime/runtime";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import {
  IconCopy,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
  IconPlayerStop,
  IconPlayerPlay,
  IconTransform
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import TextArea from "@/components/Inputs/TextArea";
import LanguageSelector from "@/components/Inputs/LanguageSelector";
import useTranslate from "@/hooks/useTranslate";
import { rtfToText } from "@/utils/rtfToText";

import SvgDecorations from "@/components/SvgDecorations";

const Home: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Korean",
    "Italian",
    "Portuguese",
    "Russian",
    "Arabic",
    "Hindi"
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const targetText = useTranslate(sourceText, selectedLanguage);

  // Cleanup function for speech synthesis
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    // Implement like logic
  };

  const handleDislike = () => {
    // Implement dislike logic
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  const handleConvertText = () => {
    // The conversion happens automatically through the useTranslate hook
    // This button is just for user feedback
    console.log("Converting text to", selectedLanguage);
  };

  const startTargetSpeech = () => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Speak the current target text
    if (targetText) {
      try {
        const utterance = new SpeechSynthesisUtterance(targetText);
        utterance.lang = getLanguageCode(selectedLanguage);
        utterance.onend = () => {
          setIsSpeaking(false);
        };
        utterance.onerror = () => {
          setIsSpeaking(false);
        };
        utteranceRef.current = utterance;
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Error starting speech synthesis:', error);
        alert("Error starting text-to-speech. Please try again.");
      }
    }
  };

  const stopTargetSpeech = () => {
    try {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } catch (error) {
      console.error('Error stopping speech synthesis:', error);
    }
  };

  const getLanguageCode = (language: string): string => {
    const languageMap: { [key: string]: string } = {
      "English": "en-US",
      "Spanish": "es-ES",
      "French": "fr-FR",
      "German": "de-DE",
      "Chinese": "zh-CN",
      "Japanese": "ja-JP",
      "Korean": "ko-KR",
      "Italian": "it-IT",
      "Portuguese": "pt-PT",
      "Russian": "ru-RU",
      "Arabic": "ar-SA",
      "Hindi": "hi-IN"
    };
    return languageMap[language] || "en-US";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Speech<span className="text-orange-500"> Bridge</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI-Powered Translation Tool. Real-time translation with voice recognition.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Source Text Area */}
            <motion.div 
              className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-orange-500"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Source Text</h2>
                <div className="text-sm text-gray-400">
                  {sourceText.length} / 2000
                </div>
              </div>
              
              <TextArea
                id="source-language"
                value={sourceText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setSourceText(e.target.value)
                }
                placeholder="Speak or type text to translate..."
                className="w-full h-64 mb-4 resize-none"
              />
              
              <div className="flex flex-wrap gap-4 items-center mt-4">
                <div className="flex items-center gap-2">
                  <motion.button 
                    onClick={handleConvertText}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconTransform size={20} />
                    <span>Convert</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Target Text Area */}
            <motion.div 
              className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-orange-500"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Translated Text</h2>
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                  languages={languages}
                />
              </div>
              
              <TextArea
                id="target-language"
                value={targetText}
                onChange={() => {}}
                placeholder="Translation will appear here..."
                className="w-full h-64 mb-4 resize-none"
              />
              
              <div className="flex flex-wrap gap-4 items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <motion.button 
                    onClick={startTargetSpeech}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      isSpeaking 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={isSpeaking}
                    whileHover={{ scale: isSpeaking ? 1 : 1.05 }}
                    whileTap={{ scale: isSpeaking ? 1 : 0.95 }}
                  >
                    <IconPlayerPlay size={20} />
                    <span>Start</span>
                  </motion.button>
                  <motion.button 
                    onClick={stopTargetSpeech}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      !isSpeaking 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                    disabled={!isSpeaking}
                    whileHover={{ scale: !isSpeaking ? 1 : 1.05 }}
                    whileTap={{ scale: !isSpeaking ? 1 : 0.95 }}
                  >
                    <IconPlayerStop size={20} />
                    <span>Stop</span>
                  </motion.button>
                  <span className="text-sm text-gray-400">
                    {isSpeaking ? 'Speaking...' : 'Ready'}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <motion.button 
                    onClick={handleCopyToClipboard}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconCopy size={22} />
                  </motion.button>
                  <motion.button 
                    onClick={handleLike}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconThumbUp size={22} />
                  </motion.button>
                  <motion.button 
                    onClick={handleDislike}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconThumbDown size={22} />
                  </motion.button>
                  <motion.button 
                    onClick={handleFavorite}
                    className={`p-2 rounded-full transition-colors ${
                      favorite 
                        ? 'bg-yellow-500 hover:bg-yellow-600' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconStar size={22} />
                  </motion.button>
                </div>
                
                {copied && (
                  <motion.span 
                    className="text-sm text-green-500 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Copied to clipboard!
                  </motion.span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <SvgDecorations />
    </div>
  );
};

export default Home;