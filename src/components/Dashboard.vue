<script setup lang="ts">
import MatchCard from "@/components/MatchCard.vue";
import TeamCard from "@/components/TeamCard.vue";

import { useTeams } from "@/composables/useTeams";

const { teams } = useTeams();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <MatchCard />
    <div class="grid grid-cols-2 gap-4">
      <TeamCard
        v-for="team in teams"
        :key="team.TeamNum"
        :team
      />
    </div>
  </div>
</template>
