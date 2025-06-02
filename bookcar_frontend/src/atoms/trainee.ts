import { atom } from 'jotai';
import type { TraineeInfo } from '../api/traineeApi';

export const traineeAtom = atom<TraineeInfo | null>(null);
export const globalTraineeToastsAtom = atom<any[]>([]);