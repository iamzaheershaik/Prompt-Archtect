import React from 'react';
import ImageUploader from './ImageUploader';
import { usePrompt } from '../contexts/PromptContext';

const InputPanel: React.FC = () => {
  const {
    subject,
    setSubject,
    enhanceSubject: onEnhance,
    isLoading,
    error,
    optimizedSubject,
    setReferenceImages: onImagesChange,
  } = usePrompt();

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 space-y-4 h-full flex flex-col">
      <div>
        <h2 className="text-xl font-bold text-cyan-400">1. Define a Subject</h2>
        <p className="text-sm text-gray-400">Enter a simple idea, then use AI to transform it into a vivid, cinematic concept.</p>
      </div>
      
      <div className="flex-grow flex flex-col">
        <textarea
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g., a futuristic city, a lonely astronaut, a magical forest"
          className="w-full h-24 p-3 bg-gray-900/70 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300 resize-none"
        />
      </div>

      <ImageUploader onImagesChange={onImagesChange} />

      <button
        onClick={onEnhance}
        disabled={isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Enhancing...</span>
          </>
        ) : (
          <span>Enhance with AI</span>
        )}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      
      {optimizedSubject && (
        <div className="p-3 bg-gray-900/50 border border-green-500/30 rounded-lg">
          <p className="text-sm font-semibold text-green-400">AI Enhanced Subject:</p>
          <p className="text-gray-200 mt-1">{optimizedSubject}</p>
        </div>
      )}
    </div>
  );
};

export default InputPanel;
