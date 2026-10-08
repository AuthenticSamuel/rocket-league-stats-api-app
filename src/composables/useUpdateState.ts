import { ref } from "vue";

import { useClient } from "@/composables/useClient";

import type { GameEvent } from "@/types/types";

const state = ref<GameEvent<"UpdateState"> | null>(null);

const { onUpdateState } = useClient();

onUpdateState((payload) => {
  state.value = payload;
});

export const useUpdateState = () => {
  return {
    state,
  };
};
