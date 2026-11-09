import React from 'react';
import { Database, HardDrive, Boxes, Webhook } from 'lucide-react';
import { ModalShell } from './ModalShell';
import { PrimaryButton, SecondaryButton, SuccessButton, WarningButton } from '../buttons';

// ============================================================================
// 1. KV BINDING MODAL
// ============================================================================
export interface AddKvModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  onNameChange: (name: string) => void;
  namespaceId: string;
  onNamespaceIdChange: (id: string) => void;
  environment: string;
  onEnvironmentChange: (env: string) => void;
  onAdd: () => void;
}

export const AddKvModal: React.FC<AddKvModalProps> = ({
  isOpen,
  onClose,
  name,
  onNameChange,
  namespaceId,
  onNamespaceIdChange,
  environment,
  onEnvironmentChange,
  onAdd,
}) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Add KV Namespace Binding"
      icon={<Database className="w-3.5 h-3.5 text-[#1d6cf6]" />}
      maxWidth="md"
    >
      <div className="p-3.5 flex flex-col gap-2.5 text-xs">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Variable Name</label>
          <input
            type="text"
            placeholder="e.g. CACHE_KV, USER_SESSIONS"
            value={name}
            onChange={(e) => onNameChange(e.target.value.toUpperCase())}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">KV Namespace ID</label>
          <input
            type="text"
            placeholder="e.g. 9b7f3a8820c845b4a92c31e"
            value={namespaceId}
            onChange={(e) => onNamespaceIdChange(e.target.value)}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Environment Target</label>
          <select
            value={environment}
            onChange={(e) => onEnvironmentChange(e.target.value)}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:border-[#1d6cf6] focus:outline-none"
          >
            <option value="Production">Production only</option>
            <option value="Preview">Preview only</option>
            <option value="All">All environments</option>
          </select>
        </div>
      </div>

      <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
        <SecondaryButton size="sm" onClick={onClose}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          size="sm"
          disabled={!name.trim() || !namespaceId.trim()}
          onClick={onAdd}
        >
          Add Binding
        </PrimaryButton>
      </div>
    </ModalShell>
  );
};

// ============================================================================
// 2. D1 SQL DATABASE BINDING MODAL
// ============================================================================
export interface AddD1ModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  onNameChange: (name: string) => void;
  databaseId: string;
  onDatabaseIdChange: (id: string) => void;
  environment: string;
  onEnvironmentChange: (env: string) => void;
  onAdd: () => void;
}

export const AddD1Modal: React.FC<AddD1ModalProps> = ({
  isOpen,
  onClose,
  name,
  onNameChange,
  databaseId,
  onDatabaseIdChange,
  environment,
  onEnvironmentChange,
  onAdd,
}) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Add D1 SQL Database Binding"
      icon={<HardDrive className="w-3.5 h-3.5 text-[#3fb950]" />}
      maxWidth="md"
    >
      <div className="p-3.5 flex flex-col gap-2.5 text-xs">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Variable Name</label>
          <input
            type="text"
            placeholder="e.g. DB, ANALYTICS_DB"
            value={name}
            onChange={(e) => onNameChange(e.target.value.toUpperCase())}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">D1 Database ID / UUID</label>
          <input
            type="text"
            placeholder="e.g. 04a991f3-e381-42e5-bc09-085709926031"
            value={databaseId}
            onChange={(e) => onDatabaseIdChange(e.target.value)}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Environment Target</label>
          <select
            value={environment}
            onChange={(e) => onEnvironmentChange(e.target.value)}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:border-[#1d6cf6] focus:outline-none"
          >
            <option value="Production">Production only</option>
            <option value="Preview">Preview only</option>
            <option value="All">All environments</option>
          </select>
        </div>
      </div>

      <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
        <SecondaryButton size="sm" onClick={onClose}>
          Cancel
        </SecondaryButton>
        <SuccessButton
          size="sm"
          disabled={!name.trim() || !databaseId.trim()}
          onClick={onAdd}
        >
          Add D1 Database
        </SuccessButton>
      </div>
    </ModalShell>
  );
};

// ============================================================================
// 3. R2 STORAGE BUCKET BINDING MODAL
// ============================================================================
export interface AddR2ModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  onNameChange: (name: string) => void;
  bucketName: string;
  onBucketNameChange: (bucket: string) => void;
  environment: string;
  onEnvironmentChange: (env: string) => void;
  onAdd: () => void;
}

export const AddR2Modal: React.FC<AddR2ModalProps> = ({
  isOpen,
  onClose,
  name,
  onNameChange,
  bucketName,
  onBucketNameChange,
  environment,
  onEnvironmentChange,
  onAdd,
}) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Add R2 Storage Bucket Binding"
      icon={<Boxes className="w-3.5 h-3.5 text-[#e3b341]" />}
      maxWidth="md"
    >
      <div className="p-3.5 flex flex-col gap-2.5 text-xs">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Variable Name</label>
          <input
            type="text"
            placeholder="e.g. ASSETS_BUCKET, UPLOADS_R2"
            value={name}
            onChange={(e) => onNameChange(e.target.value.toUpperCase())}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Target R2 Bucket Name</label>
          <input
            type="text"
            placeholder="e.g. ygit-vibtools-assets-prod"
            value={bucketName}
            onChange={(e) => onBucketNameChange(e.target.value)}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Environment Target</label>
          <select
            value={environment}
            onChange={(e) => onEnvironmentChange(e.target.value)}
            className="bg-[#090d13] border border-[#21262d] rounded px-2 py-1.5 text-xs text-[#f0f6fc] focus:border-[#1d6cf6] focus:outline-none"
          >
            <option value="Production">Production only</option>
            <option value="Preview">Preview only</option>
            <option value="All">All environments</option>
          </select>
        </div>
      </div>

      <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
        <SecondaryButton size="sm" onClick={onClose}>
          Cancel
        </SecondaryButton>
        <WarningButton
          size="sm"
          disabled={!name.trim() || !bucketName.trim()}
          onClick={onAdd}
        >
          Add R2 Bucket
        </WarningButton>
      </div>
    </ModalShell>
  );
};

// ============================================================================
// 4. DEPLOY HOOK (WEBHOOK) MODAL
// ============================================================================
export interface AddDeployHookModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  onNameChange: (name: string) => void;
  branch: string;
  onBranchChange: (branch: string) => void;
  onAdd: () => void;
}

export const AddDeployHookModal: React.FC<AddDeployHookModalProps> = ({
  isOpen,
  onClose,
  name,
  onNameChange,
  branch,
  onBranchChange,
  onAdd,
}) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Create Deploy Webhook"
      icon={<Webhook className="w-3.5 h-3.5 text-[#1d6cf6]" />}
      maxWidth="md"
    >
      <div className="p-3.5 flex flex-col gap-2.5 text-xs">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Deploy Hook Name</label>
          <input
            type="text"
            placeholder="e.g. Sanity CMS Publish, Daily Cron"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:border-[#1d6cf6] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-[#7d8590]">Target Branch</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => onBranchChange(e.target.value)}
            className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
          />
        </div>
      </div>

      <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
        <SecondaryButton size="sm" onClick={onClose}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          size="sm"
          disabled={!name.trim()}
          onClick={onAdd}
        >
          Generate Hook
        </PrimaryButton>
      </div>
    </ModalShell>
  );
};
