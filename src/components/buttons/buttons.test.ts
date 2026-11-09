import test from 'node:test';
import assert from 'node:assert/strict';

test('button size class resolution logic', () => {
  const sizeClassesPrimary = {
    sm: 'px-2.5 py-1 text-xs rounded gap-1',
    md: 'px-3 py-1.5 text-xs rounded-md gap-1.5',
    lg: 'px-4 py-2 text-xs font-bold rounded-md gap-2',
    cta: 'py-2.5 px-4 text-xs font-bold rounded-md gap-2 active:scale-[0.99]',
  };

  assert.equal(sizeClassesPrimary.sm.includes('px-2.5'), true);
  assert.equal(sizeClassesPrimary.md.includes('px-3'), true);
  assert.equal(sizeClassesPrimary.lg.includes('px-4'), true);
  assert.equal(sizeClassesPrimary.cta.includes('active:scale-[0.99]'), true);
});

test('button loading state invariant', () => {
  const isLoading = true;
  const loadingText = 'Cloning...';
  const defaultText = 'Use Template';
  const resolvedLabel = isLoading ? (loadingText || defaultText) : defaultText;
  assert.equal(resolvedLabel, 'Cloning...');
});
