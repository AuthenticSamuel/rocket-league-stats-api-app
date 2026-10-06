<script setup lang="ts">
import type { Team } from "@/types/types";

defineProps<{
  team: Team;
}>();
</script>

<template>
  <div class="flex items-center gap-x-2">
    <span>
      {{ team.Name }}
    </span>
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
