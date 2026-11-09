import React, { useState } from 'react';
import { Lock, Store, ShoppingCart, Eye, ExternalLink } from 'lucide-react';
import { ReadyTemplate } from '../../types/template';

export interface TemplateThumbnailGraphicProps {
  template: ReadyTemplate;
  variant?: 'card' | 'hero';
  onInspect?: () => void;
}

/**
 * High-density browser-framed theme showcase styled after Wix,
 * Shopify Theme Store, and WordPress directory.
 * Loads real curated demo website screenshots with seamless vector UI fallback
 * and interactive quick actions.
 */
export const TemplateThumbnailGraphic: React.FC<TemplateThumbnailGraphicProps> = ({
  template,
  variant = 'card',
  onInspect,
}) => {
  const isHero = variant === 'hero';
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`w-full ${
        isHero ? 'h-64 sm:h-72' : 'h-44 sm:h-48'
      } bg-canvas-default flex flex-col rounded-none border-b border-border-subtle overflow-hidden select-none relative group/thumb font-sans`}
    >
      {/* 1. Browser Chrome Header (Clean Mac Dots & Host Domain) */}
      <div className="h-6 bg-canvas-inset border-b border-border-subtle px-2.5 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-none bg-[#ff5f56]/80"></div>
          <div className="w-2 h-2 rounded-none bg-[#ffbd2e]/80"></div>
          <div className="w-2 h-2 rounded-none bg-[#27c93f]/80"></div>
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-canvas-default border border-border-subtle text-[9px] font-mono text-fg-muted max-w-[200px] truncate">
          <Lock className="w-2.5 h-2.5 text-[#3fb950] shrink-0" />
          <span className="truncate">https://{template.id.replace('tmpl-', '')}.ygit.net</span>
        </div>

        <span className="text-[8.5px] font-mono text-accent-primary bg-accent-primary/10 px-1.5 py-0.5 rounded-none border border-accent-primary/20">
          {template.framework}
        </span>
      </div>

      {/* 2. Theme Preview Canvas with Real Demo Thumbnail & Vector UI Fallback */}
      <div className="relative flex-1 overflow-hidden bg-[#090d13]">
        {/* Real Demo Thumbnail Image */}
        {!imageError && template.thumbnailUrl && (
          <>
            <img
              src={template.thumbnailUrl}
              alt={template.name}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover group-hover/thumb:scale-[1.04] transition-all duration-500 ease-out ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* Subtle Gradient Scrim for Polish and Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d13]/90 via-[#090d13]/20 to-black/30 pointer-events-none"></div>
          </>
        )}

        {/* Live Fallback Vector Graphic (Shown while loading or if network fails) */}
        {(imageError || !imageLoaded) && (
          <div className={`absolute inset-0 p-2.5 flex flex-col justify-between overflow-hidden bg-gradient-to-br ${template.previewBg}`}>
            {template.thumbnailType === 'ecommerce' && (
              <div className="flex-1 flex flex-col justify-between gap-1.5 text-white">
                <div className="flex items-center justify-between pb-1 border-b border-white/10 text-[9px]">
                  <div className="flex items-center gap-1.5 font-bold tracking-tight">
                    <Store className="w-3 h-3 text-[#10b981]" />
                    <span className="text-[10px] text-white">SHOPFLOW STORE</span>
                  </div>
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-none bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/30">
                    <ShoppingCart className="w-2.5 h-2.5" />
                    <span className="font-mono text-[8px]">2 · $378</span>
                  </div>
                </div>
                <div className="bg-[#10b981]/15 border border-[#10b981]/30 rounded-none p-1.5 flex items-center justify-between">
                  <div>
                    <div className="text-[9.5px] font-semibold text-[#6ee7b7] leading-tight">Next-Gen Hardware Store</div>
                    <div className="text-[8px] text-slate-300">Stripe Checkout · Edge D1 Cart</div>
                  </div>
                  <span className="text-[8px] font-mono bg-[#10b981] text-slate-950 font-bold px-1.5 py-0.5 rounded-none">20% OFF</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { name: 'Studio Pro', price: '$249', icon: '🎧' },
                    { name: 'Titanium Dial', price: '$129', icon: '⌚' },
                    { name: 'Keypad v2', price: '$89', icon: '⌨️' },
                  ].map((prod, i) => (
                    <div key={i} className="bg-[#090d13]/85 border border-white/10 rounded-none p-1 flex flex-col justify-between text-center">
                      <div className="text-sm my-0.5">{prod.icon}</div>
                      <div className="text-[8px] font-medium text-white truncate">{prod.name}</div>
                      <div className="text-[7.5px] font-mono text-[#34d399] mt-0.5">{prod.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {template.thumbnailType === 'saas' && (
              <div className="flex-1 flex gap-1.5 text-white">
                <div className="w-6 bg-[#090d13]/90 border border-white/10 rounded-none p-1 flex flex-col items-center gap-1 shrink-0">
                  <div className="w-4 h-4 rounded-none bg-[#1d6cf6] flex items-center justify-center text-[8px] font-bold text-white">N</div>
                  <div className="w-2.5 h-0.5 rounded-none bg-[#1d6cf6]"></div>
                  <div className="w-2.5 h-0.5 rounded-none bg-white/20"></div>
                </div>
                <div className="flex-1 flex flex-col justify-between gap-1">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="bg-[#090d13]/85 border border-white/10 rounded-none p-1">
                      <div className="text-[7px] text-slate-400">MRR</div>
                      <div className="text-[9px] font-mono font-bold text-[#58a6ff]">$48.2k</div>
                    </div>
                    <div className="bg-[#090d13]/85 border border-white/10 rounded-none p-1">
                      <div className="text-[7px] text-slate-400">Users</div>
                      <div className="text-[9px] font-mono font-bold text-white">12.8k</div>
                    </div>
                    <div className="bg-[#090d13]/85 border border-white/10 rounded-none p-1">
                      <div className="text-[7px] text-slate-400">Edge</div>
                      <div className="text-[9px] font-mono font-bold text-[#3fb950]">8ms</div>
                    </div>
                  </div>
                  <div className="bg-[#090d13]/85 border border-white/10 rounded-none p-1 flex flex-col justify-between flex-1">
                    <div className="flex items-center justify-between text-[7px] text-slate-300">
                      <span className="font-semibold text-white">Ingestion Metrics</span>
                      <span className="font-mono text-[#58a6ff]">Live Stream</span>
                    </div>
                    <svg viewBox="0 0 160 30" className="w-full h-6 overflow-visible">
                      <path d="M 0 25 Q 30 14, 55 18 T 95 10 T 130 14 T 160 4 L 160 30 L 0 30 Z" fill="#1d6cf6" fillOpacity="0.25" />
                      <path d="M 0 25 Q 30 14, 55 18 T 95 10 T 130 14 T 160 4" fill="none" stroke="#58a6ff" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {template.thumbnailType !== 'ecommerce' && template.thumbnailType !== 'saas' && (
              <div className="flex-1 flex flex-col justify-between gap-1 text-white">
                <div className="flex items-center justify-between pb-0.5 border-b border-white/10 text-[8px] font-mono text-[#58a6ff]">
                  <span className="font-bold">{template.name.toUpperCase()}</span>
                  <span>{template.frameworkBadge}</span>
                </div>
                <div className="bg-[#090d13]/90 border border-white/10 rounded-none p-2 flex flex-col justify-between flex-1">
                  <div className="text-[10px] font-semibold text-white leading-snug">{template.shortBio}</div>
                  <div className="flex items-center gap-1.5 pt-1 text-[8px] font-mono text-slate-400 border-t border-white/10">
                    <span className="text-[#3fb950]">● Jamstack Ready</span>
                    <span>·</span>
                    <span className="text-[#58a6ff]">{template.deploys} uses</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Top Badges (Category & Free Theme) */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5">
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-none bg-canvas-default/90 text-fg-default border border-border-subtle backdrop-blur-xs shadow-none">
            {template.category}
          </span>
          <span className="text-[8.5px] font-mono px-1.5 py-0.5 rounded-none bg-[#238636]/25 text-[#3fb950] border border-[#238636]/40 backdrop-blur-xs font-semibold shadow-none">
            Free Theme
          </span>
        </div>

        {/* Style Tag Bottom-Right */}
        <div className="absolute bottom-2 right-2 z-10 hidden sm:block">
          <span className="text-[8.5px] font-mono px-2 py-0.5 rounded-none bg-canvas-default/85 text-fg-muted border border-border-subtle backdrop-blur-xs">
            {template.themeStyle}
          </span>
        </div>

        {/* Hover Quick Action Overlay (Wix / Shopify Theme Store style) */}
        {!isHero && (
          <div className="absolute inset-0 bg-canvas-default/75 backdrop-blur-[2px] opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 z-20">
            {onInspect && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onInspect();
                }}
                className="bg-canvas-default hover:bg-canvas-inset text-fg-default border border-border-subtle px-2.5 py-1.5 rounded-none text-xs font-medium flex items-center gap-1.5 shadow-none cursor-pointer transition-transform active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-accent-primary" />
                <span>Quick View</span>
              </button>
            )}
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-accent-primary hover:opacity-90 text-white px-3 py-1.5 rounded-none text-xs font-medium flex items-center gap-1.5 shadow-none cursor-pointer transition-transform active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateThumbnailGraphic;
