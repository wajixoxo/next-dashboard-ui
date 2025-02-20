// src/types.ts
export interface ExamScores {
    T1?: number;
    T2?: number;
    T3?: number | null;
    T4?: number | null;
  }
  
  export interface StudentData {
    examScores: ExamScores;
    lastTestScore: number;
  }