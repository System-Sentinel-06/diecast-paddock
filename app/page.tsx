"use client";

import React, { useState, useMemo, useEffect } from 'react';

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

const TireIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

const ImageWithPlaceholder = ({ src, alt, className, innerClassName = "w-full h-full object-cover" }: { src: string, alt: string, className?: string, innerClassName?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative overflow-hidden bg-zinc-900/50 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 animate-pulse">
           <div className="w-6 h-6 border-2 border-red-900/20 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`${innerClassName} transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-2xl'}`}
      />
    </div>
  );
};



// ==========================================
// DATA & TYPES
// ==========================================
const INITIAL_CATEGORIES = [
  "AutoWorld",
  "Bburago",
  "GreenLight",
  "Hot Wheels - Mainline",
  "Hot Wheels - Premium",
  "Hot Wheels - RLC",
  "Hot Wheels - Team Transport",
  "Inno64",
  "Johnny Lightning",
  "Kaido House",
  "Maisto",
  "Majorette",
  "Matchbox - Basic",
  "Matchbox - Collectors",
  "Matchbox - Moving Parts",
  "Mini GT",
  "Tarmac Works",
  "Tomica - Basic",
  "Tomica - Limited Vintage",
  "Tomica - Premium"
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

const initialMockCollection: DiecastModel[] = [
  {
    id: 1,
    title: "Porsche 911 GT3 RS",
    scale: "1:64",
    manufacturer: "Mini GT",
    description: "Picked this up recently. Beautiful casting with rubber tires and great detail.",

    dateAdded: "2026-02-15",
    imageUrls: [
      "https://images.unsplash.com/photo-1503376762364-bbcf086c9688?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Nissan Skyline GT-R R34",
    scale: "1:64",
    manufacturer: "Hot Wheels - Premium",
    description: "From the Fast & Furious premium set. Diecast base and real riders.",

    dateAdded: "2026-01-20",
    imageUrls: [
      "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "McLaren F1 LM",
    scale: "1:64",
    manufacturer: "Hot Wheels - Mainline",
    description: "Papaya orange mainline. Found it on the pegs at Target. Card is slightly bent.",

    dateAdded: "2025-11-05",
    imageUrls: [
      "https://images.unsplash.com/photo-1620882813813-808ab116d418?q=80&w=800&auto=format&fit=crop"
    ]
  }
];

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
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Canvas toBlob failed'));
          },
          'image/jpeg',
          0.8 // target 80% quality for excellent balance
        );
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
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
        i.manufacturer.toLowerCase().includes(q)
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

  useEffect(() => {
    document.body.style.overflow = expandedItem ? 'hidden' : '';
  }, [expandedItem]);

  // Actions
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      try {
        const files = Array.from(e.target.files);
        // Upload files sequentially or in parallel? Parallel is faster.
        const uploadPromises = files.map(async (file) => {
          // Perform client-side compression to JPEG
          const compressedBlob = await compressImage(file);
          
          // Map original filename to a .jpg extension for uniformity
          const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "_");
          const filename = `${cleanName}_compressed.jpg`;
          
          const response = await fetch(`/api/upload?filename=${filename}`, {
            method: 'POST',
            body: compressedBlob,
          });
          const newBlob = await response.json();
          return newBlob.url;
        });

        
        const urls = await Promise.all(uploadPromises);
        setNewImages(prev => [...prev, ...urls]);
      } catch (error) {
        console.error('Error uploading images:', error);
        alert('Failed to upload images. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };


  const handleAddEntry = () => {
     if(!newTitle || !newBrand) return;
     
     const newId = collection.length > 0 ? Math.max(...collection.map(c => c.id)) + 1 : 1;
     const entryImages = newImages.length > 0 ? newImages : [
        "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop"
     ];

     const newEntry: DiecastModel = {
        id: newId,
        title: newTitle,
        scale: newScale,
        manufacturer: newBrand,
        description: newDesc || "No notes provided.",

        dateAdded: new Date().toISOString().split('T')[0],
        imageUrls: entryImages
     };

     setCollection([newEntry, ...collection]);
     setIsAdding(false);
     
     setNewTitle('');
     setNewBrand('');
     setNewDesc('');

     setNewImages([]);
  };

  const handleDeleteEntry = (id: number) => {
     setCollection(prev => prev.filter(item => item.id !== id));
     setExpandedItem(null);
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
      <div className="relative min-h-screen w-full bg-[#060202] overflow-hidden flex items-center justify-center font-sans tracking-tight">
        <AmbientBackground isIntro={true} />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 mt-10 max-w-[1600px] mx-auto w-full gap-12 md:gap-8">

          
          {/* Left Text Block */}
          <div className="flex flex-col items-start text-left max-w-xl flex-shrink-0 z-20">
             <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 mb-4 sm:mb-6 drop-shadow-2xl">
               Diecast<br/><span className="text-red-600">Paddock</span>
             </h1>

             <p className="text-zinc-400 font-sans text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-md pr-4 font-medium drop-shadow-md border-l-2 border-red-600/40 pl-5">
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
          <div className="w-full flex justify-center md:justify-end relative h-[250px] md:h-[400px] z-10">
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
           <header className="flex items-center justify-between bg-zinc-950/80 p-5 rounded-3xl border border-zinc-800/80 backdrop-blur-xl mb-10 shadow-2xl">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] text-white">
                    <TireIcon />
                 </div>

                  <div>
                      <h1 className="text-3xl font-black text-white tracking-tight">Pranav S&apos;s Collection</h1>
                      <p className="text-sm font-mono text-zinc-400">Diecast Collection Stats</p>
                  </div>
              </div>

              <div className="flex items-center gap-3">
                 <button 
                    onClick={() => setViewState('intro')}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shadow-md"
                    title="Return to Home"
                 >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                 </button>
                 <button 
                    onClick={() => setViewState('dashboard')}
                    className="flex items-center gap-2 h-12 px-6 bg-red-600 hover:bg-red-500 rounded-2xl text-sm font-bold uppercase transition-all shadow-[0_4px_15px_rgba(239,68,68,0.3)] text-white"
                 >
                    Return to Paddock
                 </button>
              </div>
           </header>

           <div className="flex flex-col lg:flex-row gap-8 mb-10 items-stretch">
              
              {/* Pillar 1: Total & Scale */}
              <div className="w-full lg:w-1/3 flex flex-col gap-6">
                 {/* Main Stat */}
                 <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group flex-shrink-0">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-600/10 blur-[40px] rounded-full group-hover:bg-red-600/20 transition-all"></div>
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Total Collection</h3>
                    <p className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 drop-shadow-lg">
                       {collection.length}
                    </p>
                    <p className="text-sm text-zinc-400 mt-2 font-mono">Logged Models</p>
                 </div>

                 {/* Scale stats */}
                 <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex-grow overflow-y-auto hide-scrollbar max-h-[400px]">
                    <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-4">By Scale Dimension</h4>
                    {scaleStats.length > 0 ? (
                       <div className="flex flex-wrap gap-3">
                          {scaleStats.map(([scale, count]) => (
                             <div key={scale} className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
                                <span className="font-bold text-zinc-300 text-sm">{scale}</span>
                                <span className="text-orange-400 font-mono text-xs font-bold bg-zinc-950 px-2 py-0.5 rounded shadow-inner">{count}</span>
                             </div>
                          ))}
                       </div>
                    ) : (
                       <p className="text-sm text-zinc-500 italic">No models logged yet.</p>
                    )}
                 </div>
              </div>

              {/* Pillar 2: Diecast Manufacturer Stats */}
              <div className="w-full lg:w-1/3 flex flex-col">
                 <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex-grow overflow-y-auto hide-scrollbar max-h-[600px]">
                    <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-4">By Diecast Manufacturer</h4>
                    {brandStats.length > 0 ? (
                       <div className="flex flex-col gap-4">
                          {brandStats.map(([brand, count]) => (
                             <div key={brand} className="flex items-center justify-between border-b border-zinc-800/50 pb-3">
                                <span className="text-base font-bold text-zinc-200">{brand}</span>
                                <span className="bg-zinc-900 border border-zinc-700 font-mono text-sm text-red-400 px-3 py-1 rounded-xl shadow-inner font-bold">
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
           <div className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl flex flex-col mb-10">
                  
                 <div className="mb-8">
                    <h3 className="text-xl font-black text-white mb-2">Registry Configuration</h3>
                    <p className="text-zinc-400 text-base">Manage the dropdown list of accessible brands/categories when logging a new model.</p>
                 </div>

                 <div className="flex items-center gap-4 mb-8 bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
                    <input 
                       type="text"
                       value={newCatName}
                       onChange={(e) => setNewCatName(e.target.value)}
                       placeholder="E.g. Jada Toys, M2 Machines..."
                       className="flex-grow bg-transparent border-none outline-none px-4 py-2 text-base text-white placeholder-zinc-600"
                    />
                    <button 
                       onClick={handleAddCategory}
                       disabled={!newCatName.trim()}
                       className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm uppercase rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(239,68,68,0.3)]"
                    >
                       Add Brand
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

  // ==========================================
  // VIEW: DASHBOARD (MAIN)
  // ==========================================
  return (
    <div className="relative min-h-screen bg-[#060202] text-zinc-300 font-sans tracking-tight overflow-x-hidden p-3 md:p-6">
      
      {/* Universal Ambient Dark/Red Background for consistency across pages */}
      <AmbientBackground />

      {/* Expanded Modal Overlay */}
      {expandedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 font-sans">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl transition-opacity animate-in fade-in" onClick={() => setExpandedItem(null)}></div>

          <div className="relative z-10 w-full h-[95vh] md:h-auto max-w-[1400px] md:max-h-[85vh] bg-zinc-950 rounded-[40px] md:border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row group animate-in zoom-in-95 duration-200">

            
            <button 
              onClick={() => setExpandedItem(null)}
              className="absolute top-5 right-5 z-40 p-3 bg-zinc-900/80 hover:bg-black hover:text-white text-zinc-400 rounded-full transition-all backdrop-blur-md shadow-2xl border border-zinc-800"
            >
              <CloseIcon />
            </button>

            {/* Left side: Images Area */}
            <div className="w-full md:w-[50%] lg:w-[60%] relative flex flex-col bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-800/80 aspect-video md:aspect-auto">
                {/* Main Image */}
                <div className="relative flex-grow min-h-[35vh] md:min-h-0 bg-[#080808] overflow-hidden rounded-t-[40px] md:rounded-tr-none md:rounded-l-[40px]">
                  <ImageWithPlaceholder 
                    src={expandedItem.imageUrls[activeImageIndex]} 
                    alt={`${expandedItem.title} - View ${activeImageIndex + 1}`}
                    className="w-full h-full"
                  />

                  <div className="absolute top-5 left-5 font-mono text-[11px] text-zinc-300 bg-zinc-950/80 px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5 z-10 shadow-lg border border-zinc-800">
                     IMG {activeImageIndex + 1}/{expandedItem.imageUrls.length}
                  </div>
                  
                  {/* Expanded Logo */}
                  <div className="absolute bottom-5 right-5 z-30 w-20 h-20 bg-white rounded-2xl p-4 shadow-2xl border border-white/20 flex items-center justify-center opacity-95 hover:opacity-100 transition-transform hover:scale-105">
                     <img 
                        src={getBrandLogo(expandedItem.title)} 
                        alt="Logo" 
                        className="w-full h-full object-contain" 
                        onError={(e) => { (e.currentTarget.parentNode as HTMLDivElement).style.display = 'none'; }}
                     />
                  </div>

                  {expandedItem.imageUrls.length > 1 && (
                     <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev - 1 + expandedItem.imageUrls.length) % expandedItem.imageUrls.length); }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-black/60 text-white hover:bg-red-600 backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                        >
                           &larr;
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev + 1) % expandedItem.imageUrls.length); }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-black/60 text-white hover:bg-red-600 backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                        >
                           &rarr;
                        </button>
                     </>
                   )}
                </div>

                {/* Thumbnails */}
                {expandedItem.imageUrls.length > 1 && (
                   <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30 max-w-[80%] overflow-x-auto hide-scrollbar p-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5">
                    {expandedItem.imageUrls.map((url, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`relative w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === i ? 'border-red-600 scale-105 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}`}
                      >
                         <ImageWithPlaceholder src={url} alt={`Thumb ${i}`} className="w-full h-full" />
                      </button>
                    ))}
                  </div>
                )}
            </div>

            {/* Right side: Content Scrollable */}
            <div className="w-full md:w-[50%] lg:w-[40%] flex flex-col h-full overflow-y-auto bg-zinc-950 p-6 sm:p-8 md:p-12 hide-scrollbar">
               
               <div className="flex items-center gap-3 mb-5">
                  <div className="font-mono text-[10px] text-zinc-300 flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-md border border-zinc-800 shadow-inner">
                     <span className="w-2 h-2 rounded-full bg-red-600"></span>
                     ID:{expandedItem.id.toString().padStart(4, '0')}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 bg-zinc-900 px-3 py-1 rounded-md border border-zinc-800 shadow-inner">
                     {expandedItem.dateAdded}
                  </div>
               </div>

               <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-8 leading-tight pr-10">
                 {expandedItem.title}
               </h2>

               <div className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b border-zinc-900">
                  <div className="flex flex-col gap-1 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 flex-grow">
                    <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest pl-1">Manufacturer</span>
                    <span className="font-bold text-lg text-zinc-100">{expandedItem.manufacturer}</span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-orange-950/20 rounded-2xl border border-orange-900/30 flex-grow sm:max-w-[150px]">
                    <span className="font-mono text-[11px] text-orange-600/80 uppercase tracking-widest pl-1">Scale Dimension</span>
                    <span className="font-bold text-xl text-orange-500">{expandedItem.scale}</span>
                  </div>
               </div>

               <div className="flex flex-col gap-3 flex-grow mb-6">
                  <h4 className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest pl-1">
                     Observation Notes
                  </h4>
                  <div className="text-zinc-300 text-base leading-relaxed p-5 bg-zinc-900/40 rounded-2xl border border-zinc-800/50">
                     {expandedItem.description}
                  </div>
               </div>

               {/* Delete Action at the bottom */}
               <div className="mt-6 pt-6 border-t border-zinc-900/80 flex justify-end">
                  <button 
                     onClick={() => handleDeleteEntry(expandedItem.id)}
                     className="flex items-center gap-3 px-6 py-3 border border-red-900/50 bg-red-950/20 text-red-500 hover:bg-red-600 hover:text-white rounded-2xl text-sm font-bold uppercase transition-all shadow-md hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  >
                     <TrashIcon /> Delete Registry
                  </button>
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


          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setViewState('profile')}
               className="flex items-center justify-center h-11 w-11 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all hover:scale-105"
               title="Profile Stats"
             >
                <TireIcon />
             </button>

             <button 
               onClick={() => setIsAdding(!isAdding)}
               className="flex items-center justify-center gap-2 rounded-2xl px-5 h-11 text-[11px] font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-500 hover:shadow-[0_4px_20px_rgba(239,68,68,0.4)] transition-all"
             >
               {isAdding ? <CloseIcon /> : <PlusIcon />}
               <span>{isAdding ? "CANCEL" : "ADD NEW"}</span>
             </button>
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
                      disabled={!newTitle || !newBrand || isUploading}
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
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 animate-in fade-in duration-500 mt-2">
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
                         <span className="hidden sm:block">Garage</span>
                         <span className="block sm:hidden">Back</span>
                       </button>
                     </div>
                   )}
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 animate-in fade-in duration-500 mt-2">
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
                      className="group relative flex flex-col bg-zinc-950 rounded-[40px] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(239,68,68,0.2)] border border-zinc-900 hover:border-red-600/30"
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

                      <div className="flex flex-col p-6 pt-2">
                        <h3 className="text-lg font-black tracking-tight text-white group-hover:text-red-500 transition-colors line-clamp-2 leading-tight mb-4">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                            {item.manufacturer}
                          </span>
                          <span className="px-3 py-1 text-[10px] font-black tracking-tighter bg-red-600/10 text-red-500 rounded-lg border border-red-900/30">
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