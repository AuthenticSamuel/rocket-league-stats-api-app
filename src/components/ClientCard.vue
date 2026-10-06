<script setup lang="ts">
import MatchCard from "@/components/MatchCard.vue";
import PlayersCard from "@/components/PlayersCard.vue";
import TeamIndicator from "@/components/TeamIndicator.vue";

import { useTeams } from "@/composables/useTeams";
import { useUpdateState } from "@/composables/useUpdateState";

const { state } = useUpdateState();
const { teams } = useTeams();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex items-center gap-x-2">
      <template
        v-for="(team, index) in teams"
        :key="team.TeamNum"
      >
        <TeamIndicator
          :team
          class="text-medium"
        />
        <span
          v-if="index !== teams.length - 1"
          class="text-sm text-muted-foreground"
        >
          vs
        </span>
      </template>
    </div>
    <PlayersCard />
    <MatchCard />
    <pre>{{ JSON.stringify(state, null, 2) }}</pre>
  </div>
</template>
