import React from 'react';
import { FileText, AlertTriangle, Copy, Terminal, RefreshCw, Check } from 'lucide-react';
import { CustomDomainItem } from '../../types';
import { ModalShell } from './ModalShell';

export interface DnsConfigModalProps {
  isOpen: boolean;
  domainItem: CustomDomainItem | null;
  onClose: () => void;
  onVerify: (domainId: string) => void;
  dnsProbeActive: boolean;
  dnsProbeLogs: string[];
  onRunProbe: (domain: CustomDomainItem) => void;
  onCopyToClipboard: (text: string) => void;
}

/**
 * DNS Configuration & Resolution Probe Modal
 * Reference: CARDS.md & AGENTS.md
 */
export const DnsConfigModal: React.FC<DnsConfigModalProps> = ({
  isOpen,
  domainItem,
  onClose,
  onVerify,
  dnsProbeActive,
  dnsProbeLogs,
  onRunProbe,
  onCopyToClipboard,
}) => {
  if (!domainItem) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span>DNS Records: {domainItem.domain}</span>
          <span
            className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded font-normal ${
              domainItem.dnsStatus === 'verified'
                ? 'bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30'
                : 'bg-[#d29922]/15 text-[#e3b341] border border-[#d29922]/30'
            }`}
          >
            {domainItem.dnsStatus === 'verified' ? '✓ Verified & Active' : '○ Pending Verification'}
          </span>
        </div>
      }
      icon={<FileText className="w-3.5 h-3.5 text-[#58a6ff]" />}
      subtitle="Configure these records at your DNS provider (Cloudflare, Namecheap, GoDaddy, AWS Route53)."
      maxWidth="2xl"
    >
      <div className="p-3 overflow-y-auto flex flex-col gap-2.5 text-xs">
        {/* Instructions Callout */}
        <div className="bg-[#090d13] border border-[#21262d] rounded p-2 flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-[#e3b341] shrink-0 mt-0.5" />
          <div className="text-[10.5px] text-[#c9d1d9] leading-relaxed">
            Add the following DNS records for <span className="text-[#f0f6fc] font-mono">{domainItem.domain}</span> in your DNS provider control panel.
          </div>
        </div>

        {/* DNS Records Table */}
        <div className="border border-[#21262d] rounded bg-[#090d13] overflow-hidden">
          <div className="px-2.5 py-1 bg-[#161b22] border-b border-[#21262d] text-[10px] font-mono uppercase text-[#7d8590] flex justify-between items-center">
            <span>DNS Records</span>
            <button
              type="button"
              onClick={() => {
                const allText = domainItem.isApex
                  ? `Type: A | Host: @ | Value: ${domainItem.apexIp}\nType: TXT | Host: ${domainItem.txtRecordName} | Value: ${domainItem.txtRecordValue}`
                  : `Type: CNAME | Host: ${domainItem.domain.split('.')[0]} | Value: ${domainItem.cnameTarget}\nType: TXT | Host: ${domainItem.txtRecordName} | Value: ${domainItem.txtRecordValue}`;
                onCopyToClipboard(allText);
              }}
              className="text-[#58a6ff] hover:text-[#79c0ff] cursor-pointer hover:underline flex items-center gap-1 font-normal"
            >
              <Copy className="w-3 h-3" />
              <span>Copy all</span>
            </button>
          </div>

          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#21262d] bg-[#090d13] text-[9.5px] text-[#7d8590]">
                <th className="p-2">Type</th>
                <th className="p-2">Host</th>
                <th className="p-2">Target</th>
                <th className="p-2">TTL</th>
                <th className="p-2 text-right">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {/* Record 1: Primary Routing */}
              <tr className="hover:bg-[#161b22]/50 transition-colors">
                <td className="p-2 align-middle">
                  <span className="px-1.5 py-0.5 rounded bg-[#1d6cf6]/15 text-[#58a6ff] font-normal text-[10px]">
                    {domainItem.isApex ? 'A' : 'CNAME'}
                  </span>
                </td>
                <td className="p-2 align-middle text-[#f0f6fc]">
                  {domainItem.isApex ? '@' : domainItem.domain.split('.')[0]}
                </td>
                <td className="p-2 align-middle text-[#3fb950] select-all">
                  {domainItem.isApex ? domainItem.apexIp : domainItem.cnameTarget}
                </td>
                <td className="p-2 align-middle text-[#8b949e]">Auto</td>
                <td className="p-2 align-middle text-right">
                  <button
                    type="button"
                    onClick={() => onCopyToClipboard(domainItem.isApex ? domainItem.apexIp : domainItem.cnameTarget)}
                    className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>

              {/* Record 2: Ownership Verification TXT */}
              <tr className="hover:bg-[#161b22]/50 transition-colors">
                <td className="p-2 align-middle">
                  <span className="px-1.5 py-0.5 rounded bg-[#8957e5]/15 text-[#a371f7] font-normal text-[10px]">
                    TXT
                  </span>
                </td>
                <td className="p-2 align-middle text-[#f0f6fc] truncate max-w-[140px]" title={domainItem.txtRecordName}>
                  {domainItem.txtRecordName}
                </td>
                <td className="p-2 align-middle text-[#c9d1d9] truncate max-w-[200px] select-all" title={domainItem.txtRecordValue}>
                  {domainItem.txtRecordValue}
                </td>
                <td className="p-2 align-middle text-[#8b949e]">Auto</td>
                <td className="p-2 align-middle text-right">
                  <button
                    type="button"
                    onClick={() => onCopyToClipboard(domainItem.txtRecordValue)}
                    className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DNS Propagation Probe Terminal Simulator */}
        <div className="bg-[#090d13] border border-[#21262d] rounded p-2 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#7d8590]">
              <Terminal className="w-3 h-3 text-[#58a6ff]" />
              <span>DNS Resolver Probe</span>
            </div>
            <button
              type="button"
              disabled={dnsProbeActive}
              onClick={() => onRunProbe(domainItem)}
              className="bg-[#21262d] hover:bg-[#282e36] text-[#58a6ff] hover:text-[#79c0ff] border border-[#30363d] px-2 py-0.5 rounded text-[10px] font-normal cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3 h-3 ${dnsProbeActive ? 'animate-spin text-[#1d6cf6]' : ''}`} />
              <span>{dnsProbeActive ? 'Probing...' : 'Run Probe'}</span>
            </button>
          </div>

          {dnsProbeLogs.length > 0 ? (
            <div className="bg-[#05080d] p-2 rounded border border-[#161b22] font-mono text-[10px] flex flex-col gap-0.5">
              {dnsProbeLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes('SUCCESS') || log.includes('OK') || log.includes('MATCH')
                      ? 'text-[#3fb950]'
                      : log.includes('Initiating')
                      ? 'text-[#58a6ff]'
                      : 'text-[#8b949e]'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[9.5px] text-[#7d8590]">
              Click "Run Probe" to test resolution across Cloudflare (1.1.1.1) and Google (8.8.8.8).
            </div>
          )}
        </div>
      </div>

      {/* Modal Footer */}
      <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-between">
        <span className="text-[9.5px] text-[#7d8590]">SSL certificate provisions automatically once DNS resolves.</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-2.5 py-1 text-xs rounded transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onVerify(domainItem.id);
              onClose();
            }}
            className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white px-2.5 py-1 text-xs font-normal rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Verify</span>
          </button>
        </div>
      </div>
    </ModalShell>
  );
};

export default DnsConfigModal;
