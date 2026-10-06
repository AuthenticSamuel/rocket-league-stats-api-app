<script setup lang="ts">
import { computed } from "vue";

import TeamIndicator from "@/components/TeamIndicator.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useMatch } from "@/composables/useMatch";
import { speedFormatter } from "@/lib/format";

const { ballSpeed, highestRecentBallSpeed, ballLastTouchedBy } = useMatch();

const formattedSpeed = computed(() => {
  return speedFormatter.format(ballSpeed.value ?? 0);
});

const formattedHighestRecentSpeed = computed(() => {
  return speedFormatter.format(highestRecentBallSpeed.value);
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Match</CardTitle>
    </CardHeader>
    <CardContent>
      <div>Ball speed: {{ formattedSpeed }}</div>
      <div>Highest recent speed: {{ formattedHighestRecentSpeed }}</div>
      <div class="flex items-baseline gap-x-1">
        Last touched by:
        <TeamIndicator
          v-if="ballLastTouchedBy"
          :team="ballLastTouchedBy"
        />
      </div>
    </CardContent>
  </Card>
</template>
