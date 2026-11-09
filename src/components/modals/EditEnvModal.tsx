import React from 'react';
import { Edit3, Lock } from 'lucide-react';
import { ModalShell } from './ModalShell';
import { PrimaryButton, SecondaryButton } from '../buttons';
import { EnvVar } from '../../types';

export interface EditEnvModalProps {
  isOpen: boolean;
  editingEnvVar: EnvVar | null;
  onEditingEnvVarChange: (envVar: EnvVar) => void;
  onClose: () => void;
  onSave: () => void;
}

/**
 * Edit Variable Modal Component
 * Reference: CARDS.md & AGENTS.md (Rule 01 Clean & Compact, Rule 02 JSX Documentation)
 * Invariant: Modifies key, value, environment targets and secret encryption flag.
 */
export const EditEnvModal: React.FC<EditEnvModalProps> = ({
  isOpen,
  editingEnvVar,
  onEditingEnvVarChange,
  onClose,
  onSave,
}) => {
  if (!editingEnvVar) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Variable: ${editingEnvVar.key}`}
      icon={<Edit3 className="w-3.5 h-3.5 text-[#1d6cf6]" />}
      maxWidth="md"
    >
      <div className="p-3.5 flex flex-col gap-2.5 text-xs">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Variable Key</label>
          <input
            type="text"
            value={editingEnvVar.key}
            onChange={(e) => onEditingEnvVarChange({ ...editingEnvVar, key: e.target.value })}
            className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono uppercase"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Variable Value</label>
          <input
            type="text"
            value={editingEnvVar.value}
            onChange={(e) => onEditingEnvVarChange({ ...editingEnvVar, value: e.target.value })}
            className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono uppercase text-[#7d8590]">Environment</label>
            <select
              value={editingEnvVar.environment}
              onChange={(e) => onEditingEnvVarChange({ ...editingEnvVar, environment: e.target.value as any })}
              className="bg-[#090d13] border border-[#21262d] rounded px-2 py-1 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
            >
              <option value="All">All Environments</option>
              <option value="Production">Production</option>
              <option value="Preview">Preview</option>
              <option value="Development">Development</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-1.5 text-xs text-[#8b949e] cursor-pointer select-none bg-[#090d13] p-1.5 rounded border border-[#21262d]">
              <input
                type="checkbox"
                checked={editingEnvVar.isSecret}
                onChange={(e) => onEditingEnvVarChange({ ...editingEnvVar, isSecret: e.target.checked })}
                className="rounded bg-[#161b22] border-[#21262d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
              />
              <span className="flex items-center gap-1 text-[11px]">
                <Lock className="w-3 h-3 text-[#8957e5]" />
                Secret Encrypted
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
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
          onClick={onSave}
        >
          Save Changes
        </PrimaryButton>
      </div>
    </ModalShell>
  );
};

export default EditEnvModal;
