
import React, { useState } from 'react';
import AndroidDeviceFrame from './components/AndroidDeviceFrame';
import ProductCard from './components/ProductCard';
import { MOCK_PRODUCTS } from './data/products';
import { ANDROID_SOURCE_FILES } from './data/androidSource';
import { Product, Order, OrderStatus } from './types';

type AuthState = 'LANDING' | 'LOGIN' | 'SIGNUP' | 'AUTHENTICATED';
type ViewMode = 'SIMULATOR' | 'CODE';
type AuthenticatedTab = 'SHOP' | 'CART' | 'ORDERS';

interface UserCredentials {
  email: string;
  password: string;
  name: string;
}

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('SIMULATOR');
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  
  // Emulator State
  const [emulatorAuth, setEmulatorAuth] = useState<AuthState>('LANDING');
  const [activeTab, setActiveTab] = useState<AuthenticatedTab>('SHOP');
  const [registeredUser, setRegisteredUser] = useState<UserCredentials | null>(null);
  
  // Business Logic States
  const [cart, setCart] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Form States
  const [emailField, setEmailField] = useState('');
  const [passField, setPassField] = useState('');
  const [nameField, setNameField] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const resetForms = () => {
    setEmailField('');
    setPassField('');
    setNameField('');
    setErrorMsg('');
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    showToast(`${product.name} added to cart!`);
  };

  const checkout = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cart],
      status: 'PENDING',
      timestamp: Date.now()
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setActiveTab('ORDERS');
    showToast('Order placed successfully!');
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order ${orderId}: ${newStatus}`);
  };

  const handleSignIn = () => {
    if (!emailField || !passField) {
      setErrorMsg('Please fill in all fields');
      return;
    }
    setEmulatorAuth('AUTHENTICATED');
    setErrorMsg('');
  };

  const handleSignUp = () => {
    if (!nameField || !emailField || !passField) {
      setErrorMsg('All fields are required');
      return;
    }
    setRegisteredUser({
      name: nameField,
      email: emailField,
      password: passField
    });
    setEmulatorAuth('AUTHENTICATED');
    setErrorMsg('');
  };

  const renderAuthenticatedContent = () => {
    return (
      <div className="flex flex-col h-full bg-white font-sans animate-fadeIn">
        {/* Header */}
        <div className="px-4 py-3 bg-white flex items-center justify-between border-b border-gray-100 shadow-sm z-10">
          <div>
            <h2 className="text-lg font-black text-black tracking-tighter italic leading-none">ALATON</h2>
            <p className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mt-0.5">MVVM ARCHITECTURE</p>
          </div>
          <button 
            onClick={() => { setEmulatorAuth('LANDING'); setActiveTab('SHOP'); }}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase border border-red-100"
          >
            Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-50 border-b border-gray-100 p-1">
          {(['SHOP', 'CART', 'ORDERS'] as AuthenticatedTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${
                activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'
              }`}
            >
              {tab} {tab === 'CART' && cart.length > 0 && `(${cart.length})`}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-[#fafafa] relative">
          {activeTab === 'SHOP' && (
            <div className="py-4 animate-fadeIn">
              <div className="px-4 mb-4">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">New Collection</h3>
              </div>
              {MOCK_PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          )}

          {activeTab === 'CART' && (
            <div className="p-4 animate-fadeIn">
              <h3 className="text-xl font-black text-gray-900 uppercase mb-4">Your Cart</h3>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </div>
                  <p className="text-gray-400 font-bold text-sm">Cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-24">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <img src={item.imageUrl} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="font-black text-xs text-black">{item.name}</p>
                          <p className="font-bold text-[10px] text-blue-500">₱{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-20">
                    <div className="flex justify-between items-center mb-4 px-2">
                      <span className="text-sm font-bold text-gray-400 uppercase">Total</span>
                      <span className="text-lg font-black text-black">₱{cart.reduce((acc, i) => acc + i.price, 0).toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={checkout}
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all uppercase tracking-widest"
                    >
                      Checkout Now
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'ORDERS' && (
            <div className="p-4 animate-fadeIn space-y-4">
              <h3 className="text-xl font-black text-gray-900 uppercase mb-2">Order Management</h3>
              {orders.length === 0 ? (
                <p className="text-center text-gray-400 font-bold py-12">No orders found</p>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="bg-white border-2 border-gray-100 rounded-3xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] font-black text-gray-400">ORDER ID</p>
                        <p className="font-black text-black text-sm">#{order.id}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                        order.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 
                        order.status === 'RECEIVED' ? 'bg-blue-100 text-blue-600' : 
                        'bg-green-100 text-green-600'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-6">
                      {order.items.slice(0, 2).map((item, i) => (
                        <p key={i} className="text-xs text-gray-500 font-medium">• {item.name}</p>
                      ))}
                      {order.items.length > 2 && <p className="text-[10px] text-gray-400 font-bold">+ {order.items.length - 2} more items</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {order.status === 'PENDING' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'RECEIVED')}
                          className="col-span-2 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md active:scale-95 transition-all"
                        >
                          Receive Complete
                        </button>
                      )}
                      {order.status === 'RECEIVED' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'SHIPPED')}
                          className="col-span-2 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md active:scale-95 transition-all"
                        >
                          Ship Order
                        </button>
                      )}
                      {order.status === 'SHIPPED' && (
                        <div className="col-span-2 py-3 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase text-center border border-green-100">
                          Order Completed
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Toast Notification */}
          {toast && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] bg-gray-900 text-white px-4 py-3 rounded-2xl text-[10px] font-black text-center shadow-2xl animate-slideUp z-50 uppercase tracking-widest">
              {toast}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSimulatorContent = () => {
    switch (emulatorAuth) {
      case 'LANDING':
        return (
          <div className="flex flex-col h-full bg-white p-8 justify-center items-center text-center animate-fadeIn">
            <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mb-6 shadow-xl border-4 border-gray-50">
              <span className="text-white font-black italic text-3xl tracking-tighter">A</span>
            </div>
            <h1 className="text-3xl font-black text-black tracking-tighter mb-2 italic">ALATON</h1>
            <p className="text-sm text-gray-400 mb-16 max-w-[200px] font-medium uppercase tracking-widest text-[9px]">The New Standard of Urban Wear</p>
            
            <div className="w-full space-y-3">
              <button 
                onClick={() => { resetForms(); setEmulatorAuth('LOGIN'); }}
                className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm shadow-xl active:scale-95 transition-all hover:bg-gray-900"
              >
                Sign In
              </button>
              <button 
                onClick={() => { resetForms(); setEmulatorAuth('SIGNUP'); }}
                className="w-full py-4 bg-white text-black border-2 border-black rounded-2xl font-bold text-sm active:scale-95 transition-all hover:bg-gray-50"
              >
                Create Account
              </button>
            </div>
          </div>
        );

      case 'LOGIN':
        return (
          <div className="flex flex-col h-full bg-white p-8 animate-slideUp">
            <button onClick={() => setEmulatorAuth('LANDING')} className="mb-8 text-gray-900 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h2 className="text-3xl font-black text-black mb-1">Welcome</h2>
            <div className="space-y-6 mt-8">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                <input 
                  type="text" 
                  value={emailField}
                  onChange={(e) => setEmailField(e.target.value)}
                  placeholder="Email" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-black text-black placeholder:font-medium placeholder:text-gray-300" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <input 
                  type="password" 
                  value={passField}
                  onChange={(e) => setPassField(e.target.value)}
                  placeholder="Password" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-black text-black placeholder:font-medium placeholder:text-gray-300" 
                />
              </div>
              {errorMsg && <p className="text-red-500 text-[10px] font-bold text-center">{errorMsg}</p>}
            </div>
            <button 
              onClick={handleSignIn}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm mt-12 shadow-xl active:scale-95 transition-all"
            >
              Sign In
            </button>
          </div>
        );

      case 'SIGNUP':
        return (
          <div className="flex flex-col h-full bg-white p-8 animate-slideUp">
            <button onClick={() => setEmulatorAuth('LANDING')} className="mb-8 text-gray-900 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h2 className="text-3xl font-black text-black mb-1">Create Account</h2>
            <div className="space-y-5 mt-6">
               <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={nameField}
                  onChange={(e) => setNameField(e.target.value)}
                  placeholder="John Doe" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-black text-black placeholder:font-medium placeholder:text-gray-300" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="text" 
                  value={emailField}
                  onChange={(e) => setEmailField(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-black text-black placeholder:font-medium placeholder:text-gray-300" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <input 
                  type="password" 
                  value={passField}
                  onChange={(e) => setPassField(e.target.value)}
                  placeholder="Min. 8 characters" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-black text-black placeholder:font-medium placeholder:text-gray-300" 
                />
              </div>
              {errorMsg && <p className="text-red-500 text-[10px] font-bold text-center">{errorMsg}</p>}
            </div>
            <button 
              onClick={handleSignUp}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm mt-8 shadow-xl active:scale-95 transition-all"
            >
              Sign Up
            </button>
          </div>
        );

      case 'AUTHENTICATED':
        return renderAuthenticatedContent();
      default: return null;
    }
  };

  const renderCodeView = () => {
    return (
      <div className="flex flex-col lg:flex-row w-full max-w-6xl h-[720px] bg-[#1e1e1e] rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-fadeIn">
        {/* File Explorer */}
        <div className="w-full lg:w-72 bg-[#252526] border-r border-white/5 flex flex-col">
          <div className="p-4 border-b border-white/5 bg-[#1e1e1e]">
            <h3 className="text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 12H5V8h14v10z"/></svg>
              Android Project
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {ANDROID_SOURCE_FILES.map((file, idx) => (
              <button
                key={file.path}
                onClick={() => setActiveFileIndex(idx)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                  activeFileIndex === idx ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${file.language === 'kotlin' ? 'bg-orange-400' : 'bg-blue-400'}`}></div>
                <span className="truncate">{file.path.split('/').pop()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          <div className="p-4 border-b border-white/5 bg-[#1e1e1e] flex justify-between items-center">
            <span className="text-[10px] font-mono text-gray-500">{ANDROID_SOURCE_FILES[activeFileIndex].path}</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(ANDROID_SOURCE_FILES[activeFileIndex].content);
                alert('Code copied to clipboard!');
              }}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white/80 rounded-md text-[10px] font-bold border border-white/10 transition-colors uppercase tracking-widest"
            >
              Copy Code
            </button>
          </div>
          <div className="flex-1 p-6 font-mono text-sm overflow-auto selection:bg-blue-500/30">
            <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {ANDROID_SOURCE_FILES[activeFileIndex].content}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
      {/* Dynamic Header */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 shadow-lg">
          <button 
            onClick={() => setViewMode('SIMULATOR')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              viewMode === 'SIMULATOR' ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Live Simulator
          </button>
          <button 
            onClick={() => setViewMode('CODE')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              viewMode === 'CODE' ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Android Source
          </button>
        </div>
        <p className="mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
          {viewMode === 'SIMULATOR' ? 'Interaction Test Lab' : 'Production-Ready Kotlin MVVM'}
        </p>
      </div>

      {viewMode === 'SIMULATOR' ? (
        <div className="relative group transition-all duration-500 hover:scale-[1.01]">
          <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-[3.5rem] blur-2xl opacity-50 group-hover:opacity-100"></div>
          <AndroidDeviceFrame>
            {renderSimulatorContent()}
          </AndroidDeviceFrame>
        </div>
      ) : (
        renderCodeView()
      )}

      {/* Instructions footer */}
      <div className="mt-12 max-w-2xl text-center space-y-4">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-widest">How to use in Android Studio</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="block text-blue-400 text-xl font-black mb-1">01</span>
            <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Create New Project in Studio (Empty Views Activity)</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="block text-blue-400 text-xl font-black mb-1">02</span>
            <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Copy Dependencies from app/build.gradle and Sync</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="block text-blue-400 text-xl font-black mb-1">03</span>
            <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Paste Kotlin and XML files into their respective folders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
