/**
 * Animated Commute Card
 * Custom card for Home Assistant with CSS animations and dynamic backgrounds
 * 
 * @version 1.0.0
 * @author smalarz
 * @license MIT
 */

const CARD_VERSION = '1.0.0';

// Internationalization
const I18N = {
  pl: {
    toWork: 'Do pracy',
    toHome: 'Z pracy do domu',
    noData: 'brak danych',
    min: 'min',
    traffic: 'Ruch',
    light: 'Mały',
    moderate: 'Umiarkowany',
    heavy: 'Duży',
    veryHeavy: 'Bardzo duży',
    leaveNow: 'Wyjedź teraz!',
    optimal: 'Optymalny czas',
    delayed: 'Korki',
    name: 'Dojazdy',
    editor: {
      entity_to_work: 'Sensor do pracy',
      entity_to_home: 'Sensor do domu',
      name: 'Nazwa karty',
      show_animations: 'Pokaż animacje',
      warning_threshold: 'Próg ostrzeżenia (min)',
      danger_threshold: 'Próg alarmu (min)',
      optimal_threshold: 'Próg optymalny (min)',
      show_traffic_indicator: 'Pokaż wskaźnik ruchu',
      icon_style: 'Styl ikon'
    }
  },
  en: {
    toWork: 'To work',
    toHome: 'Back home',
    noData: 'no data',
    min: 'min',
    traffic: 'Traffic',
    light: 'Light',
    moderate: 'Moderate',
    heavy: 'Heavy',
    veryHeavy: 'Very heavy',
    leaveNow: 'Leave now!',
    optimal: 'Optimal time',
    delayed: 'Traffic jam',
    name: 'Commute',
    editor: {
      entity_to_work: 'Sensor to work',
      entity_to_home: 'Sensor to home',
      name: 'Card name',
      show_animations: 'Show animations',
      warning_threshold: 'Warning threshold (min)',
      danger_threshold: 'Danger threshold (min)',
      optimal_threshold: 'Optimal threshold (min)',
      show_traffic_indicator: 'Show traffic indicator',
      icon_style: 'Icon style'
    }
  },
  de: {
    toWork: 'Zur Arbeit',
    toHome: 'Nach Hause',
    noData: 'keine Daten',
    min: 'min',
    traffic: 'Verkehr',
    light: 'Gering',
    moderate: 'Mäßig',
    heavy: 'Stark',
    veryHeavy: 'Sehr stark',
    leaveNow: 'Jetzt losfahren!',
    optimal: 'Optimale Zeit',
    delayed: 'Stau',
    name: 'Pendeln',
    editor: {
      entity_to_work: 'Sensor zur Arbeit',
      entity_to_home: 'Sensor nach Hause',
      name: 'Kartenname',
      show_animations: 'Animationen anzeigen',
      warning_threshold: 'Warnschwelle (min)',
      danger_threshold: 'Alarmschwelle (min)',
      optimal_threshold: 'Optimalschwelle (min)',
      show_traffic_indicator: 'Verkehrsanzeige',
      icon_style: 'Icon-Stil'
    }
  }
};

// SVG Icons
const ICONS = {
  car: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  work: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`,
  traffic: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 10h-3V8.86c1.72-.45 3-2 3-3.86h-3V4c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v1H4c0 1.86 1.28 3.41 3 3.86V10H4c0 1.86 1.28 3.41 3 3.86V15H4c0 1.86 1.28 3.41 3 3.86V20c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1.14c1.72-.45 3-2 3-3.86h-3v-1.14c1.72-.45 3-2 3-3.86zm-8 7c-1.11 0-2-.9-2-2s.89-2 2-2c1.1 0 2 .9 2 2s-.89 2-2 2zm0-5c-1.11 0-2-.9-2-2s.89-2 2-2c1.1 0 2 .9 2 2s-.89 2-2 2zm0-5c-1.11 0-2-.9-2-2 0-.55.22-1.05.59-1.41C12.95 4.22 13.45 4 14 4h-2c-1.1 0-2 .9-2 2s.89 2 2 2z"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`
};

// Get language from Home Assistant
function getLang(hass) {
  const lang = hass?.language || navigator.language?.split('-')[0] || 'en';
  return I18N[lang] || I18N.en;
}

// Traffic status calculation
function getTrafficStatus(time, config, lang) {
  const optimal = config.optimal_threshold || 25;
  const warning = config.warning_threshold || 45;
  const danger = config.danger_threshold || 60;
  
  if (time <= optimal) {
    return { level: 'optimal', text: lang.light, color: '#10b981', icon: 'check' };
  } else if (time <= warning) {
    return { level: 'moderate', text: lang.moderate, color: '#f59e0b', icon: 'clock' };
  } else if (time <= danger) {
    return { level: 'heavy', text: lang.heavy, color: '#f97316', icon: 'warning' };
  } else {
    return { level: 'critical', text: lang.veryHeavy, color: '#ef4444', icon: 'warning' };
  }
}

// CSS Styles
const STYLES = `
  :host {
    --acc-bg-morning: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    --acc-bg-day: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --acc-bg-evening: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    --acc-bg-night: linear-gradient(135deg, #0c1445 0%, #1a237e 50%, #311b92 100%);
    --acc-text-primary: #ffffff;
    --acc-text-secondary: rgba(255,255,255,0.8);
    --acc-card-bg: rgba(255,255,255,0.1);
    --acc-card-border: rgba(255,255,255,0.2);
    --acc-shadow: 0 8px 32px rgba(0,0,0,0.3);
    --acc-blur: blur(10px);
    --acc-optimal: #10b981;
    --acc-warning: #f59e0b;
    --acc-danger: #ef4444;
    --acc-radius: 16px;
    --acc-name-size: 14px;
    --acc-time-size: 48px;
    --acc-label-size: 13px;
  }

  .acc-container {
    position: relative;
    border-radius: var(--acc-radius);
    overflow: hidden;
    min-height: 180px;
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .acc-background {
    position: absolute;
    inset: 0;
    transition: background 1s ease;
  }

  .acc-background.morning { background: var(--acc-bg-morning); }
  .acc-background.day { background: var(--acc-bg-day); }
  .acc-background.evening { background: var(--acc-bg-evening); }
  .acc-background.night { background: var(--acc-bg-night); }

  /* Animated road */
  .acc-road {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(180deg, #374151 0%, #1f2937 100%);
    overflow: hidden;
  }

  .acc-road::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 200%;
    height: 4px;
    background: repeating-linear-gradient(
      90deg,
      #fbbf24 0px,
      #fbbf24 30px,
      transparent 30px,
      transparent 60px
    );
    animation: roadMove 2s linear infinite;
    transform: translateY(-50%);
  }

  @keyframes roadMove {
    0% { transform: translateX(0) translateY(-50%); }
    100% { transform: translateX(-60px) translateY(-50%); }
  }

  .acc-road.paused::before {
    animation-play-state: paused;
  }

  /* Animated cars on road */
  .acc-cars {
    position: absolute;
    bottom: 45px;
    left: 0;
    right: 0;
    height: 30px;
    overflow: hidden;
  }

  .acc-car {
    position: absolute;
    width: 40px;
    height: 20px;
    animation: carMove 8s linear infinite;
  }

  .acc-car svg {
    width: 100%;
    height: 100%;
  }

  .acc-car.car1 { left: -50px; animation-delay: 0s; color: #ef4444; }
  .acc-car.car2 { left: -50px; animation-delay: 2s; color: #3b82f6; }
  .acc-car.car3 { left: -50px; animation-delay: 4s; color: #10b981; }
  .acc-car.car4 { left: -50px; animation-delay: 6s; color: #f59e0b; }

  @keyframes carMove {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(100vw + 100px)); }
  }

  .acc-cars.heavy .acc-car {
    animation-duration: 15s;
  }

  .acc-cars.critical .acc-car {
    animation-duration: 25s;
  }

  /* Traffic lights */
  .acc-traffic-light {
    position: absolute;
    right: 20px;
    bottom: 50px;
    width: 20px;
    height: 50px;
    background: #1f2937;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }

  .acc-light {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    opacity: 0.3;
    transition: opacity 0.3s, box-shadow 0.3s;
  }

  .acc-light.red { background: #ef4444; }
  .acc-light.yellow { background: #fbbf24; }
  .acc-light.green { background: #10b981; }

  .acc-light.active {
    opacity: 1;
    box-shadow: 0 0 20px currentColor;
  }

  .acc-light.red.active { box-shadow: 0 0 20px #ef4444; }
  .acc-light.yellow.active { box-shadow: 0 0 20px #fbbf24; }
  .acc-light.green.active { box-shadow: 0 0 20px #10b981; }

  /* Content */
  .acc-content {
    position: relative;
    z-index: 10;
    padding: 20px;
    padding-bottom: 50px;
    color: var(--acc-text-primary);
  }

  .acc-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .acc-header-icon {
    width: 24px;
    height: 24px;
    opacity: 0.9;
  }

  .acc-name {
    font-size: var(--acc-name-size);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.9;
  }

  .acc-routes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .acc-route {
    background: var(--acc-card-bg);
    backdrop-filter: var(--acc-blur);
    -webkit-backdrop-filter: var(--acc-blur);
    border: 1px solid var(--acc-card-border);
    border-radius: 12px;
    padding: 16px;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .acc-route:hover {
    transform: translateY(-2px);
    box-shadow: var(--acc-shadow);
  }

  .acc-route-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .acc-route-icon {
    width: 20px;
    height: 20px;
    opacity: 0.8;
  }

  .acc-route-label {
    font-size: var(--acc-label-size);
    font-weight: 500;
    opacity: 0.9;
  }

  .acc-route-time {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .acc-time-value {
    font-size: var(--acc-time-size);
    font-weight: 700;
    line-height: 1;
    transition: color 0.3s;
  }

  .acc-time-value.optimal { color: var(--acc-optimal); }
  .acc-time-value.warning { color: var(--acc-warning); }
  .acc-time-value.danger { color: var(--acc-danger); }

  .acc-time-unit {
    font-size: 18px;
    font-weight: 500;
    opacity: 0.7;
  }

  .acc-route-status {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
    font-size: 12px;
    opacity: 0.8;
  }

  .acc-status-icon {
    width: 14px;
    height: 14px;
  }

  .acc-no-data {
    color: var(--acc-text-secondary);
    font-size: 16px;
    font-style: italic;
  }

  /* Pulse animation for warnings */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .acc-time-value.danger {
    animation: pulse 1.5s ease-in-out infinite;
  }

  /* Shine effect */
  .acc-route::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.1),
      transparent
    );
    animation: shine 3s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes shine {
    0% { left: -100%; }
    50%, 100% { left: 100%; }
  }

  .acc-route {
    position: relative;
    overflow: hidden;
  }

  /* Stars for night */
  .acc-stars {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transition: opacity 1s;
  }

  .acc-background.night + .acc-stars {
    opacity: 1;
  }

  .acc-star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation: twinkle 2s ease-in-out infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  /* Clouds */
  .acc-clouds {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    height: 60px;
    overflow: hidden;
    pointer-events: none;
  }

  .acc-cloud {
    position: absolute;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    animation: cloudFloat 20s linear infinite;
  }

  .acc-cloud::before,
  .acc-cloud::after {
    content: '';
    position: absolute;
    background: inherit;
    border-radius: 50%;
  }

  .acc-cloud.c1 {
    width: 60px;
    height: 20px;
    top: 10px;
    left: -80px;
    animation-duration: 25s;
  }
  .acc-cloud.c1::before { width: 30px; height: 30px; top: -15px; left: 10px; }
  .acc-cloud.c1::after { width: 25px; height: 25px; top: -10px; left: 30px; }

  .acc-cloud.c2 {
    width: 50px;
    height: 16px;
    top: 30px;
    left: -60px;
    animation-duration: 30s;
    animation-delay: 5s;
  }
  .acc-cloud.c2::before { width: 25px; height: 25px; top: -12px; left: 8px; }
  .acc-cloud.c2::after { width: 20px; height: 20px; top: -8px; left: 25px; }

  @keyframes cloudFloat {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(100vw + 200px)); }
  }

  .acc-background.night .acc-clouds {
    opacity: 0.2;
  }

  /* No animations mode */
  .acc-container.no-animations .acc-road::before,
  .acc-container.no-animations .acc-car,
  .acc-container.no-animations .acc-cloud,
  .acc-container.no-animations .acc-star,
  .acc-container.no-animations .acc-route::after,
  .acc-container.no-animations .acc-time-value.danger {
    animation: none !important;
  }
`;

class AnimatedCommuteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._hass = null;
  }

  static get properties() {
    return {
      _config: {},
      _hass: {}
    };
  }

  static getConfigElement() {
    return document.createElement('animated-commute-card-editor');
  }

  static getStubConfig() {
    return {
      entity_to_work: '',
      entity_to_home: '',
      name: '',
      show_animations: true,
      warning_threshold: 45,
      danger_threshold: 60,
      optimal_threshold: 25,
      show_traffic_indicator: true
    };
  }

  setConfig(config) {
    if (!config.entity_to_work && !config.entity_to_home) {
      throw new Error('Please define at least one entity (entity_to_work or entity_to_home)');
    }
    this._config = {
      name: '',
      show_animations: true,
      warning_threshold: 45,
      danger_threshold: 60,
      optimal_threshold: 25,
      show_traffic_indicator: true,
      ...config
    };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _getTimeOfDay() {
    if (!this._hass) return 'day';
    
    const sunEntity = this._hass.states['sun.sun'];
    if (!sunEntity) {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 9) return 'morning';
      if (hour >= 9 && hour < 17) return 'day';
      if (hour >= 17 && hour < 21) return 'evening';
      return 'night';
    }
    
    const isNight = sunEntity.state === 'below_horizon';
    if (isNight) return 'night';
    
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) return 'morning';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'day';
  }

  _getTrafficLevel(toWorkTime, toHomeTime) {
    const maxTime = Math.max(
      parseInt(toWorkTime) || 0,
      parseInt(toHomeTime) || 0
    );
    
    if (maxTime <= this._config.optimal_threshold) return 'optimal';
    if (maxTime <= this._config.warning_threshold) return 'moderate';
    if (maxTime <= this._config.danger_threshold) return 'heavy';
    return 'critical';
  }

  _generateStars(count = 20) {
    let stars = '';
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 60;
      const delay = Math.random() * 2;
      const size = 1 + Math.random() * 2;
      stars += `<div class="acc-star" style="left:${x}%;top:${y}%;animation-delay:${delay}s;width:${size}px;height:${size}px;"></div>`;
    }
    return stars;
  }

  _render() {
    if (!this._hass || !this._config) return;

    const lang = getLang(this._hass);
    const timeOfDay = this._getTimeOfDay();
    
    const toWorkState = this._config.entity_to_work 
      ? this._hass.states[this._config.entity_to_work] 
      : null;
    const toHomeState = this._config.entity_to_home 
      ? this._hass.states[this._config.entity_to_home] 
      : null;

    const toWorkTime = toWorkState?.state;
    const toHomeTime = toHomeState?.state;
    
    const toWorkValid = toWorkTime && !['unknown', 'unavailable'].includes(toWorkTime);
    const toHomeValid = toHomeTime && !['unknown', 'unavailable'].includes(toHomeTime);
    
    const toWorkStatus = toWorkValid ? getTrafficStatus(parseInt(toWorkTime), this._config, lang) : null;
    const toHomeStatus = toHomeValid ? getTrafficStatus(parseInt(toHomeTime), this._config, lang) : null;
    
    const trafficLevel = this._getTrafficLevel(toWorkTime, toHomeTime);
    
    const getTimeClass = (time) => {
      if (!time || ['unknown', 'unavailable'].includes(time)) return '';
      const t = parseInt(time);
      if (t > this._config.danger_threshold) return 'danger';
      if (t > this._config.warning_threshold) return 'warning';
      return 'optimal';
    };

    const getTrafficLight = () => {
      if (trafficLevel === 'optimal') return { red: false, yellow: false, green: true };
      if (trafficLevel === 'moderate') return { red: false, yellow: true, green: false };
      return { red: true, yellow: false, green: false };
    };
    
    const lights = getTrafficLight();
    const cardName = this._config.name || lang.name;
    const animClass = this._config.show_animations ? '' : 'no-animations';

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <ha-card>
        <div class="acc-container ${animClass}">
          <div class="acc-background ${timeOfDay}"></div>
          
          <div class="acc-stars">
            ${this._generateStars(25)}
          </div>
          
          <div class="acc-clouds">
            <div class="acc-cloud c1"></div>
            <div class="acc-cloud c2"></div>
          </div>
          
          <div class="acc-content">
            <div class="acc-header">
              <div class="acc-header-icon">${ICONS.car}</div>
              <div class="acc-name">${cardName}</div>
            </div>
            
            <div class="acc-routes">
              ${this._config.entity_to_work ? `
                <div class="acc-route">
                  <div class="acc-route-header">
                    <div class="acc-route-icon">${ICONS.work}</div>
                    <div class="acc-route-label">${lang.toWork}</div>
                  </div>
                  ${toWorkValid ? `
                    <div class="acc-route-time">
                      <span class="acc-time-value ${getTimeClass(toWorkTime)}">${parseInt(toWorkTime) > 59 ? '⚠️ ' : ''}${toWorkTime}</span>
                      <span class="acc-time-unit">${lang.min}</span>
                    </div>
                    ${toWorkStatus ? `
                      <div class="acc-route-status" style="color: ${toWorkStatus.color}">
                        <span class="acc-status-icon">${ICONS[toWorkStatus.icon]}</span>
                        <span>${toWorkStatus.text}</span>
                      </div>
                    ` : ''}
                  ` : `
                    <div class="acc-no-data">${lang.noData}</div>
                  `}
                </div>
              ` : ''}
              
              ${this._config.entity_to_home ? `
                <div class="acc-route">
                  <div class="acc-route-header">
                    <div class="acc-route-icon">${ICONS.home}</div>
                    <div class="acc-route-label">${lang.toHome}</div>
                  </div>
                  ${toHomeValid ? `
                    <div class="acc-route-time">
                      <span class="acc-time-value ${getTimeClass(toHomeTime)}">${parseInt(toHomeTime) > 59 ? '⚠️ ' : ''}${toHomeTime}</span>
                      <span class="acc-time-unit">${lang.min}</span>
                    </div>
                    ${toHomeStatus ? `
                      <div class="acc-route-status" style="color: ${toHomeStatus.color}">
                        <span class="acc-status-icon">${ICONS[toHomeStatus.icon]}</span>
                        <span>${toHomeStatus.text}</span>
                      </div>
                    ` : ''}
                  ` : `
                    <div class="acc-no-data">${lang.noData}</div>
                  `}
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="acc-cars ${trafficLevel}">
            <div class="acc-car car1">${ICONS.car}</div>
            <div class="acc-car car2">${ICONS.car}</div>
            <div class="acc-car car3">${ICONS.car}</div>
            <div class="acc-car car4">${ICONS.car}</div>
          </div>
          
          <div class="acc-road ${trafficLevel === 'critical' ? 'paused' : ''}"></div>
          
          ${this._config.show_traffic_indicator ? `
            <div class="acc-traffic-light">
              <div class="acc-light red ${lights.red ? 'active' : ''}"></div>
              <div class="acc-light yellow ${lights.yellow ? 'active' : ''}"></div>
              <div class="acc-light green ${lights.green ? 'active' : ''}"></div>
            </div>
          ` : ''}
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 3;
  }
}

// Visual Editor
class AnimatedCommuteCardEditor extends HTMLElement {
  constructor() {
    super();
    this._config = {};
    this._hass = null;
  }

  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    if (!this._hass) return;

    const lang = getLang(this._hass);
    const entities = Object.keys(this._hass.states)
      .filter(e => e.startsWith('sensor.'))
      .sort();

    this.innerHTML = `
      <style>
        .editor-row {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
        }
        .editor-row label {
          font-weight: 500;
          margin-bottom: 4px;
          color: var(--primary-text-color);
        }
        .editor-row input,
        .editor-row select {
          padding: 8px 12px;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
          font-size: 14px;
        }
        .editor-row input[type="checkbox"] {
          width: 20px;
          height: 20px;
        }
        .checkbox-row {
          flex-direction: row;
          align-items: center;
          gap: 8px;
        }
        .checkbox-row label {
          margin-bottom: 0;
        }
      </style>
      
      <div class="editor-row">
        <label>${lang.editor.entity_to_work}</label>
        <select id="entity_to_work">
          <option value="">-- ${lang.editor.entity_to_work} --</option>
          ${entities.map(e => `
            <option value="${e}" ${this._config.entity_to_work === e ? 'selected' : ''}>${e}</option>
          `).join('')}
        </select>
      </div>
      
      <div class="editor-row">
        <label>${lang.editor.entity_to_home}</label>
        <select id="entity_to_home">
          <option value="">-- ${lang.editor.entity_to_home} --</option>
          ${entities.map(e => `
            <option value="${e}" ${this._config.entity_to_home === e ? 'selected' : ''}>${e}</option>
          `).join('')}
        </select>
      </div>
      
      <div class="editor-row">
        <label>${lang.editor.name}</label>
        <input type="text" id="name" value="${this._config.name || ''}" placeholder="${lang.name}">
      </div>
      
      <div class="editor-row">
        <label>${lang.editor.optimal_threshold}</label>
        <input type="number" id="optimal_threshold" value="${this._config.optimal_threshold || 25}" min="1" max="120">
      </div>
      
      <div class="editor-row">
        <label>${lang.editor.warning_threshold}</label>
        <input type="number" id="warning_threshold" value="${this._config.warning_threshold || 45}" min="1" max="180">
      </div>
      
      <div class="editor-row">
        <label>${lang.editor.danger_threshold}</label>
        <input type="number" id="danger_threshold" value="${this._config.danger_threshold || 60}" min="1" max="240">
      </div>
      
      <div class="editor-row checkbox-row">
        <input type="checkbox" id="show_animations" ${this._config.show_animations !== false ? 'checked' : ''}>
        <label>${lang.editor.show_animations}</label>
      </div>
      
      <div class="editor-row checkbox-row">
        <input type="checkbox" id="show_traffic_indicator" ${this._config.show_traffic_indicator !== false ? 'checked' : ''}>
        <label>${lang.editor.show_traffic_indicator}</label>
      </div>
    `;

    // Event listeners
    ['entity_to_work', 'entity_to_home', 'name', 'optimal_threshold', 'warning_threshold', 'danger_threshold'].forEach(id => {
      const el = this.querySelector(`#${id}`);
      if (el) {
        el.addEventListener('change', (e) => this._valueChanged(id, e.target.value));
      }
    });

    ['show_animations', 'show_traffic_indicator'].forEach(id => {
      const el = this.querySelector(`#${id}`);
      if (el) {
        el.addEventListener('change', (e) => this._valueChanged(id, e.target.checked));
      }
    });
  }

  _valueChanged(key, value) {
    if (key.includes('threshold')) {
      value = parseInt(value) || 0;
    }
    
    const newConfig = { ...this._config, [key]: value };
    
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}

// Register elements
customElements.define('animated-commute-card', AnimatedCommuteCard);
customElements.define('animated-commute-card-editor', AnimatedCommuteCardEditor);

// Register with HACS / HA
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'animated-commute-card',
  name: 'Animated Commute Card',
  description: 'Commute card for Home Assistant with CSS animations and dynamic backgrounds',
  preview: true,
  documentationURL: 'https://github.com/smalarz/animated-commute-card'
});

console.info(
  `%c ANIMATED-COMMUTE-CARD %c v${CARD_VERSION} `,
  'color: white; background: #667eea; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #667eea; background: white; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0; border: 1px solid #667eea;'
);
