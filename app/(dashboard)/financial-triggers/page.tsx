'use client';

import { useState } from 'react';
import { Plus, MoreVertical, ChevronDown, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

type Rule = {
  id: string;
  status: 'active' | 'paused';
  title: string;
  description: string;
};

const rulesList: Rule[] = [
  {
    id: '1',
    status: 'active',
    title: 'Project Approval → 50% Invoice',
    description: "When Client Vault folder 'Final Deliverables' is marked approved, send milestone invoice via Stripe."
  },
  {
    id: '2',
    status: 'active',
    title: 'Time Threshold → Retainer Alert',
    description: "If logged hours exceed 40h/month, send automated email requesting retainer top-up."
  },
  {
    id: '3',
    status: 'paused',
    title: 'File Download → Release Lock',
    description: "Upon client downloading asset from Vault, remove watermark automatically."
  }
];

export default function FinancialTriggersPage() {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 2000);
  };

  return (
    <main className="flex-1 flex h-screen overflow-hidden font-sans">
      {/* Left Panel: Active Rules List */}
      <section className="w-1/3 min-w-[320px] max-w-[480px] border-r border-border-color flex flex-col bg-white overflow-y-auto">
        <header className="p-8 pb-6 border-b border-border-color sticky top-0 bg-white z-10 flex justify-between items-end">
          <div>
            <h2 className="text-[32px] font-medium leading-tight mb-2 font-heading">Triggers</h2>
            <p className="text-[15px] text-muted">Automated billing logic</p>
          </div>
          <button className="text-primary hover:text-[#111111] transition-colors text-[13px] uppercase tracking-widest font-medium flex items-center gap-1">
            <Plus className="size-4" /> New
          </button>
        </header>

        <div className="flex-1 flex flex-col p-8 gap-4">
          {rulesList.map((rule) => (
            <div 
              key={rule.id}
              className={clsx(
                "group border p-5 cursor-pointer transition-colors relative",
                rule.status === 'active' 
                  ? "border-border-color hover:border-[#111111] bg-white" 
                  : "border-border-color bg-surface hover:border-[#111111] opacity-75"
              )}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className={clsx("w-2 h-2 rounded-full", rule.status === 'active' ? "bg-primary" : "bg-muted")}></span>
                  <span className="text-[13px] uppercase tracking-wider text-muted font-bold">{rule.status}</span>
                </div>
                <MoreVertical className="text-muted group-hover:text-[#111111] size-5" />
              </div>
              <h3 className={clsx("text-[18px] font-medium leading-snug mb-2 font-sans", rule.status === 'paused' && "text-muted")}>
                {rule.title}
              </h3>
              <p className="text-[13px] text-muted line-clamp-2 leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Right Panel: Logic Builder & Ledger */}
      <section className="flex-1 flex flex-col bg-white overflow-y-auto relative">
        <div className="flex-1 p-16 max-w-[800px] w-full mx-auto flex flex-col justify-center min-h-[600px]">
          <div className="mb-12">
            <h2 className="text-[24px] font-medium mb-2 font-sans">Configure Trigger</h2>
            <p className="text-[15px] text-muted">Define the event condition and resulting action.</p>
          </div>

          <form className="flex flex-col gap-8">
            {/* IF Section */}
            <div className="flex flex-col gap-4 p-6 border border-border-color bg-surface/50 relative">
              <div className="absolute -left-3 top-6 bg-white border border-border-color px-2 py-1 text-[12px] font-bold uppercase tracking-wider">
                IF
              </div>
              <label className="text-[13px] uppercase tracking-widest text-muted font-bold">Condition</label>
              
              <div className="relative">
                <select 
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  disabled={saving}
                  className="w-full h-[40px] pl-4 pr-10 border border-[#111111] bg-white text-[15px] font-medium rounded-none appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors cursor-pointer disabled:opacity-50"
                  defaultValue=""
                >
                  <option disabled value="">Select an event...</option>
                  <option value="vault_approval">Client approves Vault folder</option>
                  <option value="date_passed">Specific date passes</option>
                  <option value="file_downloaded">File is downloaded</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none size-5 text-[#111111]" />
              </div>

              <AnimatePresence>
                {selectedCondition === 'vault_approval' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col gap-4 pt-4 border-t border-border-color mt-2 overflow-hidden"
                  >
                    <label className="text-[13px] uppercase tracking-widest text-muted font-bold">Specific Folder</label>
                    <div className="relative">
                      <select disabled={saving} className="w-full h-[40px] pl-4 pr-10 border border-border-color bg-white text-[15px] font-medium rounded-none appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer disabled:opacity-50">
                        <option>Phase 1 Deliverables</option>
                        <option>Final Brand Assets</option>
                        <option>Moodboards v2</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none size-5 text-muted" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* THEN Section */}
            <div className="flex flex-col gap-4 p-6 border border-border-color bg-surface/50 relative">
              <div className="absolute -left-4 top-6 bg-white border border-border-color px-2 py-1 text-[12px] font-bold uppercase tracking-wider">
                THEN
              </div>
              <label className="text-[13px] uppercase tracking-widest text-muted font-bold">Action</label>
              
              <div className="relative">
                <select disabled={saving} className="w-full h-[40px] pl-4 pr-10 border border-[#111111] bg-white text-[15px] font-medium rounded-none appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors cursor-pointer disabled:opacity-50" defaultValue="stripe">
                  <option disabled value="">Select an action...</option>
                  <option value="stripe">Send Invoice (Stripe)</option>
                  <option value="email">Send Email Notification</option>
                  <option value="watermark">Remove Watermark</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none size-5 text-[#111111]" />
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-border-color mt-2">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] uppercase tracking-widest text-muted font-bold">Amount (%)</label>
                  <input disabled={saving} className="w-full h-[40px] px-4 font-medium border border-border-color bg-white text-[15px] rounded-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-50" type="number" defaultValue="50" />
                </div>
                <div className="flex-[2] flex flex-col gap-2">
                  <label className="text-[13px] uppercase tracking-widest text-muted font-bold">Template</label>
                  <input disabled={saving} className="w-full font-medium h-[40px] px-4 border border-border-color bg-white text-[15px] rounded-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-muted focus:text-[#111111] disabled:opacity-50" type="text" defaultValue="Milestone Payment Template" />
                </div>
              </div>
            </div>

            {/* Save Action */}
            <div className="pt-4">
              <button 
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="w-full h-[48px] bg-primary text-white text-[13px] uppercase tracking-[1px] font-bold flex items-center justify-center hover:bg-[#111111] transition-colors rounded-sm group disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {saving ? 'Processing...' : 'Save Trigger'}
              </button>
            </div>
          </form>
        </div>

        {/* Mini Ledger */}
        <div className="border-t border-border-color bg-white mt-auto">
          <div className="p-6 pb-4 flex justify-between items-center">
            <h3 className="text-[15px] font-bold uppercase tracking-widest">Execution Ledger</h3>
            <button className="text-[12px] text-muted hover:text-primary transition-colors flex items-center gap-1 font-bold">
              View Full Log <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-border-color bg-surface text-[12px] uppercase tracking-wider text-muted">
                  <th className="py-3 px-6 font-bold w-32">Date</th>
                  <th className="py-3 px-6 font-bold">Trigger Source</th>
                  <th className="py-3 px-6 font-bold">Action Executed</th>
                  <th className="py-3 px-6 font-bold w-32 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                <tr className="border-b border-border-color hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-6 text-muted font-medium">Oct 24, 09:41</td>
                  <td className="py-4 px-6 font-bold text-[#111111]">Project Approval</td>
                  <td className="py-4 px-6 text-muted font-medium">Sent Invoice #INV-042</td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-block px-2 py-1 border border-primary text-primary text-[10px] uppercase font-bold tracking-wider">Success</span>
                  </td>
                </tr>
                <tr className="border-b border-border-color hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-6 text-muted font-medium">Oct 22, 14:20</td>
                  <td className="py-4 px-6 font-bold text-[#111111]">Time Threshold</td>
                  <td className="py-4 px-6 text-muted font-medium">Sent Retainer Alert Email</td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-block px-2 py-1 border border-primary text-primary text-[10px] uppercase font-bold tracking-wider">Success</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-6 text-muted font-medium">Oct 18, 11:05</td>
                  <td className="py-4 px-6 font-bold text-[#111111]">File Download</td>
                  <td className="py-4 px-6 text-muted font-medium">Remove Watermark (Failed)</td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-block px-2 py-1 border border-[#111111] text-[#111111] bg-surface text-[10px] uppercase font-bold tracking-wider">Error</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
