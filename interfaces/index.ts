export type Question = {
  answer: string;
  category: string;
  image?: string;
  question: string;
  questionId: string;
  id?: string;
  response: boolean;
  num: number;
  isChecked?: boolean;
};

export type Wrong = {
  answer: string;
  category: string;
  image?: string;
  num: number;
  question: string;
  questionId: string;
  response: boolean;
  userResponse?: boolean;
  isChecked?: boolean;
};
export type Theory = {
  id: string;
  category: string;
  image?: string;
  slug: string;
  theory: string;
  title: string;
};

export type Ungiven = {
  number: number;
  position: number[];
};
