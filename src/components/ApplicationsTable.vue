<script setup lang="ts">
import type { User } from '../types/User';

const props = defineProps<{
    users: User[];
}>()

const emit = defineEmits<{
    (e: 'delete-user', id: number): void
}>()
</script>
<template>
    <table class="w-full border">
        <thead>
        <tr class="bg-gray-200">
            <th class="p-2 border">Имя</th>
            <th class="p-2 border">Телефон</th>
            <th class="p-2 border">Роль</th>
            <th class="p-2 border">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
            <td class="p-2 border">{{ user.name }}</td>
            <td class="p-2 border">{{ user.phone }}</td>
            <td class="p-2 border">{{ user.role || '-' }}</td>
            <td class="p-2 border">
            <button
                class="bg-red-500 text-white px-2 py-1 rounded"
                @click="$emit('delete-user', user.id)"
            >
                Удалить
            </button>
            </td>
        </tr>
        </tbody>
    </table>
</template>