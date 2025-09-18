import React, { useState, useCallback } from 'react';
import CustomSelect from './CustomSelect';
import { ASPECT_RATIO_OPTIONS } from '../constants';
import { CinematicOption } from '../types';
import { generateImageWithAI } from '../services/geminiService';
import { usePrompt } from '../contexts/PromptContext';
import { useHistory } from '../contexts/HistoryContext';

const modelOptions: CinematicOption[] = [
    { value: 'imagen-4.0-generate-001', label: 'Imagen 4', description: 'State-of-the-art model for high-quality, photorealistic image generation.' },
    { value: 'gemini-2.5-flash-image-preview', label: 'Nano-Banana (Experimental)', description: 'A fast, lightweight model for quick image generation. Does not support aspect ratio.' },
];

const ImageGeneratorPanel: React.FC = () => {
    const { generatedPrompt: prompt } = usePrompt();
    const { addItemToHistory } = useHistory();

    const [isGenerating, setIsGenerating] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [imageModel, setImageModel] = useState<'imagen-4.0-generate-001' | 'gemini-2.5-flash-image-preview'>('imagen-4.0-generate-001');

    const handleGenerate = useCallback(async () => {
        setIsGenerating(true);
        setError(null);
        setImages([]);
        
        try {
          if (!prompt) {
            setError("There is no prompt to generate an image from. Please create one first in the 'Prompt Architect' tab.");
            setIsGenerating(false);
            return;
          }
          const generatedImages = await generateImageWithAI(prompt, aspectRatio, imageModel);
          
          if (generatedImages.length > 0) {
            setImages(generatedImages);
            addItemToHistory({
              type: 'image',
              imageDataUrl: generatedImages[0],
              prompt: prompt,
              settings: { aspectRatio, model: imageModel }
            });
          } else {
            setError("The model didn't return an image. Please try a different prompt or model.");
          }
        } catch (err) {
          setError('Failed to generate image. Please check the prompt or API key and try again.');
          console.error(err);
        } finally {
          setIsGenerating(false);
        }
    }, [prompt, aspectRatio, imageModel, addItemToHistory]);

    return (
        <div className="bg-gray-800/50 p-6 rounded-b-2xl border border-t-0 border-gray-700 flex flex-col gap-6 h-full">
            <h2 className="text-xl font-bold text-cyan-400">Cinematic Image Generation</h2>
            <p className="text-sm text-gray-400 -mt-4">Use the prompt crafted in the Architect tab to generate a unique image.</p>
            
            <div className="p-4 bg-gray-900/70 border border-gray-600 rounded-lg">
                <p className="text-sm font-semibold text-gray-300">Active Prompt:</p>
                <p className="text-gray-200 mt-1 text-sm italic">"{prompt}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CustomSelect
                            label="Image Model"
                            value={imageModel}
                            onChange={(e) => setImageModel(e.target.value as 'imagen-4.0-generate-001' | 'gemini-2.5-flash-image-preview')}
                            options={modelOptions}
                        />
                        <CustomSelect
                            label="Aspect Ratio"
                            value={aspectRatio}
                            onChange={(e) => setAspectRatio(e.target.value)}
                            options={ASPECT_RATIO_OPTIONS}
                            disabled={imageModel !== 'imagen-4.0-generate-001'}
                        />
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                >
                    {isGenerating ? (
                        <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating...</span>
                        </>
                    ) : (
                        <span>Generate Image</span>
                    )}
                </button>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <div className="flex-grow flex items-center justify-center bg-gray-900/50 rounded-lg border border-gray-700 min-h-[400px] p-4">
                {isGenerating && (
                <div className="text-center text-gray-400">
                    <svg className="animate-spin mx-auto h-10 w-10 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="font-semibold text-lg">Your masterpiece is being created...</p>
                    <p className="text-sm">This can take a moment. Please be patient.</p>
                </div>
                )}

                {!isGenerating && images.length > 0 && (
                    <div className="grid grid-cols-1 gap-4">
                        {images.map((imageSrc, index) => (
                        <img
                            key={index}
                            src={imageSrc}
                            alt={`Generated image ${index + 1}`}
                            className="rounded-lg shadow-lg object-contain max-h-[500px] max-w-full"
                        />
                        ))}
                    </div>
                )}

                {!isGenerating && images.length === 0 && !error && (
                <div className="text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 font-semibold">Your generated image will appear here.</p>
                    <p className="text-sm">Click "Generate Image" to start.</p>
                </div>
                )}
            </div>
      </div>
  );
};

export default ImageGeneratorPanel;
