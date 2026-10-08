<script setup lang="ts">
import { ChevronRight, Circle } from "@lucide/vue";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { useEventFeed } from "@/composables/useEventFeed";

import { EVENT_FEED_EVENTS, type EventFeedEvent } from "@/lib/rocket-league";
import type { GameEvent } from "@/types/types";

const { eventFeed } = useEventFeed();

const getEventMeta = (event: GameEvent<"StatfeedEvent">) => {
  const meta = EVENT_FEED_EVENTS[event.EventName as EventFeedEvent];
  return meta ?? null;
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Events</CardTitle>
    </CardHeader>
    <CardContent class="max-h-100 overflow-y-auto">
      <ItemGroup class="gap-y-2">
        <Item
          v-for="(event, index) in eventFeed"
          :key="index"
          as="li"
          variant="muted"
        >
          <ItemMedia variant="icon">
            <component :is="getEventMeta(event).icon ?? Circle" />
          </ItemMedia>
          <ItemContent class="flex-row gap-x-2">
            <ItemTitle>
              {{ event.Type }}
            </ItemTitle>
            <ItemDescription class="flex items-center gap-x-1">
              {{ event.MainTarget.Name }}
              <template v-if="event.SecondaryTarget">
                <ChevronRight class="size-4" />
                {{ event.SecondaryTarget.Name }}
              </template>
            </ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </CardContent>
  </Card>
</template>
