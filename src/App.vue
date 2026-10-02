<script setup lang="ts">
import ClientCard from "@/components/ClientCard.vue";
import { Button } from "@/components/ui/button";
import { useRocketLeagueStatsClient } from "@/composables/useRocketLeagueStatsClient";

const { client, start, stop } = useRocketLeagueStatsClient();
</script>

<template>
  <div class="flex flex-col gap-y-2 p-4">
    <div>
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
    </div>
    <ClientCard v-if="client" />
  </div>
</template>
