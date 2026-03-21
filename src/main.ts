/* =============================================
   Park Tycoon – Entry Point
   ============================================= */

async function main() {
  const container = document.getElementById('app')!;
  const { Game } = await import('./game/Game');
  const game = new Game();
  await game.start(container);
}

main().catch((err) => {
  console.error('Failed to start Park Tycoon:', err);
  document.body.innerHTML = `<div style="color:#fff;padding:2em;font-family:monospace">
    <h1>Park Tycoon — Error</h1>
    <pre>${err instanceof Error ? err.message : String(err)}</pre>
    <p>Check the console for details.</p>
  </div>`;
});
