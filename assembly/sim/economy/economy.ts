import { budget, totalExpense, totalIncome } from '../state/parkState';

export function spend(amount: i32): bool {
  if (budget < amount) return false;
  budget -= amount;
  totalExpense += amount;
  return true;
}

export function earn(amount: i32): void {
  budget += amount;
  totalIncome += amount;
}
