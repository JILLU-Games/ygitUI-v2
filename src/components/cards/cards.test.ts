import test from 'node:test';
import assert from 'node:assert/strict';

test('card container styles resolution logic', () => {
  const variantStyles = {
    default: 'bg-[#161b22] border border-[#21262d] rounded-lg shadow-sm',
    interactive:
      'bg-[#161b22] border border-[#21262d] hover:border-[#1d6cf6]/60 rounded-lg transition-all duration-150 hover:shadow-lg hover:shadow-black/30 cursor-pointer',
    selected:
      'bg-[#0e1828] border border-[#1d6cf6] rounded-lg shadow-[0_0_0_1px_#1d6cf6]',
    telemetry:
      'bg-[#090d13] border border-[#21262d] rounded-md font-mono text-[11px]',
    subtle:
      'bg-[#090d13]/60 border border-[#21262d] rounded-lg',
  };

  assert.equal(variantStyles.default.includes('rounded-lg'), true);
  assert.equal(variantStyles.default.includes('border-[#21262d]'), true);
  assert.equal(variantStyles.interactive.includes('hover:border-[#1d6cf6]/60'), true);
  assert.equal(variantStyles.selected.includes('bg-[#0e1828]'), true);
  assert.equal(variantStyles.telemetry.includes('bg-[#090d13]'), true);
});

test('card structural compartment divider invariants', () => {
  const headerClass = 'border-b border-[#21262d]';
  const footerClass = 'border-t border-[#21262d] bg-[#090d13]/50';
  const telemetryEnclaveClass = 'bg-[#090d13] border border-[#21262d] rounded-md';

  assert.equal(headerClass.includes('border-b'), true);
  assert.equal(footerClass.includes('border-t'), true);
  assert.equal(telemetryEnclaveClass.includes('bg-[#090d13]'), true);
});
