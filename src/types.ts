export interface IRound {
  score: number;
  phase: number;
}

export interface IPlayer {
  name: string;
  rounds: IRound[];
  total: number;
  phase: number | null;
  currentScore?: number | null;
}
