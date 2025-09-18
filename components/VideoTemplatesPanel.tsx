import React, { useState, useCallback } from 'react';
import { useHistory } from '../contexts/HistoryContext';
import { TemplateID } from '../types';
import * as geminiService from '../services/geminiService';
import ImageUploader from './ImageUploader';

const templateConfig = {
    [TemplateID.AardmanVideo]: { name: 'Aardman Video', service: geminiService.generateAardmanVideoPrompt, placeholder: 'e.g., A claymation rabbit attempts to bake a giant carrot cake' },
    [TemplateID.LaikaVideo]: { name: 'Laika', service: geminiService.generateLaikaVideoPrompt, placeholder: 'e.g., A puppet child follows a glowing butterfly into a dark forest' },
    [TemplateID.CartoonSaloonVideo]: { name: 'Cartoon Saloon', service: geminiService.generateCartoonSaloonVideoPrompt, placeholder: 'e.g., A girl discovers she can talk to wolves' },
    [TemplateID.ForticheVideo]: { name: 'Fortiche Video', service: geminiService.generateForticheVideoPrompt, placeholder: 'e.g., An inventor looks at their failed creation with regret' },
    [TemplateID.SonyVideo]: { name: 'Sony Video', service: geminiService.generateSonyVideoPrompt, placeholder: 'e.g., A graffiti artist who fights with living paint' },
    [TemplateID.Airb]: { name: 'Airb', service: geminiService.generateAirbPrompt, placeholder: 'e.g., a warrior princess in a crystal cave' },
    [TemplateID.FilmMaking]: { name: 'FilmMaking', service: geminiService.generateFilmMakingPrompt, placeholder: 'e.g., a short film about time travel' },
    [TemplateID.LarasOriginal]: { name: 'LarasOriginal', service: geminiService.generateLarasOriginalPrompt, placeholder: 'e.g., Detective Kaito and Unit 734' },
    [TemplateID.LarasPromptRemix]: { name: 'LarasPromptRemix', service: geminiService.generateLarasRemixPrompt, placeholder: 'e.g., a hero and a villain in a final showdown' },
    [TemplateID.Panthfx]: { name: 'Panthfx', service: geminiService.generatePanthfxPrompt, placeholder: 'e.g., a CEO giving a keynote presentation' },
    [TemplateID.CgiAds]: { name: 'CgiAds', service: geminiService.generateCgiAdsPrompt, placeholder: 'e.g., a sleek new electric sports car' },
    [TemplateID.OkayPrompt]: { name: 'OkayPrompt', service: geminiService.generateOkayPrompt, placeholder: 'e.g., an epic fantasy battle' },
    [TemplateID.PerCity]: { name: 'PerCity', service: geminiService.generatePerCityPrompt, placeholder: 'e.g., a knight discovering a hidden city' },
    [TemplateID.RyzenPlender]: { name: 'RyzenPlender', service: geminiService.generateRyzenPlenderPrompt, placeholder: 'e.g., a cinematic spaceship fly-through' },
    [TemplateID.Transform]: { name: 'Transform', service: geminiService.generateTransformPrompt, placeholder: 'e.g., A modern living room transforming into a futuristic sci-fi hub' },
    [TemplateID.VfxShot]: { name: 'VFX Shot', service: geminiService.generateVfxShotPrompt, placeholder: 'e.g., A meteor crashing into a desolate alien planet' },
};


const templateCategories = [
    {
        name: "Stop Motion",
        templates: [TemplateID.AardmanVideo, TemplateID.LaikaVideo]
    },
    {
        name: "Stylized Animation",
        templates: [TemplateID.CartoonSaloonVideo, TemplateID.ForticheVideo, TemplateID.SonyVideo].sort((a, b) => templateConfig[a].name.localeCompare(templateConfig[b].name))
    },
    {
        name: "Character & Scene",
        templates: [TemplateID.Airb, TemplateID.FilmMaking, TemplateID.LarasOriginal, TemplateID.LarasPromptRemix, TemplateID.Panthfx].sort((a, b) => templateConfig[a].name.localeCompare(templateConfig[b].name))
    },
    {
        name: "Pro & Technical",
        templates: [TemplateID.CgiAds, TemplateID.OkayPrompt, TemplateID.PerCity, TemplateID.RyzenPlender, TemplateID.Transform, TemplateID.VfxShot].sort((a, b) => templateConfig[a].name.localeCompare(templateConfig[b].name))
    },
];

const perCityOutputFormats = ['JSON', 'JSON_DL', 'XML', 'DESIGN DRIVEN PROMPTS'];

const VideoTemplatesPanel: React.FC = () => {
    const { addItemToHistory } = useHistory();
    const [subject, setSubject] = useState<string>('A detective and an android solve a case in a rainy cyberpunk city');
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copyStatus, setCopyStatus] = useState('Copy');
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateID>(templateCategories[0].templates[0]);
    const [referenceImages, setReferenceImages] = useState<string[]>([]);

    const [perCityOutputType, setPerCityOutputType] = useState<'image' | 'video'>('video');
    const [perCityOutputFormat, setPerCityOutputFormat] = useState<string>('JSON');

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedPrompt('');

        try {
            const config = templateConfig[selectedTemplate];
            if (!config) throw new Error("Invalid template selected");
            
            let result;
            if (selectedTemplate === TemplateID.PerCity) {
                result = await geminiService.generatePerCityPrompt(subject, perCityOutputType, perCityOutputFormat);
            } else {
                result = await config.service(subject, referenceImages);
            }
            
            setGeneratedPrompt(result);
            addItemToHistory({ type: 'prompt', prompt: result, source: config.name, subject: subject });
        } catch (err) {
            setError('Failed to generate prompt. Please check your input and try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [subject, selectedTemplate, perCityOutputType, perCityOutputFormat, referenceImages, addItemToHistory]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPrompt).then(() => {
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus('Copy'), 2000);
        });
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-b-2xl border border-t-0 border-gray-700 flex flex-col md:flex-row gap-6 h-full">
            <aside className="w-full md:w-64 flex-shrink-0">
                <h2 className="text-xl font-bold text-cyan-400">Templates</h2>
                <nav className="mt-4 h-[calc(100%-2rem)] overflow-y-auto pr-2 -mr-2">
                    <ul className="space-y-4">
                        {templateCategories.map(category => (
                            <li key={category.name}>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-4 pt-2 mb-1">{category.name}</h3>
                                <ul className="space-y-1">
                                    {category.templates.map(templateId => (
                                        <li key={templateId}>
                                            <button
                                                onClick={() => setSelectedTemplate(templateId)}
                                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${selectedTemplate === templateId ? 'bg-cyan-500 text-white font-semibold' : 'hover:bg-gray-700 text-gray-300'}`}
                                            >
                                                {templateConfig[templateId]?.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            
            <main className="flex-grow flex flex-col space-y-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-200">Input Subject</h3>
                    <textarea
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={templateConfig[selectedTemplate]?.placeholder || 'Enter a subject...'}
                        className="w-full h-24 mt-2 p-3 bg-gray-900/70 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300 resize-none"
                    />
                </div>
                
                <ImageUploader onImagesChange={setReferenceImages} />

                {selectedTemplate === TemplateID.PerCity && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-md font-semibold text-gray-300 mb-2">Output Type</h4>
                            <div className="flex items-center space-x-2 bg-gray-900/70 p-1 rounded-lg border border-gray-600">
                                <button onClick={() => setPerCityOutputType('image')} className={`flex-1 px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${perCityOutputType === 'image' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Image</button>
                                <button onClick={() => setPerCityOutputType('video')} className={`flex-1 px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${perCityOutputType === 'video' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Video</button>
                            </div>
                        </div>
                         <div>
                            <h4 className="text-md font-semibold text-gray-300 mb-2">Output Format</h4>
                            <select 
                                value={perCityOutputFormat} 
                                onChange={(e) => setPerCityOutputFormat(e.target.value)}
                                className="w-full appearance-none bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300"
                            >
                                {perCityOutputFormats.map(format => <option key={format} value={format}>{format}</option>)}
                            </select>
                        </div>
                    </div>
                )}
                
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

export default VideoTemplatesPanel;