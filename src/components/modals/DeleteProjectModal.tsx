import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ModalShell } from './ModalShell';
import { SecondaryButton, DangerButton } from '../buttons';

export interface DeleteProjectModalProps {
  isOpen: boolean;
  projectName: string;
  confirmText: string;
  onConfirmTextChange: (text: string) => void;
  onClose: () => void;
  onDelete: () => void;
}

/**
 * Delete Project Safeguard Modal
 * Reference: CARDS.md & AGENTS.md
 * Invariant: Requires exact project name match before enabling deletion
 */
export const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  isOpen,
  projectName,
  confirmText,
  onConfirmTextChange,
  onClose,
  onDelete,
}) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Project Confirmation"
      icon={<AlertTriangle className="w-3.5 h-3.5 text-[#f85149]" />}
      maxWidth="md"
    >
      <div className="p-3.5 flex flex-col gap-2.5 text-xs">
        <p className="text-[#c9d1d9] leading-relaxed">
          This action is irreversible. It will immediately take down your deployments, DNS records, and KV/D1 database bindings for <span className="text-[#f0f6fc] font-mono">{projectName}</span>.
        </p>

        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] text-[#8b949e]">
            Please type <span className="text-[#f0f6fc] font-mono select-all font-medium">{projectName}</span> to confirm:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => onConfirmTextChange(e.target.value)}
            placeholder={projectName}
            className="bg-[#090d13] border border-[#21262d] focus:border-[#da3633] focus:outline-none rounded px-2.5 py-1.5 font-mono text-xs text-[#f0f6fc]"
          />
        </div>
      </div>

      <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
        <SecondaryButton size="sm" onClick={onClose}>
          Cancel
        </SecondaryButton>
        <DangerButton
          size="sm"
          disabled={confirmText.trim() !== projectName}
          onClick={onDelete}
        >
          Delete Permanently
        </DangerButton>
      </div>
    </ModalShell>
  );
};

export default DeleteProjectModal;
