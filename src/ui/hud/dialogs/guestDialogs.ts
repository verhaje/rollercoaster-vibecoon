import ATTRACTIONS from '../../../game/config/attractions';
import { type SimExports, VisitorState } from '../../../game/types';
import { guestName } from '../constants';

type OpenDialogFn = (title: string, bodyHtml: string) => HTMLDivElement;
type WireDialogTabsFn = (
  container: ParentNode,
  buttonSelector: string,
  panelSelector: string,
  buttonDataAttr: string,
  panelDataAttr: string,
  defaultTab: string,
) => void;

export type GuestDialogDeps = {
  sim: SimExports;
  openDialog: OpenDialogFn;
  wireDialogTabs: WireDialogTabsFn;
  showGuestDialog: (visitorIndex: number) => void;
};

export function getGuestPurchasedItems(sim: SimExports, visitorIndex: number): string[] {
  const purchasedItems: string[] = [];
  const balloonTimer = sim.getVisitorBalloonTimer(visitorIndex);
  const umbrellaTimer = sim.getVisitorUmbrellaTimer(visitorIndex);

  if (balloonTimer > 0) {
    purchasedItems.push(`🎈 Balloon (${balloonTimer} ticks left)`);
  }
  if (umbrellaTimer > 0) {
    purchasedItems.push(`☂ Umbrella (${umbrellaTimer} ticks left)`);
  }

  return purchasedItems;
}

export function getGuestStatusLabel(sim: SimExports, visitorIndex: number): string {
  const state = sim.getVisitorState(visitorIndex);
  const target = sim.getVisitorTarget(visitorIndex);
  const stuckTimer = sim.getVisitorStuckTimer(visitorIndex);

  if (state === VisitorState.Walking && target >= 0 && stuckTimer >= 4) {
    const templateId = sim.getInstTemplateId(target);
    const attraction = ATTRACTIONS.find((a) => a.id === templateId);
    if (attraction) return `Can't reach ${attraction.icon} ${attraction.name}`;
    return "Can't reach destination";
  }

  if (state === VisitorState.Riding || state === VisitorState.Queuing) {
    if (target >= 0) {
      const templateId = sim.getInstTemplateId(target);
      const attraction = ATTRACTIONS.find((a) => a.id === templateId);
      if (attraction) {
        const action = state === VisitorState.Riding ? 'Riding' : 'Queuing';
        return `${action} ${attraction.icon} ${attraction.name}`;
      }
    }
    return state === VisitorState.Riding ? 'On a ride' : 'In queue';
  }

  const thirst = sim.getVisitorThirst(visitorIndex);
  const bladder = sim.getVisitorBladder(visitorIndex);
  const hunger = sim.getVisitorHunger(visitorIndex);
  const fun = sim.getVisitorFun(visitorIndex);
  const satisfaction = sim.getVisitorSatisfaction(visitorIndex);
  const nausea = sim.getVisitorNausea(visitorIndex);
  const vx = sim.getVisitorX(visitorIndex);
  const vy = sim.getVisitorY(visitorIndex);
  const isOnDirtyPath = sim.getPukeAt(vx, vy) > 0;
  const isCriminal = sim.getVisitorIsCriminal(visitorIndex) === 1;

  if (isCriminal) return 'Criminal activity';

  if (isOnDirtyPath) return 'Path is dirty';
  if (nausea >= 85) return 'Feeling nauseous';
  if (thirst >= 65) return 'Thirsty';
  if (bladder >= 65) return 'Need to go to toilet';
  if (hunger >= 65) return 'Hungry';
  if (fun <= 30) return 'Bored';
  if (fun >= 70 || satisfaction >= 65) return 'Having fun';
  return 'Having fun';
}

export function showGuestDialog(deps: GuestDialogDeps, visitorIndex: number): void {
  const sim = deps.sim;
  const name = guestName(visitorIndex);
  const sat = sim.getVisitorSatisfaction(visitorIndex);
  const excitement = sim.getVisitorExcitement(visitorIndex);
  const excitementTolerance = sim.getVisitorExcitementTolerance(visitorIndex);
  const hunger = sim.getVisitorHunger(visitorIndex);
  const thirst = sim.getVisitorThirst(visitorIndex);
  const bladder = sim.getVisitorBladder(visitorIndex);
  const nausea = sim.getVisitorNausea(visitorIndex);
  const fun = sim.getVisitorFun(visitorIndex);
  const wallet = sim.getVisitorWallet(visitorIndex);
  const state = sim.getVisitorState(visitorIndex);
  const stateNames: Record<number, string> = {
    0: 'Entering', 1: 'Walking', 2: 'Queuing', 3: 'Riding', 4: 'Leaving',
  };
  const stateName = stateNames[state] || 'Unknown';
  const purchasedItems = getGuestPurchasedItems(sim, visitorIndex);

  const bar = (val: number, color: string) =>
    `<div class="dialog-meter"><div class="dialog-bar"><div class="dialog-bar-fill" style="width:${val}%;background:${color}"></div></div><span class="dialog-meter-value">${val}%</span></div>`;

  const box = deps.openDialog('👤 Guest Details', `
      <div class="dialog-tabs guest-dialog-tabs">
        <button class="dialog-tab-btn guest-tab-btn" data-guest-tab="general">General</button>
        <button class="dialog-tab-btn guest-tab-btn" data-guest-tab="statistics">Statistics</button>
        <button class="dialog-tab-btn guest-tab-btn" data-guest-tab="items">Items</button>
      </div>

      <div class="guest-tab-panel" data-guest-panel="general">
        <div class="dialog-row"><span class="label">Name:</span> <span>${name}</span></div>
        <div class="dialog-row"><span class="label">Status:</span> <span>${stateName}</span></div>
        <div class="dialog-row"><span class="label">💰 Wallet:</span> <span>$${wallet}</span></div>
      </div>

      <div class="guest-tab-panel" data-guest-panel="statistics" hidden>
        <div class="dialog-row dialog-row-meter"><span class="label">😊 Satisfaction:</span> ${bar(sat, '#4caf50')}</div>
        <div class="dialog-row dialog-row-meter"><span class="label">⚡ Excitement:</span> ${bar(excitement, '#03a9f4')}</div>
        <div class="dialog-row dialog-row-meter"><span class="label">🎚 Tolerance:</span> ${bar(excitementTolerance, '#8bc34a')}</div>
        <div class="dialog-row dialog-row-meter"><span class="label">🎉 Fun Need:</span> ${bar(fun, '#ff9800')}</div>
        <div class="dialog-row dialog-row-meter"><span class="label">🍔 Hunger:</span> ${bar(hunger, hunger > 60 ? '#f44336' : '#ff9800')}</div>
        <div class="dialog-row dialog-row-meter"><span class="label">🥤 Thirst:</span> ${bar(thirst, thirst > 60 ? '#f44336' : '#2196f3')}</div>
        <div class="dialog-row dialog-row-meter"><span class="label">🚻 Bladder:</span> ${bar(bladder, bladder > 60 ? '#f44336' : '#9c27b0')}</div>
        <div class="dialog-row dialog-row-meter"><span class="label">🤢 Nausea:</span> ${bar(nausea, nausea > 70 ? '#f44336' : '#8bc34a')}</div>
      </div>

      <div class="guest-tab-panel" data-guest-panel="items" hidden>
        <div class="dialog-row"><span class="label">Purchased Items:</span></div>
        ${purchasedItems.length > 0
      ? `<ul class="guest-item-list">${purchasedItems.map((item) => `<li>${item}</li>`).join('')}</ul>`
      : '<div class="guest-empty">No purchased items.</div>'}
      </div>
    `);

  deps.wireDialogTabs(box, '.guest-tab-btn', '.guest-tab-panel', 'guestTab', 'guestPanel', 'general');
}

export function showAllGuestsDialog(deps: GuestDialogDeps): void {
  type GuestRow = { index: number; name: string; status: string; sat: number };
  const guests: GuestRow[] = [];
  for (let i = 0; i < 100; i++) {
    if (deps.sim.getVisitorState(i) === VisitorState.Inactive) continue;
    guests.push({
      index: i,
      name: guestName(i),
      status: getGuestStatusLabel(deps.sim, i),
      sat: deps.sim.getVisitorSatisfaction(i),
    });
  }

  const box = deps.openDialog(`👥 Guest Status (${guests.length})`, `
      <div class="dialog-controls">
        <label class="dialog-control"><span class="label">Sort By</span><select id="dlg-guest-sort" class="dialog-input dialog-select"><option value="name">Name</option><option value="status">Status</option><option value="satisfaction">Satisfaction</option></select></label>
        <label class="dialog-control"><span class="label">Order</span><select id="dlg-guest-order" class="dialog-input dialog-select"><option value="asc">Asc</option><option value="desc">Desc</option></select></label>
        <label class="dialog-control"><span class="label">Status</span><select id="dlg-guest-filter" class="dialog-input dialog-select"><option value="all">All</option><option value="having fun">Having fun</option><option value="thirsty">Thirsty</option><option value="hungry">Hungry</option><option value="need to go to toilet">Need toilet</option><option value="feeling nauseous">Nauseous</option><option value="path is dirty">Path dirty</option><option value="can't reach">Can't reach</option><option value="bored">Bored</option></select></label>
      </div>
      <div class="guest-list" id="dlg-guest-list" data-testid="guest-list"></div>
    `);

  box.classList.add('dialog-box-wide');
  const sortEl = box.querySelector('#dlg-guest-sort') as HTMLSelectElement;
  const orderEl = box.querySelector('#dlg-guest-order') as HTMLSelectElement;
  const filterEl = box.querySelector('#dlg-guest-filter') as HTMLSelectElement;
  const listEl = box.querySelector('#dlg-guest-list') as HTMLDivElement;

  const renderList = (): void => {
    const filter = filterEl.value;
    const sortBy = sortEl.value;
    const order = orderEl.value;
    const filtered = guests.filter((g) => filter === 'all' || g.status.toLowerCase() === filter);
    filtered.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'status') cmp = a.status.localeCompare(b.status);
      else if (sortBy === 'satisfaction') cmp = a.sat - b.sat;
      else cmp = a.name.localeCompare(b.name);
      return order === 'asc' ? cmp : -cmp;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = '<div class="guest-empty">No guests match this filter.</div>';
      return;
    }

    listEl.innerHTML = filtered.map((g) => `
        <button class="guest-row" data-guest-index="${g.index}" data-testid="guest-row-${g.index}">
          <span class="guest-row-name">${g.name}</span>
          <span class="guest-row-status">${g.status}</span>
        </button>
      `).join('');

    listEl.querySelectorAll('.guest-row').forEach((row) => {
      row.addEventListener('click', () => {
        const idx = parseInt((row as HTMLElement).dataset.guestIndex || '-1', 10);
        if (idx >= 0) deps.showGuestDialog(idx);
      });
    });
  };

  sortEl.addEventListener('change', renderList);
  orderEl.addEventListener('change', renderList);
  filterEl.addEventListener('change', renderList);
  renderList();
}
