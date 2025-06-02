import { atom } from 'jotai';
import type { UserInfo } from '../api/userApi';

export const userAtom = atom<UserInfo | null>(null);
export const globalUserToastsAtom = atom<any[]>([]);