export type Status = 'X' | 'O';
export type SquareStatus = Status | null;
type Condition = Status | number;
export type Conditions = [Condition, Condition, Condition];
export type Square = {
  id: number,
  status: SquareStatus | null
}

export type Result = 'Winner: X' | 'Winner: O' | 'Tie' | null;

