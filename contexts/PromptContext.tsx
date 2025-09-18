import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { PromptState, OutputFormat, PromptContextType } from '../types';
import { INITIAL_PROMPT_STATE } from '../constants';
import { enhanceSubjectWithAI, getAIcinematicSuggestions } from '../services/geminiService';
import { buildPrompt } from '../services/promptBuilder';

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [subject, setSubject] = useState<string>('A robot holding a red skateboard');
    const [optimizedSubject, setOptimizedSubject] = useState<string>('');
    const [promptState, setPromptState] = useState<PromptState>(INITIAL_PROMPT_STATE);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>('default');
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [referenceImages, setReferenceImages] = useState<string[]>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuggesting, setIsSuggesting] = useState<boolean>(false);
    const [suggestionError, setSuggestionError] = useState<string | null>(null);

    useEffect(() => {
        const finalSubject = optimizedSubject || subject;
        const prompt = buildPrompt({ ...promptState, subject: finalSubject }, outputFormat);
        setGeneratedPrompt(prompt);
    }, [promptState, subject, optimizedSubject, outputFormat]);

    const enhanceSubject = useCallback(async () => {
        if (!subject) {
            setError('Please enter a subject to enhance.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const enhanced = await enhanceSubjectWithAI(subject, referenceImages);
            setOptimizedSubject(enhanced);
        } catch (err) {
            setError('Failed to enhance subject with AI. Please check your API key and try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [subject, referenceImages]);

    const suggestCinematics = useCallback(async () => {
        const currentSubject = optimizedSubject || subject;
        if (!currentSubject) {
            setSuggestionError('Please enter a subject first.');
            return;
        }
        setIsSuggesting(true);
        setSuggestionError(null);
        try {
            const suggestions = await getAIcinematicSuggestions(currentSubject, referenceImages);
            setPromptState(prev => ({ ...prev, ...suggestions }));
        } catch (err) {
            setSuggestionError('AI Director failed. Please try again.');
            console.error(err);
        } finally {
            setIsSuggesting(false);
        }
    }, [subject, optimizedSubject, referenceImages]);

    const reusePrompt = useCallback((promptSubject: string) => {
        setSubject(promptSubject);
        setOptimizedSubject('');
        setPromptState(INITIAL_PROMPT_STATE);
        setReferenceImages([]);
    }, []);
    
    const value = {
        subject,
        setSubject,
        optimizedSubject,
        promptState,
        setPromptState,
        referenceImages,
        setReferenceImages,
        outputFormat,
        setOutputFormat,
        generatedPrompt,
        isLoading,
        error,
        isSuggesting,
        suggestionError,
        enhanceSubject,
        suggestCinematics,
        reusePrompt,
    };

    return (
        <PromptContext.Provider value={value}>
            {children}
        </PromptContext.Provider>
    );
};

export const usePrompt = (): PromptContextType => {
    const context = useContext(PromptContext);
    if (context === undefined) {
        throw new Error('usePrompt must be used within a PromptProvider');
    }
    return context;
};
