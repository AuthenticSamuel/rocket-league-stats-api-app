<script setup lang="ts">
import { onUnmounted } from "vue";

import { Button } from "@/components/ui/button";

import Dashboard from "@/components/Dashboard.vue";
import Settings from "@/components/Settings.vue";
import { useClient } from "@/composables/useClient";

const { client, start, stop } = useClient();

onUnmounted(() => {
  stop();
});
</script>

<template>
  <div class="flex flex-col gap-y-4 p-4">
    <div class="flex items-center gap-x-2">
      <Button
        v-if="client"
        @click="stop"
      >
        Stop
      </Button>
      <Button
        v-else
        @click="start"
      >
        Start
      </Button>
      <Settings />
    </div>
    <Dashboard v-if="client" />
  </div>
</template>
