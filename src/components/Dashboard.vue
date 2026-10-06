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
        v-if="teams[0]"
        :team="teams[0]"
      />
      <TeamCard
        v-if="teams[1]"
        :team="teams[1]"
      />
    </div>
  </div>
</template>
