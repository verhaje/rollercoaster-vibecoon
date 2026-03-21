import { MAP_H, MAP_W } from '../constants';

export const TICKS_PER_MONTH: i32 = 3000;
export const NAUSEA_PUKE_THRESHOLD: i32 = 100;
export const SECURITY_DETECTION_RADIUS: i32 = 10;
export const SECURITY_SUPPRESS_RADIUS: i32 = 5;
export const CRIMINAL_MAX_TIMER: i32 = 180;
export const HIGH_PRIORITY_NEED_THRESHOLD: i32 = 72;
export const CROWD_RADIUS: i32 = 2;
export const CROWD_NEARBY_THRESHOLD: i32 = 5;
export const CROWD_COMPLAINT_CHANCE: i32 = 35;
export const CROWD_COMPLAINT_COOLDOWN: i32 = 75;
export const CROWD_ATTRACTIVENESS_PENALTY: i32 = 2;
export const CROWD_SATISFACTION_PENALTY: i32 = 2;

export const pukeData = new StaticArray<u8>(MAP_W * MAP_H);

export let parkAttractiveness: i32 = 100;
export let criminalRatePerThousand: i32 = 2;
export let theftCount: i32 = 0;
export let vandalismCount: i32 = 0;
export let isRainingNow: i32 = 0;

export let budget: i32 = 10000;
export let entranceTicket: i32 = 5;
export let totalIncome: i32 = 0;
export let totalExpense: i32 = 0;
