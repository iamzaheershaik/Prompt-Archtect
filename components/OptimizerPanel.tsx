import React, { useState, useCallback, useMemo } from 'react';
import { OptimizerOutput } from '../types';
import { useHistory } from '../contexts/HistoryContext';
import { optimizePromptWithLyra } from '../services/geminiService';
import { sanitize } from '../utils/security';

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
          addItemToHistory({ type: 'prompt', prompt: output.optimizedPrompt, source: 'Optimizer', subject: roughPrompt });
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

    const sanitizedOutput = useMemo(() => {
        if (!optimizerOutput) return null;
        return {
            optimizedPrompt: optimizerOutput.optimizedPrompt ? sanitize(optimizerOutput.optimizedPrompt) : '',
            whatChanged: optimizerOutput.whatChanged ? sanitize(optimizerOutput.whatChanged) : undefined,
            keyImprovements: optimizerOutput.keyImprovements ? sanitize(optimizerOutput.keyImprovements) : undefined,
            techniquesApplied: optimizerOutput.techniquesApplied ? sanitize(optimizerOutput.techniquesApplied) : undefined,
            proTip: optimizerOutput.proTip ? sanitize(optimizerOutput.proTip) : undefined,
        }
    }, [optimizerOutput]);

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
                    {sanitizedOutput ? (
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 space-y-4 h-full overflow-auto">
                            <div dangerouslySetInnerHTML={{ __html: sanitizedOutput.optimizedPrompt }} />
                            {sanitizedOutput.whatChanged && <div dangerouslySetInnerHTML={{ __html: sanitizedOutput.whatChanged }} />}
                            {sanitizedOutput.keyImprovements && <div dangerouslySetInnerHTML={{ __html: sanitizedOutput.keyImprovements }} />}
                            {sanitizedOutput.techniquesApplied && <div dangerouslySetInnerHTML={{ __html: sanitizedOutput.techniquesApplied }} />}
                            {sanitizedOutput.proTip && (
                                <div className="p-3 bg-cyan-900/30 border border-cyan-500/50 rounded-md">
                                    <div dangerouslySetInnerHTML={{ __html: sanitizedOutput.proTip }} />
                                </div>
                            )}
                        </div>
                    ) : (
                         <div className="flex-grow flex items-center justify-center bg-gray-900/50 rounded-lg border border-gray-700 p-4">
                            <div className="text-center text-gray-500">
                                {isOptimizing ? (
                                    <svg className="animate-spin mx-auto h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3m6-7h3m-3 4h3m-21-4h3m-3 4h3M12 9a3 3 0 100 6 3 3 0 000-6z" />
                                        </svg>
                                        <p className="mt-2 font-semibold">Your optimized prompt will appear here.</p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OptimizerPanel;