import { ref } from "vue";

import { useClient } from "@/composables/useClient";

import type { GameEvent } from "@/types/types";

const { onMatchInitialized, onStatfeedEvent } = useClient();

const eventFeed = ref<GameEvent<"StatfeedEvent">[]>([]);

onMatchInitialized(() => {
  eventFeed.value = [];
});

onStatfeedEvent((payload) => {
  eventFeed.value.unshift(payload);
});

export const useEventFeed = () => {
  return {
    eventFeed,
  };
};
