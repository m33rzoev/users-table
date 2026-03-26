import { defineStore } from 'pinia';
import type { User } from '../types/User';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
    }),
    actions: {
        addUser(user: User) {
        this.users.push(user);
        },
        removeUser(id: number) {
        this.users = this.users.filter(user => user.id !== id);
        }
    }
})