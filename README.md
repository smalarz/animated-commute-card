# Animated Commute Card

A custom commute card for [Home Assistant](https://www.home-assistant.io/) with CSS animations, dynamic day/night backgrounds, animated road with cars, and traffic indicators.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)]()

## Preview

| Morning | Day | Evening | Night |
|---------|-----|---------|-------|
| ![Morning](screenshots/screenshot-morning.png) | ![Day](screenshots/screenshot-day.png) | ![Evening](screenshots/screenshot-evening.png) | ![Night](screenshots/screenshot-night.png) |

| Optimal Traffic | Heavy Traffic |
|-----------------|---------------|
| ![Optimal](screenshots/screenshot-optimal.png) | ![Heavy](screenshots/screenshot-heavy.png) |

## Features

* **Dynamic backgrounds** — gradient changes based on time of day (morning, day, evening, night) using `sun.sun` entity
* **CSS animations** — animated road with moving cars, drifting clouds, twinkling stars (at night)
* **Traffic light indicator** — visual red/yellow/green light based on traffic conditions
* **Color-coded times** — green for optimal, yellow for moderate, red for heavy traffic
* **Customizable thresholds** — set your own optimal/warning/danger thresholds
* **SVG icons** — crisp at any resolution
* **Internationalization** — English, Polish, German (auto-detected from HA language)
* **Visual editor** — full GUI configuration
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
entity_to_work: sensor.do_pracy
entity_to_home: sensor.z_pracy_do_domu
```

### Full

```yaml
type: custom:animated-commute-card
entity_to_work: sensor.do_pracy
entity_to_home: sensor.z_pracy_do_domu
name: Dojazdy
show_animations: true
show_traffic_indicator: true
optimal_threshold: 25
warning_threshold: 45
danger_threshold: 60
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity_to_work` | string | — | Sensor entity for commute to work (minutes) |
| `entity_to_home` | string | — | Sensor entity for commute to home (minutes) |
| `name` | string | `Dojazdy` / `Commute` | Card title |
| `show_animations` | boolean | `true` | Enable CSS animations |
| `show_traffic_indicator` | boolean | `true` | Show traffic light |
| `optimal_threshold` | number | `25` | Max minutes for "optimal" (green) |
| `warning_threshold` | number | `45` | Max minutes for "warning" (yellow) |
| `danger_threshold` | number | `60` | Max minutes for "danger" (red) |

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

1. **Road** — Yellow dashed line moving to simulate driving
2. **Cars** — Colored cars driving across the screen (speed depends on traffic level)
3. **Clouds** — Floating clouds (visible during day/morning/evening)
4. **Stars** — Twinkling stars (visible at night)
5. **Traffic Light** — Pulses when active
6. **Danger Time** — Pulses when commute exceeds danger threshold
7. **Shine Effect** — Subtle shine animation on route cards

## Theming

Override card appearance with CSS custom properties:

```yaml
type: custom:animated-commute-card
entity_to_work: sensor.do_pracy
card_mod:
  style: |
    :host {
      --acc-time-size: 52px;
      --acc-radius: 20px;
      --acc-optimal: #22c55e;
      --acc-warning: #eab308;
      --acc-danger: #dc2626;
    }
```

Available CSS variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `--acc-bg-morning` | gradient | Morning background |
| `--acc-bg-day` | gradient | Day background |
| `--acc-bg-evening` | gradient | Evening background |
| `--acc-bg-night` | gradient | Night background |
| `--acc-text-primary` | `#ffffff` | Primary text color |
| `--acc-text-secondary` | `rgba(255,255,255,0.8)` | Secondary text color |
| `--acc-card-bg` | `rgba(255,255,255,0.1)` | Route card background |
| `--acc-optimal` | `#10b981` | Optimal traffic color |
| `--acc-warning` | `#f59e0b` | Warning traffic color |
| `--acc-danger` | `#ef4444` | Danger traffic color |
| `--acc-radius` | `16px` | Card border radius |
| `--acc-time-size` | `48px` | Time value font size |
| `--acc-name-size` | `14px` | Card name font size |
| `--acc-label-size` | `13px` | Route label font size |

## Languages

The card auto-detects the language from your Home Assistant settings. Currently supported:

* 🇬🇧 English
* 🇵🇱 Polish
* 🇩🇪 German

Want to add your language? PRs welcome! See the `I18N` object in the source.

## Troubleshooting

**Card not showing:**
* Clear browser cache: `Ctrl+Shift+R`
* If using manual install, add version suffix: `/local/animated-commute-card.js?v=2`

**Animations not playing:**
* Check `show_animations: true` in config
* Verify browser supports CSS animations

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
