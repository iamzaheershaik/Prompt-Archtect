import React, { useState, useCallback } from 'react';
import { TemplateID } from '../types';
import * as geminiService from '../services/geminiService';
import { useHistory } from '../contexts/HistoryContext';
import ImageUploader from './ImageUploader';

const templateConfig = {
    [TemplateID.AardmanImage]: { name: 'Aardman Animations', service: geminiService.generateAardmanPrompt, placeholder: 'e.g., A sheep trying to knit a sweater' },
    [TemplateID.LaikaImage]: { name: 'Laika', service: geminiService.generateLaikaPrompt, placeholder: 'e.g., A child made of moonlight and shadows' },
    [TemplateID.CartoonSaloonImage]: { name: 'Cartoon Saloon', service: geminiService.generateCartoonSaloonPrompt, placeholder: 'e.g., A wolf spirit guarding an ancient forest' },
    [TemplateID.SonyImage]: { name: 'Sony Pictures Animation', service: geminiService.generateSonyPicturesAnimationPrompt, placeholder: 'e.g., A skater punk with electric powers' },
    [TemplateID.ForticheImage]: { name: 'Fortiche Production', service: geminiService.generateFortichePrompt, placeholder: 'e.g., An alchemist haunted by their past' },
};

const templates = [
    TemplateID.AardmanImage,
    TemplateID.LaikaImage,
    TemplateID.CartoonSaloonImage,
    TemplateID.SonyImage,
    TemplateID.ForticheImage,
];

const ImageTemplatesPanel: React.FC = () => {
    const { addItemToHistory } = useHistory();
    const [subject, setSubject] = useState<string>('A curious mouse inventor building a tiny rocket ship');
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copyStatus, setCopyStatus] = useState('Copy');
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateID>(templates[0]);
    const [referenceImages, setReferenceImages] = useState<string[]>([]);

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedPrompt('');

        try {
            const config = templateConfig[selectedTemplate];
            if (!config) throw new Error("Invalid template selected");

            const result = await config.service(subject, referenceImages);
            setGeneratedPrompt(result);
            addItemToHistory({ type: 'prompt', prompt: result, source: config.name });
        } catch (err) {
            setError('Failed to generate prompt. Please check your input and try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [subject, selectedTemplate, referenceImages, addItemToHistory]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPrompt).then(() => {
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus('Copy'), 2000);
        });
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-b-2xl border border-t-0 border-gray-700 flex flex-col md:flex-row gap-6 h-full">
            <aside className="w-full md:w-64 flex-shrink-0 space-y-4">
                <h2 className="text-xl font-bold text-cyan-400">Image Templates</h2>
                <ul className="space-y-2">
                    {templates.map(templateId => (
                        <li key={templateId}>
                            <button
                                onClick={() => setSelectedTemplate(templateId)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${selectedTemplate === templateId ? 'bg-cyan-500 text-white font-semibold' : 'hover:bg-gray-700 text-gray-300'}`}
                            >
                                {templateConfig[templateId].name}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
            
            <main className="flex-grow flex flex-col space-y-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-200">Input Subject</h3>
                    <textarea
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={templateConfig[selectedTemplate].placeholder}
                        className="w-full h-24 mt-2 p-3 bg-gray-900/70 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300 resize-none"
                    />
                </div>
                
                <ImageUploader onImagesChange={setReferenceImages} />

                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                >
                    {isLoading ? 'Generating...' : 'Generate Prompt'}
                </button>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <div className="relative flex-grow min-h-[200px] bg-gray-900/70 p-4 rounded-lg border border-gray-600">
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 px-3 py-1 bg-gray-700 text-gray-200 text-xs font-semibold rounded hover:bg-gray-600 transition-colors z-10"
                        disabled={!generatedPrompt}
                    >
                        {copyStatus}
                    </button>
                    <pre className="h-full w-full overflow-auto whitespace-pre-wrap text-sm text-gray-200">
                        <code>{generatedPrompt || "Your generated prompt will appear here..."}</code>
                    </pre>
                </div>
            </main>
        </div>
    );
};

export default ImageTemplatesPanel;
