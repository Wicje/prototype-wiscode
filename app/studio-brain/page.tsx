'use client';

import { useState } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useAppState, BrainDump } from '@/components/AppStateContext';

export default function StudioBrainPage() {
  const router = useRouter();
  const { brainDumps, addBrainDump } = useAppState();
  const [inputValue, setInputValue] = useState('');
  const [syncError, setSyncError] = useState(false);

  const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      const text = inputValue.trim();
      if (!text) return;

      const isImage = text.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null || text.includes('picsum.photos');
      const tags = text.match(/#[\w-]+/g)?.map(t => t.slice(1)) || [];

      const newItem: BrainDump = {
        id: Date.now().toString(),
        type: isImage ? 'image' : 'text',
        content: isImage ? undefined : text,
        url: isImage ? text : undefined,
        tags: tags,
        time: 'Just now'
      };

      addBrainDump(newItem);
      setInputValue('');

      if (Math.random() < 0.2) {
        setSyncError(true);
        setTimeout(() => setSyncError(false), 3000);
      }
    }
  };


  const processText = (text: string) => {
    // Basic regex to wrap #tags
    const parts = text.split(/(#[\w-]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return <span key={i} className="text-muted hover:text-primary cursor-pointer transition-colors">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <main className="w-full max-w-[640px] px-6 py-16 sm:py-24 mx-auto flex flex-col gap-16 relative min-h-screen bg-white">
      {/* Header */}
      <header className="w-full flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-sm z-10 py-4 mb-4 border-b border-border-color transition-all">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center text-[#111111] hover:text-muted transition-colors group"
        >
          <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1 size-5 text-current" />
          <span className="uppercase tracking-widest text-[12px] font-bold">Back to Main</span>
        </button>
        <h1 className="text-[#111111] font-heading text-[24px]">Studio Brain</h1>
      </header>

      {/* Input Section */}
      <section className="w-full flex flex-col gap-2 relative">
        <textarea 
          autoFocus
           title="Type or drop media"
          className="w-full bg-transparent border-0 border-b border-transparent resize-none p-0 text-[15px] leading-[1.6] focus:ring-0 focus:border-[#111111] transition-colors placeholder:text-muted placeholder:text-2xl min-h-[40px] overflow-hidden outline-none font-sans font-medium"
          placeholder="Type or drop media..."
          rows={1}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          onKeyDown={handleSubmit}
        ></textarea>
        
        <AnimatePresence>
          {syncError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[12px] text-primary flex items-center gap-1 font-bold absolute -bottom-6 left-0"
            >
              <AlertTriangle className="size-4" />
              Sync failed. Saved locally.
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Feed */}
      <section className="w-full flex flex-col gap-12 pb-32">
        <AnimatePresence initial={false}>
          {brainDumps.map((item) => (
            <motion.article 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              {item.type === 'image' && item.url ? (
                <div className="w-full relative rounded-sm border border-border-color overflow-hidden bg-surface group hover:border-[#111111] transition-colors">
                   <div className="relative w-full aspect-video">
                     <Image 
                       src={item.url} 
                       alt={item.alt || ""} 
                       fill 
                       className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" 
                       referrerPolicy="no-referrer"
                     />
                   </div>
                </div>
              ) : (
                <p className="text-[15px] leading-[1.6] text-[#111111] whitespace-pre-wrap font-sans font-medium">
                  {processText(item.content || "")}
                </p>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="flex gap-2 text-[12px] font-medium font-sans">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-muted hover:text-primary cursor-pointer transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </AnimatePresence>
      </section>
    </main>
  );
}
