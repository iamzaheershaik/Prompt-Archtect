import React from 'react';

type Tab = 'prompt' | 'image' | 'image-templates' | 'video' | 'video-gen' | 'custom-templates' | 'optimizer' | 'history';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabStyles = "px-4 xl:px-6 py-3 text-base lg:text-lg font-bold rounded-t-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400";
  const activeStyles = "bg-gray-800/50 border-b-4 border-cyan-400 text-white";
  const inactiveStyles = "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-200";

  return (
    <div className="flex border-b border-gray-700 flex-wrap">
      <button
        onClick={() => setActiveTab('prompt')}
        className={`${tabStyles} ${activeTab === 'prompt' ? activeStyles : inactiveStyles}`}
        aria-selected={activeTab === 'prompt'}
      >
        1. Architect
      </button>
      <button
        onClick={() => setActiveTab('image')}
        className={`${tabStyles} ${activeTab === 'image' ? activeStyles : inactiveStyles}`}
        aria-selected={activeTab === 'image'}
      >
        2. Image Gen
      </button>
      <button
        onClick={() => setActiveTab('image-templates')}
        className={`${tabStyles} ${activeTab === 'image-templates' ? activeStyles : inactiveStyles}`}
        aria-selected={activeTab === 'image-templates'}
      >
        3. Image Templates
      </button>
      <button
        onClick={() => setActiveTab('video')}
        className={`${tabStyles} ${activeTab === 'video' ? activeStyles : inactiveStyles}`}
        aria-selected={activeTab === 'video'}
      >
        4. Video Templates
      </button>
      <button
        onClick={() => setActiveTab('video-gen')}
        className={`${tabStyles} ${activeTab === 'video-gen' ? activeStyles : inactiveStyles}`}
        aria-selected={activeTab === 'video-gen'}
      >
        5. Video Gen
      </button>
      <button
        onClick={() => setActiveTab('custom-templates')}
        className={`${tabStyles} ${activeTab === 'custom-templates' ? activeStyles : inactiveStyles}`}
        aria-selected={activeTab === 'custom-templates'}
      >
        6. Custom Templates
      </button>
      <button
        onClick={() => setActiveTab('optimizer')}
        className={`${tabStyles} ${activeTab === 'optimizer' ? activeStyles : inactiveStyles}`}
        aria-selected={activeTab === 'optimizer'}
      >
        7. Optimizer
      </button>
      <button
        onClick={() => setActiveTab('history')}
        className={`${tabStyles} ${activeTab === 'history' ? activeStyles : inactiveStyles}`}
        aria-selected={activeTab === 'history'}
      >
        8. History
      </button>
    </div>
  );
};

export default Tabs;