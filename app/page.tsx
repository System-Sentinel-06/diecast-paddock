"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { addCarToPaddock } from '@/app/actions';

// ==========================================
// ICONS
// ==========================================
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const UploadIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const TerminalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const CarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);


const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const TireIcon = ({ className = "" }: { className?: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
  </svg>
);


const RightArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);


const CloseIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ImageWithPlaceholder = ({ src, alt, className = "", innerClassName = "", priority = false }: { src: string; alt: string; className?: string; innerClassName?: string; priority?: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Optimized Skeleton Blur Data URL (Static)
  const blurUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMTgxODE4Ii8+PC9zdmc+";

  return (
    <div className={`relative overflow-hidden ${className} bg-zinc-900/50`}>
      {(!isLoaded || error) && (
        <div className="absolute inset-0 z-10 animate-pulse bg-zinc-900 flex items-center justify-center">
            <CarIcon />
        </div>
      )}
      
      <img
        src={error ? "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&auto=format&fit=crop" : src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`${innerClassName} transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 scale-100 placeholder-blur' : 'opacity-0 scale-110'}`}
        style={{ filter: isLoaded ? 'none' : 'blur(20px)' }}
      />
    </div>
  );
};





// ==========================================
// DATA & TYPES
// ==========================================
const INITIAL_CATEGORIES = [
  "Autoart",
  "AutoWorld",
  "Bburago",
  "BM Creations",
  "Era Car",
  "GreenLight",
  "GT Spirit",
  "Hobby Japan",
  "Hot Wheels - Mainline",
  "Hot Wheels - Premium",
  "Hot Wheels - RLC",
  "Hot Wheels - Team Transport",
  "Ignition Model",
  "Inno64",
  "Johnny Lightning",
  "Kaido House",
  "Kyosho",
  "LCD Models",
  "Maisto",
  "Majorette",
  "Mark43",
  "Matchbox - Basic",
  "Matchbox - Collectors",
  "Matchbox - Moving Parts",
  "Mini GT",
  "Motorhelix",
  "Norev",
  "Ottomobile",
  "Para64",
  "Peako64",
  "Pop Race",
  "Schuco",
  "Solido",
  "Sparky",
  "Tarmac Works",
  "Tomica - Basic",
  "Tomica - Limited Vintage",
  "Tomica - Premium",
  "X-Cartoys"
];


type DiecastModel = {
  id: number;
  title: string;
  scale: string;
  manufacturer: string;
  description: string;
  dateAdded: string;

  imageUrls: string[];
};

const initialMockCollection: DiecastModel[] = [];


// ==========================================
// LOADING ANIMATION
// ==========================================
const LoadingScreen = () => (
   <div className="fixed inset-0 z-[999] bg-[#060202] flex flex-col items-center justify-center animate-in fade-in duration-700">
      <div className="relative">
         {/* Internal Glow Pulse */}
         <div className="absolute inset-0 bg-red-600/20 blur-[80px] rounded-full animate-pulse"></div>
         
         {/* Animated Car Icon with driving effect */}
         <div className="relative animate-bounce text-red-600 scale-[2.5] mb-12 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            <CarIcon />
         </div>
      </div>

      <div className="flex flex-col items-center gap-4">
         <span className="text-[10px] font-black text-white/50 tracking-[0.5em] uppercase animate-pulse">
            Warming Engines
         </span>
         
         {/* Racing Progress Bar */}
         <div className="w-[180px] h-[2px] bg-zinc-900 rounded-full overflow-hidden relative border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600 to-transparent w-1/2 animate-[progress_1.5s_infinite_linear]"></div>
         </div>
      </div>

      {/* Global Animation Styles */}
      <style jsx global>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
   </div>
);


// ==========================================
// SHARED BACKGROUND COMPONENT

// ==========================================
const AmbientBackground = ({ isIntro = false }: { isIntro?: boolean }) => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0202]">
    {/* Mild Red Layered Gradient Background - Maximum Brightness Requested */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(239,68,68,0.45)_0%,_transparent_80%)]"></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,5,5,1)_0%,rgba(65,12,12,1)_100%)]"></div>



    {/* Diagonal Striped Pattern */}
    {!isIntro && (
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ef4444 0, #ef4444 1px, transparent 0, transparent 40px)' }}></div>
    )}


    {/* Red dot-matrix pattern */}
    {!isIntro && (
      <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(circle, #ef4444 0.8px, transparent 0.8px)', backgroundSize: '36px 36px' }}></div>
    )}

    {/* Abstract Tech Patterns (Subtle Lines & Circuits) */}
    <div className="absolute inset-0 opacity-[0.05]">
       <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="techPattern" width="100" height="100" patternUnits="userSpaceOnUse">
             <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z" fill="none" stroke="#ef4444" strokeWidth="0.5" />
             <path d="M 30 10 L 30 30 L 10 30" fill="none" stroke="#ef4444" strokeWidth="0.5" />
             <path d="M 70 90 L 70 70 L 90 70" fill="none" stroke="#ef4444" strokeWidth="0.5" />
             <circle cx="10" cy="10" r="1.5" fill="#ef4444" />
             <circle cx="90" cy="90" r="1.5" fill="#ef4444" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#techPattern)" />
       </svg>
    </div>

    {/* Additional Abstract Blobs */}
    {!isIntro && (
       <>
         <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] bg-red-900/10 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-red-950/20 blur-[150px] rounded-full"></div>
       </>
    )}

    {/* Intro-only ambient orbs */}
    {isIntro && (
      <>
        <div className="absolute top-[5%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-red-500/30 mix-blend-screen blur-[140px]"></div>
        <div className="absolute bottom-[5%] right-[5%] w-[60vw] h-[60vw] rounded-full bg-orange-500/25 mix-blend-screen blur-[160px]"></div>
      </>
    )}

    {/* Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#020101_95%)] opacity-95"></div>
  </div>
);

const getCarBrandSlug = (title: string) => {
  const lower = title.toLowerCase();
  
  // Try to match multi-word and common names first
  if (lower.includes('aston martin')) return 'aston-martin';
  if (lower.includes('land rover') || lower.includes('range rover')) return 'land-rover';
  if (lower.includes('alfa romeo')) return 'alfa-romeo';
  if (lower.includes('rolls royce') || lower.includes('rolls-royce')) return 'rolls-royce';
  if (lower.includes('mercedes') || lower.includes('benz')) return 'mercedes-benz';
  if (lower.includes('vw') || lower.includes('volkswagen')) return 'volkswagen';
  
  // Specific single words mapping just to be sure
  if (lower.includes('porsche')) return 'porsche';
  if (lower.includes('nissan')) return 'nissan';
  if (lower.includes('mclaren')) return 'mclaren';
  if (lower.includes('ferrari')) return 'ferrari';
  if (lower.includes('lamborghini')) return 'lamborghini';
  if (lower.includes('bugatti')) return 'bugatti';
  if (lower.includes('bmw')) return 'bmw';
  if (lower.includes('audi')) return 'audi';
  if (lower.includes('ford')) return 'ford';
  if (lower.includes('chevrolet') || lower.includes('chevy')) return 'chevrolet';
  if (lower.includes('dodge')) return 'dodge';
  if (lower.includes('toyota')) return 'toyota';
  if (lower.includes('honda')) return 'honda';
  if (lower.includes('pagani')) return 'pagani';
  if (lower.includes('koenigsegg')) return 'koenigsegg';
  if (lower.includes('mazda')) return 'mazda';
  if (lower.includes('subaru')) return 'subaru';
  if (lower.includes('mitsubishi')) return 'mitsubishi';
  if (lower.includes('lexus')) return 'lexus';
  if (lower.includes('acura')) return 'acura';
  if (lower.includes('jaguar')) return 'jaguar';
  if (lower.includes('maserati')) return 'maserati';
  
  // Fallback to exactly the first word without symbols
  return lower.split(' ')[0].replace(/[^a-z0-9-]/g, '');
};

const getBrandLogo = (title: string) => {
  const slug = getCarBrandSlug(title);
  return `https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${slug}.png`;
};

const capitalizeSlug = (slug: string) => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// ==========================================
// IMAGE COMPRESSION UTILITY
// ==========================================
const compressImage = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1200; // Optimal resolution for high-detail diecast shots
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          ctx.fillStyle = "#000000"; // Solid black backdrop for transparency
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
        }
        
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Buffer Serialization Error'));
          },
          'image/webp',
          0.70 // High-performance WebP compression for lightning-fast delivery
        );


      };
      img.onerror = () => reject(new Error('Image Process Fault'));
    };
    reader.onerror = () => reject(new Error('Stream Read Fault'));
  });
};



// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function DiecastDashboard() {
  const [viewState, setViewState] = useState<'intro' | 'dashboard' | 'profile'>('intro');
  const [isAdding, setIsAdding] = useState(false);
  
  // App State Models
  const [collection, setCollection] = useState<DiecastModel[]>(initialMockCollection);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  // App State Categories
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);
  const [newCatName, setNewCatName] = useState('');


  // Sorting & Filtering State
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical' | 'scale' | 'carbrand'>('carbrand');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [filterScale, setFilterScale] = useState('ALL');
  const [filterCarBrand, setFilterCarBrand] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [expandedItem, setExpandedItem] = useState<DiecastModel | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newScale, setNewScale] = useState('1:64');
  const [newDesc, setNewDesc] = useState('');
  const [newImages, setNewImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);


  useEffect(() => {
    if (notification) { const timer = setTimeout(() => setNotification(null), 3000); return () => clearTimeout(timer); }
  }, [notification]);


  // Extract unique filters based on CURRENT collection items
  const uniqueBrands = useMemo(() => Array.from(new Set(collection.map(i => i.manufacturer))), [collection]);
  const uniqueScales = useMemo(() => Array.from(new Set(collection.map(i => i.scale))), [collection]);
  const uniqueCarBrands = useMemo(() => Array.from(new Set(collection.map(i => getCarBrandSlug(i.title)))).sort(), [collection]);

  // Filter and Sort logic
  const processedCollection = useMemo(() => {
    let list = [...collection];
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(i => 
        i.title.toLowerCase().includes(q) || 
        i.manufacturer.toLowerCase().includes(q) ||
        i.scale.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q)
      );
    }


    if (filterBrand !== 'ALL') {
      list = list.filter(i => i.manufacturer === filterBrand);
    }
    if (filterScale !== 'ALL') {
      list = list.filter(i => i.scale === filterScale);
    }
    if (filterCarBrand !== 'ALL') {
      list = list.filter(i => getCarBrandSlug(i.title) === filterCarBrand);
    }
    // Sorting
    if (sortBy === 'recent') {
      list.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else if (sortBy === 'alphabetical') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'scale') {
      list.sort((a, b) => parseInt(a.scale.split(':')[1]) - parseInt(b.scale.split(':')[1]));
    } else if (sortBy === 'carbrand') {
      list.sort((a, b) => getCarBrandSlug(a.title).localeCompare(getCarBrandSlug(b.title)));
    }
    return list;
  }, [sortBy, filterBrand, filterScale, filterCarBrand, collection, searchQuery]);

  // Statistics Hook for Profile
  const brandStats = useMemo(() => {
     const counts: Record<string, number> = {};
     collection.forEach(item => {
        counts[item.manufacturer] = (counts[item.manufacturer] || 0) + 1;
     });
     return Object.entries(counts).sort((a,b) => b[1] - a[1]);
  }, [collection]);

  const scaleStats = useMemo(() => {
     const counts: Record<string, number> = {};
     collection.forEach(item => {
        counts[item.scale] = (counts[item.scale] || 0) + 1;
     });
     return Object.entries(counts).sort((a,b) => b[1] - a[1]);
  }, [collection]);

  const carStats = useMemo(() => {
     const counts: Record<string, number> = {};
     collection.forEach(item => {
        const slug = getCarBrandSlug(item.title);
        counts[slug] = (counts[slug] || 0) + 1;
     });
     return Object.entries(counts).sort((a,b) => b[1] - a[1]);
  }, [collection]);

  // UI Effects
  useEffect(() => {
    if (expandedItem) setActiveImageIndex(0);
  }, [expandedItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!expandedItem) return;
      if (e.key === 'Escape') setExpandedItem(null);
      if (e.key === 'ArrowRight') setActiveImageIndex(prev => (prev + 1) % expandedItem.imageUrls.length);
      if (e.key === 'ArrowLeft') setActiveImageIndex(prev => (prev - 1 + expandedItem.imageUrls.length) % expandedItem.imageUrls.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedItem]);

  // Vercel Blob Persistence: Load
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/paddock');
        if (!response.ok) return;
        const data = await response.json();
        
        if (data.collection && Array.isArray(data.collection)) {
          setCollection(data.collection);
        }
        
        // Merge Logic: Combine cloud categories with the new expanded INITIAL_CATEGORIES
        if (data.categories && Array.isArray(data.categories)) {
          const combined = Array.from(new Set([...data.categories, ...INITIAL_CATEGORIES])).sort();
          setCategories(combined);
        }
      } catch (e) {
        console.error("Persistence Hydration Failed:", e);
      } finally {
        setIsDataLoaded(true);
      }
    }
    loadData();
  }, []);


  // Postgres Persistence: Refresh
  const refreshCollection = async () => {
    try {
      const response = await fetch('/api/paddock');
      const data = await response.json();
      if (data.collection) setCollection(data.collection);
    } catch (e) {
      console.error("Refresh Failed:", e);
    }
  };


  useEffect(() => {

    document.body.style.overflow = expandedItem ? 'hidden' : '';
  }, [expandedItem]);

  // Actions
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPendingFile(file);
      
      // Still allow local preview if needed, or just show filename
      const objectUrl = URL.createObjectURL(file);
      setNewImages([objectUrl]);
    }
  };



  const handleAddEntry = async () => {
     if(!newTitle || !newBrand || !pendingFile) {
        alert("Missing Data: Title, Manufacturer and Photo are mandatory.");
        return;
     }
     
     setIsUploading(true);
     setNotification("Optimizing Image Asset...");
     
     try {
       // 1. Client-Side Compression to stay under 4.5MB Vercel Limit
       const compressedBlob = await compressImage(pendingFile);
       // Standardize to .webp for the Cloud Vault
       const finalFile = new File([compressedBlob], `${pendingFile.name.split('.')[0]}.webp`, { type: 'image/webp' });

       setNotification("Pushing to Cloud Vault...");

       
       const formData = new FormData();
       formData.append('car_brand', newDesc || 'Standard');
       formData.append('model_manufacturer', newBrand);
       formData.append('scale', newScale);
       formData.append('full_model_name', newTitle);
       formData.append('image_file', finalFile);

       const result = await addCarToPaddock(formData);


       if (result?.error) {
          throw new Error(result.error);
       }

       setNotification(`Vault Entry Complete: ${newTitle}`);
       refreshCollection();
       
       setIsAdding(false); 
       setNewTitle(''); 
       setNewBrand(''); 
       setNewDesc(''); 
       setNewImages([]);
       setPendingFile(null);
     } catch (err: any) { 
       console.error("Server Action Sync Error:", err);
       alert(`Cloud Sync Interrupted: ${err.message || 'Check connection'}`); 
     } finally { 
       setIsUploading(false); 
     }
  };


  const handleDeleteEntry = async (id: number) => {
    // 1. Snapshot for Rollback
    const previousCollection = [...collection];
    
    // 2. Optimistic Update (Immediate Feedback)
    setCollection(prev => prev.filter(item => item.id !== id));
    setExpandedItem(null);
    setNotification('Purging Record...');

    try {
      const response = await fetch('/api/paddock', { 
        method: 'DELETE', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ id }) 
      });

      if (!response.ok) throw new Error('Cloud Out of Sync');
      
      setNotification('Record Erased.');
      // Final verified sync from DB
      refreshCollection(); 
    } catch (e) { 
      // 3. Rollback on Failure
      setCollection(previousCollection);
      alert('Vault Override Failed: Record Restored.');
    }
  };



  const handleAddCategory = () => {
     const clean = newCatName.trim();
     if (clean && !categories.includes(clean)) {
        setCategories([...categories, clean].sort());
        setNewCatName('');
     }
  };

  const handleRemoveCategory = (cat: string) => {
     setCategories(categories.filter(c => c !== cat));
  };


  // ==========================================
  // VIEW: INTRO
  // ==========================================
  if (viewState === 'intro') {
    return (
      <div className="relative h-[100dvh] w-full bg-[#060202] overflow-hidden flex items-center justify-center font-sans tracking-tight p-4">
        <AmbientBackground isIntro={true} />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-end max-w-[1700px] mx-auto w-full gap-12 md:gap-40 md:pr-40">






          
          {/* Left Text Block */}
          <div className="flex flex-col items-center text-center max-w-xl flex-shrink-0 z-20">
             <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 mb-4 sm:mb-6 drop-shadow-2xl">
               Diecast<br/><span className="text-red-600">Paddock</span>
             </h1>

             <p className="text-zinc-500 font-sans text-sm sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-md font-medium drop-shadow-md mx-auto">
                A definitive digital catalogue to maintain your precision scaled garage. Built for genuine diecast passion.
             </p>

             <button 
               onClick={() => setViewState('dashboard')}
               className="group relative flex items-center justify-center gap-4 bg-gradient-to-br from-red-600 to-red-800 px-8 py-4 sm:px-10 sm:py-5 rounded-full text-xs sm:text-sm font-black tracking-widest uppercase text-white transition-all overflow-hidden shadow-[0_0_35px_rgba(220,38,38,0.4)] hover:shadow-[0_0_55px_rgba(239,68,68,0.7)] border border-red-500/50"
             >
                <span className="relative z-10 flex items-center gap-3">Explore Collection <RightArrowIcon /></span>
             </button>
          </div>



          {/* Right Logo Block - Ultra Minimalist Design */}
          <div className="w-full flex justify-center relative h-[250px] md:h-[400px] z-10">

            <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-orange-500 rounded-full blur-[80px] opacity-20 z-0 scale-[0.6] mix-blend-screen" />
            
            <svg viewBox="0 0 200 200" className="relative z-10 w-full h-full drop-shadow-[0_0_20px_rgba(239,68,68,0.4)] object-contain transition-transform duration-1000 ease-in-out">
               {/* Minimalist Outer Ring */}
               <circle cx="100" cy="100" r="75" fill="none" stroke="#ef4444" strokeWidth="3" className="opacity-30" />
               <circle cx="100" cy="100" r="85" fill="none" stroke="#dc2626" strokeWidth="1" strokeDasharray="10 6" />
               
               {/* Core Geometric Yoke */}
               <path d="M 40 100 L 85 100 L 100 120 L 115 100 L 160 100" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M 100 120 L 100 160" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
               <circle cx="100" cy="100" r="6" fill="#ef4444" />
            </svg>
          </div>
          
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: PROFILE & SETTINGS
  // ==========================================
  if (viewState === 'profile') {
    return (
      <div className="relative min-h-screen bg-[#060202] text-zinc-300 font-sans tracking-tight overflow-x-hidden p-3 md:p-6 lg:p-10">
        <AmbientBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full animate-in slide-in-from-bottom-8 duration-500">
           
           {/* Profile Header */}
           <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-zinc-950/80 p-4 sm:p-5 rounded-[32px] border border-zinc-800/80 backdrop-blur-xl mb-6 sm:mb-10 shadow-2xl gap-4">
              <div className="flex items-center gap-3 sm:gap-4 group">
                 <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] text-white transition-transform group-hover:rotate-12">
                    <TireIcon />
                 </div>
 
                  <div className="overflow-hidden">
                      <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight truncate">Garage Pulse</h1>
                      <p className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest">Diecast Analytics</p>
                  </div>
              </div>
 
                  <div className="flex items-center gap-2 sm:gap-3">
                     <button 
                        onClick={() => setViewState('intro')}
                        className="flex-shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all font-black"
                        title="Return to Home"
                     >
                        <HomeIcon />
                     </button>
                     <button 
                        onClick={() => setViewState('dashboard')}
                        className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 h-10 sm:h-12 px-5 sm:px-7 bg-red-600 hover:bg-red-500 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all shadow-[0_4px_15px_rgba(239,68,68,0.3)] text-white"
                     >
                        <span className="hidden sm:inline">Return to Paddock</span>
                        <span className="inline sm:hidden">Paddock</span>
                     </button>
                  </div>


           </header>


            <div className="flex flex-col lg:flex-row gap-8 mb-10 items-stretch">
               
               {/* Pillar 1: Total & Scale */}
               <div className="w-full lg:w-1/3 flex flex-col gap-4 sm:gap-6">
                  {/* Main Stat */}
                  <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-[32px] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group flex-shrink-0">
                     <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-600/10 blur-[40px] rounded-full group-hover:bg-red-600/20 transition-all"></div>
                     <h3 className="text-[10px] sm:text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Total Registry</h3>
                     <p className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 drop-shadow-lg leading-none">
                        {collection.length}
                     </p>
                     <p className="text-[10px] text-zinc-500 mt-2 font-mono uppercase tracking-[0.2em]">Verified Units</p>
                  </div>

                  {/* Scale stats */}
                  <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-[32px] p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex-grow overflow-y-auto hide-scrollbar max-h-[300px] sm:max-h-[400px]">
                     <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">Registry by Scale</h4>
                     {scaleStats.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                           {scaleStats.map(([scale, count]) => (
                              <div key={scale} className="bg-zinc-900/50 border border-zinc-800 px-3 py-2 rounded-xl flex items-center gap-3">
                                 <span className="font-black text-zinc-400 text-[10px] tracking-widest">{scale}</span>
                                 <span className="text-red-500 font-mono text-xs font-black bg-black/60 px-2.5 py-1 rounded-lg border border-red-900/20">{count}</span>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest italic opacity-50">Empty Garage</p>
                     )}
                  </div>
               </div>

               {/* Pillar 2: Diecast Manufacturer Stats */}
               <div className="w-full lg:w-1/3 flex flex-col">
                  <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-[32px] p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex-grow overflow-y-auto hide-scrollbar max-h-[500px] sm:max-h-[600px]">
                     <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">Casting Manufacturers</h4>
                     {brandStats.length > 0 ? (
                        <div className="flex flex-col gap-3">
                           {brandStats.map(([brand, count]) => (
                              <div key={brand} className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                                 <span className="text-xs font-black text-zinc-300 uppercase tracking-widest truncate pr-4">{brand}</span>
                                 <span className="bg-black/60 border border-white/5 font-mono text-xs text-red-500 px-3 py-1.5 rounded-lg shadow-inner font-black">
                                    {count}
                                 </span>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest italic opacity-50">No Data</p>
                     )}
                  </div>
               </div>

              {/* Pillar 3: Car Brand Stats */}
              <div className="w-full lg:w-1/3 flex flex-col">
                 <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex-grow overflow-y-auto hide-scrollbar max-h-[600px]">
                    <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-4">By Car Brand</h4>
                    {carStats.length > 0 ? (
                       <div className="flex flex-col gap-4">
                          {carStats.map(([slug, count]) => (
                             <div key={slug} className="flex items-center justify-between border-b border-zinc-800/50 pb-3">
                                <span className="text-base font-bold text-zinc-200">{capitalizeSlug(slug)}</span>
                                <span className="bg-zinc-900 border border-zinc-700 font-mono text-sm text-blue-400 px-3 py-1 rounded-xl shadow-inner font-bold">
                                   {count}
                                </span>
                             </div>
                          ))}
                       </div>
                    ) : (
                       <p className="text-sm text-zinc-500 italic">No models logged yet.</p>
                    )}
                 </div>
              </div>
           </div>

            {/* Brand Configuration Area */}
            <div className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-[32px] p-5 sm:p-10 backdrop-blur-xl shadow-2xl flex flex-col mb-10">
                   
                  <div className="mb-8 font-sans">
                     <h3 className="text-xl font-black text-white mb-2">Registry Configuration</h3>
                     <p className="text-zinc-500 text-sm sm:text-base font-medium">Configure the brand database used for logging new precision units.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-8 bg-zinc-900/50 p-2 sm:p-3 rounded-2xl border border-zinc-800/50 transition-all focus-within:border-red-600/30">
                     <input 
                        type="text"
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        placeholder="E.g. Inno64, Liberty Walk..."
                        className="flex-grow bg-transparent border-none outline-none px-4 py-3 sm:py-2 text-base text-white placeholder-zinc-700"
                     />
                     <button 
                        onClick={handleAddCategory}
                        disabled={!newCatName.trim()}
                        className="flex items-center justify-center gap-2 px-6 h-12 sm:h-auto bg-red-600 hover:bg-red-500 text-white font-black text-[10px] uppercase rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(239,68,68,0.3)] tracking-widest whitespace-nowrap"
                     >
                        Add to Database
                     </button>
                  </div>

                 <div className="flex-grow min-h-[400px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto hide-scrollbar pr-2">
                       {categories.map((cat) => (
                          <div key={cat} className="flex items-center justify-between bg-zinc-900 border border-zinc-800/80 p-4 rounded-2xl group hover:border-zinc-600 transition-colors">
                             <span className="font-bold text-sm text-zinc-200">{cat}</span>
                             <button 
                                onClick={() => handleRemoveCategory(cat)}
                                className="text-zinc-600 hover:text-red-500 transition-colors p-2 rounded-xl hover:bg-zinc-800"
                                title="Remove Category"
                             >
                                <TrashIcon />
                             </button>
                          </div>
                       ))}
                    </div>
                 </div>

              </div>

        </div>
      </div>
    );
  }

  if (!isDataLoaded) return <LoadingScreen />;

  // ==========================================
  // VIEW: DASHBOARD (MAIN)
  // ==========================================
  return (
    <div className="relative min-h-screen bg-[#060202] text-zinc-300 font-sans tracking-tight overflow-x-hidden p-2 sm:p-6">

      
      {/* Universal Ambient Dark/Red Background for consistency across pages */}
      <AmbientBackground />

      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-10 duration-500">
           <div className="bg-red-600 text-white px-8 py-4 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.5)] font-black text-xs uppercase tracking-widest border border-red-400">{notification}</div>
        </div>
      )}

      {/* Expanded Modal Overlay */}
      {expandedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 font-sans">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl transition-opacity animate-in fade-in" onClick={() => setExpandedItem(null)}></div>

          <div className="relative z-10 w-full h-[95vh] md:h-auto max-w-[1400px] md:max-h-[85vh] bg-zinc-950 rounded-[40px] md:border border-zinc-800 shadow-2xl overflow-hidden flex flex-col group animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setExpandedItem(null)}
              className="absolute top-5 right-5 z-40 p-3 bg-zinc-900/80 hover:bg-black hover:text-white text-zinc-400 rounded-full transition-all backdrop-blur-md shadow-2xl border border-zinc-800"
            >
              <CloseIcon />
            </button>

            {/* MOBILE ONLY VIEW */}
            <div className="flex md:hidden flex-col h-full overflow-hidden">
               {/* Main Image (Mobile) with Navigation */}
               <div className="relative h-[48vh] bg-black overflow-hidden flex-shrink-0 group/img">
                  <ImageWithPlaceholder 
                    src={expandedItem.imageUrls[activeImageIndex]} 
                    alt={expandedItem.title}
                    className="w-full h-full"
                    innerClassName="w-full h-full object-contain" // Contain for better full-car view
                  />
                  
                  {/* Overlay Controls (Mobile) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10 pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-black text-white uppercase tracking-widest shadow-2xl">
                     FRAME {activeImageIndex + 1} / {expandedItem.imageUrls.length}
                  </div>

                  {expandedItem.imageUrls.length > 1 && (
                     <>
                        <button 
                           onClick={(e) => { e.stopPropagation(); setActiveImageIndex(p => (p - 1 + expandedItem.imageUrls.length) % expandedItem.imageUrls.length); }}
                           className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-red-600 transition-all font-black text-xl"
                        >
                           &lsaquo;
                        </button>
                        <button 
                           onClick={(e) => { e.stopPropagation(); setActiveImageIndex(p => (p + 1) % expandedItem.imageUrls.length); }}
                           className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-red-600 transition-all font-black text-xl"
                        >
                           &rsaquo;
                        </button>
                     </>
                  )}

                  {/* Floating Brand Logo (Mobile) */}
                  <div className="absolute bottom-6 right-6 z-30 w-16 h-16 bg-white/95 rounded-2xl p-3 shadow-2xl flex items-center justify-center border border-white/20">
                     <img 
                        src={getBrandLogo(expandedItem.title)} 
                        alt="Logo" 
                        className="w-full h-full object-contain" 
                        onError={(e) => { (e.currentTarget.parentNode as HTMLDivElement).style.display = 'none'; }}
                     />
                  </div>
               </div>

               {/* Content (Mobile) Scrollable */}
               <div className="flex flex-col flex-grow overflow-y-auto bg-zinc-950 p-6 pt-10 rounded-t-[44px] -mt-12 relative z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.9)] border-t border-zinc-800/80">
                  <div className="flex items-center gap-3 mb-6">
                     <span className="px-3 py-1 bg-zinc-900/80 border border-zinc-800 text-[9px] font-black tracking-widest text-zinc-500 rounded-lg">REG: {expandedItem.id.toString().padStart(4, '0')}</span>
                     <span className="px-3 py-1 bg-red-950/30 border border-red-900/50 text-[9px] font-black tracking-widest text-red-500 rounded-lg">{expandedItem.scale}</span>
                  </div>

                  <h2 className="text-3xl font-black text-white leading-tight mb-8 tracking-tighter">{expandedItem.title}</h2>
                  
                  <div className="flex flex-col gap-1 mb-8">
                     <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Diecast Manufacturer</p>
                     <p className="text-lg font-black text-zinc-200 border-b border-zinc-900 pb-4">{expandedItem.manufacturer}</p>
                  </div>

                  <div className="flex flex-col gap-3 mb-10">
                     <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Logs / Documentation</p>
                     <div className="text-zinc-500 text-sm leading-relaxed italic bg-zinc-900/20 p-6 rounded-3xl border border-zinc-900/50">
                        &quot;{expandedItem.description || "No documentation."}&quot;
                     </div>
                  </div>

                  {/* Mobile Thumbnail Strip */}
                  {expandedItem.imageUrls.length > 1 && (
                     <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-10">
                        {expandedItem.imageUrls.map((url, i) => (
                           <button 
                              key={i} 
                              onClick={() => setActiveImageIndex(i)}
                              className={`w-20 h-20 rounded-[20px] flex-shrink-0 overflow-hidden border-2 transition-all ${activeImageIndex === i ? 'border-red-600 scale-105 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-transparent opacity-40 hover:opacity-100'}`}
                           >
                              <ImageWithPlaceholder src={url} alt={`t-${i}`} className="w-full h-full" />
                           </button>
                        ))}
                     </div>
                  )}

                  <div className="mt-auto py-6 border-t border-zinc-900">
                     <button 
                        onClick={() => handleDeleteEntry(expandedItem.id)}
                        className="w-full py-5 bg-zinc-900/50 hover:bg-red-600 text-[10px] font-black text-zinc-600 hover:text-white border border-zinc-800 rounded-[24px] tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-inner"
                     >
                        <TrashIcon /> Purge Registry Record
                     </button>
                  </div>
               </div>
            </div>


            {/* DESKTOP ONLY VIEW */}
            <div className="hidden md:flex flex-row h-full">
               {/* Left side: Images (Desktop) */}
               <div className="w-[58%] relative flex flex-col bg-black border-r border-zinc-800/80">
                  <div className="relative flex-grow bg-black overflow-hidden rounded-l-[40px]">
                     <ImageWithPlaceholder 
                       src={expandedItem.imageUrls[activeImageIndex]} 
                       alt={expandedItem.title}
                       className="w-full h-full"
                       innerClassName="w-full h-full object-contain" // Better for car shapes
                     />
                     
                     {/* Glassy Overlays (Desktop) */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                     <div className="absolute top-8 left-8 z-20 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-[20px] border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.3em] shadow-2xl">
                        {activeImageIndex + 1} // {expandedItem.imageUrls.length} VIEW
                     </div>
                     
                     {expandedItem.imageUrls.length > 1 && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-8 z-30 pointer-events-none">
                           <button onClick={(e) => { e.stopPropagation(); setActiveImageIndex(p => (p - 1 + expandedItem.imageUrls.length) % expandedItem.imageUrls.length); }} className="pointer-events-auto w-14 h-14 bg-black/50 hover:bg-red-600 rounded-full backdrop-blur-2xl border border-white/5 transition-all text-white font-black text-2xl shadow-2xl hover:scale-110 flex items-center justify-center">&lsaquo;</button>
                           <button onClick={(e) => { e.stopPropagation(); setActiveImageIndex(p => (p + 1) % expandedItem.imageUrls.length); }} className="pointer-events-auto w-14 h-14 bg-black/50 hover:bg-red-600 rounded-full backdrop-blur-2xl border border-white/5 transition-all text-white font-black text-2xl shadow-2xl hover:scale-110 flex items-center justify-center">&rsaquo;</button>
                        </div>
                     )}

                     {/* Premium Rolling Film Strip Overlay (Desktop) */}
                     {expandedItem.imageUrls.length > 1 && (
                        <div className="absolute bottom-10 left-10 right-10 flex justify-center z-30 pointer-events-none">
                           <div className="flex gap-3 p-3 bg-black/60 backdrop-blur-3xl rounded-[32px] border border-white/10 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                              {expandedItem.imageUrls.map((url, i) => (
                                 <button 
                                    key={i}
                                    onClick={() => setActiveImageIndex(i)}
                                    className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === i ? 'border-red-600 scale-110' : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'}`}
                                 >
                                    <ImageWithPlaceholder src={url} alt={`th-${i}`} className="w-full h-full" />
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </div>


               {/* Right side: Content (Desktop) */}
               <div className="w-[45%] flex flex-col h-full overflow-y-auto bg-zinc-950 p-12 items-center text-center hide-scrollbar">
                  <div className="flex items-center justify-center gap-6 mb-8 w-full border-b border-zinc-900 pb-8">
                     <span className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] font-black text-zinc-500 rounded-xl tracking-tighter shadow-inner">SERIAL_{expandedItem.id.toString().padStart(5, '0')}</span>
                     <img 
                        src={getBrandLogo(expandedItem.title)} 
                        alt="Logo" 
                        className="h-10 w-auto object-contain bg-white rounded-lg p-1.5 shadow-2xl" 
                        onError={(e) => { (e.currentTarget.parentNode as HTMLDivElement).style.display = 'none'; }}
                     />
                  </div>

                  <h1 className="text-5xl font-black text-white leading-tight mb-8 tracking-tighter w-full max-w-[80%] mx-auto">{expandedItem.title}</h1>
                  
                  <div className="grid grid-cols-2 gap-4 border-b border-zinc-900 pb-10 mb-10 w-full animate-in zoom-in-95 duration-500">
                     <div className="p-6 bg-zinc-900/40 backdrop-blur-xl rounded-[32px] border border-zinc-800/40 group/stat hover:border-red-900 transition-all">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1 group-hover/stat:text-red-500">Manufacturer</p>
                        <p className="text-xl font-black text-zinc-200">{expandedItem.manufacturer}</p>
                     </div>
                     <div className="p-6 bg-zinc-900/40 backdrop-blur-xl rounded-[32px] border border-zinc-800/40 group/stat hover:border-red-900 transition-all">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1 group-hover/stat:text-red-500">Scale Ratio</p>
                        <p className="text-xl font-black text-red-500 tracking-tighter">{expandedItem.scale}</p>
                     </div>
                  </div>

                  <div className="flex flex-col gap-4 mb-auto w-full items-center">
                     <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-zinc-900/80 px-4 py-1 rounded-full border border-zinc-800">Registry Documentation</h4>
                     <p className="text-lg text-zinc-400 leading-relaxed font-medium bg-zinc-900/20 p-8 rounded-[32px] border border-zinc-900/50 italic max-w-[90%] mx-auto">
                        &quot;{expandedItem.description || "No documentation attached."}&quot;
                     </p>
                  </div>


                  <div className="mt-12 flex justify-between items-center text-zinc-600 font-mono text-[10px] tracking-widest">
                     <span>ADDED: {expandedItem.dateAdded}</span>
                     <button onClick={() => handleDeleteEntry(expandedItem.id)} className="flex items-center gap-3 text-red-500 hover:text-white transition-all font-black uppercase tracking-widest"><TrashIcon /> Erase Record</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}


      {/* Main Dashboard Layout */}
      <div className="relative z-10 w-full mx-auto flex flex-col gap-8 min-h-[90vh] max-w-[1600px]">

        
       {/* Top Navbar */}
        <header className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 md:gap-5 bg-zinc-950/80 p-3 sm:p-5 rounded-3xl border border-zinc-800/80 backdrop-blur-xl sticky top-2 sm:top-4 z-40 shadow-2xl">
          <div className="flex items-center justify-between md:justify-start gap-5 cursor-pointer" onClick={() => setViewState('intro')}>
            <div className="flex h-11 md:h-12 items-center gap-3 bg-zinc-900 border border-zinc-800 px-3 md:px-4 rounded-2xl group transition-all hover:border-red-500/50">
               <div className="text-red-600 transition-transform group-hover:scale-110">
                 <CarIcon />
               </div>
               <h1 className="text-sm md:text-lg font-black tracking-[0.2em] text-white uppercase mt-0.5">
                 Paddock
               </h1>
            </div>
          </div>

          <div className="flex flex-1 mx-0 md:mx-4">
             {!isAdding && (
               <div className="flex items-center w-full gap-3 px-4 h-11 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-inner group focus-within:border-red-600/50 transition-all">
                 <span className="text-zinc-600 group-focus-within:text-red-500 transition-all scale-90 group-focus-within:scale-110">
                   <SearchIcon />
                 </span>
                 <input 
                   type="text"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="SEARCH COLLECTION..."
                   className="bg-transparent border-none outline-none text-[9px] md:text-[10px] font-black text-zinc-200 placeholder-zinc-700 w-full tracking-[0.1em] uppercase"
                 />
               </div>
             )}
          </div>


          <div className="flex items-center gap-2 md:gap-4">
             {/* Hide Registry on mobile dashboard to avoid clutter */}
             <button 
               onClick={() => setViewState('profile')}
               className="hidden md:flex items-center justify-center gap-2.5 h-11 md:h-12 px-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-500 hover:border-red-950 transition-all font-black shadow-xl group"
               title="Registry Configuration"
             >
               <SettingsIcon />
               <span className="hidden lg:inline text-[9px] uppercase tracking-[0.2em] mt-0.5">Registry</span>
             </button>

             <button 
               onClick={() => setIsAdding(!isAdding)}
               className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 rounded-2xl px-4 sm:px-6 h-11 md:h-12 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-500 hover:shadow-[0_4px_20px_rgba(239,68,68,0.4)] transition-all shadow-xl"
             >
               {isAdding ? <CloseIcon /> : <PlusIcon />}
               <span className="hidden sm:inline">{isAdding ? "CANCEL" : "ADD NEW"}</span>
               <span className="inline sm:hidden">{isAdding ? "EXIT" : "LOG"}</span>
             </button>

             <div 
               onClick={() => setViewState('profile')}
               className="flex w-11 h-11 md:w-12 md:h-12 bg-zinc-900 border border-zinc-800 rounded-2xl items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer group hover:border-red-700 shadow-xl"
             >
                <div className="w-5 h-5 transition-transform group-hover:scale-110">
                  <TireIcon />
                </div>
             </div>
          </div>

        </header>


        {/* Secondary Control Sub-header (Filters & Sorting) */}
        {!isAdding && (
           <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-950/40 p-2 rounded-[28px] border border-zinc-900 backdrop-blur-md animate-in slide-in-from-top-2 duration-500">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                 {/* Brand Filter */}
                 <div className="flex items-center h-11 sm:h-9 bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-xl overflow-hidden shadow-inner">
                    <span className="px-3 text-[10px] sm:text-[9px] font-black text-red-600 uppercase tracking-widest border-r border-zinc-800 h-full flex items-center">Brand</span>
                    <select
                      value={filterBrand}
                      onChange={(e) => setFilterBrand(e.target.value)}
                      className="bg-transparent border-none text-zinc-300 sm:text-zinc-400 focus:ring-0 outline-none pl-3 pr-8 h-full cursor-pointer appearance-none font-black text-xs sm:text-[10px] uppercase tracking-wide flex-grow"
                    >
                      <option value="ALL">ALL</option>
                      {uniqueBrands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                 </div>

                 {/* Scale Filter */}
                 <div className="flex items-center h-11 sm:h-9 bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-xl overflow-hidden shadow-inner">
                    <span className="px-3 text-[10px] sm:text-[9px] font-black text-red-600 uppercase tracking-widest border-r border-zinc-800 h-full flex items-center">Scale</span>
                    <select
                      value={filterScale}
                      onChange={(e) => setFilterScale(e.target.value)}
                      className="bg-transparent border-none text-zinc-300 sm:text-zinc-400 focus:ring-0 outline-none pl-3 pr-8 h-full cursor-pointer appearance-none font-black text-xs sm:text-[10px] uppercase tracking-wide flex-grow"
                    >
                      <option value="ALL">ALL</option>
                      {uniqueScales.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>
              </div>

              <div className="flex items-center gap-1 h-11 sm:h-9 bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-xl px-1">
                 {(['carbrand', 'recent', 'alphabetical', 'scale'] as const).map((mode) => (
                   <button
                     key={mode}
                     onClick={() => setSortBy(mode)}
                     className={`flex-1 sm:flex-none h-9 sm:h-7 px-4 rounded-xl sm:rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === mode ? 'bg-red-600 text-white shadow-lg shadow-red-900/40' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800'}`}
                   >
                     {mode === 'carbrand' ? 'GARAGE' : mode === 'alphabetical' ? 'A-Z' : mode === 'recent' ? 'NEW' : 'SIZE'}
                   </button>
                 ))}
              </div>
           </div>
        )}


        <main className="pb-12 flex-grow flex flex-col pt-2">
          {isAdding ? (
            <div className="animate-in slide-in-from-top-4 transition-all duration-300 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 md:p-10 relative shadow-2xl backdrop-blur-xl max-w-5xl mx-auto w-full">
              <h2 className="text-3xl font-black tracking-tight text-white mb-8 flex items-center gap-3">
                 Log New Model
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col gap-8">
                  {/* MULTI Image Upload Area -> Larger text & bolder look */}
                  <div className="flex flex-col gap-3">
                     <label className="text-xs font-bold text-zinc-400 flex justify-between uppercase tracking-wider">
                         Photographic Media <span className="text-zinc-600 font-mono text-[10px] tracking-widest">MULTIPLE ALLOWED</span>
                     </label>
                     <div className="relative border-2 border-dashed border-zinc-700 hover:border-red-500 transition-all bg-zinc-900/50 h-72 sm:h-80 w-full flex flex-col items-center justify-center gap-5 cursor-pointer group rounded-3xl overflow-hidden p-6">
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                          title="Upload Media"
                        />
                        
                        {newImages.length === 0 ? (
                           <>
                              <div className={`p-5 rounded-full bg-zinc-800 text-zinc-500 group-hover:bg-red-500/15 group-hover:text-red-500 transition-all shadow-inner ${isUploading ? 'animate-pulse' : ''}`}>
                                {isUploading ? <div className="w-9 h-9 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div> : <UploadIcon />}
                              </div>
                              <div className="text-center translate-y-3 group-hover:translate-y-0 transition-transform">
                                <p className="text-lg font-black text-zinc-300 mb-2 group-hover:text-white tracking-widest uppercase relative z-10">
                                  {isUploading ? 'Uploading...' : 'Tap to Upload'}
                                </p>
                                <p className="text-xs text-zinc-500 font-mono tracking-wider">JPG & PNG Images Supported</p>
                              </div>
                           </>
                        ) : (
                           <div className="w-full h-full grid grid-cols-3 gap-4 overflow-y-auto max-h-full content-start relative z-10">
                              {newImages.map((url, i) => (
                                 <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-700/80 shadow-md">
                                    <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                 </div>
                              ))}
                              <div className="relative aspect-square rounded-2xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 hover:text-red-500 hover:border-red-500 transition-colors bg-zinc-900/30">
                                 {isUploading ? <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div> : <PlusIcon />}
                                 <span className="text-[10px] mt-2 font-bold tracking-widest uppercase">{isUploading ? 'Uploading' : 'Add More'}</span>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-auto">
                     <div className="flex flex-col gap-2">
                       <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Brand / Category</label>
                       <div className="relative">
                         <select 
                           value={newBrand}
                           onChange={(e) => setNewBrand(e.target.value)}
                           className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-red-500 transition-colors text-white appearance-none cursor-pointer pr-10 shadow-inner"
                         >
                           <option value="" disabled>Select from Registry</option>
                           {categories.map(b => (
                             <option key={b} value={b}>{b}</option>
                           ))}
                         </select>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                         </div>
                       </div>
                     </div>
                     <div className="flex flex-col gap-2">
                       <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Scale Profile</label>
                       <div className="relative">
                         <select 
                           value={newScale}
                           onChange={(e) => setNewScale(e.target.value)}
                           className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-red-500 transition-colors text-white appearance-none cursor-pointer pr-10 shadow-inner"
                         >
                           <option>1:18</option>
                           <option>1:24</option>
                           <option>1:43</option>
                           <option>1:64</option>
                           <option>Other</option>
                         </select>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                         </div>
                       </div>
                     </div>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Model Identity Title</label>
                    <input 
                      type="text" 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-base font-bold focus:outline-none focus:border-red-500 transition-colors text-white placeholder-zinc-700 shadow-inner" 
                      placeholder="e.g. Nissan Skyline GT-R (R34)" 
                    />
                  </div>

                  <div className="flex flex-col gap-2 flex-grow min-h-[160px]">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Data Observation Notes</label>
                    <textarea 
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-red-500 transition-colors text-zinc-300 resize-none flex-grow shadow-inner" 
                      placeholder="Add details about acquisition, specs..."
                    ></textarea>
                  </div>

                  
                  <div className="flex justify-end gap-4 pt-6 mt-auto">
                    <button 
                      onClick={() => setIsAdding(false)}
                      className="px-6 py-4 rounded-full text-sm font-bold text-red-500 bg-red-950/20 hover:bg-red-600 hover:text-white border border-red-900/50 transition-colors uppercase tracking-widest shadow-sm"
                    >
                      Discard Entry
                    </button>
                    <button 
                      onClick={handleAddEntry}
                      disabled={!newTitle || !newBrand || !pendingFile || isUploading}
                      className="px-8 py-4 rounded-full text-sm font-black bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest shadow-xl flex items-center gap-2"

                    >
                      {isUploading ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : null}
                      {isUploading ? 'Processing...' : 'Initialize Entry'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
               {sortBy === 'carbrand' && filterCarBrand === 'ALL' ? (
                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-6 animate-in fade-in duration-500 mt-2">
                   {carStats.map(([slug, count]) => (
                     <div
                        key={slug}
                        className="rounded-[32px] p-[2px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
                        style={{ 
                          background: 'linear-gradient(to bottom, #ef4444, #991b1b)',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
                        }}
                      >
                     <button
                       onClick={() => setFilterCarBrand(slug)}
                       className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 rounded-[30px] overflow-hidden p-6 gap-4 group"
                     >
                       <div className="w-full h-24 bg-zinc-200/95 rounded-2xl p-4 shadow-lg border border-zinc-300/50 flex items-center justify-center opacity-95 group-hover:opacity-100 transition-transform group-hover:scale-110">
                         <img 
                            src={`https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${slug}.png`}
                            className="w-full h-full object-contain filter contrast-125"
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class='text-black font-black text-sm text-center leading-tight uppercase'>${capitalizeSlug(slug)}</span>`; }}
                            alt={slug}
                         />
                       </div>
                       <div className="flex flex-col items-center mt-2">
                         <span className="text-base font-black tracking-tight text-white group-hover:text-red-400 uppercase">{capitalizeSlug(slug)}</span>
                         <span className="text-xs font-bold text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 mt-2">{count} {count === 1 ? 'Model' : 'Models'}</span>
                       </div>
                     </button>
                     </div>
                   ))}
                 </div>
               ) : (
                 <>
                   {sortBy === 'carbrand' && filterCarBrand !== 'ALL' && (
                     <div className="w-full flex justify-between items-center mb-6 animate-in fade-in bg-zinc-950/60 p-4 rounded-3xl border border-zinc-800 backdrop-blur-md mt-2">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-zinc-200/95 rounded-xl p-2 shadow-inner border border-zinc-300/50 flex items-center justify-center shrink-0">
                           <img src={`https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${filterCarBrand}.png`} className="w-full h-full object-contain filter contrast-125" onError={(e) => { e.currentTarget.style.display='none'; }} alt={filterCarBrand} />
                         </div>
                         <div>
                           <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">{capitalizeSlug(filterCarBrand)} GARAGE</h2>
                           <p className="text-xs text-zinc-500 font-mono tracking-widest">{processedCollection.length} MODELS</p>
                         </div>
                       </div>
                       <button 
                         onClick={() => setFilterCarBrand('ALL')}
                         className="px-4 py-3 md:px-6 md:py-3 rounded-xl text-xs font-bold text-white bg-zinc-800 hover:bg-red-600 transition-colors uppercase tracking-widest shadow-sm border border-zinc-700 hover:border-red-500 flex items-center gap-2 shrink-0"
                       >
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="hidden sm:block"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
                         <TireIcon className="w-4 h-4" />
                         <span className="hidden sm:block">Garage</span>
                         <span className="block sm:hidden">Back</span>
                       </button>
                     </div>
                   )}
                   <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5 sm:gap-6 animate-in fade-in duration-500 mt-2">
                     {processedCollection.length === 0 ? (
                       <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-zinc-950/60 rounded-[40px] border border-zinc-800 backdrop-blur-md">
                         <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-5 shadow-inner">
                           <FilterIcon />
                         </div>
                         <h3 className="text-lg font-black text-zinc-300 tracking-tight">No records found</h3>
                         <p className="text-sm text-zinc-500 mt-2">Adjust your filters or add a new model.</p>
                       </div>
                     ) : processedCollection.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setExpandedItem(item)}
                      className="group relative flex flex-col bg-zinc-950 rounded-[20px] sm:rounded-[40px] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(239,68,68,0.2)] border border-zinc-900 hover:border-red-600/30"
                    >

                      <div className="relative aspect-[4/3] overflow-hidden">
                        <ImageWithPlaceholder 
                          src={item.imageUrls[0]} 
                          alt={item.title} 
                          className="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                        
                        {/* Brand Logo Overlay */}
                        <div className="absolute top-4 right-4 z-30 w-12 h-12 bg-white/95 rounded-2xl p-2.5 shadow-xl border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
                          <img 
                            src={getBrandLogo(item.title)} 
                            alt="Brand" 
                            className="w-full h-full object-contain filter contrast-125" 
                            onError={(e) => { (e.currentTarget.parentNode as HTMLDivElement).style.display = 'none'; }}
                          />
                        </div>

                        {item.imageUrls.length > 1 && (
                          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 px-2.5 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                            <span className="text-[10px] font-black text-white/90">{item.imageUrls.length} PHOTOS</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col p-3 sm:p-6 pt-2">
                        <h3 className="text-xs sm:text-lg font-black tracking-tight text-white group-hover:text-red-500 transition-colors line-clamp-2 leading-tight mb-1 sm:mb-4">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="hidden sm:inline text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                            {item.manufacturer}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-black text-red-600/80 tracking-tighter">
                            {item.scale}
                          </span>
                        </div>
                      </div>
                    </div>
                     ))}
                   </div>
                 </>
               )}
            </>
          )}
        </main>
      </div>
      
      {/* Global CSS for Animations & Scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glare {
           0% { transform: translateX(-150%) skewX(-12deg); }
           100% { transform: translateX(250%) skewX(-12deg); }
        }
        @keyframes wind {
           0% { transform: translateX(100vw); opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { transform: translateX(-100vw); opacity: 0; }
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}