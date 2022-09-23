export interface IOption {
  id: number,
  text: string
  isCorrect: boolean,
}

export interface IQuestion {
  text: string;
  options: IOption[];
}