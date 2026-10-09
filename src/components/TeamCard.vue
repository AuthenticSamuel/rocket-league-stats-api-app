<script setup lang="ts">
import { computed } from "vue";

import Player from "@/components/Player.vue";
import TeamIndicator from "@/components/TeamIndicator.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useUpdateState } from "@/composables/useUpdateState";

import type { Team } from "@/types/types";

const props = defineProps<{
  team: Team;
}>();

const { state } = useUpdateState();

const players = computed(() => {
  if (!state.value) return [];
  return state.value.Players.filter((player) => {
    return player.TeamNum === props.team.TeamNum;
  });
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="overflow-hidden">
        <div class="flex items-center gap-x-2">
          <div class="truncate">
            {{ team.Name }}
          </div>
          <TeamIndicator :team />
          <div class="ml-auto">{{ team.Score }}</div>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-y-4 divide-y">
        <Player
          v-for="(player, index) in players"
          :key="`${player.PrimaryId}-${index}`"
          :player
        />
      </div>
    </CardContent>
  </Card>
</template>
