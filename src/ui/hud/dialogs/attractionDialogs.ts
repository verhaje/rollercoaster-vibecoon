import ATTRACTIONS from '../../../game/config/attractions';
import { isTrackAttraction, getTrackConfig } from '../../../game/config/tracks';
import { type SimExports } from '../../../game/types';
import { type CoasterTrackSystem } from '../../../game/RollerCoasterTrack';
import { type WeatherSystem } from '../../../game/Weather';
import { SHOP_TEMPLATE_IDS } from '../constants';
import { getStallCategory, STALL_PRODUCTS } from '../stallCatalog';
import {
  getBuildDate,
  instanceNames,
  stallProductPricesByInstance,
  stoppedAttractionCapacities,
} from '../metadataStore';

type OpenDialogFn = (
  title: string,
  bodyHtml: string,
  options?: {
    draggable?: boolean;
    passthrough?: boolean;
    initialPosition?: { left: number; top: number } | null;
    onPositionChange?: (pos: { left: number; top: number }) => void;
  },
) => HTMLDivElement;

type WireDialogTabsFn = (
  container: ParentNode,
  buttonSelector: string,
  panelSelector: string,
  buttonDataAttr: string,
  panelDataAttr: string,
  defaultTab: string,
) => void;

export type AttractionDialogDeps = {
  sim: SimExports;
  weather: WeatherSystem;
  coasterTracks: CoasterTrackSystem;
  openDialog: OpenDialogFn;
  closeDialog: () => void;
  wireDialogTabs: WireDialogTabsFn;
  showAttractionDialog: (instanceId: number) => void;
  showDemolishAttractionConfirm: (instanceId: number) => void;
  showCoasterTrackDialog: (instanceId: number, stationX: number, stationY: number, templateId?: number) => void;
  startEndpointEdit: (instanceId: number) => boolean;
  demolishAttractionByInstance: (instanceId: number) => void;
};

export function parseBuildYear(dateStr: string): number {
  const match = /,\s*(\d{4})$/.exec(dateStr);
  if (!match) return 0;
  const year = parseInt(match[1], 10);
  return Number.isNaN(year) ? 0 : year;
}

export function showAttractionDialog(deps: AttractionDialogDeps, instanceId: number): void {
  const sim = deps.sim;
  const templateId = sim.getInstTemplateId(instanceId);
  const attrDef = ATTRACTIONS.find((a) => a.id === templateId);
  const defName = attrDef ? attrDef.name : `Attraction #${templateId}`;
  const customName = instanceNames.get(instanceId) || '';
  const displayName = customName || defName;
  const ticket = sim.getInstTicketPrice(instanceId);
  const riders = sim.getInstRiders(instanceId);
  const capacity = sim.getInstCapacity(instanceId);
  const visitorsServed = sim.getInstTotalVisitors(instanceId);
  const totalRevenue = sim.getInstTotalRevenue(instanceId);
  const monthlyRevenue = sim.getInstMonthlyRevenue(instanceId);
  const queueLength = sim.getInstQueueLength(instanceId);
  const waitTicks = sim.getInstWaitTicks(instanceId);
  const popularity = sim.getInstPopularity(instanceId);
  const baseAppeal = sim.getInstAppeal(instanceId);
  const effectiveAppeal = sim.getInstEffectiveAppeal(instanceId);
  const ageMonths = sim.getInstAgeMonths(instanceId);
  const broken = sim.getInstBroken(instanceId) === 1;
  const repairTicks = sim.getInstRepairTicks(instanceId);
  const ix = sim.getInstX(instanceId);
  const iy = sim.getInstY(instanceId);
  const inX = sim.getInstEntranceX(instanceId);
  const inY = sim.getInstEntranceY(instanceId);
  const outX = sim.getInstExitX(instanceId);
  const outY = sim.getInstExitY(instanceId);
  const icon = attrDef ? attrDef.icon : '🎡';
  const cat = attrDef ? attrDef.category : '?';
  const builtDate = getBuildDate(instanceId) || 'Unknown';
  const isStopped = stoppedAttractionCapacities.has(instanceId) || capacity <= 0;
  const stallCategory = attrDef ? getStallCategory(attrDef.id, attrDef.category) : null;
  const stallProducts = stallCategory ? STALL_PRODUCTS[stallCategory] : null;
  const savedStallPrices = stallProductPricesByInstance.get(instanceId) ?? [];
  const effectiveStallPrices = stallProducts
    ? stallProducts.map((product, index) => {
      const value = savedStallPrices[index];
      if (typeof value === 'number' && Number.isFinite(value) && value >= 0) return value;
      return product.price;
    })
    : [];
  const productPricingHtml = stallProducts
    ? `<div class="dialog-row"><span class="label">Products:</span></div>
        <div class="dialog-products" style="display:flex;flex-direction:column;gap:6px;margin:6px 0 4px 0;">
          ${stallProducts.map((product, index) => `
            <label class="dialog-row" style="margin-left:8px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <span>${product.name}</span>
              <span style="display:inline-flex;align-items:center;gap:4px;">
                <span>$</span>
                <input class="dialog-input" data-stall-price-index="${index}" type="number" min="0" max="200" value="${effectiveStallPrices[index]}" style="width:80px;" />
              </span>
            </label>
          `).join('')}
        </div>`
    : '';
  const weatherMult = attrDef
    ? deps.weather.getMultiplier(attrDef.id, attrDef.category)
    : 1.0;
  const weatherLabel = weatherMult >= 1.0
    ? `<span style="color:#4caf50">×${weatherMult.toFixed(1)}</span>`
    : `<span style="color:#f44336">×${weatherMult.toFixed(1)}</span>`;

  const isTrack = isTrackAttraction(templateId);
  const trackCfg = isTrack ? getTrackConfig(templateId) : undefined;
  const existingTrack = isTrack ? deps.coasterTracks.getTrack(instanceId) : undefined;
  let coasterHtml = '';
  if (isTrack && trackCfg) {
    if (existingTrack) {
      coasterHtml = '<button class="dialog-save-btn" id="dlg-edit-track">🔧 Edit Track</button>';
    } else {
      coasterHtml = `<button class="dialog-save-btn" id="dlg-build-track">${trackCfg.icon} Build Track</button>`;
    }
  }

  const statusLabel = broken
    ? `Broken (${repairTicks} ticks)`
    : isStopped
      ? 'Stopped'
      : 'Operational';
  const canEditEndpoints = !SHOP_TEMPLATE_IDS.has(templateId);

  const box = deps.openDialog(`${icon} ${displayName}`, `
      <div class="dialog-tabs" style="display:flex;gap:6px;margin-bottom:8px;">
        <button class="dialog-tab-btn attr-tab-btn" data-attr-tab="general" data-testid="attr-tab-general">General</button>
        <button class="dialog-tab-btn attr-tab-btn" data-attr-tab="price" data-testid="attr-tab-price">Price</button>
        <button class="dialog-tab-btn attr-tab-btn" data-attr-tab="statistics" data-testid="attr-tab-statistics">Stats</button>
      </div>

      <div class="attr-tab-panel" data-attr-panel="general">
        <div class="dialog-row"><span class="label">Type:</span> <span>${defName}</span></div>
        <div class="dialog-row"><span class="label">Category:</span> <span>${cat}</span></div>
        <div class="dialog-row"><span class="label">Built:</span> <span>${builtDate}</span></div>
        <div class="dialog-row"><span class="label">Age:</span> <span>${ageMonths} months</span></div>
        <div class="dialog-row"><span class="label">Operating Cost:</span> <span>$${attrDef?.monthlyOperatingCost ?? 0}/month</span></div>
        <div class="dialog-row"><span class="label">Position:</span> <span>(${ix}, ${iy})</span></div>
        <div class="dialog-row"><span class="label">Status:</span> <span>${statusLabel}</span></div>
        <div class="dialog-row">
          <span class="label">Custom Name:</span>
          <input class="dialog-input" data-testid="attr-name-input" id="dlg-attr-name" type="text" value="${customName}" placeholder="${defName}" maxlength="30" />
        </div>
        <div class="dialog-row" style="justify-content:space-between;margin-top:10px;gap:8px;">
          <button class="dialog-save-btn" id="dlg-attr-toggle-running" data-testid="attr-toggle-running-btn">${isStopped ? '▶ Start Attraction' : '⏸ Stop Attraction'}</button>
          ${coasterHtml}
        </div>
        <div class="dialog-row" style="justify-content:flex-start;margin-top:8px;">
          ${canEditEndpoints
      ? '<button class="dialog-save-btn" id="dlg-attr-edit-endpoints" data-testid="attr-edit-endpoints-btn">🚪 Edit Entrance/Exit</button>'
      : ''}
        </div>
        <div class="dialog-row" style="justify-content:space-between;margin-top:8px;">
          <button class="dialog-save-btn" data-testid="attr-demolish-btn" id="dlg-attr-demolish" style="background:#7a1f1f;">🧨 Demolish</button>
          <button class="dialog-save-btn" data-testid="attr-general-save-btn" id="dlg-attr-general-save">💾 Save General</button>
        </div>
      </div>

      <div class="attr-tab-panel" data-attr-panel="price" hidden>
        ${productPricingHtml}
        ${stallProducts
      ? '<div class="dialog-row"><span class="label">Average Sale Price:</span> <span id="dlg-stall-avg-price">$0</span></div>'
      : `<div class="dialog-row"><span class="label">Ticket Price: $</span><input class="dialog-input" data-testid="attr-ticket-input" id="dlg-attr-ticket" type="number" min="0" max="200" value="${ticket}" /></div>`}
        <div class="dialog-row" style="justify-content:flex-end;margin-top:8px;">
          <button class="dialog-save-btn" data-testid="attr-price-save-btn" id="dlg-attr-price-save">💾 Save Price</button>
        </div>
      </div>

      <div class="attr-tab-panel" data-attr-panel="statistics" hidden>
        <div class="dialog-row"><span class="label">Riders:</span> <span>${riders} / ${capacity}</span></div>
        <div class="dialog-row"><span class="label">Queue Line:</span> <span>${queueLength} guests</span></div>
        <div class="dialog-row"><span class="label">Est. Wait:</span> <span>${waitTicks} ticks</span></div>
        <div class="dialog-row"><span class="label">Popularity:</span> <span>${popularity}%</span></div>
        <div class="dialog-row"><span class="label">Visitors Served:</span> <span>${visitorsServed}</span></div>
        <div class="dialog-row"><span class="label">Revenue (Total):</span> <span>$${totalRevenue}</span></div>
        <div class="dialog-row"><span class="label">Revenue (This Month):</span> <span>$${monthlyRevenue}</span></div>
        <div class="dialog-row"><span class="label">Appeal:</span> <span>${effectiveAppeal} (base ${baseAppeal}) ${weatherLabel}</span></div>
        <div class="dialog-row"><span class="label">Ride Entrance:</span> <span>(${inX}, ${inY})</span></div>
        <div class="dialog-row"><span class="label">Ride Exit:</span> <span>(${outX}, ${outY})</span></div>
        ${isTrack && existingTrack ? `
          <div class="dialog-row"><span class="label">${trackCfg?.icon ?? '🎢'} Pieces:</span> <span>${existingTrack.pieces.length}</span></div>
          <div class="dialog-row"><span class="label">⚡ Excitement:</span> <span>${existingTrack.excitement}/100</span></div>
          <div class="dialog-row"><span class="label">🤢 Nausea:</span> <span>${existingTrack.nausea}/100</span></div>
          <div class="dialog-row"><span class="label">😊 Satisfaction:</span> <span>${existingTrack.satisfaction}/100</span></div>
        ` : ''}
      </div>

    `);

  const applyName = (): void => {
    const nameInput = box.querySelector('#dlg-attr-name') as HTMLInputElement | null;
    const newName = nameInput ? nameInput.value.trim() : '';
    if (newName) instanceNames.set(instanceId, newName);
    else instanceNames.delete(instanceId);
  };

  const applyPrice = (): void => {
    let newTicket = ticket;
    if (stallProducts) {
      const prices = stallProducts.map((product, index) => {
        const input = box.querySelector<HTMLInputElement>(`input[data-stall-price-index="${index}"]`);
        const parsed = input ? parseInt(input.value, 10) : product.price;
        if (!Number.isFinite(parsed)) return product.price;
        return Math.max(0, Math.min(200, parsed));
      });
      stallProductPricesByInstance.set(instanceId, prices);
      if (prices.length > 0) {
        const total = prices.reduce((sum, value) => sum + value, 0);
        newTicket = Math.round(total / prices.length);
      }
    } else {
      const ticketInput = box.querySelector('#dlg-attr-ticket') as HTMLInputElement | null;
      const parsed = ticketInput ? parseInt(ticketInput.value, 10) : newTicket;
      newTicket = Number.isFinite(parsed) ? parsed : newTicket;
    }
    if (!Number.isNaN(newTicket) && newTicket >= 0) {
      sim.setInstTicketPrice(instanceId, newTicket);
    }
  };

  deps.wireDialogTabs(box, '.attr-tab-btn', '.attr-tab-panel', 'attrTab', 'attrPanel', 'general');

  if (stallProducts) {
    const avgEl = box.querySelector('#dlg-stall-avg-price') as HTMLSpanElement;
    const priceInputs = Array.from(box.querySelectorAll<HTMLInputElement>('input[data-stall-price-index]'));
    const updateAverage = (): void => {
      let total = 0;
      let count = 0;
      for (const input of priceInputs) {
        const parsed = parseInt(input.value, 10);
        const value = Number.isFinite(parsed) ? Math.max(0, Math.min(200, parsed)) : 0;
        input.value = String(value);
        total += value;
        count++;
      }
      const avg = count > 0 ? Math.round(total / count) : 0;
      avgEl.textContent = `$${avg}`;
    };
    for (const input of priceInputs) {
      input.addEventListener('input', updateAverage);
    }
    updateAverage();
  }

  box.querySelector('#dlg-attr-price-save')?.addEventListener('click', () => {
    applyPrice();
    deps.closeDialog();
  });

  box.querySelector('#dlg-attr-general-save')?.addEventListener('click', () => {
    applyName();
    deps.closeDialog();
  });

  box.querySelector('#dlg-attr-toggle-running')?.addEventListener('click', () => {
    if (isStopped) {
      const restoreCapacity = Math.max(
        1,
        stoppedAttractionCapacities.get(instanceId)
          ?? attrDef?.capacity
          ?? sim.getTmplCapacity(templateId),
      );
      sim.setInstCapacity(instanceId, restoreCapacity);
      stoppedAttractionCapacities.delete(instanceId);
    } else {
      const currentCap = Math.max(1, sim.getInstCapacity(instanceId));
      stoppedAttractionCapacities.set(instanceId, currentCap);
      sim.setInstCapacity(instanceId, 0);
    }
    deps.showAttractionDialog(instanceId);
  });

  box.querySelector('#dlg-attr-edit-endpoints')?.addEventListener('click', () => {
    if (deps.startEndpointEdit(instanceId)) {
      deps.closeDialog();
    }
  });

  box.querySelector('#dlg-attr-demolish')?.addEventListener('click', () => {
    deps.showDemolishAttractionConfirm(instanceId);
  });

  if (isTrack) {
    const buildBtn = box.querySelector('#dlg-build-track');
    const editBtn = box.querySelector('#dlg-edit-track');
    if (buildBtn) {
      buildBtn.addEventListener('click', () => {
        deps.closeDialog();
        deps.showCoasterTrackDialog(instanceId, ix, iy, templateId);
      });
    }
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        deps.closeDialog();
        deps.coasterTracks.clearBuildIfInstance(instanceId);
        deps.coasterTracks.removeTrack(instanceId);
        deps.showCoasterTrackDialog(instanceId, ix, iy, templateId);
      });
    }
  }
}

export function showAttractionsOverviewDialog(deps: AttractionDialogDeps): void {
  const statusSelectId = 'dlg-attr-overview-status';
  const tableWrapId = 'dlg-attr-overview-table';
  let sortBy: 'name' | 'status' | 'visitorsServed' | 'revenue' | 'monthlyRevenue' | 'operatingCost' | 'buildYear' | 'appeal' = 'name';
  let sortOrder: 'asc' | 'desc' = 'asc';

  const box = deps.openDialog('📋 Attractions Overview', `
      <div class="dialog-controls">
        <label class="dialog-control">
          <span class="label">Status</span>
          <select id="${statusSelectId}" class="dialog-input dialog-select" data-testid="attr-overview-status">
            <option value="all">All</option>
            <option value="operational">Operational</option>
            <option value="broken">Broken</option>
          </select>
        </label>
      </div>
      <div id="${tableWrapId}" class="attr-overview-table-wrap" data-testid="attr-overview-table"></div>
    `);

  box.classList.add('dialog-box-wide');

  const statusSelect = box.querySelector(`#${statusSelectId}`) as HTMLSelectElement;
  const tableWrap = box.querySelector(`#${tableWrapId}`) as HTMLDivElement;

  const renderOverviewRows = (): void => {
    type OverviewRow = {
      name: string;
      status: 'Operational' | 'Broken';
      visitorsServed: number;
      revenue: number;
      monthlyRevenue: number;
      operatingCost: number;
      buildYear: number;
      appeal: number;
    };

    const rows: OverviewRow[] = [];
    const instanceCount = deps.sim.getInstanceCount();

    for (let i = 0; i < instanceCount; i++) {
      if (deps.sim.isInstActive(i) !== 1) continue;

      const templateId = deps.sim.getInstTemplateId(i);
      const attr = ATTRACTIONS.find((a) => a.id === templateId);
      const name = instanceNames.get(i) || attr?.name || `Attraction #${i}`;
      const status = deps.sim.getInstBroken(i) === 1 ? 'Broken' : 'Operational';
      const visitorsServed = deps.sim.getInstTotalVisitors(i);
      const revenue = deps.sim.getInstTotalRevenue(i);
      const monthlyRevenue = deps.sim.getInstMonthlyRevenue(i);
      const operatingCost = attr?.monthlyOperatingCost ?? 0;
      const appeal = deps.sim.getInstEffectiveAppeal(i);
      const builtDate = getBuildDate(i) || '';
      const buildYear = parseBuildYear(builtDate);

      rows.push({ name, status, visitorsServed, revenue, monthlyRevenue, operatingCost, buildYear, appeal });
    }

    const selectedStatus = statusSelect.value;
    const statusFiltered = rows.filter((r) => {
      if (selectedStatus === 'all') return true;
      if (selectedStatus === 'operational') return r.status === 'Operational';
      return r.status === 'Broken';
    });

    statusFiltered.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'status') cmp = a.status.localeCompare(b.status);
      else if (sortBy === 'visitorsServed') cmp = a.visitorsServed - b.visitorsServed;
      else if (sortBy === 'revenue') cmp = a.revenue - b.revenue;
      else if (sortBy === 'monthlyRevenue') cmp = a.monthlyRevenue - b.monthlyRevenue;
      else if (sortBy === 'operatingCost') cmp = a.operatingCost - b.operatingCost;
      else if (sortBy === 'buildYear') cmp = a.buildYear - b.buildYear;
      else cmp = a.appeal - b.appeal;
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    if (statusFiltered.length === 0) {
      tableWrap.innerHTML = '<div class="guest-empty">No attractions match this filter.</div>';
      return;
    }

    const tableRows = statusFiltered.map((r) => `
        <tr>
          <td>${r.name}</td>
          <td>${r.status}</td>
          <td>${r.visitorsServed}</td>
          <td>$${r.revenue}</td>
          <td>$${r.monthlyRevenue}</td>
          <td>$${r.operatingCost}/mo</td>
          <td>${r.buildYear > 0 ? r.buildYear : 'Unknown'}</td>
          <td>${r.appeal}</td>
        </tr>
      `).join('');

    const renderSortHeader = (key: typeof sortBy, label: string): string => {
      const marker = sortBy === key ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : '';
      return `<button type="button" class="table-sort-btn" data-sort-key="${key}">${label}${marker}</button>`;
    };

    tableWrap.innerHTML = `
        <table class="attr-overview-table">
          <thead>
            <tr>
              <th>${renderSortHeader('name', 'Name')}</th>
              <th>${renderSortHeader('status', 'Status')}</th>
              <th>${renderSortHeader('visitorsServed', 'Visitors')}</th>
              <th>${renderSortHeader('revenue', 'Total Revenue')}</th>
              <th>${renderSortHeader('monthlyRevenue', 'Monthly Revenue')}</th>
              <th>${renderSortHeader('operatingCost', 'Operating Cost')}</th>
              <th>${renderSortHeader('buildYear', 'Build Year')}</th>
              <th>${renderSortHeader('appeal', 'Appeal')}</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      `;

    tableWrap.querySelectorAll<HTMLButtonElement>('.table-sort-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextSort = btn.dataset.sortKey as typeof sortBy | undefined;
        if (!nextSort) return;
        if (sortBy === nextSort) {
          sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          sortBy = nextSort;
          sortOrder = 'asc';
        }
        renderOverviewRows();
      });
    });
  };

  statusSelect.addEventListener('change', renderOverviewRows);
  renderOverviewRows();
}

export function showDemolishAttractionConfirm(deps: AttractionDialogDeps, instanceId: number): void {
  const templateId = deps.sim.getInstTemplateId(instanceId);
  const attrDef = ATTRACTIONS.find((a) => a.id === templateId);
  const displayName = instanceNames.get(instanceId) || attrDef?.name || `Attraction #${instanceId}`;

  const box = deps.openDialog('⚠ Confirm Demolition', `
      <div class="dialog-row" style="display:block;line-height:1.45;">
        <div>This will permanently demolish <b>${displayName}</b>.</div>
        <div style="margin-top:6px;">Do you want to continue?</div>
      </div>
      <div class="dialog-row" style="justify-content:flex-end;margin-top:8px;gap:8px;">
        <button class="dialog-save-btn" id="dlg-demolish-no">No</button>
        <button class="dialog-save-btn" id="dlg-demolish-yes" style="background:#7a1f1f;">Yes, Demolish</button>
      </div>
    `);

  box.querySelector('#dlg-demolish-no')?.addEventListener('click', () => {
    deps.showAttractionDialog(instanceId);
  });

  box.querySelector('#dlg-demolish-yes')?.addEventListener('click', () => {
    deps.demolishAttractionByInstance(instanceId);
    deps.closeDialog();
  });
}
