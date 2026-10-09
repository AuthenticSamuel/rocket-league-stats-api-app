<script setup lang="ts">
import type { Team } from "@/types/types";

defineProps<{
  team: Team;
}>();
</script>

<template>
  <div class="flex -skew-x-12">
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
</template>
