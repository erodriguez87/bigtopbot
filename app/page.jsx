"use client";

import React, { useState, useMemo } from "react";
import {
  Bot,
  Search,
  ArrowRightLeft,
  Newspaper,
  Cpu,
  ArrowUpRight,
  SlidersHorizontal,
  Compass,
  Battery,
  ShieldCheck,
  Wind
} from "lucide-react";

const mockMowers = [
  {
    id: "m1",
    category: "Mower",
    name: "Navimow X430",
    brand: "Segway",
    price: 2199,
    acreage: "0.75 acres",
    cuttingWidth: "9.4 in",
    maxIncline: "45%",
    boundaryWire: false,
    navigation: "EFLS 3.0 (RTK + Dual Vision)",
    bladeType: "Pivoting Razor",
    removableBattery: false,
    image: "https://images.unsplash.com/photo-1628102491629-77858ab5721d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m2",
    category: "Mower",
    name: "Navimow X450",
    brand: "Segway",
    price: 2799,
    acreage: "1.25 acres",
    cuttingWidth: "9.8 in",
    maxIncline: "45%",
    boundaryWire: false,
    navigation: "EFLS 3.0 (RTK + Dual Vision)",
    bladeType: "Pivoting Razor",
    removableBattery: false,
    image: "https://images.unsplash.com/photo-1592424001807-6c2e30851ec6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m3",
    category: "Mower",
    name: "Luba 3 AWD 3000",
    brand: "Mammotion",
    price: 2499,
    acreage: "0.75 acres",
    cuttingWidth: "15.7 in",
    maxIncline: "80%",
    boundaryWire: false,
    navigation: "3D Vision + RTK Fusion",
    bladeType: "Dual Floating Discs (Razor)",
    removableBattery: false,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m4",
    category: "Mower",
    name: "Luba 4 AWD 3000F",
    brand: "Mammotion",
    price: 2899,
    acreage: "1.0 acres",
    cuttingWidth: "16.0 in",
    maxIncline: "84%",
    boundaryWire: false,
    navigation: "Enhanced RTK + LiDAR + AI Cam",
    bladeType: "Dual Solid Steel + Razor",
    removableBattery: true,
    image: "https://images.unsplash.com/photo-1558441719-8b449c6ff673?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m5",
    category: "Mower",
    name: "Automower 430X NERA",
    brand: "Husqvarna",
    price: 3799,
    acreage: "0.8 acres",
    cuttingWidth: "9.4 in",
    maxIncline: "50%",
    boundaryWire: false,
    navigation: "EPOS Satellite System",
    bladeType: "Carbon Steel Pivoting",
    removableBattery: false,
    image: "https://images.unsplash.com/photo-1592424001807-6c2e30851ec6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "m6",
    category: "Mower",
    name: "Landroid L 20V",
    brand: "Worx",
    price: 1199,
    acreage: "0.5 acres",
    cuttingWidth: "8.0 in",
    maxIncline: "35%",
    boundaryWire: true,
    navigation: "AIA Intelligent Pathing",
    bladeType: "Pivoting Razor",
    removableBattery: true,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80"
  }
];

const mockVacuums = [
  {
    id: "v1",
    category: "Vacuum",
    name: "S8 Pro Ultra",
    brand: "Roborock",
    price: 1599,
    suctionPower: "6000 Pa",
    obstacleAvoidance: true,
    selfEmptyingBase: true,
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "v2",
    category: "Vacuum",
    name: "Roomba Combo j9+",
    brand: "iRobot",
    price: 1399,
    suctionPower: "4500 Pa",
    obstacleAvoidance: true,
    selfEmptyingBase: true,
    image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "v3",
    category: "Vacuum",
    name: "Matrix Plus 2-in-1",
    brand: "Shark",
    price: 699,
    suctionPower: "3000 Pa",
    obstacleAvoidance: true,
    selfEmptyingBase: true,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
  }
];

const mockNews = [
  {
    id: 1,
    title: "Segway Expands RTK Lineup with Navimow X430 and X450",
    date: "September 2026",
    excerpt: "Updated multi-band satellite systems improve tree canopy signal retention."
  },
  {
    id: 2,
    title: "Mammotion Announces Luba 4 Series Featuring LiDAR Fusion",
    date: "August 2026",
    excerpt: "The latest AWD chassis handles slopes up to 84 percent with redundant positioning."
  },
  {
    id: 3,
    title: "Solid-State Battery Swaps in Commercial Turf Robotics",
    date: "August 2026",
    excerpt: "Manufacturers evaluate modular packs to support zero-downtime operations."
  }
];

const allProducts = [...mockMowers, ...mockVacuums];

export default function App() {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-sans antialiased">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentView("home")}
          >
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">BigTopBot</span>
          </div>
          <div className="flex space-x-1 text-sm font-medium">
            <button
              onClick={() => setCurrentView("home")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentView === "home" ? "bg-white/10 text-cyan-400" : "text-slate-400 hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView("directory")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentView === "directory" ? "bg-white/10 text-cyan-400" : "text-slate-400 hover:text-white"
              }`}
            >
              Directory
            </button>
            <button
              onClick={() => setCurrentView("compare")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentView === "compare" ? "bg-white/10 text-cyan-400" : "text-slate-400 hover:text-white"
              }`}
            >
              Compare
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === "home" && <HomeView setView={setCurrentView} />}
        {currentView === "directory" && <DirectoryView />}
        {currentView === "compare" && <CompareView />}
      </main>

      <footer className="border-t border-white/10 mt-16 py-8 text-center text-xs text-slate-500">
        <p>© 2026 BigTopBot.com. All rights reserved.</p>
      </footer>
    </div>
  );
}

function HomeView({ setView }) {
  const trending = [allProducts[0], allProducts[3], allProducts[6]];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-[#0e1726] to-[#0a0a0a] p-6 sm:p-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2.5 py-0.5 mb-3 text-xs text-cyan-400">
            <span>2026 Specifications Index</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
            Autonomous Turf & Floor Care
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            Compare boundary-free RTK mowers, climbing angles, and LiDAR navigation systems side by side.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => setView("directory")}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg font-semibold text-xs transition-colors flex items-center"
            >
              Browse Directory <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </button>
            <button
              onClick={() => setView("compare")}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg font-semibold text-xs transition-colors"
            >
              Compare Models
            </button>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Trending Hardware</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
            <Newspaper className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Latest Intelligence</h2>
          </div>
          <div className="space-y-3">
            {mockNews.map((news) => (
              <div
                key={news.id}
                className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-cyan-500/40 transition-colors"
              >
                <span className="text-[10px] font-semibold tracking-wider text-cyan-400 uppercase block mb-1">
                  {news.date}
                </span>
                <h3 className="text-sm font-bold text-white mb-1">{news.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{news.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectoryView() {
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(4000);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const matchPrice = p.price <= maxPrice;
      return matchCategory && matchPrice;
    });
  }, [category, maxPrice]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-60 shrink-0">
        <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-6">
          <div className="flex items-center space-x-2 text-sm font-bold text-white">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span>Filters</span>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Category
            </label>
            <select
              className="w-full bg-black border border-white/20 rounded-lg p-2 text-xs text-white outline-none focus:border-cyan-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Mower">Robot Mowers</option>
              <option value="Vacuum">Robot Vacuums</option>
            </select>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Max Price</span>
              <span className="text-cyan-400 font-bold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="300"
              max="4000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-white/10"
            />
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Hardware Index</h2>
          <span className="text-xs text-slate-400">{filteredProducts.length} models listed</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CompareView() {
  const [item1Id, setItem1Id] = useState(mockMowers[0].id);
  const [item2Id, setItem2Id] = useState(mockMowers[3].id);

  const item1 = allProducts.find((p) => p.id === item1Id);
  const item2 = allProducts.find((p) => p.id === item2Id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-1">Matrix Comparison</h2>
        <p className="text-xs text-slate-400">Select two units to compare architecture and mechanical tolerances.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-white/10 bg-black/40 border-b border-white/10">
          <div className="p-4">
            <select
              className="w-full bg-black border border-white/20 rounded-lg p-2 text-xs font-bold text-white mb-3 outline-none focus:border-cyan-400"
              value={item1Id}
              onChange={(e) => setItem1Id(e.target.value)}
            >
              {allProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand} {p.name}
                </option>
              ))}
            </select>
            {item1 && (
              <img
                src={item1.image}
                alt={item1.name}
                className="w-full h-36 object-cover rounded-lg border border-white/10"
              />
            )}
          </div>
          <div className="p-4">
            <select
              className="w-full bg-black border border-white/20 rounded-lg p-2 text-xs font-bold text-white mb-3 outline-none focus:border-cyan-400"
              value={item2Id}
              onChange={(e) => setItem2Id(e.target.value)}
            >
              {allProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand} {p.name}
                </option>
              ))}
            </select>
            {item2 && (
              <img
                src={item2.image}
                alt={item2.name}
                className="w-full h-36 object-cover rounded-lg border border-white/10"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-white/10 p-4 text-xs">
          <div className="pr-3">{renderSpecs(item1)}</div>
          <div className="pl-3">{renderSpecs(item2)}</div>
        </div>
      </div>
    </div>
  );
}

function renderSpecs(item) {
  if (!item) return null;
  return (
    <div className="space-y-2">
      <SpecRow label="Type" value={item.category} />
      <SpecRow label="Brand" value={item.brand} />
      <SpecRow label="MSRP" value={`$${item.price}`} highlight />

      {item.category === "Mower" && (
        <>
          <SpecRow label="Acreage" value={item.acreage} />
          <SpecRow label="Cutting Deck" value={item.cuttingWidth} />
          <SpecRow label="Incline Grade" value={item.maxIncline} />
          <SpecRow label="Boundary Wire" value={item.boundaryWire ? "Required" : "Wire-free"} />
          <SpecRow label="Navigation" value={item.navigation} />
          <SpecRow label="Blades" value={item.bladeType} />
          <SpecRow label="Swappable Cell" value={item.removableBattery ? "Supported" : "Integrated"} />
        </>
      )}

      {item.category === "Vacuum" && (
        <>
          <SpecRow label="Suction" value={item.suctionPower} />
          <SpecRow label="Obstacle Bypass" value={item.obstacleAvoidance ? "Active" : "Bumper Only"} />
          <SpecRow label="Auto-Empty Station" value={item.selfEmptyingBase ? "Included" : "None"} />
        </>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/25 transition-all flex flex-col">
      <div className="h-36 overflow-hidden relative">
        <span className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 uppercase tracking-wide">
          {product.category}
        </span>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{product.brand}</span>
        <h3 className="text-sm font-bold text-white mb-2">{product.name}</h3>
        {product.category === "Mower" ? (
          <div className="text-[11px] text-slate-400 space-y-1 mb-3">
            <div>Rating: {product.acreage}</div>
            <div>Incline: {product.maxIncline}</div>
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 space-y-1 mb-3">
            <div>Suction: {product.suctionPower}</div>
          </div>
        )}
        <p className="text-base font-mono font-bold text-cyan-400 mt-auto pt-2 border-t border-white/5">
          ${product.price}
        </p>
      </div>
    </div>
  );
}

function SpecRow({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-white/5">
      <span className="text-slate-400">{label}</span>
      <span className={`font-medium ${highlight ? "text-cyan-400 font-bold" : "text-slate-200"}`}>{value}</span>
    </div>
  );
}
