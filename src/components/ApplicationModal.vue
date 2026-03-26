<script setup lang="ts">
import { ref, watch } from 'vue'
import type { User } from '../types/User'

const props = defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    (e: 'add-user', user: User): void
    (e: 'close'): void
}>()

const name = ref('')
const phone = ref('')
const role = ref('')

const errors = ref({ name: '', phone: '' })

watch(() => props.isOpen, newVal => {
    if (!newVal) {
        name.value = ''
        phone.value = ''
        role.value = ''
        errors.value = { name: '', phone: '' }
    }
})

const validate = () => {
    let valid = true
    errors.value.name = ''
    errors.value.phone = ''

    if (!name.value) { errors.value.name = 'Введите имя'; valid = false }
    const phoneRegex = /^\+?[0-9]{7,15}$/
    if (!phone.value) { errors.value.phone = 'Введите телефон'; valid = false }
    else if (!phoneRegex.test(phone.value)) { errors.value.phone = 'Неверный формат телефона'; valid = false }

    return valid
}

const submit = () => {
    if (!validate()) return
    const user: User = { id: Date.now(), name: name.value, phone: phone.value, role: role.value || undefined }
    emit('add-user', user)
    emit('close')
}
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded w-96">
        <h2 class="text-xl font-bold mb-4">Добавить пользователя</h2>

        <input v-model="name" type="text" placeholder="Имя" class="w-full border p-2 mb-2" />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>

        <input v-model="phone" type="text" placeholder="Телефон" class="w-full border p-2 mb-2" />
        <p v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</p>

        <select v-model="role" class="w-full border p-2 mb-4">
            <option value="">Без роли</option>
            <option>Администратор</option>
            <option>Менеджер</option>
            <option>Разработчик</option>
        </select>

        <div class="flex justify-end gap-2">
            <button class="bg-gray-400 text-white px-4 py-2 rounded" @click="$emit('close')">Отмена</button>
            <button class="bg-green-500 text-white px-4 py-2 rounded" @click="submit">Добавить</button>
        </div>
        </div>
    </div>
</template>