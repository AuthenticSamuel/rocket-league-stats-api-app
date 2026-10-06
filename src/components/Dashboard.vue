<script setup lang="ts">
import MatchCard from "@/components/MatchCard.vue";
import TeamCard from "@/components/TeamCard.vue";

import { useTeams } from "@/composables/useTeams";

const { teams } = useTeams();
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <TeamCard
      v-if="teams[0]"
      :team="teams[0]"
    />
    <MatchCard />
    <TeamCard
      v-if="teams[1]"
      :team="teams[1]"
    />
  </div>
</template>
