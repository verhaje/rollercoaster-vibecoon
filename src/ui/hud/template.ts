type SceneryDefinition = {
  id: number;
  key: string;
  name: string;
  cost: number;
  icon: string;
};

type TreeDefinition = {
  id: number;
  key: string;
  name: string;
  cost: number;
  icon: string;
};

export function createHudMarkup(trees: TreeDefinition[], scenery: SceneryDefinition[]): string {
  const treeButtons = trees
    .map((item) => `<button class="tool-btn" data-tool="tree" data-variant="${item.id}" data-testid="tool-tree-${item.key}" title="${item.name} ($${item.cost})">${item.icon} ${item.name}</button>`)
    .join('');

  const sceneryButtons = scenery
    .map((item) => `<button class="tool-btn" data-tool="scenery" data-variant="${item.id}" data-testid="tool-scenery-${item.key}" title="${item.name} ($${item.cost})">${item.icon} ${item.name}</button>`)
    .join('');

  return `
      <div class="hud-top">
        <div id="hud-feedback-alert" class="hud-feedback-alert" hidden aria-live="polite"></div>
        <button id="hud-mobile-toggle" class="hud-mobile-toggle" data-testid="hud-mobile-toggle">Show Panels</button>
        <div id="hud-touch-hint" class="hud-touch-hint" hidden>
          <span class="hud-touch-hint-text">Tip: use two fingers to pan/zoom, or use camera buttons.</span>
          <button id="hud-touch-hint-dismiss" class="hud-touch-hint-dismiss" type="button">Got it</button>
        </div>
        <div id="hud-peek-panel" class="hud-peek-panel" hidden>
          <span class="hud-peek-chip">$<span id="hud-peek-budget">0</span></span>
          <span class="hud-peek-chip">👥 <span id="hud-peek-visitors">0/100</span></span>
          <span class="hud-peek-chip">😊 <span id="hud-peek-satisfaction">0%</span></span>
          <span class="hud-peek-chip"><span id="hud-peek-weather">⛅ Average</span></span>
        </div>
        <div class="hud-panel hud-collapsible-panel hud-info">
          <div class="hud-row"><span class="label">Budget:</span> <span id="hud-budget" data-testid="hud-budget">10000</span></div>
          <div class="hud-row"><span class="label">👥 Visitors:</span> <span id="hud-visitors" data-testid="hud-visitors">0/100</span></div>
          <div class="hud-row"><span class="label">😊 Satisfaction:</span> <span id="hud-satisfaction">0%</span></div>
          <div class="hud-row"><span class="label">🍔 Hunger:</span> <span id="hud-hunger">0%</span></div>
          <div class="hud-row"><span class="label">🥤 Thirst:</span> <span id="hud-thirst">0%</span></div>
          <div class="hud-row"><span class="label">🚻 Bladder:</span> <span id="hud-bladder">0%</span></div>
          <div class="hud-row"><span class="label">🧰 Mechanics:</span> <span id="hud-mechanics">0</span></div>
          <div class="hud-row"><span class="label">🧹 Cleaners:</span> <span id="hud-cleaners">0</span></div>
          <div class="hud-row"><span class="label">🛡 Security:</span> <span id="hud-security">0</span></div>
          <div class="hud-row"><span class="label">🎭 Entertainers:</span> <span id="hud-entertainers">0</span></div>
          <div class="hud-row"><span class="label">⚠️ Broken:</span> <span id="hud-broken">0</span></div>
          <div class="hud-row"><span class="label">🌟 Attractiveness:</span> <span id="hud-attractiveness">100%</span></div>
          <div class="hud-row"><span class="label">🚨 Crime:</span> <span id="hud-crime">0 theft / 0 vandal</span></div>
          <div class="hud-row"><span class="label">📈 Income:</span> <span id="hud-income">0</span></div>
          <div class="hud-row"><span class="label">📉 Expenses:</span> <span id="hud-expense">0</span></div>
        </div>
        <div class="hud-panel hud-collapsible-panel hud-management" data-testid="hud-management-panel">
          <div class="hud-row"><span class="label">Management:</span></div>
          <div class="hud-management-actions">
            <button id="hud-guests" data-testid="hud-guests" title="Show all guest statuses">Guests</button>
            <button id="hud-mechanics-btn" data-testid="hud-mechanics-btn" title="Show employee statuses">Employees</button>
            <button id="hud-attractions-overview" data-testid="hud-attractions-overview" title="Show attraction overview">Attractions</button>
            <button id="hud-save" data-testid="hud-save" title="Save game [Ctrl+S]">Save</button>
            <button id="hud-load" data-testid="hud-load" title="Load game [Ctrl+L]">Load</button>
          </div>
        </div>
        <div class="hud-panel hud-collapsible-panel hud-speed">
          <div class="hud-speed-controls">
            <button id="hud-pause" data-testid="hud-pause" title="Pause / Resume">⏸</button>
            <button id="hud-speed" data-testid="hud-speed" title="Change speed">1x</button>
          </div>
          <div class="hud-speed-meta">
            <div class="hud-row"><span class="label">Date:</span> <span id="hud-date">Mar 10, 2026</span></div>
            <div class="hud-row"><span class="label">Weather:</span> <span id="hud-weather">⛅ Average</span></div>
            <div class="hud-row"><span class="label">Mission:</span> <span id="hud-mission">Build 3 attractions (0/3)</span></div>
            <div class="hud-row"><span class="label">Weekly:</span> <span id="hud-weekly">Weekly Peak: 85 Visitors (0/85)</span></div>
            <div class="hud-row"><span class="label">Event:</span> <span id="hud-event">No event</span></div>
            <div class="hud-row"><span class="label">Streak:</span> <span id="hud-streak">0 days</span></div>
            <div class="hud-row hud-objectives-row">
              <button id="hud-engagement-details" class="hud-engagement-details" type="button">Objectives</button>
              <span id="hud-day-badge" class="hud-engagement-badge" hidden>NEW DAY</span>
              <span id="hud-week-badge" class="hud-engagement-badge hud-engagement-badge-week" hidden>NEW WEEK</span>
            </div>
          </div>
        </div>
      </div>

      <div class="hud-bottom">
        <div id="hud-mobile-launchers" class="hud-mobile-launchers" hidden>
          <button id="hud-open-build-dialog" class="hud-launcher-btn" type="button" title="Open Build dialog" aria-label="Open Build dialog">🛠</button>
          <button id="hud-open-camera-dialog" class="hud-launcher-btn" type="button" title="Open Camera dialog" aria-label="Open Camera dialog">🎥</button>
          <button id="hud-open-panels-dialog" class="hud-launcher-btn" type="button" title="Open Panels dialog" aria-label="Open Panels dialog">📋</button>
        </div>
        <div class="hud-panel hud-tools" id="hud-tools-panel">
          <div class="hud-panel-header">
            <span class="hud-tool-label">Build</span>
            <button id="hud-tools-toggle" class="hud-panel-toggle" type="button" aria-expanded="true">Hide</button>
          </div>
          <div class="hud-panel-content">
            <div class="hud-build-tabs" id="hud-build-tabs">
              <button class="build-tab-btn" data-build-tab="land" data-testid="build-tab-land">Land</button>
              <button class="build-tab-btn active" data-build-tab="path" data-testid="build-tab-path">Path</button>
              <button class="build-tab-btn" data-build-tab="trees" data-testid="build-tab-trees">Trees</button>
              <button class="build-tab-btn" data-build-tab="scenery" data-testid="build-tab-scenery">Scenery</button>
              <button class="build-tab-btn" data-build-tab="tools" data-testid="build-tab-tools">Tools</button>
            </div>
            <div class="hud-build-groups" id="hud-build-groups">
              <div class="build-group" data-build-group="land" hidden>
                <button class="tool-btn" data-tool="land" data-variant="0" data-testid="tool-land-grass" title="Grass Paint ($2) [6/L]">🟩 Grass</button>
                <button class="tool-btn" data-tool="land" data-variant="1" data-testid="tool-land-desert" title="Desert Paint ($2)">🟨 Desert</button>
                <button class="tool-btn" data-tool="land" data-variant="2" data-testid="tool-land-mud" title="Mud Paint ($2)">🟫 Mud</button>
                <button class="tool-btn" data-tool="land" data-variant="3" data-testid="tool-land-dark-grass" title="Dark Grass Paint ($2)">🟩 Dark Grass</button>
              </div>
              <div class="build-group" data-build-group="path">
                <button class="tool-btn" data-tool="path" data-variant="0" data-testid="tool-path" title="Muddy Path ($8) [1]">🟫 Mud Path</button>
                <button class="tool-btn" data-tool="path" data-variant="1" data-testid="tool-path-desert" title="Desert Path ($10)">🟨 Desert Path</button>
                <button class="tool-btn" data-tool="path" data-variant="2" data-testid="tool-path-concrete" title="Concrete Path ($14)">⬜ Concrete Path</button>
                <button class="tool-btn" data-tool="path" data-variant="3" data-testid="tool-path-queue" title="Queue Path ($12)">🟪 Queue Path</button>
              </div>
              <div class="build-group" data-build-group="trees" hidden>
                ${treeButtons}
              </div>
              <div class="build-group" data-build-group="scenery" hidden>
                ${sceneryButtons}
              </div>
              <div class="build-group" data-build-group="tools" hidden>
                <button class="tool-btn" data-tool="terrain" data-testid="tool-terrain" title="Terrain: drag up to raise, drag down to lower. Click center=full tile, edge=slope, corner=corner only">⛰ Terrain</button>
                <button class="tool-btn" data-tool="water" data-testid="tool-water" title="Water ($25) [5/W]">💧 Water</button>
                <button class="tool-btn" data-tool="pickup" data-testid="tool-pickup" title="Pick up and drop guests/employees [8/G]">✋ Pickup</button>
                <button class="tool-btn" data-tool="bench" data-testid="tool-bench" title="Bench ($30) – Place on path. Guests sit to rest.">🪑 Bench</button>
                <button class="tool-btn" data-tool="trashcan" data-testid="tool-trashcan" title="Trash Can ($40) – Place on path. Guests throw trash in it.">🗑 Trash Can</button>
                <button class="tool-btn" data-tool="demolish" data-testid="tool-demolish" title="Demolish [3]">🔨 Demolish</button>
                <button class="tool-btn" data-tool="select" data-testid="tool-select" title="Select [4/S]">🔍 Select</button>
                <button class="tool-btn" data-tool="none" data-testid="tool-none" title="Cancel [Esc]">❌ Cancel</button>
              </div>
            </div>
            <span class="hud-tool-indicator" id="hud-tool-indicator">No tool</span>
            <span class="hud-level-indicator" id="hud-level-indicator" style="margin-left:8px;font-size:11px;color:#cfd8dc;"></span>
          </div>
        </div>
        <div class="hud-panel hud-camera-controls" id="hud-camera-controls" hidden>
          <div class="hud-panel-header">
            <span class="hud-tool-label">Camera</span>
            <button id="hud-camera-toggle" class="hud-panel-toggle" type="button" aria-expanded="true">Hide</button>
          </div>
          <div class="hud-panel-content">
            <div class="hud-camera-grid">
              <button class="tool-btn" id="hud-cam-up" type="button">↑</button>
              <button class="tool-btn" id="hud-cam-left" type="button">←</button>
              <button class="tool-btn" id="hud-cam-recenter" type="button">◎</button>
              <button class="tool-btn" id="hud-cam-right" type="button">→</button>
              <button class="tool-btn" id="hud-cam-down" type="button">↓</button>
              <button class="tool-btn" id="hud-cam-zoom-in" type="button">＋</button>
              <button class="tool-btn" id="hud-cam-zoom-out" type="button">－</button>
            </div>
          </div>
        </div>
        <div class="hud-panel hud-attractions-container" id="hud-attractions-panel">
          <div class="hud-panel-header">
            <span class="hud-tool-label">Attractions</span>
            <button id="hud-attractions-toggle" class="hud-panel-toggle" type="button" aria-expanded="true">Hide</button>
          </div>
          <div class="hud-panel-content">
            <div class="hud-tabs" id="hud-tabs"></div>
            <div class="hud-attractions" id="hud-attractions"></div>
          </div>
        </div>
      </div>
    `;
}
