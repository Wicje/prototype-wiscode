'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BrainCircuit,
  LayoutGrid,
  Shield,
  GitMerge,
  SquareDashedBottomCode
} from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/studio-brain', label: 'Studio Brain', icon: BrainCircuit },
  { href: '/mood-board', label: 'Mood Board', icon: LayoutGrid },
  { href: '/client-vault', label: 'Client Vault', icon: Shield },
  { href: '/financial-triggers', label: 'Financial Triggers', icon: GitMerge },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full max-w-[240px] flex-col bg-white border-r border-[#E5E5E5] shrink-0 z-10">
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-8 px-4">
          <div className="flex flex-col w-full flex-1">
            <div className="flex h-full min-h-[700px] flex-col justify-between">
              <div className="flex flex-col gap-10">
                
                {/* Logo Area */}
                <div className="flex gap-3 items-center px-3">
                  <div className="flex items-center justify-center bg-black text-white rounded-full size-10 flex-shrink-0 relative overflow-hidden">
                     <SquareDashedBottomCode className="size-6 text-white" />
                  </div>
                  <h1 className="text-[#111111] text-lg font-bold leading-normal tracking-wide uppercase">Wiscode</h1>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    // Studio-brain acts uniquely (doesn't usually show sidebar) but if it's there, active state is mapped
                    const isActive = mounted && pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                          'flex items-center gap-3 px-3 py-3 rounded-sm transition-colors relative group',
                          isActive 
                            ? 'text-[#111111] bg-surface' 
                            : 'text-muted hover:text-[#111111] hover:bg-surface'
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"></div>
                        )}
                        <item.icon className="size-5" />
                        <p className="text-[15px] font-medium leading-normal">{item.label}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="flex items-center gap-3 px-3 py-2 mt-auto">
                <div className="w-2 h-2 bg-black animate-[blink_1s_infinite]"></div>
                <p className="text-muted text-xs uppercase tracking-widest">System Active</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
