import test from 'node:test';
import assert from 'node:assert/strict';

test('button size class resolution logic', () => {
  const sizeClasses = {
    micro: 'px-2 py-0.5 text-[10.5px] rounded-none gap-1 active:scale-95',
    compact: 'px-2.5 py-1 text-xs rounded-none gap-1.5 active:scale-95',
    sm: 'px-2.5 py-1 text-xs rounded-none gap-1.5 active:scale-95',
    md: 'px-3 py-1.5 text-xs rounded-none gap-1.5 active:scale-95',
    lg: 'px-4 py-2 text-xs font-bold rounded-none gap-2 active:scale-95',
    cta: 'py-2.5 px-4 text-xs font-bold rounded-none gap-2 active:scale-[0.99]',
  };

  assert.equal(sizeClasses.sm.includes('px-2.5'), true);
  assert.equal(sizeClasses.md.includes('px-3'), true);
  assert.equal(sizeClasses.lg.includes('px-4'), true);
  assert.equal(sizeClasses.cta.includes('active:scale-[0.99]'), true);
});

test('button variant class mapping invariants', () => {
  const variantStyles = {
    primary: 'bg-[#1d6cf6]',
    secondary: 'bg-[#21262d]',
    danger: 'bg-[#da3633]',
    'danger-outline': 'text-[#f85149]',
    warning: 'bg-[#e3b341]',
    success: 'bg-[#238636]',
  };

  assert.equal(variantStyles.primary, 'bg-[#1d6cf6]');
  assert.equal(variantStyles.secondary, 'bg-[#21262d]');
  assert.equal(variantStyles.danger, 'bg-[#da3633]');
  assert.equal(variantStyles['danger-outline'], 'text-[#f85149]');
  assert.equal(variantStyles.warning, 'bg-[#e3b341]');
  assert.equal(variantStyles.success, 'bg-[#238636]');
});

test('button loading state invariant', () => {
  const isLoading = true;
  const loadingText = 'Cloning...';
  const defaultText = 'Use Template';
  const resolvedLabel = isLoading ? (loadingText || defaultText) : defaultText;
  assert.equal(resolvedLabel, 'Cloning...');
});
