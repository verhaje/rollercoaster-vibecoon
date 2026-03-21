import { describe, expect, it } from 'vitest';
import { getGuestStatusLabel } from '../../src/ui/hud/dialogs/guestDialogs';
import { VisitorState, type SimExports } from '../../src/game/types';

function createSimStub(overrides: Partial<SimExports> = {}): SimExports {
  const base: Partial<SimExports> = {
    getVisitorState: () => VisitorState.Walking,
    getVisitorTarget: () => -1,
    getVisitorStuckTimer: () => 0,
    getInstTemplateId: () => 0,
    getVisitorThirst: () => 10,
    getVisitorBladder: () => 10,
    getVisitorHunger: () => 10,
    getVisitorFun: () => 80,
    getVisitorSatisfaction: () => 80,
    getVisitorNausea: () => 0,
    getVisitorX: () => 0,
    getVisitorY: () => 0,
    getPukeAt: () => 0,
    getVisitorIsCriminal: () => 0,
  };

  return { ...base, ...overrides } as SimExports;
}

describe('guest status label', () => {
  it('shows complaint when guest cannot access a targeted attraction', () => {
    const sim = createSimStub({
      getVisitorState: () => VisitorState.Walking,
      getVisitorTarget: () => 0,
      getVisitorStuckTimer: () => 6,
      getInstTemplateId: () => 8,
    });

    expect(getGuestStatusLabel(sim, 0)).toContain("Can't reach");
    expect(getGuestStatusLabel(sim, 0)).toContain('Burger Stand');
  });

  it('keeps normal statuses when guest is not stuck', () => {
    const sim = createSimStub({
      getVisitorState: () => VisitorState.Walking,
      getVisitorTarget: () => 0,
      getVisitorStuckTimer: () => 1,
      getInstTemplateId: () => 8,
      getVisitorThirst: () => 75,
    });

    expect(getGuestStatusLabel(sim, 0)).toBe('Thirsty');
  });
});
