<script setup lang="ts">
import type { Team } from "@/types/types";

defineProps<{
  team: Team;
}>();
</script>

<template>
  <div class="flex items-center gap-x-2">
    <div class="max-w-20 overflow-x-hidden text-nowrap text-ellipsis">
      {{ team.Name }}
    </div>
    <div class="flex h-4 w-2 -skew-x-12">
      <div
        class="h-4 w-1"
        :style="{
          'background-color': `#${team.ColorPrimary}`,
        }"
      ></div>
      <div
        class="h-4 w-1"
        :style="{
          'background-color': `#${team.ColorSecondary}`,
        }"
      ></div>
    </div>
  </div>
</template>
