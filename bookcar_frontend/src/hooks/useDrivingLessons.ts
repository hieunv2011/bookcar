import { useEffect, useState } from 'react';
import { getDrivingLessons, getDrivingLessonsByCourse, DrivingLesson } from '../api/drivingLessonApi';

export function useDrivingLessons(courseId?: number) {
  const [lessons, setLessons] = useState<DrivingLesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchLessons = async () => {
      try {
        let data: DrivingLesson[];
        if (courseId) {
          data = await getDrivingLessonsByCourse(courseId);
        } else {
          data = await getDrivingLessons();
        }
        setLessons(data);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải danh sách buổi học');
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [courseId]);

  return { lessons, loading, error };
}
