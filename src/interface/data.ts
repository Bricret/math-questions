export interface Questions {
    questions: Question[];
}

export interface Question {

    id: number;
  
    type: string;
  
    question: string;
  
    options: {
  
      option: string;
  
      isCorrect: boolean;
  
    }[];
  
  }
export interface Option {
    option:    string;
    isCorrect: boolean;
}

export enum Type {
    EcuacionesDePotencia = "Ecuaciones de Potencia",
    Exponenciales = "Exponenciales",
    Logaritmos = "Logaritmos",
}
