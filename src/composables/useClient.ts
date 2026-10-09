import { createEventHook } from "@vueuse/core";
import { RocketLeagueStatsClient } from "rocket-league-stats-api-client";
import { ref } from "vue";

import { useSettings } from "@/composables/useSettings";

import type { GameEvent } from "@/types/types";

const { settings, onSettingsChange } = useSettings();

const client = ref<RocketLeagueStatsClient | null>(null);

const connectHook = createEventHook<Event>();
const disconnectHook = createEventHook<CloseEvent>();
const errorHook = createEventHook<Error>();

const updateStateHook = createEventHook<GameEvent<"UpdateState">>();
const matchDestroyedHook = createEventHook<GameEvent<"MatchDestroyed">>();
const matchEndedHook = createEventHook<GameEvent<"MatchEnded">>();
const matchInitializedHook = createEventHook<GameEvent<"MatchInitialized">>();
const playerJoinedHook = createEventHook<GameEvent<"PlayerJoined">>();
const replayCreatedHook = createEventHook<GameEvent<"ReplayCreated">>();
const statfeedEventHook = createEventHook<GameEvent<"StatfeedEvent">>();

const createHooks = () => {
  if (!client.value) return;

  client.value.on("Connect", connectHook.trigger);
  client.value.on("Disconnect", disconnectHook.trigger);
  client.value.on("Error", errorHook.trigger);

  client.value.on("UpdateState", updateStateHook.trigger);
  client.value.on("MatchDestroyed", matchDestroyedHook.trigger);
  client.value.on("MatchEnded", matchEndedHook.trigger);
  client.value.on("MatchInitialized", matchInitializedHook.trigger);
  client.value.on("PlayerJoined", playerJoinedHook.trigger);
  client.value.on("ReplayCreated", replayCreatedHook.trigger);
  client.value.on("StatfeedEvent", statfeedEventHook.trigger);
};

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
};

onSettingsChange(() => stop());

export const useClient = () => {
  return {
    client,

    start,
    stop,

    onConnect: connectHook.on,
    onDisconnect: disconnectHook.on,
    onError: errorHook.on,

    onUpdateState: updateStateHook.on,
    onMatchDestroyed: matchDestroyedHook.on,
    onMatchEnded: matchEndedHook.on,
    onMatchInitialized: matchInitializedHook.on,
    onPlayerJoined: playerJoinedHook.on,
    onReplayCreated: replayCreatedHook.on,
    onStatfeedEvent: statfeedEventHook.on,
  };
};
