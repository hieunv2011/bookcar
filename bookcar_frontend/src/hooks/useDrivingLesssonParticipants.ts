import { useQuery } from '@tanstack/react-query';
import { getDrivingLessonParticipantById, DrivingLessonParticipant } from '../api/drivingLessonApi';

export function useDrivingLessonParticipant(participantId: number | undefined) {
  return useQuery<DrivingLessonParticipant>({
    queryKey: ['drivingLessonParticipant', participantId],
    queryFn: () => getDrivingLessonParticipantById(participantId!),
    enabled: !!participantId,
  });
}
