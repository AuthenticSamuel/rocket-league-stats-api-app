import { RocketLeagueStatsClient } from "@infernaldev/rlstats";
import { createEventHook } from "@vueuse/core";
import { ref } from "vue";

import { useSettings } from "@/composables/useSettings";

import type { GameEvent } from "@/types/types";

const { settings, onSettingsChange } = useSettings();

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
      host: settings.value.host,
      port: settings.value.port,
    });

    createHooks();
  };

  const stop = () => {
    if (!client.value) return;

    client.value.disconnect();
    client.value = null;

    clearHooks();
  };

  onSettingsChange(() => stop());

  return {
    client,

    start,
    stop,

    onUpdateState: updateStateHook.on,
    onMatchEnded: matchEndedHook.on,
  };
};
