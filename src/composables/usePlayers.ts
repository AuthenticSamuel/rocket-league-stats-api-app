import { computed } from "vue";

import { useUpdateState } from "@/composables/useUpdateState";

export const usePlayers = () => {
  const { state } = useUpdateState();

  const players = computed(() => {
    if (!state.value) return [];
    return state.value.Players;
  });

  return {
    players,
  };
};
