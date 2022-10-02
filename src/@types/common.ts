export interface IOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface IArmenianAnswer {
  id: string;
  text: string;
  russianId: string;
}

export interface IRussianAnswer {
  id: string;
  text: string;
}

export interface IResult {
  armenianTranslation: IArmenianAnswer | null;
  russianTranslation: IRussianAnswer | null;
}

export interface IMergedAnswers {
  id: number;
  text: string;
  armenianTranslations: IArmenianAnswer[];
  russianTranslations: IRussianAnswer[];
}
