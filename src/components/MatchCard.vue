<script setup lang="ts">
import { computed } from "vue";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useMatch } from "@/composables/useMatch";

import { speedFormatter } from "@/lib/format";

const { ballSpeed, highestRecentBallSpeed } = useMatch();

type Statistic = {
  label: string;
  value: string | number;
};

const statistics = computed<Statistic[]>(() => [
  {
    label: "Ball speed",
    value: speedFormatter.format(ballSpeed.value ?? 0),
  },
  {
    label: "Max ball speed (last 3 seconds)",
    value: speedFormatter.format(highestRecentBallSpeed.value),
  },
]);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Match</CardTitle>
    </CardHeader>
    <CardContent>
      <ul class="grid grid-cols-4 gap-1">
        <li
          v-for="statistic in statistics"
          :key="statistic.label"
          class="flex flex-col"
        >
          <div class="text-lg font-medium">
            {{ statistic.value }}
          </div>
          <div>{{ statistic.label }}</div>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
