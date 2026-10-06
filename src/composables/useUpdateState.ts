import type { ClientGameEvents } from "@infernaldev/rlstats";
import { ref } from "vue";

import { useClient } from "@/composables/useClient";

const state = ref<ClientGameEvents["UpdateState"]["0"] | null>(null);

export const useUpdateState = () => {
  const { onUpdateState } = useClient();

  onUpdateState((payload) => {
    state.value = payload;
  });

  return {
    state,
  };
};
