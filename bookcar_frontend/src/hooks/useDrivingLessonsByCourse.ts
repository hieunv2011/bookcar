import { useEffect, useState } from 'react';
import { getDrivingLessonsByCourse, DrivingLesson } from '../api/drivingLessonApi';

export function useDrivingLessonsByCourse(courseId: number) {
  const [lessons, setLessons] = useState<DrivingLesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    setLoading(true);
    setError(null);
    const fetchLessons = async () => {
      try {
        const data = await getDrivingLessonsByCourse(courseId);
        setLessons(data);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải danh sách buổi học theo khóa');
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [courseId]);

  return { lessons, loading, error };
}
