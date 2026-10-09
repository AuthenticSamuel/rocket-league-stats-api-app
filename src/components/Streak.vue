<script setup lang="ts">
import { ChevronsDown, ChevronsUp } from "@lucide/vue";

import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

import { useStreak } from "@/composables/useStreak";
import { useTracker } from "@/composables/useTracker";

const { isTracking } = useTracker();
const { streak, wins, losses } = useStreak();
</script>

<template>
  <Item
    v-if="!isTracking"
    variant="outline"
    size="2xs"
    class="w-fit"
  >
    <ItemContent>
      <ItemTitle>Track a player for streaks</ItemTitle>
    </ItemContent>
  </Item>
  <Item
    v-else
    variant="outline"
    size="2xs"
    class="w-fit"
  >
    <ItemMedia
      v-if="Math.abs(streak)"
      variant="icon"
    >
      <ChevronsUp
        v-if="streak > 0"
        class="stroke-green-700"
      />
      <ChevronsDown
        v-else-if="streak < 0"
        class="stroke-red-700"
      />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>
        <div class="flex gap-x-2">
          <template v-if="Math.abs(streak)">
            <div>
              {{ Math.abs(streak) }}
              <template v-if="streak > 0">win streak</template>
              <template v-else-if="streak < 0">loss streak</template>
            </div>
            <div class="text-muted-foreground">/</div>
          </template>
          <div>{{ wins.length }} win{{ wins.length === 1 ? "" : "s" }}</div>
          <div class="text-muted-foreground">/</div>
          <div>
            {{ losses.length }} loss{{ losses.length === 1 ? "" : "es" }}
          </div>
        </div>
      </ItemTitle>
    </ItemContent>
  </Item>
</template>
