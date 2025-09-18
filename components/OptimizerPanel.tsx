import React, { useState, useCallback } from 'react';
import { OptimizerOutput } from '../types';
import { useHistory } from '../contexts/HistoryContext';
import { optimizePromptWithLyra } from '../services/geminiService';

const targetAIOptions = ['ChatGPT', 'Claude', 'Gemini', 'Other'];
const promptStyleOptions = ['DETAIL', 'BASIC'];

const OptimizerPanel: React.FC = () => {
    const { addItemToHistory } = useHistory();
    const [roughPrompt, setRoughPrompt] = useState('Help with my resume');
    const [targetAI, setTargetAI] = useState('ChatGPT');
    const [promptStyle, setPromptStyle] = useState('DETAIL');
    const [optimizerOutput, setOptimizerOutput] = useState<OptimizerOutput | null>(null);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizerError, setOptimizerError] = useState<string | null>(null);
    const [copyStatus, setCopyStatus] = useState('Copy');
    
    const handleOptimize = useCallback(async () => {
        if (!roughPrompt) {
          setOptimizerError('Please enter a prompt to optimize.');
          return;
        }
        setIsOptimizing(true);
        setOptimizerError(null);
        setOptimizerOutput(null);
        try {
          const output = await optimizePromptWithLyra(roughPrompt, targetAI, promptStyle);
          setOptimizerOutput(output);
          addItemToHistory({ type: 'prompt', prompt: output.optimizedPrompt, source: 'Optimizer' });
        } catch (err) {
          setOptimizerError('Failed to optimize prompt. Please try again.');
          console.error(err);
        } finally {
          setIsOptimizing(false);
        }
    }, [roughPrompt, targetAI, promptStyle, addItemToHistory]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
          setCopyStatus('Copied!');
          setTimeout(() => setCopyStatus('Copy'), 2000);
        });
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-b-2xl border border-t-0 border-gray-700 flex flex-col gap-6 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-4">
                    <div className="p-4 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
                        <p className="font-bold text-lg text-cyan-400">Hello! I'm Lyra, your AI prompt optimizer.</p>
                        <p className="text-gray-300 mt-1">I transform vague requests into precise, effective prompts that deliver better results.</p>
                    </div>
                    
                    <div>
                        <label htmlFor="rough-prompt" className="block text-md font-bold text-gray-200 mb-2">Your Rough Prompt</label>
                        <textarea
                            id="rough-prompt"
                            value={roughPrompt}
                            onChange={(e) => setRoughPrompt(e.target.value)}
                            placeholder="e.g., Write me a marketing email"
                            className="w-full h-32 p-3 bg-gray-900/70 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300 resize-none"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="target-ai" className="block text-sm font-medium text-gray-300 mb-2">Target AI</label>
                            <select id="target-ai" value={targetAI} onChange={(e) => setTargetAI(e.target.value)}
                                className="w-full appearance-none bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all">
                                {targetAIOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="prompt-style" className="block text-sm font-medium text-gray-300 mb-2">Prompt Style</label>
                            <select id="prompt-style" value={promptStyle} onChange={(e) => setPromptStyle(e.target.value)}
                                className="w-full appearance-none bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all">
                                {promptStyleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleOptimize}
                        disabled={isOptimizing}
                        className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                        {isOptimizing ? 'Optimizing...' : 'Optimize Prompt'}
                    </button>
                    {optimizerError && <p className="text-red-400 text-sm text-center">{optimizerError}</p>}
                </div>

                <div className="flex flex-col space-y-4">
                    {optimizerOutput ? (
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 space-y-4 h-full overflow-auto">
                            <div>
                                <h3 className="text-lg font-bold text-green-400">Your Optimized Prompt:</h3>
                                <div className="relative mt-2 bg-gray-800 p-3 rounded-md">
                                     <button onClick={() => handleCopy(optimizerOutput.optimizedPrompt)}
                                        className="absolute top-2 right-2 px-3 py-1 bg-gray-700 text-gray-200 text-xs font-semibold rounded hover:bg-gray-600 transition-colors">
                                        {copyStatus}
                                    </button>
                                    <pre className="whitespace-pre-wrap text-sm text-gray-200 font-sans">
                                        <code>{optimizerOutput.optimizedPrompt}</code>
                                    </pre>
                                </div>
                            </div>
                            
                            {optimizerOutput.keyImprovements && (
                                <div>
                                    <h4 className="font-semibold text-gray-200">Key Improvements:</h4>
                                    <pre className="whitespace-pre-wrap text-sm text-gray-300 mt-1 font-sans">{optimizerOutput.keyImprovements}</pre>
                                </div>
                            )}
                            {optimizerOutput.proTip && (
                                <div className="p-3 bg-cyan-900/30 border border-cyan-500/50 rounded-md">
                                    <h4 className="font-semibold text-cyan-400">Pro Tip:</h4>
                                    <p className="text-sm text-cyan-200 mt-1">{optimizerOutput.proTip}</p>
                                </div>
                            )}

                        </div>
                    ) : (
                         <div className="flex-grow flex items-center justify-center bg-gray-900/50 rounded-lg border border-gray-700 p-4">
                            <div className="text-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3m6-7h3m-3 4h3m-21-4h3m-3 4h3M12 9a3 3 0 100 6 3 3 0 000-6z" />
                                </svg>
                                <p className="mt-2 font-semibold">Your optimized prompt will appear here.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OptimizerPanel;
