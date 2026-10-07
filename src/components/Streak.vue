<script setup lang="ts">
import { ChevronsDown, ChevronsUp } from "@lucide/vue";

import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

import { useStreak } from "@/composables/useStreak";
import { useTracker } from "@/composables/useTracker";

const { isTracking } = useTracker();
const { streak, winCount, lossCount } = useStreak();
</script>

<template>
  <Item
    v-if="!isTracking"
    variant="outline"
    class="w-fit"
  >
    <ItemContent>
      <ItemTitle>Track a player for streaks</ItemTitle>
    </ItemContent>
  </Item>
  <Item
    v-else-if="!streak"
    variant="outline"
    class="w-fit"
  >
    <ItemContent>
      <ItemTitle>Start playing and stay until the end of matches</ItemTitle>
    </ItemContent>
  </Item>
  <Item
    v-else
    variant="outline"
    class="w-fit"
  >
    <ItemMedia variant="icon">
      <ChevronsUp
        v-if="streak.isWinStreak"
        class="stroke-green-700"
      />
      <ChevronsDown
        v-else
        class="stroke-red-700"
      />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>
        <div class="flex gap-x-2">
          <div>
            {{ streak.streakCount }}
            <template v-if="streak.isWinStreak">win streak</template>
            <template v-else>loss streak</template>
          </div>
          <div class="text-muted-foreground">/</div>
          <div>{{ winCount }} win{{ winCount === 1 ? "" : "s" }}</div>
          <div class="text-muted-foreground">/</div>
          <div>{{ lossCount }} loss{{ lossCount === 1 ? "" : "es" }}</div>
        </div>
      </ItemTitle>
    </ItemContent>
  </Item>
</template>
