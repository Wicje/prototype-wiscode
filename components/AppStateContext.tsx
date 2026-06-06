'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type BrainDump = {
  id: string;
  type: 'text' | 'image';
  content?: string;
  url?: string;
  alt?: string;
  tags: string[];
  time: string;
};

export type MoodItem = {
  id: string;
  type: 'image' | 'color' | 'link' | 'skeleton';
  url?: string;
  title?: string;
  height: string;
  content?: string; // color hex or link
};

export type VaultFile = {
  id: string;
  name: string;
  size: string;
  type: string;
};

type AppStateContextType = {
  brainDumps: BrainDump[];
  addBrainDump: (dump: BrainDump) => void;
  moodItems: MoodItem[];
  addMoodItem: (item: MoodItem) => void;
  vaultFiles: VaultFile[];
  addVaultFile: (file: VaultFile) => void;
};

const defaultBrainDumps: BrainDump[] = [
  {
    id: '1', type: 'text',
    content: "Client alignment call insights: They are pushing for a more brutalist approach on the landing page. Need to strip back the rounded corners and emphasize typography. Let's look at some architectural references.",
    tags: ['strategy', 'q3-rebrand'], time: '2h ago'
  },
  {
    id: '2', type: 'text',
    content: "Reviewing the latest typography scales. Instrument Serif feels a bit too decorative for the data tables. Let's stick to PP Mori for all functional UI elements.\n\nAction: Update the Figma token library.",
    tags: ['design-system'], time: 'Yesterday'
  },
  {
    id: '3', type: 'text',
    content: "Initial draft for the Q3 financial triggers. Set up a rule to automatically send the 50% deposit invoice upon signed SOW. Need to verify webhook integration with Stripe.",
    tags: ['billing'], time: 'Oct 12'
  }
];

const defaultMoodItems: MoodItem[] = [
  { id: '1', type: 'image', url: "https://picsum.photos/seed/brutal1/800/800", title: "Concrete & Crimson", height: "aspect-square" },
  { id: '2', type: 'image', url: "https://picsum.photos/seed/brutal2/800/1000", title: "Typographic Distortion", height: "aspect-[4/5]" },
  { id: '3', type: 'image', url: "https://picsum.photos/seed/brutal3/800/1200", title: "Structural Silhouette", height: "aspect-[2/3]" },
  { id: '5', type: 'color', content: "#d41111", title: "Primary Accent (#d41111)", height: "aspect-square" },
  { id: '6', type: 'link', content: "awwwards.com", title: "Ref Link", height: "aspect-[4/5]" },
];

const defaultVaultFiles: VaultFile[] = [
  { id: '1', name: 'brand_guidelines_v2.pdf', size: '4.2 MB', type: 'PDF' },
  { id: '2', name: 'logo_assets_final.zip', size: '12.8 MB', type: 'ZIP' },
  { id: '3', name: 'component_library.fig', size: '8.4 MB', type: 'FIG' },
];

export const AppStateContext = createContext<AppStateContextType | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [brainDumps, setBrainDumps] = useState<BrainDump[]>([]);
  const [moodItems, setMoodItems] = useState<MoodItem[]>([]);
  const [vaultFiles, setVaultFiles] = useState<VaultFile[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const storedBD = localStorage.getItem('wiscode_brain_dumps');
      const storedMI = localStorage.getItem('wiscode_mood_items');
      const storedVF = localStorage.getItem('wiscode_vault_files');

      setBrainDumps(storedBD ? JSON.parse(storedBD) : defaultBrainDumps);
      setMoodItems(storedMI ? JSON.parse(storedMI) : defaultMoodItems);
      setVaultFiles(storedVF ? JSON.parse(storedVF) : defaultVaultFiles);
    } catch {
      setBrainDumps(defaultBrainDumps);
      setMoodItems(defaultMoodItems);
      setVaultFiles(defaultVaultFiles);
    }
    setMounted(true);
  }, []);

  const addBrainDump = (dump: BrainDump) => {
    setBrainDumps(prev => {
      const next = [dump, ...prev];
      localStorage.setItem('wiscode_brain_dumps', JSON.stringify(next));
      return next;
    });
  }

  const addMoodItem = (item: MoodItem) => {
    setMoodItems(prev => {
      const next = [item, ...prev];
      localStorage.setItem('wiscode_mood_items', JSON.stringify(next));
      return next;
    });
  }

  const addVaultFile = (file: VaultFile) => {
    setVaultFiles(prev => {
      const next = [file, ...prev];
      localStorage.setItem('wiscode_vault_files', JSON.stringify(next));
      return next;
    });
  }

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <AppStateContext.Provider value={{ brainDumps, addBrainDump, moodItems, addMoodItem, vaultFiles, addVaultFile }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
    const context = useContext(AppStateContext);
    if (!context) throw new Error("useAppState must be used within an AppStateProvider");
    return context;
}
