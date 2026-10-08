import { computed } from "vue";

import { useUpdateState } from "@/composables/useUpdateState";

const { state } = useUpdateState();

const players = computed(() => {
  if (!state.value) return [];
  return state.value.Players;
});

export const usePlayers = () => {
  return {
    players,
  };
};
