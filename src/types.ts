export type ReviewType = {
  id: number;
  value: number;
  feedback: string;
  date: string;
  userId: number | null;
  userName: string | null;
  adminId: number | null;
  adminName: string | null;
};

export type ArticleType = {
  articleId: number;
  name: string;
  date: string;
  content: string;
  hide: boolean;
  categoryId: number;
  categoryName: string;
  adminId: number;
  articlePhoto: string | null;
};

export type CategoryType = {
  categoryId: number;
  category: string;
};

export type MedicalRecordType = {
  recordId: number;
  measurements: number;
  note: string;
  date: string;
  userId: number;
  recordTypeId: number;
  advice: string | null;
};

export type NotificationType = {
  id: number;
  userId: number | null;
  readFlag: boolean;
  date: string;
  message: string;
};

export type ExecriseType = {
  id: number;
  name: string;
  time: string;
  durationMinutes: number;
  date?: string;
};

export type MealType = {
  id: number;
  name: string;
  time: string;
  date?: string;
};

export type MedicationType = {
  id: number;
  name: string;
  dosage: string;
  time: string;
  date?: string;
};

export type DailyListType = {
  id: number;
  date: string;
  medications: MedicationType[];
  meals: MealType[];
  exercises: ExecriseType[];
  medicationAlertTime: string;
  mealAlertTime: string;
  exerciseAlertTime: string;
};
