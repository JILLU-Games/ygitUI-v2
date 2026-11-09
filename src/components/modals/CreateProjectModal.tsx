import React from 'react';
import { ModalShell } from './ModalShell';
import { PrimaryButton, SecondaryButton } from '../buttons';

export interface CreateProjectModalProps {
  isOpen: boolean;
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * Create Project Modal Component
 * Reference: CARDS.md & AGENTS.md (Rule 01 Clean & Compact, Rule 02 JSX Documentation)
 * Invariant: Autofocused input for instant keyboard velocity, submits to create project state.
 */
export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  projectName,
  onProjectNameChange,
  onClose,
  onSubmit,
}) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Create Project"
      maxWidth="xs"
    >
      <form onSubmit={onSubmit}>
        <div className="p-3">
          <input
            type="text"
            required
            autoFocus
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            className="w-full bg-[#090d13] border border-[#30363d] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
          />
        </div>

        <div className="px-3 py-2 border-t border-[#21262d] bg-[#090d13] flex justify-end gap-1.5">
          <SecondaryButton
            size="sm"
            type="button"
            onClick={onClose}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            size="sm"
            type="submit"
          >
            Create
          </PrimaryButton>
        </div>
      </form>
    </ModalShell>
  );
};

export default CreateProjectModal;
