import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { generateVideoWithAI, checkVideoOperationStatus } from '../services/geminiService';
import { useHistory } from '../contexts/HistoryContext';
import { PromptHistoryItem } from '../types';
import ImageUploader from './ImageUploader';

const loadingMessages = [
    "Contacting the video generation matrix...",
    "The AI is storyboarding your scene...",
    "Warming up the render farm...",
    "Rendering initial frames (this can take a few minutes)...",
    "Compositing visual effects...",
    "Applying final cinematic touches...",
    "Almost there, preparing the final cut..."
];

// Helper to convert Blob to a Base64 Data URL
const blobToDataURL = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(blob);
    });
};


const VideoGeneratorPanel: React.FC = () => {
    const { history, addItemToHistory } = useHistory();
    const [isGenerating, setIsGenerating] = useState(false);
    const [operation, setOperation] = useState<any>(null);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [referenceImage, setReferenceImage] = useState<string[]>([]);
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

    const activePrompt = useMemo(() => {
        const latestPrompt = history.find(item => item.type === 'prompt') as PromptHistoryItem | undefined;
        return latestPrompt?.prompt || '';
    }, [history]);

    const handleGenerate = useCallback(async () => {
        if (!activePrompt) {
            setError("There is no prompt to generate a video from. Please create one first in the 'Architect' or 'Templates' tabs.");
            return;
        }
        setIsGenerating(true);
        setError(null);
        setGeneratedVideoUrl(null);
        setOperation(null);
        setLoadingMessage(loadingMessages[0]);

        try {
            const initialOp = await generateVideoWithAI(activePrompt, referenceImage.length > 0 ? referenceImage[0] : undefined);
            setOperation(initialOp);
        } catch (err) {
            setError('Failed to start video generation. Please check the prompt or API key and try again.');
            console.error(err);
            setIsGenerating(false);
        }
    }, [activePrompt, referenceImage]);

    useEffect(() => {
        if (operation && !operation.done && isGenerating) {
            const interval = setInterval(async () => {
                try {
                    const updatedOp = await checkVideoOperationStatus(operation);
                    setOperation(updatedOp);
                    setLoadingMessage(prev => loadingMessages[loadingMessages.indexOf(prev) + 1] || prev);

                    if (updatedOp.done) {
                        clearInterval(interval);
                        const downloadLink = updatedOp.response?.generatedVideos?.[0]?.video?.uri;
                        if (downloadLink) {
                            setLoadingMessage("Fetching your video...");
                            const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                            const videoBlob = await response.blob();
                            const videoDataUrl = await blobToDataURL(videoBlob);
                            setGeneratedVideoUrl(videoDataUrl);
                            
                            // Save to history
                            addItemToHistory({
                                type: 'video',
                                videoDataUrl: videoDataUrl,
                                prompt: activePrompt,
                                source: 'Video Generator'
                            });

                        } else {
                            throw new Error("Operation finished, but no video link was found.");
                        }
                        setIsGenerating(false);
                    }
                } catch (err) {
                    setError('An error occurred while checking video status.');
                    console.error(err);
                    setIsGenerating(false);
                    clearInterval(interval);
                }
            }, 10000); // Poll every 10 seconds

            return () => clearInterval(interval);
        }
    }, [operation, isGenerating, activePrompt, addItemToHistory]);


    return (
        <div className="bg-gray-800/50 p-6 rounded-b-2xl border border-t-0 border-gray-700 flex flex-col gap-6 h-full">
            <h2 className="text-xl font-bold text-cyan-400">Cinematic Video Generation</h2>
            <p className="text-sm text-gray-400 -mt-4">Use your latest prompt to generate a unique video clip. This process may take several minutes.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 flex flex-col space-y-4">
                    <div className="p-4 bg-gray-900/70 border border-gray-600 rounded-lg flex-grow flex flex-col">
                        <p className="text-md font-semibold text-gray-300 mb-2">Active Prompt:</p>
                        <div className="overflow-y-auto max-h-40 pr-2">
                           <p className="text-gray-200 mt-1 text-sm italic">"{activePrompt || 'No prompt found in history. Please generate one first.'}"</p>
                        </div>
                    </div>
                    <ImageUploader onImagesChange={setReferenceImage} maxImages={1} />
                     <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !activePrompt}
                        className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                        {isGenerating ? 'Generation in Progress...' : 'Generate Video'}
                    </button>
                </div>

                <div className="lg:col-span-2 flex-grow flex items-center justify-center bg-gray-900/50 rounded-lg border border-gray-700 min-h-[400px] p-4">
                    {isGenerating && (
                        <div className="text-center text-gray-400">
                            <svg className="animate-spin mx-auto h-10 w-10 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="font-semibold text-lg">Your masterpiece is being created...</p>
                            <p className="text-sm mt-2">{loadingMessage}</p>
                        </div>
                    )}
                    
                    {!isGenerating && generatedVideoUrl && (
                        <div className="text-center">
                            <video src={generatedVideoUrl} controls autoPlay loop className="max-w-full max-h-[500px] rounded-lg shadow-lg mb-4" />
                            <a href={generatedVideoUrl} download={`ai-architect-video-${Date.now()}.mp4`}
                               className="py-2 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                                Download Video
                            </a>
                        </div>
                    )}

                    {!isGenerating && !generatedVideoUrl && (
                        <div className="text-center text-gray-500">
                           <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55a2 2 0 01.996 1.712V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-4.288a2 2 0 01.996-1.712L9 10m0 0l6 6m-6-6l6-6" />
                            </svg>
                            <p className="mt-2 font-semibold">Your generated video will appear here.</p>
                            <p className="text-sm">Click "Generate Video" to start.</p>
                        </div>
                    )}
                </div>
            </div>
            {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}
        </div>
    );
};

export default VideoGeneratorPanel;