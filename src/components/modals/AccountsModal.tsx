import React from 'react';
import { Github, Cloud } from 'lucide-react';
import { ModalShell } from './ModalShell';
import { PrimaryButton, SecondaryButton } from '../buttons';
import { StatusBadge } from '../badges/StatusBadge';

export interface AccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshGithub: () => void;
  onVerifyCloudflare: () => void;
}

/**
 * Connected Accounts & Providers Modal
 * Displays linked GitHub OAuth and Cloudflare Pages Edge credentials status with verified badges
 */
export const AccountsModal: React.FC<AccountsModalProps> = ({
  isOpen,
  onClose,
  onRefreshGithub,
  onVerifyCloudflare,
}) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Connected Accounts & Providers"
      icon={<Github className="w-3.5 h-3.5 text-accent-primary" />}
      maxWidth="md"
    >
      <div className="p-3.5 flex flex-col gap-2.5 text-xs font-sans">
        {/* GitHub Account Card */}
        <div className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 flex items-center justify-between shadow-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-canvas-subtle border border-border-default flex items-center justify-center text-fg-default shadow-none">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <span>GitHub: @vibtools</span>
                <StatusBadge status="verified" label="Connected" />
              </div>
              <div className="text-[10.5px] text-fg-subtle">12 Repositories linked · Webhooks active</div>
            </div>
          </div>
          <SecondaryButton
            size="sm"
            onClick={onRefreshGithub}
          >
            Re-sync
          </SecondaryButton>
        </div>

        {/* Cloudflare Account Card */}
        <div className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 flex items-center justify-between shadow-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-canvas-subtle border border-border-default flex items-center justify-center text-amber-500 shadow-none">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <span>Cloudflare Pages</span>
                <StatusBadge status="verified" label="Verified" />
              </div>
              <div className="text-[10.5px] text-fg-subtle">API Token Active · 310+ Edge POPs</div>
            </div>
          </div>
          <SecondaryButton
            size="sm"
            onClick={onVerifyCloudflare}
          >
            Verify
          </SecondaryButton>
        </div>
      </div>

      <div className="px-3.5 py-2 border-t border-border-subtle bg-canvas-inset flex items-center justify-end">
        <PrimaryButton
          size="sm"
          onClick={onClose}
        >
          Done
        </PrimaryButton>
      </div>
    </ModalShell>
  );
};

export default AccountsModal;
