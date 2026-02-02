
import React, { useState } from 'react';
import { AppTab } from './types';
import AndroidDeviceFrame from './components/AndroidDeviceFrame';
import ProductCard from './components/ProductCard';
import { MOCK_PRODUCTS } from './data/products';
import { ANDROID_SOURCE_FILES, README_CONTENT } from './data/androidSource';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.SIMULATOR);
  const [selectedFile, setSelectedFile] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSimulatorContent = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="px-6 py-4 bg-white flex items-center justify-between border-b border-gray-100 shadow-sm z-10">
        <h2 className="text-xl font-black text-black tracking-tighter italic underline decoration-blue-500">CLOUT</h2>
        <div className="flex space-x-4">
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <div className="relative">
             <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
             <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] px-1 rounded-full font-bold">3</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pt-6 pb-6 bg-[#fafafa]">
        <div className="px-6 mb-6">
          <h3 className="text-2xl font-black text-gray-900 leading-tight">LATEST DROPS</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Simulating Android View</p>
        </div>
        {MOCK_PRODUCTS.slice(0, 3).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="h-16 bg-white border-t border-gray-100 flex items-center justify-around px-8">
        <div className="flex flex-col items-center text-blue-600"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></div>
        <div className="flex flex-col items-center text-gray-300"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col font-sans">
      {/* Top GitHub Header */}
      <header className="bg-[#161b22] border-b border-[#30363d] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <svg className="w-8 h-8 fill-white" viewBox="0 0 16 16"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
          <div className="flex items-center space-x-1 text-lg font-semibold">
            <span className="text-[#58a6ff] hover:underline cursor-pointer">clout-clothing</span>
            <span className="text-[#8b949e]">/</span>
            <span className="text-white hover:underline cursor-pointer">android-mvvm-showcase</span>
          </div>
          <span className="bg-[#161b22] border border-[#30363d] px-2 py-0.5 rounded-full text-xs font-medium text-[#8b949e]">Public</span>
        </div>
        <div className="flex space-x-2">
           <button className="bg-[#21262d] border border-[#30363d] px-3 py-1 rounded-md text-sm font-medium hover:bg-[#30363d]">Fork</button>
           <button className="bg-[#21262d] border border-[#30363d] px-3 py-1 rounded-md text-sm font-medium hover:bg-[#30363d]">Star</button>
        </div>
      </header>

      {/* Repository Navigation */}
      <nav className="bg-[#161b22] border-b border-[#30363d] px-6 flex space-x-6">
        {[
          { id: AppTab.README, label: 'README', icon: <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75ZM1.5 6.5v7.75c0 .138.112.25.25.25H7V6.5H1.5Zm13 0H9v8h5.25a.25.25 0 0 0 .25-.25V6.5ZM14.5 5V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25V5h13Z" /> },
          { id: AppTab.SOURCE_CODE, label: 'Code', icon: <path d="M10.56 1.17c.46-.02.83.36.81.82L11.25 6h3.25a.75.75 0 0 1 .53 1.28l-7.5 7.5a.75.75 0 0 1-1.24-.8l.12-4H3.16a.75.75 0 0 1-.53-1.28l7.5-7.5c.12-.12.26-.23.43-.25Z" /> },
          { id: AppTab.SIMULATOR, label: 'Live Preview', icon: <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 py-3 border-b-2 transition-colors ${activeTab === tab.id ? 'border-[#f78166] text-white' : 'border-transparent text-[#8b949e] hover:text-white'}`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">{tab.icon}</svg>
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {activeTab === AppTab.README && (
            <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-8 overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-[#c9d1d9] leading-relaxed">
                  {README_CONTENT}
                </pre>
              </div>
            </div>
          )}

          {activeTab === AppTab.SOURCE_CODE && (
            <div className="flex-1 flex gap-6 overflow-hidden">
              {/* File Explorer */}
              <div className="w-72 bg-[#161b22] border border-[#30363d] rounded-md overflow-y-auto flex flex-col">
                <div className="p-3 border-b border-[#30363d] font-semibold text-sm">Files</div>
                {ANDROID_SOURCE_FILES.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFile(index)}
                    className={`text-left px-4 py-2 text-sm truncate hover:bg-[#30363d] transition-colors ${selectedFile === index ? 'bg-[#21262d] text-[#58a6ff] border-l-2 border-[#f78166]' : 'text-[#8b949e]'}`}
                  >
                    {file.path.split('/').pop()}
                  </button>
                ))}
              </div>
              {/* Code Viewer */}
              <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md flex flex-col overflow-hidden">
                <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-[#30363d]">
                  <span className="text-xs font-mono text-[#8b949e]">{ANDROID_SOURCE_FILES[selectedFile].path}</span>
                  <button 
                    onClick={() => handleCopy(ANDROID_SOURCE_FILES[selectedFile].content)}
                    className="flex items-center space-x-1 px-2 py-1 bg-[#21262d] border border-[#30363d] rounded text-xs text-[#c9d1d9] hover:bg-[#30363d]"
                  >
                    <span>{copied ? 'Copied!' : 'Copy raw content'}</span>
                  </button>
                </div>
                <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-[#010409]">
                  <pre className="text-[#d2a8ff]">
                    <code>{ANDROID_SOURCE_FILES[selectedFile].content}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === AppTab.SIMULATOR && (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="mr-12 max-w-sm hidden lg:block">
                <h2 className="text-3xl font-black mb-4">Mobile Preview</h2>
                <p className="text-[#8b949e] mb-6">
                  This simulated view shows how the Kotlin code renders on a real device. 
                  The layout matches <code className="text-white">activity_main.xml</code> precisely.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm text-blue-400 font-bold uppercase tracking-widest">MVVM Status</p>
                  <p className="text-xs text-white mt-1">Observer pattern active. UI updating from ViewModel.</p>
                </div>
              </div>
              <AndroidDeviceFrame>
                {renderSimulatorContent()}
              </AndroidDeviceFrame>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
