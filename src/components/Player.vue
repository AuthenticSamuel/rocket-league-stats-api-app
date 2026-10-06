<script setup lang="ts">
import { computed } from "vue";

import PlatformBadge from "@/components/PlatformBadge.vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { getTrackerNetworkHref } from "@/lib/tracker-network";

import type { Player } from "@/types/types";

const props = defineProps<{
  player: Player;
}>();

type Statistic = {
  label: string;
  value: number;
};

const statistics = computed<Statistic[]>(() => [
  {
    label: "Score",
    value: props.player.Score,
  },
  {
    label: "Goals",
    value: props.player.Goals,
  },
  {
    label: "Assists",
    value: props.player.Assists,
  },
  {
    label: "Shots",
    value: props.player.Shots,
  },
  {
    label: "Saves",
    value: props.player.Saves,
  },
  {
    label: "Touches",
    value: props.player.Touches,
  },
  {
    label: "Bumps",
    value: props.player.CarTouches,
  },
  {
    label: "Demos",
    value: props.player.Demos,
  },
]);

const trackerHref = computed(() => getTrackerNetworkHref(props.player));
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex items-center gap-x-2">
      <div class="font-medium">{{ player.Name }}</div>
      <PlatformBadge :player />
    </div>
    <ul class="grid grid-cols-4 gap-1">
      <li
        v-for="statistic in statistics"
        :key="statistic.label"
        class="flex flex-col"
      >
        <div class="text-lg font-medium">{{ statistic.value }}</div>
        <div>{{ statistic.label }}</div>
      </li>
    </ul>
    <Accordion
      v-if="trackerHref"
      collapsible
    >
      <AccordionItem :value="player.PrimaryId">
        <AccordionTrigger>Tracker</AccordionTrigger>
        <AccordionContent class="pb-0">
          <iframe
            :src="trackerHref"
            class="h-[50svh] w-full rounded"
          ></iframe>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
