<script setup lang="ts">
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { useStreak } from "@/composables/useStreak";

import { useTracker } from "@/composables/useTracker";

const { isTracking } = useTracker();
const { streak } = useStreak();
</script>

<template>
  <Item
    variant="outline"
    class="w-fit"
  >
    <ItemContent>
      <ItemTitle v-if="!isTracking">Track a player for streaks</ItemTitle>
      <ItemTitle v-else-if="!streak">
        Start playing and stay until the end of matches !
      </ItemTitle>
      <ItemTitle v-else>
        {{ streak.streakCount ?? 0 }}
        {{ streak.isWinStreak ? "win streak" : "loss streak" }}
      </ItemTitle>
    </ItemContent>
  </Item>
</template>
