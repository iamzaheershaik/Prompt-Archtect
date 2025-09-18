import React, { useState, useMemo } from 'react';
import { OutputFormat } from '../types';
import { usePrompt } from '../contexts/PromptContext';
import { sanitize } from '../utils/security';

const formatOptions: { value: OutputFormat; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'design-driven', label: 'Design-Driven' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'xml', label: 'XML' },
  { value: 'json-ld', label: 'JSON-LD' },
];

const OutputPanel: React.FC = () => {
  const { generatedPrompt, outputFormat, setOutputFormat } = usePrompt();
  const [copyStatus, setCopyStatus] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    }, () => {
      setCopyStatus('Failed!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    });
  };

  const sanitizedOutput = useMemo(() => sanitize(generatedPrompt), [generatedPrompt]);

  return (
    <div className="mt-6 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <h2 className="text-xl font-bold text-cyan-400 mb-2 sm:mb-0">3. Generated Prompt</h2>
        <div className="flex items-center space-x-2 bg-gray-900/70 p-1 rounded-lg border border-gray-600">
          {formatOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setOutputFormat(option.value)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                outputFormat === option.value
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative flex-grow min-h-[200px] bg-gray-900/70 p-4 rounded-lg border border-gray-600">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-3 py-1 bg-gray-700 text-gray-200 text-xs font-semibold rounded hover:bg-gray-600 transition-colors"
        >
          {copyStatus}
        </button>
        <pre className="h-full w-full overflow-auto whitespace-pre-wrap text-sm text-gray-200">
          <code dangerouslySetInnerHTML={{ __html: sanitizedOutput }} />
        </pre>
      </div>
    </div>
  );
};

export default OutputPanel;