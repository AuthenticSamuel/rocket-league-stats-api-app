<script setup lang="ts">
import EventFeedCard from "@/components/EventFeedCard.vue";
import MatchCard from "@/components/MatchCard.vue";
import TeamCard from "@/components/TeamCard.vue";
import { useMatch } from "@/composables/useMatch";

import { useTeams } from "@/composables/useTeams";
import { cn } from "@/lib/utils";

const { isInMatch } = useMatch();
const { teams } = useTeams();
</script>

<template>
  <div
    :class="
      cn('grid grid-cols-2 gap-4', {
        'lg:grid-cols-3': isInMatch,
      })
    "
  >
    <MatchCard class="col-span-full" />
    <TeamCard
      v-for="team in teams"
      :key="team.TeamNum"
      :team
    />
    <EventFeedCard
      v-if="isInMatch"
      class="col-span-full lg:col-span-1"
    />
  </div>
</template>
