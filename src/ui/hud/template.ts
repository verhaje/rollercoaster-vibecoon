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
        <div id="hud-mobile-launchers" class="hud-mobile-launchers">
          <button id="hud-open-build-dialog" class="hud-launcher-btn" type="button" title="Open Build dialog" aria-label="Open Build dialog">🛠</button>
          <button id="hud-open-camera-dialog" class="hud-launcher-btn" type="button" title="Open Camera dialog" aria-label="Open Camera dialog">🎥</button>
          <button id="hud-open-attractions-dialog" class="hud-launcher-btn" type="button" title="Open Attractions dialog" aria-label="Open Attractions dialog">🎢</button>
          <button id="hud-open-panels-dialog" class="hud-launcher-btn" type="button" title="Open Management dialog" aria-label="Open Management dialog">📋</button>
        </div>
        <div class="hud-panel hud-quick-status" id="hud-quick-status-panel">
          <span class="hud-tool-indicator" id="hud-tool-indicator">No tool</span>
          <span class="hud-level-indicator" id="hud-level-indicator"></span>
        </div>
      </div>
    `;
}
