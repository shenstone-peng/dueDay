
export interface PregnancyInfo {
  weeks: number;
  days: number;
  totalDays: number;
  dueDate: Date;
  conceptionDate: Date;
  trimester: 1 | 2 | 3;
}

export interface AIAdvice {
  babySize: string;
  babyDevelopment: string;
  momTips: string;
  encouragement: string;
}
