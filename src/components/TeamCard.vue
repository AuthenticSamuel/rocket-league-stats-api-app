<script setup lang="ts">
import { computed } from "vue";

import PlatformBadge from "@/components/PlatformBadge.vue";
import TeamIndicator from "@/components/TeamIndicator.vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useUpdateState } from "@/composables/useUpdateState";

import { getTrackerNetworkHref } from "@/lib/tracker-network";

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
      <CardTitle>
        <TeamIndicator :team />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Accordion
        type="multiple"
        collapsible
      >
        <AccordionItem
          v-for="player in players"
          :key="player.PrimaryId"
          :value="player.PrimaryId"
        >
          <AccordionTrigger>
            <div class="flex gap-x-2">
              <div>{{ player.Name }}</div>
              <PlatformBadge :player />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <iframe
              :src="getTrackerNetworkHref(player)"
              class="h-[50svh] w-full rounded"
            ></iframe>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>
</template>
