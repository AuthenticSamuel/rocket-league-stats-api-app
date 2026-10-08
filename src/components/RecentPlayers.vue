<script setup lang="ts">
import { Info, SquareArrowOutUpRight } from "@lucide/vue";
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

import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";

import { useRecentPlayers } from "@/composables/useRecentPlayers";

import { getTrackerNetworkHref } from "@/lib/tracker-network";

const { recentPlayerMap } = useRecentPlayers();

const recentPlayers = computed(() => {
  return Array.from(recentPlayerMap.value).reverse();
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
      <div
        v-if="!recentPlayers.length"
        class="px-4"
      >
        <Alert>
          <Info />
          <AlertTitle>Start playing to track recently met players.</AlertTitle>
        </Alert>
      </div>
      <ul
        v-else
        class="flex flex-col overflow-y-auto px-4 pb-4"
      >
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
