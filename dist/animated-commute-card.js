/**
 * Animated Commute Card
 * Custom card for Home Assistant with CSS animations and dynamic backgrounds
 * 
 * @version 3.0.0
 * @author smalarz
 * @license MIT
 */

const CARD_VERSION = '3.0.0';

// Internationalization
const I18N = {
  pl: {
    noData: 'brak danych',
    min: 'min',
    light: 'Mały ruch',
    moderate: 'Umiarkowany',
    heavy: 'Duży ruch',
    veryHeavy: 'Korki!',
    name: 'Dojazdy',
    editor: {
      name: 'Nazwa karty',
      show_animations: 'Pokaż animacje',
      show_road: 'Pokaż animowaną drogę',
      show_traffic_light: 'Pokaż sygnalizator',
      routes: 'Trasy',
      add_route: '+ Dodaj trasę',
      route_entity: 'Sensor (czas w minutach)',
      route_name: 'Nazwa trasy',
      route_icon: 'Ikona',
      remove: 'Usuń'
    }
  },
  en: {
    noData: 'no data',
    min: 'min',
    light: 'Light traffic',
    moderate: 'Moderate',
    heavy: 'Heavy traffic',
    veryHeavy: 'Traffic jam!',
    name: 'Commute',
    editor: {
      name: 'Card name',
      show_animations: 'Show animations',
      show_road: 'Show animated road',
      show_traffic_light: 'Show traffic light',
      routes: 'Routes',
      add_route: '+ Add route',
      route_entity: 'Sensor (time in minutes)',
      route_name: 'Route name',
      route_icon: 'Icon',
      remove: 'Remove'
    }
  },
  de: {
    noData: 'keine Daten',
    min: 'min',
    light: 'Wenig Verkehr',
    moderate: 'Mäßig',
    heavy: 'Viel Verkehr',
    veryHeavy: 'Stau!',
    name: 'Pendeln',
    editor: {
      name: 'Kartenname',
      show_animations: 'Animationen anzeigen',
      show_road: 'Animierte Straße anzeigen',
      show_traffic_light: 'Ampel anzeigen',
      routes: 'Routen',
      add_route: '+ Route hinzufügen',
      route_entity: 'Sensor (Zeit in Minuten)',
      route_name: 'Routenname',
      route_icon: 'Icon',
      remove: 'Entfernen'
    }
  }
};

// SVG Icons
const ICONS = {
  car: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  work: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>`,
  school: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>`,
  store: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z"/></svg>`,
  gym: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>`
};

// Get language from Home Assistant
function getLang(hass) {
  const lang = hass?.language?.split('-')[0] || navigator.language?.split('-')[0] || 'en';
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

// CSS Styles - CALM animations
const STYLES = `
  :host {
    --acc-optimal: #10b981;
    --acc-warning: #f59e0b;
    --acc-danger: #ef4444;
    --acc-accent-morning: linear-gradient(90deg, #667eea, #764ba2);
    --acc-accent-day: linear-gradient(90deg, #4facfe, #00f2fe);
    --acc-accent-evening: linear-gradient(90deg, #fa709a, #fee140);
    --acc-accent-night: linear-gradient(90deg, #0c1445, #311b92);
  }

  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 12px);
  }

  * {
    box-sizing: border-box;
  }

  .acc-container {
    position: relative;
    border-radius: var(--ha-card-border-radius, 12px);
    overflow: hidden;
    min-height: 160px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  /* Accent bar at top - subtle gradient based on time of day */
  .acc-accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
  }

  .acc-accent-bar.morning { background: var(--acc-accent-morning); }
  .acc-accent-bar.day { background: var(--acc-accent-day); }
  .acc-accent-bar.evening { background: var(--acc-accent-evening); }
  .acc-accent-bar.night { background: var(--acc-accent-night); }

  /* Road - SLOW animation, toned down */
  .acc-road {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 35px;
    background: var(--divider-color, rgba(0,0,0,0.08));
    overflow: hidden;
  }

  .acc-road-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 200%;
    height: 3px;
    background: repeating-linear-gradient(
      90deg,
      #fbbf24 0px,
      #fbbf24 25px,
      transparent 25px,
      transparent 50px
    );
    transform: translateY(-50%);
    animation: roadMove 4s linear infinite;
  }

  @keyframes roadMove {
    from { transform: translateX(0) translateY(-50%); }
    to { transform: translateX(-50px) translateY(-50%); }
  }

  /* Single car - SLOWER, more subtle */
  .acc-car-anim {
    position: absolute;
    bottom: 40px;
    width: 35px;
    height: 18px;
    color: #3b82f6;
    animation: carDrive 18s linear infinite;
    opacity: 0.6;
  }

  .acc-car-anim svg {
    width: 100%;
    height: 100%;
  }

  @keyframes carDrive {
    from { left: -40px; }
    to { left: 100%; }
  }

  /* Content */
  .acc-content {
    position: relative;
    z-index: 10;
    padding: 16px 16px 8px;
    color: var(--primary-text-color);
  }

  .acc-header {
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.06));
    padding-bottom: 12px;
    margin-bottom: 14px;
  }

  .acc-header-icon {
    width: 22px;
    height: 22px;
    color: var(--primary-text-color);
    opacity: 0.6;
  }

  .acc-name {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--secondary-text-color);
  }

  .acc-routes {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .acc-route {
    flex: 1 1 140px;
    min-width: 140px;
    background: var(--secondary-background-color, rgba(0,0,0,0.04));
    border: 1px solid var(--divider-color, rgba(0,0,0,0.08));
    border-radius: 12px;
    padding: 14px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .acc-route-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
  }

  .acc-route-icon {
    width: 18px;
    height: 18px;
    color: var(--primary-text-color);
    opacity: 0.85;
  }

  .acc-route-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--primary-text-color);
    opacity: 0.9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .acc-route-time {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .acc-time-value {
    font-size: 32px;
    font-weight: 300;
    line-height: 1;
    letter-spacing: -0.5px;
    transition: color 0.5s ease;
  }

  .acc-time-value.optimal { color: var(--acc-optimal); }
  .acc-time-value.warning { color: var(--acc-warning); }
  .acc-time-value.danger { color: var(--acc-danger); }

  .acc-time-unit {
    font-size: 14px;
    font-weight: 400;
    opacity: 0.7;
    margin-left: 3px;
    color: var(--primary-text-color);
  }

  .acc-route-status {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 6px;
    font-size: 11px;
    color: var(--secondary-text-color);
    opacity: 0.7;
  }

  .acc-status-icon {
    width: 12px;
    height: 12px;
  }

  /* Progress bar for traffic status */
  .acc-traffic-bar {
    height: 3px;
    border-radius: 2px;
    margin-top: 8px;
    transition: background-color 0.5s ease;
    width: 100%;
  }

  .acc-traffic-bar.optimal { background: var(--acc-optimal); }
  .acc-traffic-bar.warning { background: var(--acc-warning); }
  .acc-traffic-bar.danger { background: var(--acc-danger); }

  .acc-no-data {
    color: var(--secondary-text-color);
    font-size: 14px;
    font-style: italic;
  }

  /* No animations mode */
  .acc-container.no-anim .acc-road-line,
  .acc-container.no-anim .acc-car-anim {
    animation: none !important;
  }
  
  .acc-container.no-anim .acc-car-anim {
    display: none;
  }
`;

class AnimatedCommuteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._hass = null;
  }

  static getConfigElement() {
    return document.createElement('animated-commute-card-editor');
  }

  static getStubConfig() {
    return {
      name: '',
      show_animations: true,
      show_road: true,
      show_traffic_light: true,
      warning_threshold: 45,
      danger_threshold: 60,
      optimal_threshold: 25,
      routes: [
        { entity: '', name: 'Do pracy', icon: 'work' },
        { entity: '', name: 'Do domu', icon: 'home' }
      ]
    };
  }

  setConfig(config) {
    // Migration from old format
    if (config.entity_to_work || config.entity_to_home) {
      const routes = [];
      if (config.entity_to_work) {
        routes.push({ entity: config.entity_to_work, name: 'Do pracy', icon: 'work' });
      }
      if (config.entity_to_home) {
        routes.push({ entity: config.entity_to_home, name: 'Do domu', icon: 'home' });
      }
      config = { ...config, routes };
      delete config.entity_to_work;
      delete config.entity_to_home;
    }

    if (!config.routes || config.routes.length === 0) {
      throw new Error('Dodaj przynajmniej jedną trasę');
    }

    this._config = {
      name: '',
      show_animations: true,
      show_road: true,
      show_traffic_light: true,
      warning_threshold: 45,
      danger_threshold: 60,
      optimal_threshold: 25,
      ...config
    };
    
    this._render();
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    
    // Only re-render if entity states changed
    if (oldHass && this._config.routes) {
      const changed = this._config.routes.some(route => {
        const oldState = oldHass.states[route.entity]?.state;
        const newState = hass.states[route.entity]?.state;
        return oldState !== newState;
      });
      if (!changed) return;
    }
    
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

  _getWorstTrafficLevel() {
    let worstLevel = 'optimal';
    const levels = ['optimal', 'moderate', 'heavy', 'critical'];
    
    for (const route of this._config.routes || []) {
      const state = this._hass?.states[route.entity];
      if (!state || ['unknown', 'unavailable'].includes(state.state)) continue;
      
      const time = parseInt(state.state);
      let level = 'optimal';
      if (time > this._config.danger_threshold) level = 'critical';
      else if (time > this._config.warning_threshold) level = 'heavy';
      else if (time > this._config.optimal_threshold) level = 'moderate';
      
      if (levels.indexOf(level) > levels.indexOf(worstLevel)) {
        worstLevel = level;
      }
    }
    
    return worstLevel;
  }

  _getIcon(iconName) {
    if (ICONS[iconName]) return ICONS[iconName];
    return ICONS.map;
  }

  _render() {
    if (!this._hass || !this._config) return;

    const lang = getLang(this._hass);
    const timeOfDay = this._getTimeOfDay();
    const trafficLevel = this._getWorstTrafficLevel();
    
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
    const animClass = this._config.show_animations ? '' : 'no-anim';
    const showRoad = this._config.show_road !== false;
    const showTrafficLight = this._config.show_traffic_light !== false;

    // Build routes HTML
    let routesHtml = '';
    for (const route of this._config.routes || []) {
      const state = this._hass.states[route.entity];
      const time = state?.state;
      const isValid = time && !['unknown', 'unavailable'].includes(time);
      const status = isValid ? getTrafficStatus(parseInt(time), this._config, lang) : null;
      const showWarning = isValid && parseInt(time) > 59;
      const timeClass = getTimeClass(time);

      routesHtml += `
        <div class="acc-route">
          <div class="acc-route-header">
            <div class="acc-route-icon">${this._getIcon(route.icon)}</div>
            <div class="acc-route-label">${route.name || route.entity}</div>
          </div>
          ${isValid ? `
            <div class="acc-route-time">
              <span class="acc-time-value ${timeClass}">${showWarning ? '⚠️ ' : ''}${time}</span>
              <span class="acc-time-unit">${lang.min}</span>
            </div>
            ${status ? `
              <div class="acc-route-status">
                <span class="acc-status-icon" style="color: ${status.color}">${ICONS[status.icon]}</span>
                <span>${status.text}</span>
              </div>
            ` : ''}
            <div class="acc-traffic-bar ${timeClass}"></div>
          ` : `
            <div class="acc-no-data">${lang.noData}</div>
          `}
        </div>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <ha-card>
        <div class="acc-container ${animClass}">
          <div class="acc-accent-bar ${timeOfDay}"></div>
          
          <div class="acc-content">
            <div class="acc-header">
              <div class="acc-header-icon">${ICONS.car}</div>
              <div class="acc-name">${cardName}</div>
            </div>
            
            <div class="acc-routes">
              ${routesHtml}
            </div>
          </div>
          
          ${showRoad ? `
            <div class="acc-car-anim">${ICONS.car}</div>
            <div class="acc-road">
              <div class="acc-road-line"></div>
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

// ============================================
// STABLE Visual Editor - no constant re-renders
// ============================================
class AnimatedCommuteCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._hass = null;
    this._rendered = false;
    this._entityOptions = '';
  }

  setConfig(config) {
    this._config = JSON.parse(JSON.stringify(config || {}));
    
    if (!this._config.routes) {
      this._config.routes = [];
    }
    
    if (this._rendered) {
      this._render();
    }
  }

  set hass(hass) {
    const firstTime = !this._hass;
    this._hass = hass;
    
    if (firstTime && hass) {
      const entities = Object.keys(hass.states)
        .filter(e => e.startsWith('sensor.'))
        .sort();
      this._entityOptions = entities.map(e => `<option value="${e}">${e}</option>`).join('');
      this._render();
      this._rendered = true;
    }
  }

  _render() {
    if (!this._hass) return;

    const lang = getLang(this._hass);
    const config = this._config;

    this.shadowRoot.innerHTML = `
      <style>
        .acc-editor {
          padding: 8px 0;
        }
        .acc-editor-row {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
        }
        .acc-editor-row label {
          font-weight: 500;
          margin-bottom: 6px;
          color: var(--primary-text-color);
          font-size: 14px;
        }
        .acc-editor-row input,
        .acc-editor-row select {
          padding: 10px 12px;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
          font-size: 14px;
          width: 100%;
        }
        .acc-editor-row input:focus,
        .acc-editor-row select:focus {
          outline: none;
          border-color: var(--primary-color);
        }
        .acc-checkbox-row {
          flex-direction: row;
          align-items: center;
          gap: 10px;
        }
        .acc-checkbox-row input[type="checkbox"] {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        .acc-checkbox-row label {
          margin-bottom: 0;
        }
        .acc-section-title {
          font-weight: 600;
          font-size: 15px;
          margin: 20px 0 12px;
          color: var(--primary-text-color);
          border-bottom: 1px solid var(--divider-color);
          padding-bottom: 8px;
        }
        .acc-route-card {
          background: var(--secondary-background-color);
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 12px;
          border: 1px solid var(--divider-color);
        }
        .acc-route-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .acc-route-title {
          font-weight: 500;
          font-size: 14px;
        }
        .acc-btn-remove {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 12px;
          cursor: pointer;
        }
        .acc-btn-remove:hover {
          background: #dc2626;
        }
        .acc-route-fields {
          display: grid;
          gap: 10px;
        }
        .acc-route-field label {
          font-size: 12px;
          color: var(--secondary-text-color);
          display: block;
          margin-bottom: 4px;
        }
        .acc-route-field input,
        .acc-route-field select {
          padding: 8px 10px;
          border: 1px solid var(--divider-color);
          border-radius: 6px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
          font-size: 13px;
          width: 100%;
        }
        .acc-btn-add {
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 14px;
          cursor: pointer;
          width: 100%;
          margin-top: 8px;
        }
        .acc-btn-add:hover {
          opacity: 0.9;
        }
        .acc-thresholds {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }
        .acc-threshold label {
          font-size: 11px;
          display: block;
          margin-bottom: 4px;
        }
        .acc-threshold input {
          padding: 8px;
          border: 1px solid var(--divider-color);
          border-radius: 6px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
          font-size: 13px;
          text-align: center;
          width: 100%;
        }
      </style>
      
      <div class="acc-editor">
        <div class="acc-editor-row">
          <label>${lang.editor.name}</label>
          <input type="text" id="acc-name" value="${config.name || ''}" placeholder="${lang.name}">
        </div>

        <div class="acc-editor-row acc-checkbox-row">
          <input type="checkbox" id="acc-animations" ${config.show_animations !== false ? 'checked' : ''}>
          <label>${lang.editor.show_animations}</label>
        </div>

        <div class="acc-editor-row acc-checkbox-row">
          <input type="checkbox" id="acc-road" ${config.show_road !== false ? 'checked' : ''}>
          <label>${lang.editor.show_road}</label>
        </div>

        <div class="acc-editor-row acc-checkbox-row">
          <input type="checkbox" id="acc-traffic-light" ${config.show_traffic_light !== false ? 'checked' : ''}>
          <label>${lang.editor.show_traffic_light}</label>
        </div>

        <div class="acc-section-title">Progi czasowe (min)</div>
        <div class="acc-thresholds">
          <div class="acc-threshold">
            <label style="color: #10b981;">✓ Optymalny</label>
            <input type="number" id="acc-optimal" value="${config.optimal_threshold || 25}" min="1">
          </div>
          <div class="acc-threshold">
            <label style="color: #f59e0b;">⚠ Ostrzeżenie</label>
            <input type="number" id="acc-warning" value="${config.warning_threshold || 45}" min="1">
          </div>
          <div class="acc-threshold">
            <label style="color: #ef4444;">🚨 Alarm</label>
            <input type="number" id="acc-danger" value="${config.danger_threshold || 60}" min="1">
          </div>
        </div>

        <div class="acc-section-title">${lang.editor.routes}</div>
        <div id="acc-routes-list"></div>
        <button class="acc-btn-add" id="acc-add-route">${lang.editor.add_route}</button>
      </div>
    `;

    this._renderRoutes();
    this._attachListeners();
  }

  _renderRoutes() {
    const container = this.shadowRoot.querySelector('#acc-routes-list');
    if (!container) return;

    const lang = getLang(this._hass);
    
    container.innerHTML = (this._config.routes || []).map((route, i) => `
      <div class="acc-route-card" data-idx="${i}">
        <div class="acc-route-header">
          <span class="acc-route-title">Trasa ${i + 1}</span>
          <button class="acc-btn-remove" data-idx="${i}">${lang.editor.remove}</button>
        </div>
        <div class="acc-route-fields">
          <div class="acc-route-field">
            <label>${lang.editor.route_entity}</label>
            <select class="route-entity" data-idx="${i}">
              <option value="">-- Wybierz --</option>
              ${this._entityOptions}
            </select>
          </div>
          <div class="acc-route-field">
            <label>${lang.editor.route_name}</label>
            <input type="text" class="route-name" data-idx="${i}" value="${route.name || ''}">
          </div>
          <div class="acc-route-field">
            <label>${lang.editor.route_icon}</label>
            <select class="route-icon" data-idx="${i}">
              <option value="work" ${route.icon === 'work' ? 'selected' : ''}>🏢 Praca</option>
              <option value="home" ${route.icon === 'home' ? 'selected' : ''}>🏠 Dom</option>
              <option value="car" ${route.icon === 'car' ? 'selected' : ''}>🚗 Samochód</option>
              <option value="school" ${route.icon === 'school' ? 'selected' : ''}>🎓 Szkoła</option>
              <option value="store" ${route.icon === 'store' ? 'selected' : ''}>🏪 Sklep</option>
              <option value="gym" ${route.icon === 'gym' ? 'selected' : ''}>💪 Siłownia</option>
              <option value="map" ${route.icon === 'map' ? 'selected' : ''}>🗺️ Inne</option>
            </select>
          </div>
        </div>
      </div>
    `).join('');

    // Set entity values after render
    this.shadowRoot.querySelectorAll('.route-entity').forEach(select => {
      const idx = parseInt(select.dataset.idx);
      const route = this._config.routes?.[idx];
      if (route?.entity) {
        select.value = route.entity;
      }
    });

    // Attach route-specific listeners
    this.shadowRoot.querySelectorAll('.route-entity').forEach(el => {
      el.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx);
        this._updateRoute(idx, 'entity', e.target.value);
      });
    });

    this.shadowRoot.querySelectorAll('.route-name').forEach(el => {
      el.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx);
        this._updateRoute(idx, 'name', e.target.value);
      });
    });

    this.shadowRoot.querySelectorAll('.route-icon').forEach(el => {
      el.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx);
        this._updateRoute(idx, 'icon', e.target.value);
      });
    });

    this.shadowRoot.querySelectorAll('.acc-btn-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx);
        this._config.routes.splice(idx, 1);
        this._fire();
        this._renderRoutes();
      });
    });
  }

  _attachListeners() {
    this.shadowRoot.querySelector('#acc-name')?.addEventListener('change', (e) => {
      this._config.name = e.target.value;
      this._fire();
    });

    this.shadowRoot.querySelector('#acc-animations')?.addEventListener('change', (e) => {
      this._config.show_animations = e.target.checked;
      this._fire();
    });

    this.shadowRoot.querySelector('#acc-road')?.addEventListener('change', (e) => {
      this._config.show_road = e.target.checked;
      this._fire();
    });

    this.shadowRoot.querySelector('#acc-traffic-light')?.addEventListener('change', (e) => {
      this._config.show_traffic_light = e.target.checked;
      this._fire();
    });

    this.shadowRoot.querySelector('#acc-optimal')?.addEventListener('change', (e) => {
      this._config.optimal_threshold = parseInt(e.target.value) || 25;
      this._fire();
    });

    this.shadowRoot.querySelector('#acc-warning')?.addEventListener('change', (e) => {
      this._config.warning_threshold = parseInt(e.target.value) || 45;
      this._fire();
    });

    this.shadowRoot.querySelector('#acc-danger')?.addEventListener('change', (e) => {
      this._config.danger_threshold = parseInt(e.target.value) || 60;
      this._fire();
    });

    this.shadowRoot.querySelector('#acc-add-route')?.addEventListener('click', () => {
      if (!this._config.routes) this._config.routes = [];
      this._config.routes.push({ entity: '', name: '', icon: 'car' });
      this._fire();
      this._renderRoutes();
    });
  }

  _updateRoute(idx, key, value) {
    if (!this._config.routes) this._config.routes = [];
    if (!this._config.routes[idx]) this._config.routes[idx] = {};
    this._config.routes[idx][key] = value;
    this._fire();
  }

  _fire() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config } },
      bubbles: true,
      composed: true
    }));
  }
}

// Register
customElements.define('animated-commute-card', AnimatedCommuteCard);
customElements.define('animated-commute-card-editor', AnimatedCommuteCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'animated-commute-card',
  name: 'Animated Commute Card',
  description: 'Commute card with CSS animations and dynamic backgrounds',
  preview: true,
  documentationURL: 'https://github.com/smalarz/animated-commute-card'
});

console.info(
  `%c ANIMATED-COMMUTE-CARD %c v${CARD_VERSION} `,
  'color: white; background: #667eea; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #667eea; background: white; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0; border: 1px solid #667eea;'
);
