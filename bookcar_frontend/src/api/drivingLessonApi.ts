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
export interface DrivingLessonParticipant {
  id: number;
  driving_lesson_id: number;
  trainee_id: number | null;
  vehicle_id: number | null;
  vehicle_plate: string | null;
  actual_start_time: string | null;
  actual_end_time: string | null;
  created_date: string | null;
  updated_date: string | null;
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

// Đăng ký học viên vào buổi học (POST /driving-lessons/participants)
export interface DrivingLessonParticipantPayload {
  driving_lesson_id: number;
  trainee_id: number;
  actual_start_time: string;
  actual_end_time: string;
}

export const registerDrivingLessonParticipant = async (payload: DrivingLessonParticipantPayload) => {
  const res = await http.post('/driving-lessons/participants', payload);
  return res.data;
};

export const registerDrivingLessonParticipants = async (payload: DrivingLessonParticipantPayload[]) => {
  const res = await http.post('/driving-lessons/participants', payload);
  return res.data;
};

export const getDrivingLessonParticipantById = async (id: number): Promise<DrivingLessonParticipant> => {
  const res = await http.get<DrivingLessonParticipant>(`/driving-lessons/participants/lesson-id/${id}`);
  return res.data;
};

export const getParticipantsByTraineeId = async (traineeId: number): Promise<DrivingLessonParticipant[]> => {
  const res = await http.get<DrivingLessonParticipant[]>(`/driving-lessons/participants/trainee-id/${traineeId}`);
  return res.data;
};