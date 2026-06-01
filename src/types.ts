export type EducationLevel = 'primary' | 'secondary' | 'highschool' | 'university' | 'professional';
export type LearningStyle = 'visual' | 'practical' | 'theoretical';

export interface UserProfile {
  name: string;
  email: string;
  educationLevel: EducationLevel;
  learningStyle: LearningStyle;
}

export interface Message {
  id: string;
  sender: 'student' | 'tutor';
  text: string;
  timestamp: string;
  isRichContent?: boolean;
}

export type ActiveTab = 'dashboard' | 'tutor' | 'exercises' | 'profile';

export interface Topic {
  id: string;
  title: string;
  subject: string;
  icon: string;
  color: 'primary' | 'secondary' | 'tertiary';
}

export interface SubjectProgress {
  name: string;
  percentage: number;
  description: string;
  color: 'primary' | 'secondary' | 'tertiary';
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  correctMessage: string;
  incorrectMessage: string;
}

export interface Quiz {
  title: string;
  subject: string;
  unit: string;
  questions: QuizQuestion[];
}
