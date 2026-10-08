<script setup lang="ts">
import EventFeedCard from "@/components/EventFeedCard.vue";
import MatchCard from "@/components/MatchCard.vue";
import TeamCard from "@/components/TeamCard.vue";

import { useTeams } from "@/composables/useTeams";

const { teams } = useTeams();
</script>

<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
    <MatchCard class="col-span-full" />
    <TeamCard
      v-for="team in teams"
      :key="team.TeamNum"
      :team
    />
    <EventFeedCard class="col-span-full lg:col-span-1" />
  </div>
</template>
