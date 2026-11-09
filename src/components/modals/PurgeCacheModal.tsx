import React from 'react';
import { Flame } from 'lucide-react';
import { ModalShell } from './ModalShell';
import { SecondaryButton, WarningButton } from '../buttons';

export interface PurgeCacheModalProps {
  isOpen: boolean;
  onClose: () => void;
  purgeType: 'everything' | 'custom';
  onPurgeTypeChange: (type: 'everything' | 'custom') => void;
  purgeUrlsText: string;
  onPurgeUrlsTextChange: (text: string) => void;
  isPurging: boolean;
  onExecutePurge: () => void;
}

/**
 * Purge Cloudflare Edge Cache Modal
 * Reference: CARDS.md & AGENTS.md
 */
export const PurgeCacheModal: React.FC<PurgeCacheModalProps> = ({
  isOpen,
  onClose,
  purgeType,
  onPurgeTypeChange,
  purgeUrlsText,
  onPurgeUrlsTextChange,
  isPurging,
  onExecutePurge,
}) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Purge Cloudflare Edge Cache"
      icon={<Flame className="w-3.5 h-3.5 text-[#e3b341]" />}
      maxWidth="md"
    >
      <div className="p-3.5 flex flex-col gap-2.5 text-xs">
        <div className="text-[11px] text-[#8b949e]">
          Purging cache forces Cloudflare edge nodes to retrieve fresh assets from origin on the next request.
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onPurgeTypeChange('everything')}
            className={`p-2 rounded border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
              purgeType === 'everything'
                ? 'bg-[#1d6cf6]/10 border-[#1d6cf6]/40 text-[#f0f6fc]'
                : 'bg-[#090d13] border-[#21262d] text-[#8b949e]'
            }`}
          >
            <span className="font-medium text-xs text-[#f0f6fc]">Purge Everything</span>
            <span className="text-[10px] text-[#8b949e]">Invalidates all 310+ edge caches</span>
          </button>

          <button
            type="button"
            onClick={() => onPurgeTypeChange('custom')}
            className={`p-2 rounded border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
              purgeType === 'custom'
                ? 'bg-[#1d6cf6]/10 border-[#1d6cf6]/40 text-[#f0f6fc]'
                : 'bg-[#090d13] border-[#21262d] text-[#8b949e]'
            }`}
          >
            <span className="font-medium text-xs text-[#f0f6fc]">Custom URLs</span>
            <span className="text-[10px] text-[#8b949e]">Purge specific URLs or cache tags</span>
          </button>
        </div>

        {purgeType === 'custom' && (
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono uppercase text-[#7d8590]">URLs or Prefixes (one per line)</label>
            <textarea
              rows={3}
              value={purgeUrlsText}
              onChange={(e) => onPurgeUrlsTextChange(e.target.value)}
              placeholder="https://app.vibtools.dev/assets/*&#10;https://app.vibtools.dev/index.html"
              className="bg-[#090d13] border border-[#21262d] rounded p-2 text-xs font-mono text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
            />
          </div>
        )}
      </div>

      <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
        <SecondaryButton size="sm" onClick={onClose}>
          Cancel
        </SecondaryButton>
        <WarningButton
          size="sm"
          disabled={isPurging}
          isLoading={isPurging}
          loadingText="Purging Edge..."
          icon={<Flame className="w-3.5 h-3.5 fill-current" />}
          onClick={onExecutePurge}
        >
          Purge Cache
        </WarningButton>
      </div>
    </ModalShell>
  );
};

export default PurgeCacheModal;
