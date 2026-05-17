module.exports = async (page, scenario, viewport, isReference, browserContext) => {
  console.log('Running onReady script for: ' + scenario.label);
  
  // Inject CSS to completely freeze all animations and transitions
  // This is required to prevent flakiness in visual regression tests
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        animation-iteration-count: 1 !important;
      }
    `;
    document.head.appendChild(style);
  });

  // Wait a small amount of time for any initial JS layout shifts to settle
  await page.waitForTimeout(500);
};
