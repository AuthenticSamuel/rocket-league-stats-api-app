<script setup lang="ts">
import { Info, ListChevronsUpDown } from "@lucide/vue";
import { computed } from "vue";

import RecentMatch from "@/components/RecentMatch.vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ItemGroup } from "@/components/ui/item";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useRecentMatches } from "@/composables/useRecentMatches";

const { recentMatches } = useRecentMatches();

const matches = computed(() => {
  return recentMatches.value.slice().reverse();
});
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline">
        <ListChevronsUpDown />
        Recent matches
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Recent matches</SheetTitle>
        <SheetDescription>
          Matches that you have played during the session.
        </SheetDescription>
      </SheetHeader>
      <div
        v-if="!recentMatches.length"
        class="px-4"
      >
        <Alert>
          <Info />
          <AlertTitle>Start playing to track played matches.</AlertTitle>
          <AlertDescription>
            Stay until the end of matches for successful tracking.
          </AlertDescription>
        </Alert>
      </div>
      <ItemGroup
        v-else
        class="gap-y-2 overflow-y-auto px-4 pb-4"
      >
        <RecentMatch
          v-for="(match, index) in matches"
          :key="`${match.MatchGuid}-${index}`"
          :match
        />
      </ItemGroup>
    </SheetContent>
  </Sheet>
</template>
