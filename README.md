# Animated Commute Card

A clean, modern commute card for Home Assistant — part of the Animated Cards family. Features subtle accent bar, traffic progress bars, color-coded times, and smooth integration with HA themes.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.0.0-green.svg)]()

## Preview

> Screenshots coming soon — the card now uses a clean HA-native design with accent bar, progress bars, and theme integration.

## Features

* **Clean HA integration** — uses `var(--card-background-color)`, `var(--primary-text-color)` and other HA theme variables
* **Time-of-day accent bar** — subtle 4px gradient bar at top (morning/day/evening/night) using `sun.sun`
* **Traffic progress bars** — colored bar under each route (green/yellow/red)
* **Color-coded times** — green for optimal, yellow for moderate, red for heavy traffic
* **Customizable thresholds** — set your own optimal/warning/danger thresholds
* **Multi-route support** — configure unlimited routes with `routes[]` array
* **SVG icons** — crisp at any resolution (car, home, work, school, store, gym, map)
* **Animated road** — optional subtle road animation at bottom
* **Internationalization** — English, Polish, German (auto-detected from HA language)
* **Visual editor** — full GUI configuration with Shadow DOM
* **Responsive** — adapts to card width

## Installation

### HACS (recommended)

1. Open HACS → **Frontend**
2. Click the three dots (⋮) → **Custom repositories**
3. Add repository URL: `https://github.com/smalarz/animated-commute-card`
4. Category: **Lovelace**
5. Click **Add** → find "Animated Commute Card" → **Install**
6. Restart Home Assistant

### Manual

1. Download `animated-commute-card.js` from the [latest release](https://github.com/smalarz/animated-commute-card/releases)
2. Copy to `/config/www/animated-commute-card.js`
3. Go to **Settings → Dashboards → ⋮ → Resources → Add Resource**
   * URL: `/local/animated-commute-card.js`
   * Type: **JavaScript Module**
4. Hard-refresh your browser: `Ctrl+Shift+R`

## Configuration

Add the card via the visual editor (search for "Animated Commute Card") or manually in YAML:

### Minimal

```yaml
type: custom:animated-commute-card
routes:
  - entity: sensor.do_pracy
    name: Do pracy
    icon: work
  - entity: sensor.z_pracy_do_domu
    name: Do domu
    icon: home
```

### Full

```yaml
type: custom:animated-commute-card
name: Dojazdy
show_animations: true
show_road: true
show_traffic_light: true
optimal_threshold: 25
warning_threshold: 45
danger_threshold: 60
routes:
  - entity: sensor.do_pracy
    name: Do pracy
    icon: work
  - entity: sensor.z_pracy_do_domu
    name: Do domu
    icon: home
  - entity: sensor.do_szkoly
    name: Do szkoły
    icon: school
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `routes` | list | **required** | Array of route objects (see below) |
| `name` | string | `Dojazdy` / `Commute` | Card title |
| `show_animations` | boolean | `true` | Enable CSS animations |
| `show_road` | boolean | `true` | Show animated road at bottom |
| `show_traffic_light` | boolean | `true` | Show traffic status indicators |
| `optimal_threshold` | number | `25` | Max minutes for "optimal" (green) |
| `warning_threshold` | number | `45` | Max minutes for "warning" (yellow) |
| `danger_threshold` | number | `60` | Max minutes for "danger" (red) |

**Route object:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `entity` | string | yes | Sensor entity ID (must return minutes) |
| `name` | string | no | Display name for the route |
| `icon` | string | no | Icon: `work`, `home`, `car`, `school`, `store`, `gym`, `map` |

> **Migration from v1.x:** The old `entity_to_work` / `entity_to_home` format is automatically converted to `routes[]` on first load.

## Sensors Setup

This card works with any sensor that provides commute time in minutes. Popular integrations:

### Google Maps Travel Time

```yaml
sensor:
  - platform: google_travel_time
    api_key: YOUR_API_KEY
    origin: zone.home
    destination: zone.work
    name: Do pracy
    
  - platform: google_travel_time
    api_key: YOUR_API_KEY
    origin: zone.work
    destination: zone.home
    name: Z pracy do domu
```

### Waze Travel Time

```yaml
sensor:
  - platform: waze_travel_time
    origin: zone.home
    destination: zone.work
    name: Do pracy
    
  - platform: waze_travel_time
    origin: zone.work
    destination: zone.home
    name: Z pracy do domu
```

### HERE Travel Time

```yaml
sensor:
  - platform: here_travel_time
    api_key: YOUR_API_KEY
    origin_latitude: 52.123
    origin_longitude: 16.789
    destination_latitude: 52.456
    destination_longitude: 16.123
    name: Do pracy
```

## Animation Details

The card includes several animated elements:

1. **Accent bar** — Subtle 4px gradient at top, changes color based on time of day
2. **Road** — Yellow dashed line moving to simulate driving (optional)
3. **Car** — Single subtle car driving across (18s cycle, 60% opacity)
4. **Traffic bars** — 3px progress bar under each route, colored by traffic status

## Theming

Override card appearance with CSS custom properties:

```yaml
type: custom:animated-commute-card
routes:
  - entity: sensor.do_pracy
    name: Do pracy
    icon: work
card_mod:
  style: |
    :host {
      --acc-optimal: #22c55e;
      --acc-warning: #eab308;
      --acc-danger: #dc2626;
    }
```

Available CSS variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `--acc-optimal` | `#10b981` | Optimal traffic color |
| `--acc-warning` | `#f59e0b` | Warning traffic color |
| `--acc-danger` | `#ef4444` | Danger traffic color |
| `--acc-accent-morning` | `linear-gradient(...)` | Morning accent bar gradient |
| `--acc-accent-day` | `linear-gradient(...)` | Day accent bar gradient |
| `--acc-accent-evening` | `linear-gradient(...)` | Evening accent bar gradient |
| `--acc-accent-night` | `linear-gradient(...)` | Night accent bar gradient |

## Languages

The card auto-detects the language from your Home Assistant settings. Currently supported:

* 🇬🇧 English
* 🇵🇱 Polish
* 🇩🇪 German

Want to add your language? PRs welcome! See the `I18N` object in the source.

## Troubleshooting

**Card not showing:**
* Clear browser cache: `Ctrl+Shift+R`
* If using manual install, add version suffix: `/local/animated-commute-card.js?v=3`

**Migration from v1.x/v2.x:**
* The old `entity_to_work` / `entity_to_home` format is automatically converted to `routes[]` on first load
* If you experience issues, manually update your configuration to use the new `routes[]` array format

**Wrong time of day:**
* Make sure `sun.sun` entity exists
* Check if your HA location is configured correctly

**Sensor values not showing:**
* Verify sensor entity IDs in Developer Tools → States
* Check if sensors return numeric values in minutes

## License

[MIT](LICENSE)

## Credits

Built with ❤️ for the Home Assistant community.

Part of the Animated Cards collection:
- [Animated Weather Card](https://github.com/smalarz/animated-weather-card)
- [Animated Graph Card](https://github.com/smalarz/animated-graph-card)
- [Animated Plant Card](https://github.com/smalarz/animated-plant-card)
- [Animated Gauge Card](https://github.com/smalarz/animated-gauge-card)
- [Animated Pie Card](https://github.com/smalarz/animated-pie-card)
