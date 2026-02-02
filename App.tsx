
import React, { useState } from 'react';
import { AppTab } from './types';
import AndroidDeviceFrame from './components/AndroidDeviceFrame';
import ProductCard from './components/ProductCard';
import { MOCK_PRODUCTS } from './data/products';
import { ANDROID_SOURCE_FILES, README_CONTENT } from './data/androidSource';

enum SimulatorTab {
  SHOP = 'SHOP',
  MENU = 'MENU',
  ME = 'ME'
}

enum AuthState {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  LOGGED_IN = 'LOGGED_IN'
}

const CATEGORIES = [
  { name: 'HOODIES', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'T-SHIRTS', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'BOTTOMS', img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'OUTERWEAR', img: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'FOOTWEAR', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&h=200&auto=format&fit=crop' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.SIMULATOR);
  const [selectedFile, setSelectedFile] = useState(0);
  
  const [authState, setAuthState] = useState<AuthState>(AuthState.SIGN_IN);
  const [simTab, setSimTab] = useState<SimulatorTab>(SimulatorTab.SHOP);

  const handleLogin = () => setAuthState(AuthState.LOGGED_IN);
  const handleLogout = () => {
    setAuthState(AuthState.SIGN_IN);
    setSimTab(SimulatorTab.SHOP);
  };

  const renderSimulatorContent = () => {
    if (authState === AuthState.SIGN_IN) {
      return (
        <div className="flex flex-col h-full bg-white px-8 justify-center animate-fadeIn relative pt-8">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7" className="w-full h-full object-cover" alt="" />
          </div>
          <h2 className="text-4xl font-black text-black tracking-tighter mb-2 z-10">CLOUT</h2>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-10 z-10">Sign In to Continue</p>
          
          <div className="space-y-4 z-10">
            <input type="text" placeholder="USERNAME" className="w-full border-b-2 border-black py-3 text-sm font-bold focus:outline-none placeholder-gray-300 bg-transparent" />
            <input type="password" placeholder="PASSWORD" className="w-full border-b-2 border-black py-3 text-sm font-bold focus:outline-none placeholder-gray-300 bg-transparent" />
          </div>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-black text-white font-black py-4 rounded-2xl mt-12 shadow-xl hover:scale-[1.02] transition-transform uppercase tracking-widest z-10"
          >
            Log In
          </button>
          
          <p className="text-center mt-6 text-xs font-bold text-gray-400 z-10">
            NEW HERE? <button onClick={() => setAuthState(AuthState.SIGN_UP)} className="text-black underline">CREATE ACCOUNT</button>
          </p>
        </div>
      );
    }

    if (authState === AuthState.SIGN_UP) {
      return (
        <div className="flex flex-col h-full bg-white px-8 justify-center animate-fadeIn pt-8">
          <h2 className="text-4xl font-black text-black tracking-tighter mb-2">JOIN</h2>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-10">The Clout Community</p>
          
          <div className="space-y-4">
            <input type="text" placeholder="FULL NAME" className="w-full border-b-2 border-black py-3 text-sm font-bold focus:outline-none placeholder-gray-300" />
            <input type="email" placeholder="EMAIL ADDRESS" className="w-full border-b-2 border-black py-3 text-sm font-bold focus:outline-none placeholder-gray-300" />
            <input type="password" placeholder="PASSWORD" className="w-full border-b-2 border-black py-3 text-sm font-bold focus:outline-none placeholder-gray-300" />
          </div>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-black text-white font-black py-4 rounded-2xl mt-12 shadow-xl hover:scale-[1.02] transition-transform uppercase tracking-widest"
          >
            Sign Up
          </button>
          
          <p className="text-center mt-6 text-xs font-bold text-gray-400">
            ALREADY HAVE AN ACCOUNT? <button onClick={() => setAuthState(AuthState.SIGN_IN)} className="text-black underline">SIGN IN</button>
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full bg-white pt-4">
        {/* Header */}
        <div className="px-6 py-4 bg-white flex items-center justify-between border-b border-gray-50">
          <h2 className="text-xl font-black text-black tracking-tighter">CLOUT</h2>
          <div className="flex space-x-4">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <div className="relative">
               <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
               <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] px-1 rounded-full font-bold">2</span>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pt-6 pb-20 scrollbar-hide bg-[#fafafa]">
          {simTab === SimulatorTab.SHOP && (
            <div className="animate-fadeIn">
              <div className="px-6 mb-6">
                <h3 className="text-2xl font-black text-gray-900 leading-tight">NEW DROP</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Summer Series 2024</p>
              </div>
              {MOCK_PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {simTab === SimulatorTab.MENU && (
            <div className="px-6 animate-fadeIn">
              <h3 className="text-2xl font-black text-gray-900 mb-6">CATEGORIES</h3>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map(cat => (
                  <div key={cat.name} className="relative h-32 rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
                    <img src={cat.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.name} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center">
                      <span className="text-white font-black text-[10px] tracking-widest">{cat.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {simTab === SimulatorTab.ME && (
            <div className="px-6 animate-fadeIn">
              <div className="flex items-center space-x-4 mb-10 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&h=100&auto=format&fit=crop" className="w-16 h-16 rounded-full object-cover border-2 border-black" alt="Profile" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-black text-lg">CLOUT MEMBER</h4>
                  <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">ID: #CLT-9921</p>
                </div>
              </div>

              <div className="mb-8">
                <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Account Settings</h5>
                <div className="space-y-2">
                  <div className="p-4 bg-white rounded-xl flex items-center justify-between text-sm font-bold border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                      <span>My Orders</span>
                    </div>
                    <div className="flex -space-x-2">
                      <img src={MOCK_PRODUCTS[0].imageUrl} className="w-6 h-6 rounded-full border-2 border-white" alt="order" />
                      <img src={MOCK_PRODUCTS[1].imageUrl} className="w-6 h-6 rounded-full border-2 border-white" alt="order" />
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl flex items-center justify-between text-sm font-bold border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      <span>Wishlist</span>
                    </div>
                    <span className="text-blue-600 text-[10px] font-black">12 ITEMS</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full bg-red-50 text-red-600 font-black py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest text-xs border border-red-100"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

        {/* Bottom App Nav */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-t border-gray-100 flex items-center justify-around px-8">
          <button 
            onClick={() => setSimTab(SimulatorTab.SHOP)}
            className={`flex flex-col items-center transition-all ${simTab === SimulatorTab.SHOP ? 'text-black scale-105' : 'text-gray-300'}`}
          >
            <svg className="w-5 h-5" fill={simTab === SimulatorTab.SHOP ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="text-[8px] font-black uppercase mt-1">Shop</span>
          </button>
          
          <button 
            onClick={() => setSimTab(SimulatorTab.MENU)}
            className={`flex flex-col items-center transition-all ${simTab === SimulatorTab.MENU ? 'text-black scale-105' : 'text-gray-300'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            <span className="text-[8px] font-black uppercase mt-1">Menu</span>
          </button>
          
          <button 
            onClick={() => setSimTab(SimulatorTab.ME)}
            className={`flex flex-col items-center transition-all ${simTab === SimulatorTab.ME ? 'text-black scale-105' : 'text-gray-300'}`}
          >
            <svg className="w-5 h-5" fill={simTab === SimulatorTab.ME ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[8px] font-black uppercase mt-1">Me</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row p-4 md:p-8 gap-8 overflow-hidden">
      {/* Desktop Navigation Sidebar */}
      <div className="w-full md:w-72 space-y-3 flex flex-col shrink-0">
        <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-gray-100 mb-4">
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">CLOUT CLOTHING</h1>
          <p className="text-xs font-medium text-blue-600 uppercase tracking-widest mt-1">Streetwear Div.</p>
        </div>
        
        <button 
          onClick={() => setActiveTab(AppTab.SIMULATOR)}
          className={`flex items-center space-x-3 p-4 rounded-2xl transition-all ${activeTab === AppTab.SIMULATOR ? 'bg-black text-white shadow-xl scale-[1.02]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          <span className="font-bold">App Demo</span>
        </button>

        <button 
          onClick={() => setActiveTab(AppTab.SOURCE_CODE)}
          className={`flex items-center space-x-3 p-4 rounded-2xl transition-all ${activeTab === AppTab.SOURCE_CODE ? 'bg-black text-white shadow-xl scale-[1.02]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          <span className="font-bold">Kotlin Source</span>
        </button>

        <button 
          onClick={() => setActiveTab(AppTab.README)}
          className={`flex items-center space-x-3 p-4 rounded-2xl transition-all ${activeTab === AppTab.README ? 'bg-black text-white shadow-xl scale-[1.02]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span className="font-bold">Documentation</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === AppTab.SIMULATOR && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <AndroidDeviceFrame>
              {renderSimulatorContent()}
            </AndroidDeviceFrame>
            <div className="mt-6 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Running on CloutOS v2.0 (Android 14)</p>
            </div>
          </div>
        )}

        {activeTab === AppTab.SOURCE_CODE && (
          <div className="flex-1 flex flex-col bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide bg-gray-50/50">
              {ANDROID_SOURCE_FILES.map((file, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFile(index)}
                  className={`px-6 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${selectedFile === index ? 'border-black text-black bg-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                  {file.path.split('/').pop()}
                </button>
              ))}
            </div>
            <div className="flex-1 bg-[#121212] p-6 font-mono text-sm overflow-auto">
              <pre className="text-gray-400">
                <code className="block leading-relaxed">{ANDROID_SOURCE_FILES[selectedFile].content}</code>
              </pre>
            </div>
            <div className="p-4 bg-white border-t border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Project Path: {ANDROID_SOURCE_FILES[selectedFile].path}
            </div>
          </div>
        )}

        {activeTab === AppTab.README && (
          <div className="flex-1 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-10 overflow-y-auto">
            <article className="prose prose-slate max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed text-base">
                {README_CONTENT}
              </pre>
            </article>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
