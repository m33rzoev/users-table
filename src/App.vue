<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from './stores/userStore';

import ApplicationsTable from './components/ApplicationsTable.vue';
import ApplicationsModal from './components/ApplicationModal.vue';

const userStore = useUserStore();
const isModalOpen = ref(false);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Users Table</h1>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      @click="isModalOpen = true"
    >
      Добавить пользователя
    </button>

    <ApplicationsTable
      :users="userStore.users"
      @delete-user="userStore.removeUser"
    />

    <ApplicationsModal
      :isOpen="isModalOpen"
      @close="isModalOpen = false"
      @add-user="userStore.addUser"
    />
  </div>
</template>