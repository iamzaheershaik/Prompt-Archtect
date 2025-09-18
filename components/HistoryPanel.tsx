import React, { useState, useMemo } from 'react';
import { HistoryItem, ImageHistoryItem, PromptHistoryItem, VideoHistoryItem } from '../types';
import { useHistory } from '../contexts/HistoryContext';
import { usePrompt } from '../contexts/PromptContext';
import { sanitize } from '../utils/security';

type Filter = 'all' | 'images' | 'videos' | 'prompts';
type Tab = 'prompt' | 'image' | 'image-templates' | 'video' | 'video-gen' | 'optimizer' | 'history' | 'custom-templates';


const HistoryPanel: React.FC<{
    setActiveTab: (tab: Tab) => void;
}> = ({ setActiveTab }) => {
    const [filter, setFilter] = useState<Filter>('all');
    const { history, deleteHistoryItem } = useHistory();
    const { reusePrompt } = usePrompt();

    const handleReuse = (promptSubject: string) => {
        reusePrompt(promptSubject);
        setActiveTab('prompt');
    };

    const filteredHistory = useMemo(() => {
        if (filter === 'images') {
            return history.filter(item => item.type === 'image');
        }
        if (filter === 'videos') {
            return history.filter(item => item.type === 'video');
        }
        if (filter === 'prompts') {
            return history.filter(item => item.type === 'prompt');
        }
        return history;
    }, [history, filter]);

    return (
        <div className="bg-gray-800/50 p-6 rounded-b-2xl border border-t-0 border-gray-700 flex flex-col gap-6 h-full">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                 <h2 className="text-xl font-bold text-cyan-400">History & Gallery</h2>
                 <div className="flex items-center space-x-2 bg-gray-900/70 p-1 rounded-lg border border-gray-600 mt-2 sm:mt-0">
                    {(['all', 'images', 'videos', 'prompts'] as Filter[]).map(f => (
                        <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 capitalize ${
                            filter === f ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                        }`}
                        >
                        {f}
                        </button>
                    ))}
                </div>
            </div>

            {filteredHistory.length === 0 ? (
                 <div className="flex-grow flex items-center justify-center text-center text-gray-500">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <p className="mt-2 font-semibold">Your history is empty.</p>
                        <p className="text-sm">Generated content will appear here automatically.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pr-2 -mr-2">
                    {filteredHistory.map(item => {
                        if (item.type === 'image') {
                            return <ImageCard key={item.id} item={item as ImageHistoryItem} onReuse={handleReuse} onDelete={deleteHistoryItem} />;
                        }
                        if (item.type === 'video') {
                            return <VideoCard key={item.id} item={item as VideoHistoryItem} onReuse={handleReuse} onDelete={deleteHistoryItem} />;
                        }
                        return <PromptCard key={item.id} item={item as PromptHistoryItem} onReuse={handleReuse} onDelete={deleteHistoryItem} />;
                    })}
                </div>
            )}
        </div>
    );
};

const ImageCard: React.FC<{item: ImageHistoryItem, onReuse: (prompt: string) => void, onDelete: (id: string) => void}> = ({ item, onReuse, onDelete }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = item.imageDataUrl;
        link.download = `ai-architect-image-${item.id.substring(0,8)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <div className="bg-gray-900/50 rounded-lg border border-gray-700 flex flex-col overflow-hidden">
            <img src={item.imageDataUrl} alt="Generated art" className="w-full h-auto object-cover aspect-square"/>
            <div className="p-3 text-xs text-gray-400 flex-grow flex flex-col">
                <p className="font-semibold text-gray-300">Prompt:</p>
                <p className="italic line-clamp-3 flex-grow">"{item.prompt}"</p>
                <div className="text-gray-500 mt-2">
                    <span>{item.settings.model.split('/')[0]}</span> | <span>{item.settings.aspectRatio}</span> | <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
            </div>
             <div className="grid grid-cols-3 gap-px bg-gray-700">
                <button onClick={handleDownload} className="py-2 px-3 text-xs font-bold text-cyan-300 bg-gray-800 hover:bg-gray-700 transition-colors">Download</button>
                <button onClick={() => onReuse(item.prompt)} className="py-2 px-3 text-xs font-bold text-cyan-300 bg-gray-800 hover:bg-gray-700 transition-colors">Reuse</button>
                <button onClick={() => onDelete(item.id)} className="py-2 px-3 text-xs font-bold text-red-400 bg-gray-800 hover:bg-gray-700 transition-colors">Delete</button>
            </div>
        </div>
    );
};

const VideoCard: React.FC<{item: VideoHistoryItem, onReuse: (prompt: string) => void, onDelete: (id: string) => void}> = ({ item, onReuse, onDelete }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = item.videoDataUrl;
        link.download = `ai-architect-video-${item.id.substring(0,8)}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <div className="bg-gray-900/50 rounded-lg border border-gray-700 flex flex-col overflow-hidden">
            <video src={item.videoDataUrl} controls loop className="w-full h-auto object-cover aspect-square bg-black"/>
            <div className="p-3 text-xs text-gray-400 flex-grow flex flex-col">
                <p className="font-semibold text-gray-300">Prompt:</p>
                <p className="italic line-clamp-3 flex-grow">"{item.prompt}"</p>
                <div className="text-gray-500 mt-2">
                    <span>{item.source}</span> | <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
            </div>
             <div className="grid grid-cols-3 gap-px bg-gray-700">
                <button onClick={handleDownload} className="py-2 px-3 text-xs font-bold text-cyan-300 bg-gray-800 hover:bg-gray-700 transition-colors">Download</button>
                <button onClick={() => onReuse(item.prompt)} className="py-2 px-3 text-xs font-bold text-cyan-300 bg-gray-800 hover:bg-gray-700 transition-colors">Reuse</button>
                <button onClick={() => onDelete(item.id)} className="py-2 px-3 text-xs font-bold text-red-400 bg-gray-800 hover:bg-gray-700 transition-colors">Delete</button>
            </div>
        </div>
    );
};

const PromptCard: React.FC<{item: PromptHistoryItem, onReuse: (prompt: string) => void, onDelete: (id: string) => void}> = ({ item, onReuse, onDelete }) => {
    const [copyStatus, setCopyStatus] = useState('Copy');
    
    const handleCopy = () => {
        navigator.clipboard.writeText(item.prompt).then(() => {
          setCopyStatus('Copied!');
          setTimeout(() => setCopyStatus('Copy'), 2000);
        });
    };

    return (
         <div className="bg-gray-900/50 rounded-lg border border-gray-700 flex flex-col justify-between overflow-hidden aspect-square p-4">
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-start">
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full font-bold">{item.source}</span>
                    <span className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 flex-grow overflow-hidden">
                     <pre className="whitespace-pre-wrap text-sm text-gray-200 h-full overflow-y-auto">
                        <code>{item.prompt}</code>
                     </pre>
                </div>
            </div>
             <div className="grid grid-cols-3 gap-px bg-gray-700 -m-4 mt-4">
                <button onClick={handleCopy} className="py-2 px-3 text-xs font-bold text-cyan-300 bg-gray-800 hover:bg-gray-700 transition-colors">{copyStatus}</button>
                <button onClick={() => onReuse(item.subject)} className="py-2 px-3 text-xs font-bold text-cyan-300 bg-gray-800 hover:bg-gray-700 transition-colors">Reuse</button>
                <button onClick={() => onDelete(item.id)} className="py-2 px-3 text-xs font-bold text-red-400 bg-gray-800 hover:bg-gray-700 transition-colors">Delete</button>
            </div>
        </div>
    );
};


export default HistoryPanel;