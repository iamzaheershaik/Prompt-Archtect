import React, { useState, useCallback } from 'react';
import { CustomTemplate } from '../types';
import { generateCustomPrompt } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import { useCustomTemplates } from '../contexts/CustomTemplatesContext';
import { useHistory } from '../contexts/HistoryContext';

const CustomTemplatesPanel: React.FC = () => {
    const { templates, saveTemplate, deleteTemplate } = useCustomTemplates();
    const { addItemToHistory } = useHistory();
    
    const [selectedTemplate, setSelectedTemplate] = useState<CustomTemplate | null>(templates.length > 0 ? templates[0] : null);
    const [subject, setSubject] = useState<string>('A synthwave android dreaming of electric sheep');
    const [referenceImages, setReferenceImages] = useState<string[]>([]);
    
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copyStatus, setCopyStatus] = useState('Copy');

    const [mode, setMode] = useState<'use' | 'manage'>('use');
    const [editingTemplate, setEditingTemplate] = useState<Partial<CustomTemplate> | null>(null);

    // Update selected template if the list changes (e.g., after deletion)
    React.useEffect(() => {
        if (!selectedTemplate && templates.length > 0) {
            setSelectedTemplate(templates[0]);
        } else if (selectedTemplate && !templates.find(t => t.id === selectedTemplate.id)) {
            setSelectedTemplate(templates.length > 0 ? templates[0] : null);
        }
    }, [templates, selectedTemplate]);


    const handleGenerate = useCallback(async () => {
        if (!selectedTemplate) {
            setError("Please select a template first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedPrompt('');
        try {
            const result = await generateCustomPrompt(subject, selectedTemplate.content, referenceImages);
            setGeneratedPrompt(result);
            addItemToHistory({ type: 'prompt', prompt: result, source: `Custom: ${selectedTemplate.name}`, subject: subject });
        } catch (err) {
            setError('Failed to generate prompt. Please check your template and input.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [subject, selectedTemplate, referenceImages, addItemToHistory]);

    const handleSaveTemplate = () => {
        if (editingTemplate && editingTemplate.name && editingTemplate.content) {
            saveTemplate({
                id: editingTemplate.id,
                name: editingTemplate.name,
                content: editingTemplate.content,
            });
            setEditingTemplate(null);
        }
    };
    
    const handleDeleteTemplate = (id: string) => {
        if (window.confirm("Are you sure you want to delete this template?")) {
            deleteTemplate(id);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPrompt).then(() => {
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus('Copy'), 2000);
        });
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-b-2xl border border-t-0 border-gray-700 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-cyan-400">Custom Templates</h2>
                <div className="flex items-center space-x-2 bg-gray-900/70 p-1 rounded-lg border border-gray-600">
                    <button onClick={() => setMode('use')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${mode === 'use' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Use</button>
                    <button onClick={() => setMode('manage')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${mode === 'manage' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Manage</button>
                </div>
            </div>

            {mode === 'use' && (
                <div className="flex flex-col md:flex-row gap-6 flex-grow">
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <h3 className="text-lg font-bold text-gray-300">My Templates</h3>
                         <nav className="mt-4 space-y-2">
                             {templates.map(template => (
                                <button
                                    key={template.id}
                                    onClick={() => setSelectedTemplate(template)}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${selectedTemplate?.id === template.id ? 'bg-cyan-500 text-white font-semibold' : 'hover:bg-gray-700 text-gray-300'}`}
                                >
                                    {template.name}
                                </button>
                            ))}
                         </nav>
                    </aside>
                    <main className="flex-grow flex flex-col space-y-4">
                        <div>
                            <label htmlFor="custom-subject" className="text-lg font-bold text-gray-200">Input Subject</label>
                            <textarea id="custom-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter a subject to use with your template"
                                className="w-full h-24 mt-2 p-3 bg-gray-900/70 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300 resize-none"/>
                        </div>
                        <ImageUploader onImagesChange={setReferenceImages} />
                        <button onClick={handleGenerate} disabled={isLoading || !selectedTemplate}
                            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2">
                            {isLoading ? 'Generating...' : 'Generate Prompt'}
                        </button>
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        <div className="relative flex-grow min-h-[200px] bg-gray-900/70 p-4 rounded-lg border border-gray-600">
                            <button onClick={handleCopy} disabled={!generatedPrompt} className="absolute top-2 right-2 px-3 py-1 bg-gray-700 text-gray-200 text-xs font-semibold rounded hover:bg-gray-600 z-10">{copyStatus}</button>
                            <pre className="h-full w-full overflow-auto whitespace-pre-wrap text-sm text-gray-200">
                                <code>{generatedPrompt || "Your generated prompt will appear here..."}</code>
                            </pre>
                        </div>
                    </main>
                </div>
            )}
            
            {mode === 'manage' && (
                <div className="flex flex-col gap-6">
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                        <h3 className="text-lg font-bold text-gray-200">{editingTemplate?.id ? 'Edit Template' : 'Create New Template'}</h3>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                             <input type="text" placeholder="Template Name" value={editingTemplate?.name || ''}
                                onChange={e => setEditingTemplate(prev => ({...prev, name: e.target.value}))}
                                className="md:col-span-1 bg-gray-900/70 border border-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-cyan-500"/>
                             <textarea placeholder="Template Content (e.g., A cinematic shot of {{subject}}...)" value={editingTemplate?.content || ''}
                                onChange={e => setEditingTemplate(prev => ({...prev, content: e.target.value}))}
                                className="md:col-span-2 h-24 bg-gray-900/70 border border-gray-600 p-2 rounded-lg resize-y focus:ring-2 focus:ring-cyan-500"/>
                         </div>
                         <div className="flex justify-end space-x-2 mt-2">
                            {editingTemplate && <button onClick={() => setEditingTemplate(null)} className="px-4 py-2 bg-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-500">Cancel</button>}
                            <button onClick={handleSaveTemplate} className="px-4 py-2 bg-cyan-600 rounded-lg text-sm font-semibold hover:bg-cyan-500">Save Template</button>
                         </div>
                    </div>
                     <div className="space-y-2">
                        {templates.map(t => (
                            <div key={t.id} className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                                <span className="font-semibold">{t.name}</span>
                                <div className="space-x-2">
                                    <button onClick={() => setEditingTemplate(t)} className="text-sm text-cyan-400 hover:underline">Edit</button>
                                    <button onClick={() => handleDeleteTemplate(t.id)} className="text-sm text-red-400 hover:underline">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomTemplatesPanel;