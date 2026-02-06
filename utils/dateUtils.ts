
import { PregnancyInfo } from '../types';

export const calculatePregnancy = (lmp: Date): PregnancyInfo => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - lmp.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  
  // Estimated Due Date is LMP + 280 days
  const dueDate = new Date(lmp);
  dueDate.setDate(dueDate.getDate() + 280);
  
  // Conception usually occurs 14 days after LMP
  const conceptionDate = new Date(lmp);
  conceptionDate.setDate(conceptionDate.getDate() + 14);
  
  let trimester: 1 | 2 | 3 = 1;
  if (weeks >= 28) trimester = 3;
  else if (weeks >= 13) trimester = 2;
  
  return {
    weeks,
    days,
    totalDays,
    dueDate,
    conceptionDate,
    trimester
  };
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
