'use client';

import { useState } from 'react';
import { Zap, ChevronRight, X, Receipt } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppState } from '@/components/AppStateContext';

import Link from 'next/link';

export default function DashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { brainDumps } = useAppState();
  const recentDumps = brainDumps.slice(0, 3);

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-white relative pt-32 px-16 lg:px-32">
      <div className="max-w-4xl mx-auto flex flex-col gap-16 pb-32">
        
        {/* Trigger Alert Banner */}
        <button 
          onClick={() => setDrawerOpen((prev) => !prev)}
          className="w-full text-left group outline-none"
        >
          <div className="flex items-center justify-between py-4 px-6 border border-border-color hover:border-primary rounded-sm transition-colors duration-200 bg-white">
            <div className="flex items-center gap-4">
              <Zap className="text-primary size-5" />
              <p className="text-[15px] text-[#111111] font-medium font-sans">
                Signal: Invoice #042 pending for Project X approval.
              </p>
            </div>
            <ChevronRight className="text-muted group-hover:text-primary transition-colors duration-200 size-5" />
          </div>
        </button>

        {/* Recent Brain Dumps */}
        <section className="flex flex-col gap-8">
          <h2 className="font-heading text-[32px] leading-tight text-[#111111]">
            Recent Brain Dumps
          </h2>
          <div className="flex flex-col">
            {recentDumps.map((dump) => (
              <Link 
                key={dump.id}
                href="/studio-brain" 
                className="block group border-b border-border-color hover:bg-surface transition-colors duration-200 px-4 py-6 rounded-sm -mx-4 uppercase-none"
              >
                <div className="flex justify-between items-start gap-8">
                  <p className="text-[15px] leading-[1.6] text-[#111111] line-clamp-2 max-w-2xl font-sans">
                    {dump.content}
                  </p>
                  <span className="text-xs text-muted whitespace-nowrap pt-1 font-sans font-medium tracking-wide">
                    {dump.time}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Slide-In Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/10 z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-white border-l border-border-color z-50 shadow-2xl flex flex-col font-sans"
            >
              <div className="flex items-center justify-between p-8 border-b border-border-color">
                <h3 className="font-heading text-2xl text-[#111111]">Trigger Details</h3>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="text-muted hover:text-[#111111] transition-colors p-2 rounded-sm hover:bg-surface"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="p-8 flex-1 overflow-y-auto flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted uppercase tracking-widest font-medium">Condition</label>
                  <div className="px-4 py-3 border border-border-color bg-surface rounded-sm text-[15px] text-[#111111] font-medium font-sans">
                    If Project X Status = "Approved"
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted uppercase tracking-widest font-medium">Action</label>
                  <div className="px-4 py-3 border border-border-color bg-white rounded-sm text-[15px] text-[#111111] flex items-center gap-3 font-medium font-sans">
                    <Receipt className="text-primary size-5" />
                    Send 50% Invoice (#042)
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <label className="text-xs text-muted uppercase tracking-widest font-medium">Status</label>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-sm"></div>
                    <span className="text-[15px] text-[#111111] font-medium font-sans">Pending Client Approval</span>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-border-color bg-surface">
                <button className="w-full bg-[#111111] text-white font-medium text-[13px] uppercase tracking-[1px] h-12 rounded-sm hover:bg-primary transition-colors duration-200">
                  Execute Manually
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
