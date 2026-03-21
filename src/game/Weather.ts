/* =============================================
   Park Tycoon – Weather System
   Random weather that changes every few game days.
   Weather affects attraction appeal via multipliers.
   Season determines which weather types are possible.
   ============================================= */

import ATTRACTIONS from './config/attractions';
import { type SimExports } from './types';

export type WeatherType = 'average' | 'sunny' | 'rain' | 'snow' | 'heatwave';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface WeatherInfo {
  label: string;
  icon: string;
  /** Multiplier per attraction category */
  categoryMult: Record<string, number>;
  /** Optional per-attraction-id override multiplier */
  attractionMult?: Record<number, number>;
}

const CATEGORY_MAP: Record<string, number> = { fun: 0, thrill: 1, relax: 2, food: 3, drink: 4, toilet: 5 };

export const WEATHER_TABLE: Record<WeatherType, WeatherInfo> = {
  average: {
    label: 'Average', icon: '⛅',
    categoryMult: { fun: 1.0, thrill: 1.0, relax: 1.0, food: 1.0, drink: 1.0, toilet: 1.0 },
    attractionMult: { 18: 0.85 }, // Information Stand less urgent in normal weather
  },
  sunny: {
    label: 'Sunny', icon: '☀️',
    categoryMult: { fun: 1.1, thrill: 1.05, relax: 1.15, food: 1.0, drink: 1.3, toilet: 1.0 },
    attractionMult: { 11: 1.4, 6: 1.2, 18: 0.7 }, // Ice Cream Cart, Log Flume, Information Stand
  },
  rain: {
    label: 'Rainy', icon: '🌧️',
    categoryMult: { fun: 0.7, thrill: 0.6, relax: 0.5, food: 1.15, drink: 0.8, toilet: 1.0 },
    attractionMult: { 6: 0.3, 18: 2.6 }, // Log Flume terrible in rain, umbrellas become very desirable
  },
  snow: {
    label: 'Snowy', icon: '❄️',
    categoryMult: { fun: 0.5, thrill: 0.4, relax: 0.4, food: 1.2, drink: 0.6, toilet: 1.0 },
    attractionMult: { 11: 0.3, 6: 0.2, 18: 1.35 }, // Ice Cream & Log Flume terrible in snow
  },
  heatwave: {
    label: 'Heat Wave', icon: '🔥',
    categoryMult: { fun: 0.9, thrill: 0.85, relax: 0.7, food: 0.9, drink: 1.6, toilet: 1.0 },
    attractionMult: { 11: 1.8, 10: 1.5, 6: 1.4, 18: 0.65 }, // Ice Cream, Lemonade, Log Flume
  },
};

/** Weighted probability tables per season */
const SEASON_WEIGHTS: Record<Season, [WeatherType, number][]> = {
  spring:  [['average', 50], ['sunny', 25], ['rain', 20], ['heatwave', 5]],
  summer:  [['average', 25], ['sunny', 35], ['rain', 15], ['heatwave', 25]],
  autumn:  [['average', 40], ['sunny', 15], ['rain', 35], ['snow', 10]],
  winter:  [['average', 25], ['sunny', 10], ['rain', 20], ['snow', 40], ['heatwave', 5]],
};

function pickWeighted(weights: [WeatherType, number][]): WeatherType {
  const total = weights.reduce((s, w) => s + w[1], 0);
  let r = Math.random() * total;
  for (const [type, w] of weights) {
    r -= w;
    if (r <= 0) return type;
  }
  return weights[0][0];
}

export class WeatherSystem {
  current: WeatherType = 'average';
  /** Game-day when the weather last changed */
  private lastChangeDay = 0;
  /** Duration (in game days) the current weather persists */
  private duration = 0;

  constructor() {
    this.duration = this.rollDuration();
  }

  /** Get weather display info for current weather */
  get info(): WeatherInfo {
    return WEATHER_TABLE[this.current];
  }

  /** Call every game tick. Returns true if weather changed. */
  update(currentDay: number, season: Season): boolean {
    if (currentDay - this.lastChangeDay >= this.duration) {
      const prev = this.current;
      this.current = pickWeighted(SEASON_WEIGHTS[season]);
      this.lastChangeDay = currentDay;
      this.duration = this.rollDuration();
      return this.current !== prev;
    }
    return false;
  }

  /** Get the appeal multiplier for a specific attraction */
  getMultiplier(attractionId: number, category: string): number {
    const w = WEATHER_TABLE[this.current];
    // Per-attraction override takes priority
    if (w.attractionMult && attractionId in w.attractionMult) {
      return w.attractionMult[attractionId];
    }
    return w.categoryMult[category] ?? 1.0;
  }

  /** Re-configure all attraction templates in the sim with weather-modified appeal */
  applyToSim(sim: SimExports): void {
    for (const attr of ATTRACTIONS) {
      const mult = this.getMultiplier(attr.id, attr.category);
      const modifiedAppeal = Math.round(attr.appeal * mult);
      sim.configureAttraction(
        attr.id,
        attr.footprint.w,
        attr.footprint.h,
        attr.buildPrice,
        attr.ticketPrice,
        attr.capacity,
        CATEGORY_MAP[attr.category] ?? 0,
        modifiedAppeal,
        attr.rideTicks,
        attr.monthlyOperatingCost,
        attr.requiredExcitement,
        attr.nauseaGain,
      );
    }
  }

  private rollDuration(): number {
    return 3 + Math.floor(Math.random() * 5); // 3–7 game days
  }

  getSnapshot(): {
    current: WeatherType;
    lastChangeDay: number;
    duration: number;
  } {
    return {
      current: this.current,
      lastChangeDay: this.lastChangeDay,
      duration: this.duration,
    };
  }

  restoreSnapshot(snapshot: {
    current: WeatherType;
    lastChangeDay: number;
    duration: number;
  }): void {
    this.current = snapshot.current;
    this.lastChangeDay = Math.max(0, Math.floor(snapshot.lastChangeDay));
    this.duration = Math.max(1, Math.floor(snapshot.duration));
  }
}
