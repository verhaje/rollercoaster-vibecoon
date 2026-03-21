export function zoneToCornerMask(zone: i32): i32 {
  if (zone == 1) return 1;
  if (zone == 2) return 2;
  if (zone == 3) return 4;
  if (zone == 4) return 8;
  if (zone == 5) return 1 | 2;
  if (zone == 6) return 2 | 4;
  if (zone == 7) return 4 | 8;
  if (zone == 8) return 8 | 1;
  return 15;
}
