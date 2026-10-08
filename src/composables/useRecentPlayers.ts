import { ref } from "vue";

import { useClient } from "@/composables/useClient";

const recentPlayerMap = ref<Map<string, string>>(new Map());

const { onPlayerJoined } = useClient();

onPlayerJoined((payload) => {
  recentPlayerMap.value.set(payload.PrimaryId, payload.PlayerName);
});

export const useRecentPlayers = () => {
  return {
    recentPlayerMap,
  };
};
