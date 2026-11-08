import React from 'react';
import { Edit3, ShieldCheck } from 'lucide-react';
import { CustomDomainItem } from '../../types';
import { ModalShell } from './ModalShell';

export interface EditCustomDomainModalProps {
  isOpen: boolean;
  domainItem: CustomDomainItem | null;
  onDomainItemChange: (item: CustomDomainItem) => void;
  onClose: () => void;
  onSave: () => void;
}

/**
 * Edit Custom Domain Settings Modal
 * Reference: CARDS.md & AGENTS.md
 */
export const EditCustomDomainModal: React.FC<EditCustomDomainModalProps> = ({
  isOpen,
  domainItem,
  onDomainItemChange,
  onClose,
  onSave,
}) => {
  if (!domainItem) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Domain: ${domainItem.domain}`}
      icon={<Edit3 className="w-3.5 h-3.5 text-[#1d6cf6]" />}
      maxWidth="md"
    >
      <div className="p-3.5 flex flex-col gap-2.5 text-xs">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Domain Name</label>
          <input
            type="text"
            value={domainItem.domain}
            disabled
            className="w-full bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1 font-mono text-xs text-[#8b949e] cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Target Branch</label>
          <select
            value={domainItem.targetBranch}
            onChange={(e) => onDomainItemChange({ ...domainItem, targetBranch: e.target.value })}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
          >
            <option value="main">Production (main)</option>
            <option value="preview">Preview (staging)</option>
            <option value="development">Development (dev)</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Redirect Mode</label>
          <select
            value={domainItem.redirectMode}
            onChange={(e) => onDomainItemChange({ ...domainItem, redirectMode: e.target.value as any })}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
          >
            <option value="https_only">Force HTTPS Only</option>
            <option value="apex_to_www">Redirect apex to www</option>
            <option value="www_to_apex">Redirect www to apex</option>
            <option value="none">No Redirect</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">SSL / TLS Certificate</label>
          <div className="bg-[#090d13] p-2 rounded border border-[#21262d] flex items-center justify-between">
            <span className="text-[#3fb950] flex items-center gap-1 font-mono text-[10.5px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Automatic Edge TLS
            </span>
            <span className="text-[9.5px] text-[#8b949e]">Active</span>
          </div>
        </div>
      </div>

      <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm"
        >
          Save
        </button>
      </div>
    </ModalShell>
  );
};

export default EditCustomDomainModal;
