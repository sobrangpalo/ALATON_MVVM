
import React, { useState } from 'react';
import { AppTab } from './types';
import AndroidDeviceFrame from './components/AndroidDeviceFrame';
import ProductCard from './components/ProductCard';
import { MOCK_PRODUCTS } from './data/products';
import { ANDROID_SOURCE_FILES, README_CONTENT } from './data/androidSource';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.SIMULATOR);
  const [selectedFile, setSelectedFile] = useState(0);

  const renderSimulatorContent = () => {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="px-6 py-4 bg-white flex items-center justify-between border-b border-gray-100 shadow-sm z-10">
          <h2 className="text-xl font-black text-black tracking-tighter">CLOUT</h2>
          <div className="flex space-x-4">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="relative">
               <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" />
               </svg>
               <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] px-1 rounded-full font-bold">5</span>
            </div>
          </div>
        </div>

        {/* Product List Content (Simulating ViewModel Observable) */}
        <div className="flex-1 overflow-y-auto pt-6 pb-6 bg-[#fafafa]">
          <div className="px-6 mb-6">
            <h3 className="text-2xl font-black text-gray-900 leading-tight">SUMMER DROPS</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">MVVM Pattern Active</p>
          </div>
          {MOCK_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Nav Placeholder */}
        <div className="h-16 bg-white border-t border-gray-100 flex items-center justify-around px-8">
          <div className="flex flex-col items-center text-black">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span className="text-[8px] font-black uppercase mt-1">Shop</span>
          </div>
          <div className="flex flex-col items-center text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[8px] font-black uppercase mt-1">Profile</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row p-4 md:p-8 gap-8 overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-72 flex flex-col shrink-0 gap-3">
        <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-gray-100 mb-2">
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">CLOUT MVVM</h1>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Clean Architecture</p>
        </div>
        
        <button 
          onClick={() => setActiveTab(AppTab.SIMULATOR)}
          className={`flex items-center space-x-3 p-4 rounded-2xl transition-all ${activeTab === AppTab.SIMULATOR ? 'bg-black text-white shadow-xl' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          <span className="font-bold">App Demo</span>
        </button>

        <button 
          onClick={() => setActiveTab(AppTab.SOURCE_CODE)}
          className={`flex items-center space-x-3 p-4 rounded-2xl transition-all ${activeTab === AppTab.SOURCE_CODE ? 'bg-black text-white shadow-xl' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          <span className="font-bold">Kotlin Source</span>
        </button>

        <button 
          onClick={() => setActiveTab(AppTab.README)}
          className={`flex items-center space-x-3 p-4 rounded-2xl transition-all ${activeTab === AppTab.README ? 'bg-black text-white shadow-xl' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span className="font-bold">Documentation</span>
        </button>
      </div>

      {/* Main Display Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === AppTab.SIMULATOR && (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <AndroidDeviceFrame>
              {renderSimulatorContent()}
            </AndroidDeviceFrame>
          </div>
        )}

        {activeTab === AppTab.SOURCE_CODE && (
          <div className="flex-1 flex flex-col bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100 overflow-x-auto bg-gray-50/50">
              {ANDROID_SOURCE_FILES.map((file, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFile(index)}
                  className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${selectedFile === index ? 'border-black text-black bg-white' : 'border-transparent text-gray-400'}`}
                >
                  {file.path.split('/').pop()}
                </button>
              ))}
            </div>
            <div className="flex-1 bg-[#121212] p-6 font-mono text-sm overflow-auto">
              <pre className="text-blue-300">
                <code className="block leading-relaxed">{ANDROID_SOURCE_FILES[selectedFile].content}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === AppTab.README && (
          <div className="flex-1 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                {README_CONTENT}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
