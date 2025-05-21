import { http } from './http';


export interface DrivingLesson {
  id: number;
  course_id: number;
  lesson_name: string;
  lesson_date: string | null;
  duration: number | null;
  status: string | null;
  start_time_window: string | null;
  end_time_window: string | null;
  created_date: string;
  updated_date: string;
}

export const getDrivingLessons = async (): Promise<DrivingLesson[]> => {
  const res = await http.get<DrivingLesson[]>('/driving-lessons/');
  return res.data;
};

// Lấy driving lessons theo course_id
export const getDrivingLessonsByCourse = async (courseId: number): Promise<DrivingLesson[]> => {
  const res = await http.get<DrivingLesson[]>(`/driving-lessons/course/${courseId}`);
  return res.data;
};
