import React, { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import InputPanel from './components/InputPanel';
import ControlsPanel from './components/ControlsPanel';
import OutputPanel from './components/OutputPanel';
import ImageGeneratorPanel from './components/ImageGeneratorPanel';
import ImageTemplatesPanel from './components/ImageTemplatesPanel';
import VideoTemplatesPanel from './components/VideoTemplatesPanel';
import VideoGeneratorPanel from './components/VideoGeneratorPanel';
import OptimizerPanel from './components/OptimizerPanel';
import HistoryPanel from './components/HistoryPanel';
import CustomTemplatesPanel from './components/CustomTemplatesPanel';
import { PromptProvider } from './contexts/PromptContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { CustomTemplatesProvider } from './contexts/CustomTemplatesContext';

type Tab = 'prompt' | 'image' | 'image-templates' | 'video' | 'video-gen' | 'optimizer' | 'history' | 'custom-templates';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('prompt');

  return (
    <HistoryProvider>
      <PromptProvider>
        <CustomTemplatesProvider>
          <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col p-4 sm:p-6 lg:p-8">
            <Header />
            <main className="flex-grow container mx-auto mt-6 flex flex-col">
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
              {activeTab === 'prompt' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 flex-grow">
                  <div className="lg:col-span-4 space-y-6">
                    <InputPanel />
                  </div>

                  <div className="lg:col-span-8 flex flex-col">
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                      <ControlsPanel />
                    </div>
                    <OutputPanel />
                  </div>
                </div>
              )}
              
              {activeTab === 'image' && (
                <div className="mt-0 flex-grow">
                  <ImageGeneratorPanel />
                </div>
              )}

              {activeTab === 'image-templates' && (
                <div className="mt-0 flex-grow">
                  <ImageTemplatesPanel />
                </div>
              )}

              {activeTab === 'video' && (
                <div className="mt-0 flex-grow">
                  <VideoTemplatesPanel />
                </div>
              )}

              {activeTab === 'video-gen' && (
                <div className="mt-0 flex-grow">
                  <VideoGeneratorPanel />
                </div>
              )}

              {activeTab === 'custom-templates' && (
                <div className="mt-0 flex-grow">
                  <CustomTemplatesPanel />
                </div>
              )}
              
              {activeTab === 'optimizer' && (
                <div className="mt-0 flex-grow">
                  <OptimizerPanel />
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="mt-0 flex-grow">
                  <HistoryPanel setActiveTab={setActiveTab} />
                </div>
              )}

            </main>
          </div>
        </CustomTemplatesProvider>
      </PromptProvider>
    </HistoryProvider>
  );
};

export default App;