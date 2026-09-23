/**
 * SOLID GOLD FUND - INTERACTIVE CHALLENGE CONFIGURATOR & ROI CALCULATOR
 */

(function () {
  // Program Data Definition based on official SolidGoldFund parameters
  const PROGRAMS_DATA = {
    'forex-1step': {
      name: 'Forex X-1 Step Evaluation',
      badge: '1-Step Rapid Pass',
      target: '10% (Phase 1 Only)',
      dailyLoss: '5%',
      maxDrawdown: '6% (Static Balance)',
      leverage: '50:1',
      minDays: '0 Days (Pass in 1 Day)',
      duration: 'Infinite (No Time Limit)',
      profitSplit: '80% (Up to 90%)',
      lockPayout: 'No Lock',
      prices: {
        5000: 65,
        10000: 115,
        25000: 215,
        50000: 395,
        100000: 795,
        200000: 1350,
        250000: 2155,
        400000: 3755
      }
    },
    'forex-2step': {
      name: 'Forex X-2 Step Evaluation',
      badge: 'Classic 2-Phase',
      target: '8% (Phase 1) / 5% (Phase 2)',
      dailyLoss: '5%',
      maxDrawdown: '8% (Static Balance)',
      leverage: '50:1',
      minDays: '0 Days',
      duration: 'Infinite (No Time Limit)',
      profitSplit: '80% (Up to 90%)',
      lockPayout: 'No Lock',
      prices: {
        5000: 49,
        10000: 99,
        25000: 185,
        50000: 335,
        100000: 595,
        200000: 1050,
        250000: 1850,
        400000: 3100
      }
    },
    'crypto-eval': {
      name: 'Crypto Evaluation (24/7 Trading)',
      badge: 'Crypto Exclusive',
      target: '10% (Step 1) / 6% (Step 2)',
      dailyLoss: '+/-3% Daily Cap',
      maxDrawdown: '6% to 9% (Static)',
      leverage: 'Up to 5:1 (Crypto)',
      minDays: '0 Days',
      duration: 'Infinite (24/7 Markets)',
      profitSplit: '90%',
      lockPayout: 'No Lock',
      prices: {
        5000: 75,
        10000: 155,
        25000: 285,
        50000: 465,
        100000: 900,
        200000: 1350,
        250000: 2000,
        400000: 3500
      }
    },
    'gold-rush': {
      name: 'The Gold Rush (XAUUSD Specialist)',
      badge: 'Gold Commodity Special',
      target: '8% Target',
      dailyLoss: '5%',
      maxDrawdown: '6% Static Balance',
      leverage: '50:1 (Zero Gold Markup)',
      minDays: '0 Days (Instant First Payout)',
      duration: 'Infinite',
      profitSplit: '80% (Up to 90%)',
      lockPayout: 'No Lock',
      prices: {
        5000: 60,
        10000: 120,
        25000: 220,
        50000: 410,
        100000: 820,
        200000: 1400,
        250000: 2200,
        400000: 3800
      }
    },
    'instant-funded': {
      name: 'Instant Funded X (Direct Capital)',
      badge: 'No Evaluation Required',
      target: 'None (Direct Real Capital)',
      dailyLoss: '5% Daily Limit',
      maxDrawdown: '8% Trailing Drawdown',
      leverage: '50:1',
      minDays: '0 Days (Immediate Trading)',
      duration: '30 Days Inactivity Allowed',
      profitSplit: '80% (Up to 90%)',
      lockPayout: 'No Lock',
      prices: {
        5000: 200,
        10000: 400,
        25000: 1125,
        50000: 2500,
        100000: 4800,
        200000: 9200,
        250000: 11500,
        400000: 18000
      }
    }
  };

  // State
  let currentProgramKey = 'forex-1step';
  let currentAccountSize = 100000;
  let addons = {
    profit90: false,
    weekendHold: false,
    doubleLeverage: false
  };

  // DOM Elements - Configurator
  const programTabButtons = document.querySelectorAll('.program-tab-btn');
  const sizePillButtons = document.querySelectorAll('.size-pill-btn');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const getFundedCheckoutBtn = document.getElementById('configurator-checkout-btn');

  function updateConfiguratorUI() {
    const program = PROGRAMS_DATA[currentProgramKey];
    if (!program) return;

    // Update program name & size text
    const planNameEl = document.getElementById('cfg-plan-name');
    const accountSizeEl = document.getElementById('cfg-account-size');
    const badgeEl = document.getElementById('cfg-plan-badge');

    if (planNameEl) planNameEl.textContent = program.name;
    if (accountSizeEl) accountSizeEl.textContent = `$${currentAccountSize.toLocaleString()}`;
    if (badgeEl) badgeEl.textContent = program.badge;

    // Update rules
    document.getElementById('rule-target').textContent = program.target;
    document.getElementById('rule-dailyloss').textContent = program.dailyLoss;
    document.getElementById('rule-drawdown').textContent = program.maxDrawdown;
    document.getElementById('rule-leverage').textContent = program.leverage;
    document.getElementById('rule-mindays').textContent = program.minDays;
    document.getElementById('rule-duration').textContent = program.duration;
    document.getElementById('rule-profitsplit').textContent = addons.profit90 ? '90% (Add-on Active)' : program.profitSplit;
    document.getElementById('rule-lockpayout').textContent = program.lockPayout;

    // Calculate Price
    const basePrice = program.prices[currentAccountSize] || 795;
    let addOnTotal = 0;

    if (addons.profit90) addOnTotal += Math.round(basePrice * 0.15);
    if (addons.weekendHold) addOnTotal += Math.round(basePrice * 0.10);
    if (addons.doubleLeverage) addOnTotal += Math.round(basePrice * 0.12);

    const finalFee = basePrice + addOnTotal;

    const feeEl = document.getElementById('cfg-total-fee');
    if (feeEl) feeEl.textContent = `$${finalFee.toLocaleString()}`;

    // Update Checkout Button data
    if (getFundedCheckoutBtn) {
      getFundedCheckoutBtn.setAttribute('data-plan', program.name);
      getFundedCheckoutBtn.setAttribute('data-size', `$${currentAccountSize.toLocaleString()}`);
      getFundedCheckoutBtn.setAttribute('data-fee', `$${finalFee.toLocaleString()}`);
    }
  }

  // Event Listeners for Tabs
  programTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      programTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentProgramKey = btn.getAttribute('data-program');
      updateConfiguratorUI();
    });
  });

  // Event Listeners for Size Pills
  sizePillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizePillButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAccountSize = parseInt(btn.getAttribute('data-size'), 10);
      updateConfiguratorUI();
    });
  });

  // Add-ons listener
  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', (e) => {
      const addonKey = e.target.getAttribute('data-addon');
      addons[addonKey] = e.target.checked;

      const parentItem = e.target.closest('.addon-toggle-item');
      if (parentItem) {
        if (e.target.checked) parentItem.classList.add('selected');
        else parentItem.classList.remove('selected');
      }

      updateConfiguratorUI();
    });
  });

  // ==========================================
  // 2. Interactive Profit & ROI Calculator
  // ==========================================
  const calcBalanceSlider = document.getElementById('calc-balance-slider');
  const calcGainSlider = document.getElementById('calc-gain-slider');
  const calcSplitSelect = document.getElementById('calc-split-select');

  const calcBalanceDisplay = document.getElementById('calc-balance-display');
  const calcGainDisplay = document.getElementById('calc-gain-display');
  const calcTraderPayout = document.getElementById('calc-trader-payout');
  const calcTotalProfit = document.getElementById('calc-total-profit');
  const calcFundShare = document.getElementById('calc-fund-share');
  const calcAnnualPayout = document.getElementById('calc-annual-payout');

  function updateRoiCalculator() {
    if (!calcBalanceSlider || !calcGainSlider) return;

    const balance = parseFloat(calcBalanceSlider.value);
    const gainPct = parseFloat(calcGainSlider.value);
    const splitPct = parseFloat(calcSplitSelect ? calcSplitSelect.value : 85) / 100;

    // Displays
    if (calcBalanceDisplay) calcBalanceDisplay.textContent = `$${balance.toLocaleString()}`;
    if (calcGainDisplay) calcGainDisplay.textContent = `${gainPct}%`;

    // Calculations
    const totalProfit = balance * (gainPct / 100);
    const traderShare = totalProfit * splitPct;
    const fundShare = totalProfit * (1 - splitPct);
    const annualShare = traderShare * 12;

    if (calcTraderPayout) calcTraderPayout.textContent = `$${Math.round(traderShare).toLocaleString()}`;
    if (calcTotalProfit) calcTotalProfit.textContent = `$${Math.round(totalProfit).toLocaleString()}`;
    if (calcFundShare) calcFundShare.textContent = `$${Math.round(fundShare).toLocaleString()}`;
    if (calcAnnualPayout) calcAnnualPayout.textContent = `$${Math.round(annualShare).toLocaleString()}/yr`;
  }

  if (calcBalanceSlider) {
    calcBalanceSlider.addEventListener('input', updateRoiCalculator);
  }
  if (calcGainSlider) {
    calcGainSlider.addEventListener('input', updateRoiCalculator);
  }
  if (calcSplitSelect) {
    calcSplitSelect.addEventListener('change', updateRoiCalculator);
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    updateConfiguratorUI();
    updateRoiCalculator();
  });
})();
