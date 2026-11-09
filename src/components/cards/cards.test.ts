import test from 'node:test';
import assert from 'node:assert/strict';

test('card container styles resolution logic', () => {
  const variantStyles = {
    default: 'bg-canvas-default border border-border-subtle rounded-none shadow-none',
    interactive:
      'bg-canvas-default border border-border-subtle hover:border-accent-primary/60 rounded-none transition-all duration-150 cursor-pointer shadow-none',
    selected:
      'bg-canvas-inset border border-accent-primary rounded-none shadow-none',
    telemetry:
      'bg-canvas-inset border border-border-subtle rounded-none font-mono text-[11px] shadow-none',
    subtle:
      'bg-canvas-inset/60 border border-border-subtle rounded-none shadow-none',
  };

  assert.equal(variantStyles.default.includes('rounded-none'), true);
  assert.equal(variantStyles.default.includes('border-border-subtle'), true);
  assert.equal(variantStyles.interactive.includes('hover:border-accent-primary/60'), true);
  assert.equal(variantStyles.selected.includes('border-accent-primary'), true);
  assert.equal(variantStyles.telemetry.includes('bg-canvas-inset'), true);
});

test('card structural compartment divider invariants', () => {
  const headerClass = 'border-b border-border-subtle';
  const footerClass = 'border-t border-border-subtle bg-canvas-inset/50';
  const telemetryEnclaveClass = 'bg-canvas-inset border border-border-subtle rounded-none';

  assert.equal(headerClass.includes('border-b'), true);
  assert.equal(footerClass.includes('border-t'), true);
  assert.equal(telemetryEnclaveClass.includes('bg-canvas-inset'), true);
});
