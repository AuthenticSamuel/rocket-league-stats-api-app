import { createEventHook, useIntervalFn } from "@vueuse/core";
import { RocketLeagueStatsClient } from "rocket-league-stats-api-client";
import { computed, ref, watch } from "vue";

import { useSettings } from "@/composables/useSettings";

import type { GameEvent } from "@/types/types";

const { autoConnect, settings, onSettingsChange } = useSettings();

const client = ref<RocketLeagueStatsClient | null>(null);

const isConnecting = ref(false);
const isConnected = ref(false);
const isConnectionError = ref(false);

const connectHook = createEventHook<Event>();
const disconnectHook = createEventHook<CloseEvent>();
const errorHook = createEventHook<Error>();

connectHook.on(() => {
  isConnected.value = true;
  isConnecting.value = false;
  isConnectionError.value = false;

  if (autoConnect.value) attemptAutoConnect.pause();
});

disconnectHook.on(() => {
  isConnected.value = false;
  isConnectionError.value = false;

  if (autoConnect.value) attemptAutoConnect.resume();
});

errorHook.on(() => {
  isConnecting.value = false;
  isConnectionError.value = true;
});

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
  isConnecting.value = true;
  isConnectionError.value = false;

  if (client.value) stop();

  client.value = new RocketLeagueStatsClient({
    host: settings.value.host,
    port: settings.value.port,
  });

  createHooks();
};

const stop = () => {
  isConnecting.value = false;
  isConnectionError.value = false;

  if (!client.value) return;

  client.value.disconnect();
  client.value = null;
};

onSettingsChange(() => stop());

const attemptAutoConnect = useIntervalFn(start, 10_000);

const isAutoConnecting = computed(() => attemptAutoConnect.isActive.value);

watch(
  autoConnect,
  (autoConnect) => {
    if (autoConnect) attemptAutoConnect.resume();
    else attemptAutoConnect.pause();
  },
  { immediate: true },
);

export const useClient = () => {
  return {
    client,

    start,
    stop,

    isConnecting,
    isAutoConnecting,
    isConnected,
    isConnectionError,

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
