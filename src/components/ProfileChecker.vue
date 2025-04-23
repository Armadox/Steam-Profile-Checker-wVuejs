<script setup lang="ts">
import { ref } from "vue";
interface UserProfileProps {}

const steamId = ref("");
const apiKey = ref("");
const profile = ref<any>(null);
const error = ref<string | null>(null);

const fetchProfile = async () => {
  if (!steamId.value || !apiKey.value) {
    error.value = "Steam ID and API Key are required.";
    return;
  }

  profile.value = null;
  error.value = null;

  try {
    const response = await fetch(
      `/api/steam-profile?steamid=${steamId.value}&apiKey=${apiKey.value}`
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    error.value = "Error fetching profile.";
    console.error(err);
  }
};
//defineProps<UserProfile>();
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">Steam Profile Checker</h1>

  <input
    v-model="apiKey"
    placeholder="Enter Steam API Key"
    class="border rounded px-3 py-2 w-full mb-2"
  />

  <input
    v-model="steamId"
    @keyup.enter="fetchProfile"
    placeholder="Enter Steam ID"
    class="border rounded px-3 py-2 w-full mb-4"
  />

  <button
    @click="fetchProfile"
    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
  >
    Check Profile
  </button>

  <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>

  <div v-if="profile" class="mt-6 border p-4 rounded shadow"></div>
</template>
