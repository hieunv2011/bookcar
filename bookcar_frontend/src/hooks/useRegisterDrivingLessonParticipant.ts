// import { useState } from 'react';
// import { DrivingLessonParticipantPayload, registerDrivingLessonParticipants } from '../api/drivingLessonApi';

// export function useRegisterDrivingLessonParticipants() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [data, setData] = useState<any>(null);

//   const registerMultiple = async (payload: DrivingLessonParticipantPayload[]) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await registerDrivingLessonParticipants(payload);
//       setData(res);
//       return res;
//     } catch (err: any) {
//       setError(err?.response?.data?.detail || err.message || 'Đăng ký thất bại');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { registerMultiple, loading, error, data };
// }
import { useMutation } from '@tanstack/react-query';
import { DrivingLessonParticipantPayload, registerDrivingLessonParticipants } from '../api/drivingLessonApi';

export function useRegisterDrivingLessonParticipants() {
  return useMutation({
    mutationFn: (payload: DrivingLessonParticipantPayload[]) =>
      registerDrivingLessonParticipants(payload),
    onError: (error: any) => {
      console.error('Đăng ký thất bại:', error?.response?.data?.detail || error.message);
    },
  });
}
