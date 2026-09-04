import React, { useState, useMemo } from 'react';
import { Bot, Home, Search, ArrowRightLeft, Newspaper, Cpu, ChevronRight, ArrowUpRight, Zap, Battery, Map, Server, Eye, Rocket, Info } from 'lucide-react';

const mockMowers = [
  { 
    id: 'm1', category: 'Mower', name: 'Automower 430X', brand: 'Husqvarna', price: 2500, 
    cuttingWidth: '9.4 in', maxIncline: '45%', boundaryWire: true, acreage: '0.8 acres', 
    navigation: 'GPS-Assisted Random', bladeType: 'Pivoting Razor', removableBattery: false, 
    image: 'https://images.unsplash.com/photo-1592424001807-6c2e30851ec6?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 'm2', category: 'Mower', name: 'Landroid L', brand: 'Worx', price: 1199, 
    cuttingWidth: '8.0 in', maxIncline: '35%', boundaryWire: true, acreage: '0.5 acres', 
    navigation: 'Random', bladeType: 'Pivoting Razor', removableBattery: true, 
    image: 'https://m.media-amazon.com/images/I/71Y-T2aE7wL._AC_SX679_.jpg' 
  },
  { 
    id: 'm3', category: 'Mower', name: 'Navimow H1500E', brand: 'Segway', price: 1999, 
    cuttingWidth: '8.3 in', maxIncline: '45%', boundaryWire: false, acreage: '0.37 acres', 
    navigation: 'EFLS (RTK GPS)', bladeType: 'Pivoting Razor', removableBattery: false, 
    image: 'https://cdn.carrs-billington.com/web/products/600/77549.jpg' 
  },
  { 
    id: 'm4', category: 'Mower', name: 'Navimow X430', brand: 'Segway', price: 2499, 
    cuttingWidth: '17.0 in', maxIncline: '84% (40°)', boundaryWire: false, acreage: '1.0 acres', 
    navigation: 'EFLS NRTK + Vision', bladeType: 'Dual-Disc (12 Blades)', removableBattery: false, 
    image: 'https://image.navimow.com/navimow_web_assets/x4/sec2/sec2_img1.jpg?x-oss-process=image/format,webp' 
  },
  { 
    id: 'm5', category: 'Mower', name: 'Navimow X450', brand: 'Segway', price: 2999, 
    cuttingWidth: '17.0 in', maxIncline: '84% (40°)', boundaryWire: false, acreage: '1.5 acres', 
    navigation: 'EFLS NRTK + Vision', bladeType: 'Dual-Disc (12 Blades)', removableBattery: false, 
    image: 'https://image.navimow.com/navimow_web_assets/x4/sec2/sec2_img1.jpg?x-oss-process=image/format,webp' // Using similar X series image as placeholder
  },
  { 
    id: 'm6', category: 'Mower', name: 'Luba 3 AWD 3000', brand: 'Mammotion', price: 2399, 
    cuttingWidth: '15.7 in', maxIncline: '80% (38.6°)', boundaryWire: false, acreage: '0.75 acres', 
    navigation: 'Tri-Fusion (LiDAR+RTK+Vision)', bladeType: 'Dual-Disc (12 Blades)', removableBattery: false, 
    image: 'https://lawnmowerhosp.com/uploads/product/product_1977_41.webp' 
  },
  { 
    id: 'm7', category: 'Mower', name: 'Luba 4 3000F', brand: 'Mammotion', price: 2599, // Specs assumed based on typical iteration
    cuttingWidth: '16.0 in', maxIncline: '82%', boundaryWire: false, acreage: '0.8 acres', 
    navigation: 'Next-Gen Tri-Fusion AI', bladeType: 'Dual-Disc Heavy Duty', removableBattery: true, 
    image: 'https://lawnmowerhosp.com/uploads/product/product_1977_41.webp' // Using Luba 3 image as placeholder for Luba 4
  },
];

const mockVacuums = [
  { id: 'v1', category: 'Vacuum', name: 'S8 Pro Ultra', brand: 'Roborock', price: 1599, suctionPower: '6000 Pa', obstacleAvoidance: true, selfEmptyingBase: true, image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6539/6539158_sd.jpg' },
  { id: 'v2', category: 'Vacuum', name: 'Roomba j7+', brand: 'iRobot', price: 799, suctionPower: '2500 Pa', obstacleAvoidance: true, selfEmptyingBase: true, image: 'https://i5.walmartimages.com/seo/iRobot-Roomba-j7-7550-Self-Emptying-Robot-Vacuum-Cleaner-Smart-Mapping_7d425b0f-8c38-4e89-98af-455b4fb3e334.8db2899dc6310243e827a419eb34a9b8.jpeg' },
  { id: 'v3', category: 'Vacuum', name: 'Shark IQ', brand: 'Shark', price: 399, suctionPower: '1500 Pa', obstacleAvoidance: false, selfEmptyingBase: true, image: 'https://i5.walmartimages.com/seo/Shark-IQ-Robot-Vacuum-with-XL-Self-Empty-Base-Home-Mapping-Self-Cleaning-Brushroll-Wi-Fi-RV1000AE_3e00db74-320d-400b-bd99-7ab0eef2a912.dd5f0fc882db8191cfcd9b3b0bf881eb.jpeg' },
];

const mockNews = [
  { id: 1, title: 'Segway Launches X4 Series with 84% Incline Mastery', date: 'Sept 2, 2026', excerpt: 'The new X430 and X450 models bring true AWD and EFLS Vision to large, complex residential lawns.' },
  { id: 2, title: 'Mammotion Unveils Luba 4 3000F', date: 'Aug 28, 2026', excerpt: 'Building on the success of the Luba 3, the new 4 series promises enhanced AI obstacle avoidance and removable batteries.' },
  { id: 3, title: 'Is Tri-Fusion Navigation the New Standard?', date: 'Aug 20, 2026', excerpt: 'How the combination of LiDAR, RTK, and AI Vision is making boundary wires entirely obsolete.' },
];

const allProducts = [...mockMowers, ...mockVacuums];

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView setView={setCurrentView} />;
      case 'directory': return <DirectoryView />;
      case 'compare': return <CompareView />;
      case 'deploy': return <DeployView />;
      default: return <HomeView setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <nav className="bg-[#050505]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setCurrentView('home')}>
            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              BigTopBot
            </span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-4 overflow-x-auto no-scrollbar">
            <NavButton active={currentView === 'home'} onClick={() => setCurrentView('home')} icon={<Home size={16}/>} label="Home" />
            <NavButton active={currentView === 'directory'} onClick={() => setCurrentView('directory')} icon={<Search size={16}/>} label="Directory" />
            <NavButton active={currentView === 'compare'} onClick={() => setCurrentView('compare')} icon={<ArrowRightLeft size={16}/>} label="Compare" />
            <NavButton active={currentView === 'deploy'} onClick={() => setCurrentView('deploy')} icon={<Server size={16}/>} label="Deploy" />
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {renderView()}
      </main>
      
      <footer className="border-t border-white/5 bg-[#050505] text-slate-500 text-center py-12 mt-20">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Bot className="w-5 h-5 text-cyan-800" />
          <span className="font-bold text-slate-400 tracking-tight">BigTopBot</span>
        </div>
        <p className="text-sm">© 2026 BigTopBot.com. All rights reserved.</p>
        <p className="text-xs mt-2 text-slate-600">Premium Consumer Robotics Comparisons & Analytics</p>
      </footer>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
        active 
          ? 'bg-white/10 text-cyan-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function HomeView({ setView }) {
  const trending = [
    allProducts.find(p => p.id === 'm7'), // Luba 4
    allProducts.find(p => p.id === 'm4'), // X430
    allProducts.find(p => p.id === 'v1')  // S8 Pro
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-4">
      {/* Reduced Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0A0A0A] to-slate-900 border border-white/10 p-1">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
        
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-3 text-xs font-medium text-cyan-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Updated for 2026 Models</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-[1.1] mb-3 tracking-tight">
              The Future of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Automation.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 mb-6 leading-relaxed font-light">
              Deep-dive specs, unbiased comparisons, and the latest news on premium consumer robotics.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setView('directory')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center group shadow-[0_0_30px_rgba(34,211,238,0.3)] text-sm">
                Browse Directory 
                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button onClick={() => setView('compare')} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center backdrop-blur-sm text-sm">
                Compare Models
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block relative w-32 h-32">
             <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"></div>
             <Bot className="w-full h-full text-white/10 relative z-10 animate-pulse duration-[3000ms]" />
          </div>
        </div>
      </section>

      {/* Grid Layout for Trending & News */}
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="bg-white/10 p-2 rounded-lg"><Zap className="w-5 h-5 text-yellow-400" /></div>
            <h2 className="text-2xl font-black tracking-tight text-white">Trending Hardware</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {trending.map(product => (
              product && <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="bg-white/10 p-2 rounded-lg"><Newspaper className="w-5 h-5 text-blue-400" /></div>
            <h2 className="text-2xl font-black tracking-tight text-white">Industry Intel</h2>
          </div>
          <div className="space-y-4">
            {mockNews.map(news => (
              <div key={news.id} className="group bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-cyan-500/30 hover:bg-[#151515] transition-all cursor-pointer">
                <span className="text-xs font-bold text-cyan-500 tracking-wider uppercase mb-2 block">{news.date}</span>
                <h3 className="font-bold text-lg leading-tight mb-2 text-white group-hover:text-cyan-100 transition-colors">{news.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{news.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectoryView() {
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(3500);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchCategory = category === 'All' || p.category === category;
      const matchPrice = p.price <= maxPrice;
      return matchCategory && matchPrice;
    });
  }, [category, maxPrice]);

  return (
    <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in duration-500">
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-[#111] p-6 rounded-3xl border border-white/10 sticky top-24">
          <h3 className="font-black text-xl mb-6 flex items-center text-white"><Search className="w-5 h-5 mr-3 text-cyan-400" /> Database Filters</h3>
          <div className="space-y-8">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Category</label>
              <div className="grid grid-cols-1 gap-2">
                {['All', 'Mower', 'Vacuum'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all ${
                      category === cat 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                        : 'bg-white/5 text-slate-300 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    {cat === 'All' ? 'All Models' : `Robot ${cat}s`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Max Price</label>
                <span className="text-sm font-mono text-cyan-400">${maxPrice}</span>
              </div>
              <input 
                type="range" min="200" max="3500" step="100" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))} 
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
              />
            </div>
          </div>
        </div>
      </aside>
      
      <div className="flex-1">
        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-black text-white tracking-tight">Product Database</h2>
          <span className="text-sm text-slate-400 font-mono">{filteredProducts.length} Results</span>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <Bot className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No models found matching current parameters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompareView() {
  const [item1Id, setItem1Id] = useState(allProducts.find(p => p.id === 'm7')?.id || allProducts[0].id);
  const [item2Id, setItem2Id] = useState(allProducts.find(p => p.id === 'm4')?.id || allProducts[1].id);

  const item1 = allProducts.find(p => p.id === item1Id);
  const item2 = allProducts.find(p => p.id === item2Id);

  const renderSpecs = (item) => {
    if (!item) return null;
    return (
      <div className="space-y-0 text-sm font-mono">
        <SpecRow label="Brand" value={item.brand} />
        <SpecRow label="Price" value={`$${item.price}`} highlight />
        
        {item.category === 'Mower' && (
          <>
            <SpecRow label="Acreage Rating" value={item.acreage} icon={<Map className="w-3 h-3"/>} />
            <SpecRow label="Max Incline" value={item.maxIncline} />
            <SpecRow label="Cutting Width" value={item.cuttingWidth} />
            <SpecRow label="Navigation" value={item.navigation} icon={<Eye className="w-3 h-3"/>} />
            <SpecRow label="Boundary Wire" value={item.boundaryWire ? 'Required' : 'Wire-free'} />
            <SpecRow label="Blade Type" value={item.bladeType} />
            <SpecRow label="Removable Battery" value={item.removableBattery ? 'Yes' : 'No'} icon={<Battery className="w-3 h-3"/>} />
          </>
        )}
        
        {item.category === 'Vacuum' && (
          <>
            <SpecRow label="Suction Power" value={item.suctionPower} />
            <SpecRow label="Obstacle Avoidance" value={item.obstacleAvoidance ? 'Yes' : 'No'} />
            <SpecRow label="Self-Empty Base" value={item.selfEmptyingBase ? 'Included' : 'No'} />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Telemetry Comparison</h2>
        <p className="text-slate-400 text-lg">Select models to cross-reference specifications.</p>
      </div>

      <div className="bg-[#0A0A0A] rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block z-0"></div>
        
        <div className="grid md:grid-cols-2 relative z-10">
          <div className="p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/10 bg-[#111]/50 backdrop-blur">
            <select 
              className="w-full bg-[#1A1A1A] text-white border border-white/20 rounded-xl p-4 font-bold focus:ring-2 focus:ring-cyan-500 outline-none mb-6 appearance-none cursor-pointer" 
              value={item1Id} 
              onChange={(e) => setItem1Id(e.target.value)}
            >
              {allProducts.map(p => <option key={p.id} value={p.id}>{p.brand} {p.name}</option>)}
            </select>
            {item1 && (
              <div className="relative group rounded-2xl overflow-hidden border border-white/5 mb-8">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10"></div>
                 <img src={item1.image} alt={item1.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-2 py-1 bg-white/10 backdrop-blur rounded text-[10px] font-bold text-white uppercase tracking-widest">{item1.category}</span>
                 </div>
              </div>
            )}
            {renderSpecs(item1)}
          </div>
          
          <div className="p-6 md:p-10 bg-[#111]/50 backdrop-blur">
            <select 
              className="w-full bg-[#1A1A1A] text-white border border-white/20 rounded-xl p-4 font-bold focus:ring-2 focus:ring-cyan-500 outline-none mb-6 appearance-none cursor-pointer" 
              value={item2Id} 
              onChange={(e) => setItem2Id(e.target.value)}
            >
              {allProducts.map(p => <option key={p.id} value={p.id}>{p.brand} {p.name}</option>)}
            </select>
            {item2 && (
              <div className="relative group rounded-2xl overflow-hidden border border-white/5 mb-8">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10"></div>
                 <img src={item2.image} alt={item2.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-2 py-1 bg-white/10 backdrop-blur rounded text-[10px] font-bold text-white uppercase tracking-widest">{item2.category}</span>
                 </div>
              </div>
            )}
            {renderSpecs(item2)}
          </div>
        </div>
      </div>
    </div>
  );
}

function DeployView() {
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-slate-900 to-[#111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-white/10 p-3 rounded-xl"><Rocket className="w-8 h-8 text-cyan-400" /></div>
          <div>
            <h2 className="text-3xl font-black text-white">Deployment Guide</h2>
            <p className="text-slate-400">Publish BigTopBot.com via Vercel</p>
          </div>
        </div>

        <div className="space-y-6">
          <DeployStep number="1" title="Version Control">
            Push your Next.js project code to a <strong>GitHub, GitLab, or Bitbucket</strong> repository.
          </DeployStep>
          
          <DeployStep number="2" title="Vercel Setup">
            Create a free account on <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Vercel.com</a>. Click <strong>Add New Project</strong> and import your repository.
          </DeployStep>

          <DeployStep number="3" title="Build & Deploy">
            Vercel will automatically detect the Next.js framework. Leave build settings as default and click <strong>Deploy</strong>.
          </DeployStep>

          <DeployStep number="4" title="Domain Configuration">
            Once deployed, go to your project's <strong>Settings {'>'} Domains</strong>. Enter your purchased domain: <code className="bg-white/10 px-2 py-1 rounded text-cyan-300 font-mono text-sm">bigtopbot.com</code>
          </DeployStep>

          <DeployStep number="5" title="DNS Records">
            Vercel will provide DNS records (usually an A record or CNAME). Log into your domain registrar (where you bought the domain) and update the DNS settings to match these values.
          </DeployStep>
          
          <div className="mt-8 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-xl flex items-start space-x-3">
             <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
             <p className="text-sm text-cyan-100/80 leading-relaxed">
               Vercel will automatically provision a free SSL certificate and map the domain once DNS propagation is complete (usually 15 mins to a few hours).
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeployStep({ number, title, children }) {
  return (
    <div className="flex space-x-4 group">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/20 flex items-center justify-center font-bold text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
          {number}
        </div>
        <div className="w-px h-full bg-white/10 my-2 group-last:hidden"></div>
      </div>
      <div className="pb-6">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all flex flex-col group cursor-pointer">
      <div className="h-48 overflow-hidden relative bg-[#1A1A1A]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10"></div>
        <span className="absolute top-4 left-4 bg-[#050505]/80 border border-white/10 backdrop-blur text-white text-[10px] font-black px-2.5 py-1 rounded-full z-20 uppercase tracking-widest">
          {product.category}
        </span>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 mix-blend-screen" />
      </div>
      <div className="p-6 flex-1 flex flex-col relative z-20 bg-[#111]">
        <span className="text-xs font-bold text-cyan-500 tracking-widest uppercase mb-1">{product.brand}</span>
        <h3 className="font-black text-xl mb-4 text-white tracking-tight">{product.name}</h3>
        
        {/* Quick Spec Preview */}
        <div className="space-y-2 mb-6 text-xs text-slate-400 font-mono">
          {product.category === 'Mower' ? (
             <>
               <div className="flex justify-between border-b border-white/5 pb-1"><span>Acreage:</span> <span className="text-slate-200">{product.acreage}</span></div>
               <div className="flex justify-between border-b border-white/5 pb-1"><span>Incline:</span> <span className="text-slate-200">{product.maxIncline}</span></div>
             </>
          ) : (
             <>
               <div className="flex justify-between border-b border-white/5 pb-1"><span>Suction:</span> <span className="text-slate-200">{product.suctionPower}</span></div>
               <div className="flex justify-between border-b border-white/5 pb-1"><span>Base:</span> <span className="text-slate-200">{product.selfEmptyingBase ? 'Self-Empty' : 'Standard'}</span></div>
             </>
          )}
        </div>

        <div className="mt-auto flex justify-between items-end">
          <p className="text-2xl font-black text-white font-mono">${product.price}</p>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value, highlight, icon }) {
  return (
    <div className={`flex justify-between items-center py-3 border-b border-white/5 last:border-0 ${highlight ? 'text-cyan-400' : 'text-slate-300'}`}>
      <span className="text-slate-500 font-medium uppercase tracking-wider text-xs flex items-center">
        {icon && <span className="mr-2 opacity-70">{icon}</span>}
        {label}
      </span>
      <span className={`font-bold text-right ${highlight ? 'text-lg' : ''}`}>{value}</span>
    </div>
  );
}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0A0A0A] to-slate-900 border border-white/10 p-1 lg:p-1">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4 text-xs font-medium text-cyan-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Updated for 2026 Models</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-4 tracking-tight">
              The Future of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Automation.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed font-light">
              Deep-dive specifications, unbiased comparisons, and the latest news on premium consumer robotics.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setView('directory')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center group shadow-[0_0_30px_rgba(34,211,238,0.3)] text-sm">
                Browse Directory 
                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button onClick={() => setView('compare')} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center backdrop-blur-sm text-sm">
                Compare Models
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block relative w-48 h-48">
             <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
             <Bot className="w-full h-full text-white/10 relative z-10 animate-pulse duration-[3000ms]" />
          </div>
        </div>
      </section>

      {/* Grid Layout for Trending & News */}
// ... existing code ...