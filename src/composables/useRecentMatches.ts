import { ref, toRaw } from "vue";

import { useClient } from "@/composables/useClient";
import { useUpdateState } from "@/composables/useUpdateState";

import type { GameEvent } from "@/types/types";

const recentMatches = ref<GameEvent<"UpdateState">[]>([]);

const { onMatchEnded } = useClient();
const { state } = useUpdateState();

onMatchEnded(() => {
  const stateSnapshot = toRaw(state.value);
  if (!stateSnapshot) return;

  recentMatches.value.push(stateSnapshot);
});

export const useRecentMatches = () => {
  return {
    recentMatches,
  };
};
