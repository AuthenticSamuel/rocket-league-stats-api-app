import type { ClientGameEvents } from "@infernaldev/rlstats";
import { onMounted, ref } from "vue";

import { useClient } from "@/composables/useClient";

const state = ref<ClientGameEvents["UpdateState"]["0"] | null>(null);

export const useUpdateState = () => {
  const { client } = useClient();

  onMounted(() => {
    client.value?.on("UpdateState", (payload) => {
      state.value = payload;
    });
  });

  return {
    state,
  };
};
