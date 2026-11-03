<script setup lang="ts">
import { Loader2, PlugZap, Unplug } from "@lucide/vue";
import { onUnmounted } from "vue";

import Dashboard from "@/components/Dashboard.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
import RecentPlayers from "@/components/RecentPlayers.vue";
import Settings from "@/components/Settings.vue";
import Streak from "@/components/Streak.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import { Button } from "@/components/ui/button";

import RecentMatches from "@/components/RecentMatches.vue";
import WelcomeAlert from "@/components/WelcomeAlert.vue";
import { useClient } from "@/composables/useClient";

const {
  start,
  stop,
  isConnecting,
  isAutoConnecting,
  isConnected,
  isConnectionError,
} = useClient();

onUnmounted(() => {
  stop();
});
</script>

<template>
  <div class="flex flex-col items-start gap-y-4 p-4 lg:items-stretch">
    <div
      class="flex flex-col items-start justify-between gap-2 lg:flex-row lg:items-center"
    >
      <div class="flex items-center gap-x-2">
        <Button
          :disabled="isConnecting || isAutoConnecting"
          @click="isConnected ? stop() : start()"
        >
          <template v-if="isConnected">
            <Unplug />
            Disconnect
          </template>
          <template v-else-if="isAutoConnecting">
            <Loader2 class="animate-spin" />
            Auto-connecting...
          </template>
          <template v-else-if="isConnecting">
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
    <ErrorAlert v-if="isConnectionError" />
    <Dashboard v-else-if="isConnected" />
    <WelcomeAlert />
  </div>
</template>
