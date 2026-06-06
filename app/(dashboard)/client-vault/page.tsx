'use client';

import { Shield, Folder, File, Download, MoreVertical, Lock, Plus, Upload } from 'lucide-react';
import { useAppState } from '@/components/AppStateContext';
import { useRef } from 'react';

const vaultFolders = [
  { id: 1, name: 'Phase 1 Deliverables', date: 'Oct 24', files: 12, status: 'approved' },
  { id: 2, name: 'Final Brand Assets', date: 'Oct 15', files: 8, status: 'locked' },
  { id: 3, name: 'Moodboards v2', date: 'Sep 30', files: 24, status: 'approved' },
];

export default function ClientVaultPage() {
  const { vaultFiles, addVaultFile } = useAppState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate an upload text addition
      const fileExt = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      
      addVaultFile({
        id: Date.now().toString(),
        name: file.name,
        size: sizeMB,
        type: fileExt
      });
    }
  };

  return (
    <main className="w-full flex-1 overflow-y-auto px-6 py-12 lg:p-16 min-h-screen bg-white font-sans text-[#111111]">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 pb-32">
        {/* Header */}
        <header className="flex flex-col gap-2 border-b border-border-color pb-8">
          <div className="flex items-center gap-3">
            <Shield className="size-8" strokeWidth={1.5} />
            <h1 className="font-heading text-[40px] leading-none text-[#111111]">Client Vault</h1>
          </div>
          <p className="text-[15px] text-muted max-w-2xl mt-2 font-medium">
            Secure asset delivery and approval system. Assets remain marked as draft or watermarked until financial triggers are met.
          </p>
        </header>

        {/* Folders */}
        <section className="flex flex-col gap-6">
          <h2 className="text-[14px] uppercase tracking-widest text-[#111111] font-bold">Secure Folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaultFolders.map((folder) => (
              <div 
                key={folder.id} 
                className="border border-border-color p-6 hover:border-[#111111] transition-colors cursor-pointer group bg-surface/50 hover:bg-white"
              >
                <div className="flex justify-between items-start mb-6">
                  {folder.status === 'locked' ? (
                    <Lock className="text-muted size-6 group-hover:text-[#111111] transition-colors" />
                  ) : (
                    <Folder className="text-muted size-6 group-hover:text-[#111111] transition-colors" />
                  )}
                  <MoreVertical className="text-muted opacity-0 group-hover:opacity-100 transition-opacity size-5" />
                </div>
                <h3 className="font-bold text-[16px] mb-2 truncate">{folder.name}</h3>
                <div className="flex items-center justify-between text-[13px] text-muted font-medium">
                  <span>{folder.files} assets</span>
                  <span>{folder.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Files */}
        <section className="flex flex-col gap-6 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] uppercase tracking-widest text-[#111111] font-bold">Recent Assets</h2>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-[#111111] hover:bg-primary text-white px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors"
            >
              <Upload className="size-4" /> Upload Asset
            </button>
          </div>
          <div className="flex flex-col border border-border-color">
            {vaultFiles.map((file, i) => (
              <div 
                key={file.id} 
                className={`flex items-center justify-between p-4 bg-white hover:bg-surface transition-colors cursor-pointer group ${
                  i !== vaultFiles.length - 1 ? 'border-b border-border-color' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <File className="text-muted size-5 group-hover:text-[#111111] transition-colors" />
                  <span className="font-bold text-[15px]">{file.name}</span>
                  <span className="text-[12px] bg-surface border border-border-color px-2 py-0.5 uppercase font-bold tracking-wider text-muted group-hover:text-[#111111]">
                    {file.type}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[14px] text-muted font-medium">{file.size}</span>
                  <button className="text-muted hover:text-primary transition-colors">
                    <Download className="size-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
