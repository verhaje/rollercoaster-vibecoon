import { rngState } from '../state/visitorState';

@external('env', 'seed')
declare function hostSeed(): f64;

export function nextRand(): i32 {
  rngState = rngState ^ (rngState << 13);
  rngState = rngState ^ (rngState >> 17);
  rngState = rngState ^ (rngState << 5);
  return rngState < 0 ? -rngState : rngState;
}

export function initRandomSeed(): void {
  const raw = hostSeed();
  let s = <i32>(raw * 2147483647.0);
  if (s == 0) s = 12345;
  rngState = s < 0 ? -s : s;
}
