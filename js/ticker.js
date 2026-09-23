/**
 * SOLID GOLD FUND - TICKERS & REAL-TIME DATA SIMULATOR
 */

(function () {
  // 1. Live Market Ticker Simulator
  const marketData = [
    { symbol: 'XAU/USD (Gold)', price: 2684.50, change: 0.42, decimals: 2 },
    { symbol: 'BTC/USD', price: 94280.00, change: 1.85, decimals: 2 },
    { symbol: 'EUR/USD', price: 1.0845, change: -0.12, decimals: 4 },
    { symbol: 'ETH/USD', price: 3450.20, change: 0.95, decimals: 2 },
    { symbol: 'GBP/USD', price: 1.2980, change: 0.18, decimals: 4 },
    { symbol: 'USD/JPY', price: 154.20, change: -0.24, decimals: 2 },
    { symbol: 'US30 (Dow)', price: 43850.00, change: 0.35, decimals: 2 },
    { symbol: 'NAS100', price: 20620.00, change: 0.72, decimals: 2 }
  ];

  function renderMarketTicker() {
    const track = document.getElementById('market-ticker-track');
    if (!track) return;

    let itemsHtml = '';
    // Duplicate array to ensure seamless infinite looping marquee
    const fullList = [...marketData, ...marketData];

    fullList.forEach((item, index) => {
      const isPositive = item.change >= 0;
      const changeClass = isPositive ? 'up' : 'down';
      const changeIcon = isPositive ? '▲' : '▼';
      const changeSign = isPositive ? '+' : '';

      itemsHtml += `
        <div class="ticker-item" id="ticker-item-${index}">
          <span class="ticker-symbol">${item.symbol}</span>
          <span class="ticker-price">$${item.price.toLocaleString(undefined, { minimumFractionDigits: item.decimals, maximumFractionDigits: item.decimals })}</span>
          <span class="ticker-change ${changeClass}">${changeIcon} ${changeSign}${item.change.toFixed(2)}%</span>
        </div>
      `;
    });

    track.innerHTML = itemsHtml;
  }

  // Fluctuate prices slightly every 3 seconds for live feel
  function simulateLiveTicks() {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * marketData.length);
      const item = marketData[randomIndex];
      const delta = (Math.random() - 0.48) * (item.price * 0.0008);
      item.price += delta;
      item.change += (Math.random() - 0.5) * 0.04;

      renderMarketTicker();
    }, 2800);
  }

  // 2. Verified Payouts Stream
  const samplePayouts = [
    { name: 'Chen W.', country: '🇸🇬 Singapore', amount: '$57,973.00', method: 'USDT (TRC20)', time: '12m ago', avatar: 'CW' },
    { name: 'Marcus V.', country: '🇩🇪 Germany', amount: '$31,800.50', method: 'Bank Wire', time: '28m ago', avatar: 'MV' },
    { name: 'Liam K.', country: '🇦🇺 Australia', amount: '$14,250.00', method: 'Rise Payout', time: '45m ago', avatar: 'LK' },
    { name: 'Tariq A.', country: '🇦🇪 UAE', amount: '$42,500.00', method: 'Crypto BTC', time: '1h ago', avatar: 'TA' },
    { name: 'Elena R.', country: '🇬🇧 United Kingdom', amount: '$22,940.00', method: 'Deel Transfer', time: '1h 20m ago', avatar: 'ER' },
    { name: 'Hiroshi S.', country: '🇯🇵 Japan', amount: '$18,750.00', method: 'USDT (ERC20)', time: '2h ago', avatar: 'HS' },
    { name: 'David M.', country: '🇺🇸 United States', amount: '$38,600.00', method: 'Bank Wire', time: '2h 15m ago', avatar: 'DM' },
    { name: 'Mateo G.', country: '🇪🇸 Spain', amount: '$12,400.00', method: 'Crypto USDT', time: '3h ago', avatar: 'MG' }
  ];

  function renderPayouts() {
    const track = document.getElementById('payout-ticker-track');
    if (!track) return;

    let html = '';
    const duplicated = [...samplePayouts, ...samplePayouts];

    duplicated.forEach(p => {
      html += `
        <div class="payout-card">
          <div class="trader-avatar">${p.avatar}</div>
          <div class="payout-info">
            <div class="payout-name">${p.name} <span style="font-size:0.8rem; font-weight:normal; color:#94A3B8;">(${p.country})</span></div>
            <div class="payout-amount">${p.amount}</div>
            <div class="payout-meta">${p.method} • <span style="color:#00F298;">Verified</span> • ${p.time}</div>
          </div>
        </div>
      `;
    });

    track.innerHTML = html;
  }

  // 3. Countdown Timer for "Rat Race Breaker" Masterclass
  function initCountdown() {
    // Target event date: next upcoming weekend
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 3);
    eventDate.setHours(13, 0, 0, 0);

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minsEl = document.getElementById('countdown-mins');
    const secsEl = document.getElementById('countdown-secs');

    if (!daysEl) return;

    function updateTimer() {
      const now = new Date().getTime();
      const diff = eventDate.getTime() - now;

      if (diff <= 0) {
        daysEl.innerText = '00';
        hoursEl.innerText = '00';
        minsEl.innerText = '00';
        secsEl.innerText = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.innerText = String(days).padStart(2, '0');
      hoursEl.innerText = String(hours).padStart(2, '0');
      minsEl.innerText = String(mins).padStart(2, '0');
      secsEl.innerText = String(secs).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderMarketTicker();
    simulateLiveTicks();
    renderPayouts();
    initCountdown();
  });
})();
