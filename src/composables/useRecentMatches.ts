import { ref, toRaw } from "vue";

import { useClient } from "@/composables/useClient";
import { useUpdateState } from "@/composables/useUpdateState";

import type { GameEvent } from "@/types/types";

const recentMatches = ref<GameEvent<"UpdateState">[]>([]);

const { onMatchDestroyed, onMatchEnded } = useClient();
const { state } = useUpdateState();

const previousManagedMatchId = ref<string | null>(null);

const addRecentMatch = (
  payload: GameEvent<"MatchDestroyed" | "MatchEnded">,
) => {
  if (!payload.MatchGuid) return;
  if (previousManagedMatchId.value === payload.MatchGuid) return;

  const stateSnapshot = toRaw(state.value);
  if (!stateSnapshot) return;

  recentMatches.value.push(stateSnapshot);
  previousManagedMatchId.value = payload.MatchGuid;
};

onMatchDestroyed(addRecentMatch);
onMatchEnded(addRecentMatch);

export const useRecentMatches = () => {
  return {
    recentMatches,
  };
};
