import type { EmployeeKind } from '../../../input/BuildController';
import type { SimExports } from '../../../game/types';
import ATTRACTIONS from '../../../game/config/attractions';
import {
  CLEANER_MONTHLY_COST,
  EMPLOYEE_FIRST_NAMES,
  EMPLOYEE_LAST_NAMES,
  ENTERTAINER_MONTHLY_COST,
  MECHANIC_MONTHLY_COST,
  SECURITY_MONTHLY_COST,
} from '../constants';

type OpenDialogFn = (title: string, bodyHtml: string) => HTMLDivElement;

type EmployeeDialogDeps = {
  sim: SimExports;
  formatDate: () => string;
  openDialog: OpenDialogFn;
  closeDialog: () => void;
  refresh: () => void;
  startEmployeeAreaAssignment: (callback: (x: number, y: number) => void) => void;
  cancelEmployeeAreaAssignment: () => void;
  showEmployeeDialog: (type: EmployeeKind, index: number) => void;
  showEmployeesDialog: () => void;
  employeeNamesByUid: Map<string, string>;
  employeeHiredDateByUid: Map<string, string>;
};

export class HudEmployeeDialogs {
  constructor(private deps: EmployeeDialogDeps) {}

  private employeeUid(type: EmployeeKind, index: number): number {
    if (type === 'mechanic') return this.deps.sim.getMechanicUid(index);
    if (type === 'cleaner') return this.deps.sim.getCleanerUid(index);
    if (type === 'security') return this.deps.sim.getSecurityUid(index);
    return this.deps.sim.getEntertainerUid(index);
  }

  private ensureEmployeeProfile(type: EmployeeKind, index: number, setHireDateNow: boolean = false): { uid: number; name: string; hiredDate: string } {
    const uid = this.employeeUid(type, index);
    const key = `${type}:${uid}`;
    if (!this.deps.employeeNamesByUid.has(key)) {
      const first = EMPLOYEE_FIRST_NAMES[Math.abs(uid * 7 + 3) % EMPLOYEE_FIRST_NAMES.length];
      const last = EMPLOYEE_LAST_NAMES[Math.abs(uid * 11 + 5) % EMPLOYEE_LAST_NAMES.length];
      this.deps.employeeNamesByUid.set(key, `${first} ${last}`);
    }
    if (setHireDateNow && !this.deps.employeeHiredDateByUid.has(key)) {
      this.deps.employeeHiredDateByUid.set(key, this.deps.formatDate());
    }
    return {
      uid,
      name: this.deps.employeeNamesByUid.get(key) || `${type} #${index + 1}`,
      hiredDate: this.deps.employeeHiredDateByUid.get(key) || 'Unknown',
    };
  }

  private getEmployeeTask(type: EmployeeKind, index: number): { status: 'idle' | 'working'; details: string } {
    if (type === 'mechanic') {
      const target = this.deps.sim.getMechanicTarget(index);
      const repairTimer = this.deps.sim.getMechanicRepairTimer(index);
      const mx = this.deps.sim.getMechanicX(index);
      const my = this.deps.sim.getMechanicY(index);
      if (target < 0) return { status: 'idle', details: `Patrolling / wandering near (${mx}, ${my})` };
      const templateId = this.deps.sim.getInstTemplateId(target);
      const attraction = ATTRACTIONS.find((a) => a.id === templateId);
      const attractionName = attraction ? `${attraction.icon} ${attraction.name}` : `Attraction #${target}`;
      if (repairTimer > 0) return { status: 'working', details: `Repairing ${attractionName} (ETA ~${repairTimer} ticks)` };
      const tx = this.deps.sim.getInstX(target);
      const ty = this.deps.sim.getInstY(target);
      const steps = Math.max(0, Math.abs(mx - tx) + Math.abs(my - ty));
      return { status: 'working', details: `Heading to ${attractionName} (ETA ~${steps} steps)` };
    }

    if (type === 'cleaner') {
      const cx = this.deps.sim.getCleanerX(index);
      const cy = this.deps.sim.getCleanerY(index);
      const tx = this.deps.sim.getCleanerTargetX(index);
      const ty = this.deps.sim.getCleanerTargetY(index);
      const cleanTimer = this.deps.sim.getCleanerCleanTimer(index);
      if (cleanTimer > 0 && tx >= 0 && ty >= 0) return { status: 'working', details: `Cleaning path at (${tx}, ${ty})` };
      if (tx >= 0 && ty >= 0) {
        const steps = Math.max(0, Math.abs(cx - tx) + Math.abs(cy - ty));
        return { status: 'working', details: `Heading to dirty path (${tx}, ${ty}) (ETA ~${steps} steps)` };
      }
      return { status: 'idle', details: `Patrolling / wandering near (${cx}, ${cy})` };
    }

    if (type === 'security') {
      const sx = this.deps.sim.getSecurityX(index);
      const sy = this.deps.sim.getSecurityY(index);
      const targetVisitor = this.deps.sim.getSecurityTargetVisitor(index);
      if (targetVisitor >= 0) {
        const tx = this.deps.sim.getVisitorX(targetVisitor);
        const ty = this.deps.sim.getVisitorY(targetVisitor);
        const steps = Math.max(0, Math.abs(sx - tx) + Math.abs(sy - ty));
        return { status: 'working', details: `Chasing criminal near (${tx}, ${ty}) (ETA ~${steps} steps)` };
      }
      return { status: 'idle', details: `Patrolling / wandering near (${sx}, ${sy})` };
    }

    const ex = this.deps.sim.getEntertainerX(index);
    const ey = this.deps.sim.getEntertainerY(index);
    return { status: 'working', details: `Dancing and cheering guests near (${ex}, ${ey})` };
  }

  private getEmployeeAreas(type: EmployeeKind, index: number): string {
    const count = type === 'mechanic'
      ? this.deps.sim.getMechanicAreaCount(index)
      : type === 'cleaner'
        ? this.deps.sim.getCleanerAreaCount(index)
        : type === 'security'
          ? this.deps.sim.getSecurityAreaCount(index)
          : this.deps.sim.getEntertainerAreaCount(index);
    if (count <= 0) return 'None';

    const labels: string[] = [];
    for (let i = 0; i < count; i++) {
      const x = type === 'mechanic'
        ? this.deps.sim.getMechanicAreaX(index, i)
        : type === 'cleaner'
          ? this.deps.sim.getCleanerAreaX(index, i)
          : type === 'security'
            ? this.deps.sim.getSecurityAreaX(index, i)
            : this.deps.sim.getEntertainerAreaX(index, i);
      const y = type === 'mechanic'
        ? this.deps.sim.getMechanicAreaY(index, i)
        : type === 'cleaner'
          ? this.deps.sim.getCleanerAreaY(index, i)
          : type === 'security'
            ? this.deps.sim.getSecurityAreaY(index, i)
            : this.deps.sim.getEntertainerAreaY(index, i);
      labels.push(`(${x}, ${y})`);
    }
    return labels.join(', ');
  }

  showAssignAreaDialog(type: EmployeeKind, index: number): void {
    const name = this.ensureEmployeeProfile(type, index).name;
    const box = this.deps.openDialog('📍 Assign Patrol Area', `
      <div class="dialog-row"><span class="label">Employee:</span><span>${name}</span></div>
      <div class="dialog-row"><span>Click any path/entrance tile on the map to add a patrol area.</span></div>
      <div class="dialog-row" style="justify-content:flex-end;margin-top:8px;">
        <button class="dialog-save-btn" id="dlg-assign-cancel">Cancel</button>
      </div>
    `);

    this.deps.startEmployeeAreaAssignment((x, y) => {
      const ok = type === 'mechanic'
        ? this.deps.sim.setMechanicArea(index, x, y)
        : type === 'cleaner'
          ? this.deps.sim.setCleanerArea(index, x, y)
          : type === 'security'
            ? this.deps.sim.setSecurityArea(index, x, y)
            : this.deps.sim.setEntertainerArea(index, x, y);
      this.deps.refresh();
      if (ok === 1) {
        this.deps.showEmployeeDialog(type, index);
      } else {
        this.showAssignAreaDialog(type, index);
      }
    });

    box.querySelector('#dlg-assign-cancel')?.addEventListener('click', () => {
      this.deps.cancelEmployeeAreaAssignment();
      this.deps.closeDialog();
      this.deps.showEmployeeDialog(type, index);
    });
  }

  showEmployeeDialog(type: EmployeeKind, index: number): void {
    const max = type === 'mechanic'
      ? this.deps.sim.getMechanicCount()
      : type === 'cleaner'
        ? this.deps.sim.getCleanerCount()
        : type === 'security'
          ? this.deps.sim.getSecurityCount()
          : this.deps.sim.getEntertainerCount();
    if (index < 0 || index >= max) {
      this.deps.showEmployeesDialog();
      return;
    }

    const profile = this.ensureEmployeeProfile(type, index);
    const task = this.getEmployeeTask(type, index);
    const cost = type === 'mechanic'
      ? MECHANIC_MONTHLY_COST
      : type === 'cleaner'
        ? CLEANER_MONTHLY_COST
        : type === 'security'
          ? SECURITY_MONTHLY_COST
          : ENTERTAINER_MONTHLY_COST;
    const x = type === 'mechanic'
      ? this.deps.sim.getMechanicX(index)
      : type === 'cleaner'
        ? this.deps.sim.getCleanerX(index)
        : type === 'security'
          ? this.deps.sim.getSecurityX(index)
          : this.deps.sim.getEntertainerX(index);
    const y = type === 'mechanic'
      ? this.deps.sim.getMechanicY(index)
      : type === 'cleaner'
        ? this.deps.sim.getCleanerY(index)
        : type === 'security'
          ? this.deps.sim.getSecurityY(index)
          : this.deps.sim.getEntertainerY(index);
    const typeLabel = type === 'mechanic' ? 'Mechanic' : type === 'cleaner' ? 'Cleaner' : type === 'security' ? 'Security' : 'Entertainer';
    const statLabel = type === 'mechanic' ? 'Repairs completed' : type === 'cleaner' ? 'Paths cleaned' : type === 'security' ? 'Incidents handled' : 'Guests cheered';
    const statValue = type === 'mechanic'
      ? this.deps.sim.getMechanicRepairsCompleted(index)
      : type === 'cleaner'
        ? this.deps.sim.getCleanerPathsCleaned(index)
        : type === 'security'
          ? this.deps.sim.getSecurityIncidentsHandled(index)
          : this.deps.sim.getEntertainerGuestsCheered(index);

    const box = this.deps.openDialog(`🧰 ${profile.name}`, `
      <div class="dialog-row"><span class="label">Type:</span><span>${typeLabel}</span></div>
      <div class="dialog-row"><span class="label">Hired:</span><span>${profile.hiredDate}</span></div>
      <div class="dialog-row"><span class="label">Monthly Cost:</span><span>$${cost}/month</span></div>
      <div class="dialog-row"><span class="label">Position:</span><span>(${x}, ${y})</span></div>
      <div class="dialog-row"><span class="label">Current Task:</span><span>${task.details}</span></div>
      <div class="dialog-row"><span class="label">${statLabel}:</span><span>${statValue}</span></div>
      <div class="dialog-row"><span class="label">Assigned Areas:</span><span>${this.getEmployeeAreas(type, index)}</span></div>
      <div class="dialog-row" style="justify-content:flex-end;margin-top:8px;gap:6px;">
        <button class="dialog-save-btn" id="dlg-emp-assign">Assign Area</button>
        <button class="dialog-save-btn" id="dlg-emp-clear-areas">Clear Areas</button>
        <button class="dialog-save-btn" id="dlg-emp-fire">Fire Employee</button>
      </div>
    `);

    box.querySelector('#dlg-emp-assign')?.addEventListener('click', () => {
      this.deps.closeDialog();
      this.showAssignAreaDialog(type, index);
    });

    box.querySelector('#dlg-emp-clear-areas')?.addEventListener('click', () => {
      if (type === 'mechanic') this.deps.sim.clearMechanicAreas(index);
      else if (type === 'cleaner') this.deps.sim.clearCleanerAreas(index);
      else if (type === 'security') this.deps.sim.clearSecurityAreas(index);
      else this.deps.sim.clearEntertainerAreas(index);
      this.deps.refresh();
      this.showEmployeeDialog(type, index);
    });

    box.querySelector('#dlg-emp-fire')?.addEventListener('click', () => {
      if (type === 'mechanic') this.deps.sim.fireMechanic(index);
      else if (type === 'cleaner') this.deps.sim.fireCleaner(index);
      else if (type === 'security') this.deps.sim.fireSecurity(index);
      else this.deps.sim.fireEntertainer(index);
      this.deps.refresh();
      this.deps.showEmployeesDialog();
    });
  }

  showEmployeesDialog(): void {
    const mechanicCount = this.deps.sim.getMechanicCount();
    const cleanerCount = this.deps.sim.getCleanerCount();
    const securityCount = this.deps.sim.getSecurityCount();
    const entertainerCount = this.deps.sim.getEntertainerCount();
    type EmpRow = { index: number; name: string; type: EmployeeKind; status: 'idle' | 'working'; details: string };
    const employees: EmpRow[] = [];

    for (let i = 0; i < mechanicCount; i++) {
      const profile = this.ensureEmployeeProfile('mechanic', i);
      const task = this.getEmployeeTask('mechanic', i);
      employees.push({ index: i, name: profile.name, type: 'mechanic', status: task.status, details: task.details });
    }
    for (let i = 0; i < cleanerCount; i++) {
      const profile = this.ensureEmployeeProfile('cleaner', i);
      const task = this.getEmployeeTask('cleaner', i);
      employees.push({ index: i, name: profile.name, type: 'cleaner', status: task.status, details: task.details });
    }
    for (let i = 0; i < securityCount; i++) {
      const profile = this.ensureEmployeeProfile('security', i);
      const task = this.getEmployeeTask('security', i);
      employees.push({ index: i, name: profile.name, type: 'security', status: task.status, details: task.details });
    }
    for (let i = 0; i < entertainerCount; i++) {
      const profile = this.ensureEmployeeProfile('entertainer', i);
      const task = this.getEmployeeTask('entertainer', i);
      employees.push({ index: i, name: profile.name, type: 'entertainer', status: task.status, details: task.details });
    }

    const totalMonthlyCost = mechanicCount * MECHANIC_MONTHLY_COST + cleanerCount * CLEANER_MONTHLY_COST + securityCount * SECURITY_MONTHLY_COST + entertainerCount * ENTERTAINER_MONTHLY_COST;

    const box = this.deps.openDialog(`🧰 Employees (${employees.length})`, `
      <div class="dialog-row"><span class="label">Monthly Employee Cost:</span><span>$${totalMonthlyCost}/month</span></div>
      <div class="dialog-controls">
        <label class="dialog-control"><span class="label">Type</span><select id="dlg-emp-type" class="dialog-input dialog-select"><option value="all">All</option><option value="mechanic">Mechanics</option><option value="cleaner">Cleaners</option><option value="security">Security</option><option value="entertainer">Entertainers</option></select></label>
        <label class="dialog-control"><span class="label">Status</span><select id="dlg-emp-status" class="dialog-input dialog-select"><option value="all">All</option><option value="working">Working</option><option value="idle">Idle</option></select></label>
        <label class="dialog-control"><span class="label">Sort By</span><select id="dlg-emp-sort" class="dialog-input dialog-select"><option value="name">Name</option><option value="type">Type</option><option value="status">Status</option></select></label>
        <label class="dialog-control"><span class="label">Order</span><select id="dlg-emp-order" class="dialog-input dialog-select"><option value="asc">Asc</option><option value="desc">Desc</option></select></label>
      </div>
      <div class="guest-list" id="dlg-emp-list"></div>
      <div class="dialog-row" style="justify-content:flex-end;margin-top:10px;gap:6px;">
        <button class="dialog-save-btn" id="dlg-hire-mechanic" data-testid="dlg-hire-mechanic">Hire Mechanic ($350)</button>
        <button class="dialog-save-btn" id="dlg-hire-cleaner" data-testid="dlg-hire-cleaner">Hire Cleaner ($300)</button>
        <button class="dialog-save-btn" id="dlg-hire-security" data-testid="dlg-hire-security">Hire Security ($420)</button>
        <button class="dialog-save-btn" id="dlg-hire-entertainer" data-testid="dlg-hire-entertainer">Hire Entertainer ($380)</button>
      </div>
    `);

    const typeEl = box.querySelector('#dlg-emp-type') as HTMLSelectElement;
    const statusEl = box.querySelector('#dlg-emp-status') as HTMLSelectElement;
    const sortEl = box.querySelector('#dlg-emp-sort') as HTMLSelectElement;
    const orderEl = box.querySelector('#dlg-emp-order') as HTMLSelectElement;
    const listEl = box.querySelector('#dlg-emp-list') as HTMLDivElement;

    const renderEmployees = (): void => {
      const type = typeEl.value;
      const status = statusEl.value;
      const sortBy = sortEl.value;
      const order = orderEl.value;
      const filtered = employees.filter((e) => (type === 'all' || e.type === type) && (status === 'all' || e.status === status));
      filtered.sort((a, b) => {
        let cmp = 0;
        if (sortBy === 'type') cmp = a.type.localeCompare(b.type);
        else if (sortBy === 'status') cmp = a.status.localeCompare(b.status);
        else cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      });

      if (filtered.length === 0) {
        listEl.innerHTML = '<div class="guest-empty">No employees match this filter.</div>';
        return;
      }

      listEl.innerHTML = filtered.map((e) => `
        <button class="guest-row" data-emp-type="${e.type}" data-emp-index="${e.index}">
          <span class="guest-row-name">${e.name} (${e.type})</span>
          <span class="guest-row-status">${e.details}</span>
        </button>
      `).join('');

      listEl.querySelectorAll('.guest-row').forEach((row) => {
        row.addEventListener('click', () => {
          const kind = ((row as HTMLElement).dataset.empType || 'mechanic') as EmployeeKind;
          const idx = parseInt((row as HTMLElement).dataset.empIndex || '-1', 10);
          if (idx >= 0) this.showEmployeeDialog(kind, idx);
        });
      });
    };

    typeEl.addEventListener('change', renderEmployees);
    statusEl.addEventListener('change', renderEmployees);
    sortEl.addEventListener('change', renderEmployees);
    orderEl.addEventListener('change', renderEmployees);
    renderEmployees();

    box.querySelector('#dlg-hire-mechanic')?.addEventListener('click', () => {
      if (this.deps.sim.hireMechanic() === 1) {
        this.ensureEmployeeProfile('mechanic', this.deps.sim.getMechanicCount() - 1, true);
      }
      this.showEmployeesDialog();
      this.deps.refresh();
    });
    box.querySelector('#dlg-hire-cleaner')?.addEventListener('click', () => {
      if (this.deps.sim.hireCleaner() === 1) {
        this.ensureEmployeeProfile('cleaner', this.deps.sim.getCleanerCount() - 1, true);
      }
      this.showEmployeesDialog();
      this.deps.refresh();
    });
    box.querySelector('#dlg-hire-security')?.addEventListener('click', () => {
      if (this.deps.sim.hireSecurity() === 1) {
        this.ensureEmployeeProfile('security', this.deps.sim.getSecurityCount() - 1, true);
      }
      this.showEmployeesDialog();
      this.deps.refresh();
    });
    box.querySelector('#dlg-hire-entertainer')?.addEventListener('click', () => {
      if (this.deps.sim.hireEntertainer() === 1) {
        this.ensureEmployeeProfile('entertainer', this.deps.sim.getEntertainerCount() - 1, true);
      }
      this.showEmployeesDialog();
      this.deps.refresh();
    });
  }
}
