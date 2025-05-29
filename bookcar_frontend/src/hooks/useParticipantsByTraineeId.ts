import { useQuery } from '@tanstack/react-query';
import { getParticipantsByTraineeId } from '../api/drivingLessonApi'; // sửa path nếu khác
import type { DrivingLessonParticipant } from '../api/drivingLessonApi';

export const useParticipantsByTraineeId = (traineeId: number) => {
  return useQuery<DrivingLessonParticipant[]>({
    queryKey: ['participants', traineeId],
    queryFn: () => getParticipantsByTraineeId(traineeId),
    enabled: !!traineeId,
  });
};