<script setup lang="ts">
import { ref } from "vue";

const steamId = ref("76561198112282532");
const profile = ref<any>(null);
const error = ref<string | null>(null);
const loading = ref(false);

const fetchProfile = async () => {
  if (!steamId.value) {
    error.value = "Steam ID is required.";
    return;
  }

  profile.value = null;
  error.value = null;
  loading.value = true;

  try {
    const response = await fetch(
      `https://98847074-d0fb-4237-8707-52c81943b6ba-00-1uojmfhsmuty0.worf.replit.dev/steam-profile?steamid=${steamId.value}`
    );
    const data = await response.json();
    profile.value = data.response.players[0];
    console.log(profile.value);
  } catch (err) {
    error.value = "Error fetching profile.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    v-if="!profile && !loading"
    style="max-width: 500px; margin: 2rem auto; text-align: center"
  >
    <h1 style="font-size: 1.75rem; font-weight: bold; margin-bottom: 1rem">
      Steam Profile Checker
    </h1>

    <input
      v-model="steamId"
      @keyup.enter="fetchProfile"
      placeholder="Enter Steam ID"
      style="
        padding: 0.5rem;
        min-width: 300px;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      "
    />

    <p
      v-if="!profile && !loading"
      style="font-size: 0.85rem; color: #666; margin-top: 0.5rem"
    >
      You can get your Steam ID from
      <a
        href="https://steamdb.info"
        target="_blank"
        style="color: #2563eb; text-decoration: none"
      >
        SteamDB
      </a>
    </p>

    <button
      @click="fetchProfile"
      style="
        color: #2563eb;
        padding: 0.5rem 1rem;
        border: 1px solid #2563eb;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 1rem;
        background-color: transparent;
        display: block;
        margin-left: auto;
        margin-right: auto;
      "
    >
      Check Profile
    </button>
  </div>

  <div
    v-if="loading"
    style="
      font-size: 1.2rem;
      color: #2563eb;
      text-align: center;
      margin-top: 1rem;
    "
  >
    Loading...
  </div>

  <div v-if="!loading">
    <div v-if="error" style="color: red; margin-top: 1rem; text-align: center">
      {{ error }}
    </div>

    <div v-if="profile" style="width: 100%; text-align: center">
      <h2 style="font-size: 1.75rem; font-weight: 600; margin-bottom: 1rem">
        {{ profile.personaname }}
      </h2>
      <img
        :src="profile.avatarfull"
        alt="Player Avatar"
        style="
          width: 220px;
          height: 220px;
          border-radius: 20%;
          margin-bottom: 1rem;
          border: 2px solid #2563eb;
        "
      />
      <p style="color: #555; margin-bottom: 0.1rem; font-size: 1.5rem">
        {{ profile.realname || "N/A" }}
      </p>
      <p style="margin-bottom: 2rem; font-size: 0.75rem">
        <strong>Last Time Online:</strong>
        {{ new Date(profile.lastlogoff * 1000).toLocaleString() }}
      </p>
      <p>
        <a
          :href="profile.profileurl"
          target="_blank"
          style="color: #2563eb; text-decoration: none"
        >
          View Steam Profile
        </a>
      </p>
    </div>
  </div>
</template>
