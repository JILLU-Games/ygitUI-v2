import React, { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { BetaPill } from './BetaPill';

const OFFICIAL_LOGO_URL = 'https://ygit.net/dashboard/assets/brand/YGIT_Icon.png';
const FALLBACK_SVG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="%231d6cf6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';

export interface YGitLogoProps {
  isCollapsed?: boolean;
  onNavigateHome?: () => void;
  onToggleCollapse?: () => void;
  showBetaBadge?: boolean;
  className?: string;
}

/**
 * Official YGIT Dual-Sidebar Brand Lockup & Logo Component
 * Reference: LOGO.md
 * Features:
 * - 21px x 21px precision box with 1px ambient glow in expanded mode
 * - 28px x 28px interactive morphing button in collapsed mode
 * - Fail-closed offline SVG vector fallback
 */
export const YGitLogo: React.FC<YGitLogoProps> = ({
  isCollapsed = false,
  onNavigateHome,
  onToggleCollapse,
  showBetaBadge = true,
  className = '',
}) => {
  const [imgSrc, setImgSrc] = useState(OFFICIAL_LOGO_URL);

  const handleImageError = () => {
    setImgSrc(FALLBACK_SVG);
  };

  return (
    <div
      className={`py-2.5 border-b border-[#21262d] flex items-center select-none ${
        isCollapsed ? 'justify-center px-1.5' : 'justify-between px-3'
      } ${className}`}
    >
      {!isCollapsed ? (
        <>
          {/* Expanded Brand Lockup */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 hover:opacity-95 transition-opacity cursor-pointer group"
          >
            {/* 21px Logo Box */}
            <div className="relative w-[21px] h-[21px] rounded-none bg-canvas-inset border border-border-default p-0.5 shadow-none flex items-center justify-center shrink-0">
              <img
                src={imgSrc}
                alt="YGIT"
                className="w-full h-full object-contain rounded-none"
                onError={handleImageError}
              />
            </div>

            {/* Wordmark + Beta Tag */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[13.5px] tracking-tight text-fg-default font-sans group-hover:text-brand-primary transition-colors">
                YGIT
              </span>
              {showBetaBadge && <BetaPill />}
            </div>
          </button>

          {/* Collapse Action Button */}
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              title="Collapse sidebar"
              className="p-1 text-fg-muted hover:text-fg-default hover:bg-surface-hover rounded-none cursor-pointer transition-colors"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          )}
        </>
      ) : (
        /* Collapsed Morphing 28px Button */
        <button
          type="button"
          onClick={onToggleCollapse}
          title="Click to expand sidebar (YGIT beta)"
          className="group relative w-7 h-7 bg-canvas-subtle hover:bg-surface-hover border border-border-default hover:border-brand-primary rounded-none flex items-center justify-center cursor-pointer transition-colors shadow-none p-1"
        >
          {/* Logo at Rest */}
          <img
            src={imgSrc}
            alt="YGIT"
            className="w-4 h-4 object-contain transition-opacity duration-150 group-hover:opacity-0"
            onError={handleImageError}
          />

          {/* Hover Expand Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-brand-primary">
            <PanelLeftOpen className="w-3.5 h-3.5" />
          </div>
        </button>
      )}
    </div>
  );
};

export default YGitLogo;
