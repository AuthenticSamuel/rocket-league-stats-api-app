import { RocketLeagueStatsClient } from "@infernaldev/rlstats";
import { createEventHook } from "@vueuse/core";
import { ref, watch } from "vue";

import { useSettings } from "@/composables/useSettings";

import type { GameEvent } from "@/types/types";

const { host, port } = useSettings();

const client = ref<RocketLeagueStatsClient | null>(null);

const updateStateHook = createEventHook<GameEvent<"UpdateState">>();
const matchEndedHook = createEventHook<GameEvent<"MatchEnded">>();

const createHooks = () => {
  if (!client.value) return;
  client.value.on("UpdateState", updateStateHook.trigger);
  client.value.on("MatchEnded", matchEndedHook.trigger);
};

const clearHooks = () => {
  updateStateHook.clear();
  matchEndedHook.clear();
};

export const useClient = () => {
  const start = () => {
    if (client.value) stop();

    client.value = new RocketLeagueStatsClient({
      host: host.value,
      port: port.value,
    });

    createHooks();
  };

  const stop = () => {
    if (!client.value) return;

    client.value.disconnect();
    client.value = null;

    clearHooks();
  };

  watch(host, () => stop());
  watch(port, () => stop());

  return {
    client,

    start,
    stop,

    onUpdateState: updateStateHook.on,
    onMatchEnded: matchEndedHook.on,
  };
};
