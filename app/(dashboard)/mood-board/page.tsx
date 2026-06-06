'use client';

import { Upload, Share2, Settings, RefreshCw, X, Link as LinkIcon, Palette, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useAppState } from '@/components/AppStateContext';
import { useState } from 'react';

export default function MoodBoardPage() {
  const { moodItems, addMoodItem } = useAppState();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  
  const handleAddItem = (type: 'image' | 'color' | 'link') => {
    let title = '';
    let content = '';
    let url = '';

    if (type === 'image') {
      const seed = Math.random().toString(36).substring(7);
      url = `https://picsum.photos/seed/${seed}/800/800`;
      title = "New Image Inspiration";
    } else if (type === 'color') {
      const randomColor = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
      content = `#${randomColor}`;
      title = `Hex ${content}`;
    } else if (type === 'link') {
      content = "awwwards.com";
      title = "New Reference Link";
    }

    addMoodItem({
      id: Date.now().toString(),
      type,
      url,
      content,
      title,
      height: 'aspect-square'
    });
    setIsAddMenuOpen(false);
  };

  return (
    <main className="w-full flex-1 overflow-y-auto px-6 py-6 pt-24 min-h-screen bg-white">
      
      {/* Floating Toolbar */}
      <div className="fixed top-6 right-6 z-50 flex items-start gap-2 flex-col items-end">
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
            className="flex items-center justify-center h-10 px-4 bg-primary text-white rounded-sm shadow-md hover:bg-primary/90 transition-colors cursor-pointer text-sm font-bold tracking-wide group relative"
          >
            {isAddMenuOpen ? <X className="size-4" /> : <><Upload className="mr-2 size-4" /> Add Asset</>}
          </button>
        </div>

        {isAddMenuOpen && (
          <div className="flex flex-col bg-white border border-border-color shadow-xl rounded-sm py-2 mt-2 w-48 text-[#111111]">
            <button onClick={() => handleAddItem('image')} className="flex items-center gap-3 px-4 py-3 hover:bg-surface text-left text-[14px] font-bold font-sans">
              <ImageIcon className="size-4" /> Image Reference
            </button>
            <button onClick={() => handleAddItem('color')} className="flex items-center gap-3 px-4 py-3 hover:bg-surface text-left text-[14px] font-bold font-sans">
              <Palette className="size-4" /> Color Swatch
            </button>
            <button onClick={() => handleAddItem('link')} className="flex items-center gap-3 px-4 py-3 hover:bg-surface text-left text-[14px] font-bold font-sans">
              <LinkIcon className="size-4" /> Web Link
            </button>
          </div>
        )}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 w-full pb-32">
        {moodItems.map((item) => (
          <div key={item.id} className="mb-6 break-inside-avoid">
            {item.type === 'skeleton' ? (
              <div className={`relative rounded-sm bg-surface animate-pulse flex items-center justify-center border border-border-color w-full ${item.height}`}>
                 <RefreshCw className="text-[#888888] animate-spin size-6" />
              </div>
            ) : item.type === 'color' ? (
              <div className={`relative group rounded-sm overflow-hidden cursor-pointer border border-border-color transition-colors flex items-center justify-center w-full ${item.height}`} style={{ backgroundColor: item.content as string }}>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end p-4">
                  <span className="text-white mix-blend-difference text-[14px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 truncate w-full font-sans tracking-wide">
                    {item.title}
                  </span>
                </div>
              </div>
            ) : item.type === 'link' ? (
              <div className={`relative group rounded-sm overflow-hidden cursor-pointer border border-border-color hover:border-[#111111] transition-colors flex flex-col items-center justify-center bg-white p-6 w-full ${item.height}`}>
                <LinkIcon className="size-8 mb-4 text-[#111111]" />
                <span className="text-[#111111] text-[16px] font-bold font-sans truncate w-full text-center">{item.content}</span>
              </div>
            ) : (
              <div className="relative group rounded-sm overflow-hidden cursor-pointer border border-transparent hover:border-border-color transition-colors">
                <div className={`relative w-full ${item.height}`}>
                  <Image 
                    src={item.url!} 
                    alt={item.title || "Moodboard Image"} 
                    fill 
                    className="object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end p-4">
                  <span className="text-white text-[12px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 truncate w-full font-sans tracking-wide">
                    {item.title}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
