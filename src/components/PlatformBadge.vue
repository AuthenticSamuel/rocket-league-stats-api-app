<script setup lang="ts">
import { computed } from "vue";

import { Badge } from "@/components/ui/badge";

import { getPlayerMeta, PLATFORMS } from "@/lib/rocket-league";
import type { Player } from "@/types/types";

const props = defineProps<{
  player: Player;
}>();

const meta = computed(() => getPlayerMeta(props.player.PrimaryId));

const platform = computed(() => PLATFORMS[meta.value.platform]);
</script>

<template>
  <Badge variant="outline">{{ platform.label }}</Badge>
</template>
