import React from 'react';
import { Clipboard, Lock } from 'lucide-react';
import { ModalShell } from './ModalShell';
import { PrimaryButton, SecondaryButton } from '../buttons';

export interface PasteEnvModalProps {
  isOpen: boolean;
  onClose: () => void;
  pasteEnvText: string;
  onPasteEnvTextChange: (text: string) => void;
  pasteEnvTarget: 'All' | 'Production' | 'Preview' | 'Development';
  onPasteEnvTargetChange: (target: 'All' | 'Production' | 'Preview' | 'Development') => void;
  pasteEnvIsSecret: boolean;
  onPasteEnvIsSecretChange: (isSecret: boolean) => void;
  onSubmit: () => void;
}

/**
 * Bulk Paste .env Variables Modal
 * Reference: CARDS.md & AGENTS.md (Rule 01 Clean & Compact, Rule 02 JSX Documentation)
 * Parses KEY=VALUE or export KEY="VALUE" declarations with live pair counter
 */
export const PasteEnvModal: React.FC<PasteEnvModalProps> = ({
  isOpen,
  onClose,
  pasteEnvText,
  onPasteEnvTextChange,
  pasteEnvTarget,
  onPasteEnvTargetChange,
  pasteEnvIsSecret,
  onPasteEnvIsSecretChange,
  onSubmit,
}) => {
  const detectedCount = pasteEnvText
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('#') && l.includes('=')).length;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Paste .env Variables"
      icon={<Clipboard className="w-3.5 h-3.5 text-[#e3b341]" />}
      maxWidth="lg"
    >
      <div className="p-3.5 flex flex-col gap-2.5">
        <p className="text-[11px] text-[#8b949e]">
          Paste raw <code className="text-[#f0f6fc] bg-[#090d13] px-1 py-0.5 rounded font-mono">KEY=VALUE</code> or <code className="text-[#f0f6fc] bg-[#090d13] px-1 py-0.5 rounded font-mono">export KEY="VALUE"</code> declarations. Comments (<code className="text-[#7d8590]">#</code>) and empty lines are automatically ignored.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-[#090d13] p-2 rounded border border-[#21262d]">
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] text-[#7d8590] uppercase font-mono">Target Environment:</span>
            <select
              value={pasteEnvTarget}
              onChange={(e) => onPasteEnvTargetChange(e.target.value as any)}
              className="bg-[#161b22] border border-[#21262d] rounded px-2 py-1 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
            >
              <option value="All">All Environments</option>
              <option value="Production">Production</option>
              <option value="Preview">Preview</option>
              <option value="Development">Development</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-[#8b949e] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={pasteEnvIsSecret}
              onChange={(e) => onPasteEnvIsSecretChange(e.target.checked)}
              className="rounded bg-[#161b22] border-[#21262d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
            />
            <span className="flex items-center gap-1 text-[11px]">
              <Lock className="w-3 h-3 text-[#8957e5]" />
              Encrypt as Secrets
            </span>
          </label>
        </div>

        <div className="relative">
          <textarea
            rows={7}
            value={pasteEnvText}
            onChange={(e) => onPasteEnvTextChange(e.target.value)}
            placeholder={`# Example .env configuration\nVITE_API_URL="https://api.example.com/v1"\nDATABASE_URL="postgres://user:pass@host:5432/db"\nSUPABASE_ANON_KEY="eyJhbGciOi..."\nCF_PAGES_BRANCH="main"`}
            className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded p-2.5 text-xs text-[#f0f6fc] font-mono leading-relaxed resize-y placeholder:text-[#484f58]"
          />
          <div className="text-[10px] font-mono text-[#7d8590] mt-1 flex justify-between">
            <span>
              Detected:{' '}
              <strong className="text-[#3fb950] font-medium">
                {detectedCount} valid pairs
              </strong>
            </span>
            <span>UTF-8 Plaintext</span>
          </div>
        </div>
      </div>

      <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-between">
        <span className="text-[10px] text-[#7d8590]">Existing matching keys will be overwritten.</span>
        <div className="flex items-center gap-2">
          <SecondaryButton
            size="sm"
            type="button"
            onClick={onClose}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            size="sm"
            type="button"
            onClick={onSubmit}
            disabled={detectedCount === 0}
          >
            Import Variables
          </PrimaryButton>
        </div>
      </div>
    </ModalShell>
  );
};

export default PasteEnvModal;
