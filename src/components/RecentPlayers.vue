<script setup lang="ts">
import { computed } from "vue";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { useRecentPlayers } from "@/composables/useRecentPlayers";
import { getTrackerNetworkHref } from "@/lib/tracker-network";
import { SquareArrowOutUpRight } from "@lucide/vue";

const { recentPlayerMap } = useRecentPlayers();

const recentPlayers = computed(() => {
  return Array.from(recentPlayerMap.value);
});
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline">Recent players</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Recent players</SheetTitle>
        <SheetDescription>
          Players that you have met during the session.
        </SheetDescription>
      </SheetHeader>
      <ul class="flex flex-col px-4">
        <Item
          v-for="(player, index) in recentPlayers"
          :key="`${player[0]}-${index}`"
          as="li"
          as-child
        >
          <a
            :href="getTrackerNetworkHref(player[0], player[1]) ?? '#'"
            target="_blank"
          >
            <ItemContent>
              <ItemTitle>{{ player[1] }}</ItemTitle>
            </ItemContent>
            <ItemActions>
              <SquareArrowOutUpRight class="size-4" />
            </ItemActions>
          </a>
        </Item>
      </ul>
    </SheetContent>
  </Sheet>
</template>
