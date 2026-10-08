<script setup lang="ts">
import { Loader2, PlugZap, Unplug } from "@lucide/vue";
import { onUnmounted, ref } from "vue";

import Dashboard from "@/components/Dashboard.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
import RecentPlayers from "@/components/RecentPlayers.vue";
import Settings from "@/components/Settings.vue";
import Streak from "@/components/Streak.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import { Button } from "@/components/ui/button";

import RecentMatches from "@/components/RecentMatches.vue";
import { useClient } from "@/composables/useClient";

const { start, stop, onConnect, onDisconnect, onError } = useClient();

onUnmounted(() => {
  stop();
});

const isLoading = ref(false);
const isConnected = ref(false);
const isError = ref(false);

onConnect(() => {
  isConnected.value = true;
  isLoading.value = false;
});

onDisconnect(() => {
  isConnected.value = false;
});

onError(() => {
  isError.value = true;
  isLoading.value = false;
});

const handleConnectClick = () => {
  isLoading.value = true;
  isError.value = false;
  start();
};

const handleDisconnectClick = () => {
  isError.value = false;
  stop();
};
</script>

<template>
  <div class="flex flex-col gap-y-4 p-4">
    <div class="flex items-center justify-between gap-x-2">
      <div class="flex items-center gap-x-2">
        <Button
          :disabled="isLoading"
          @click="isConnected ? handleDisconnectClick() : handleConnectClick()"
        >
          <template v-if="isConnected">
            <Unplug />
            Disconnect
          </template>
          <template v-else-if="isLoading">
            <Loader2 class="animate-spin" />
            Connecting...
          </template>
          <template v-else>
            <PlugZap />
            Connect
          </template>
        </Button>
        <Settings />
        <ThemeSwitcher />
      </div>
      <div class="flex items-center gap-x-2">
        <RecentPlayers />
        <RecentMatches />
        <Streak />
      </div>
    </div>
    <ErrorAlert v-if="isError" />
    <Dashboard v-else-if="isConnected" />
  </div>
</template>
