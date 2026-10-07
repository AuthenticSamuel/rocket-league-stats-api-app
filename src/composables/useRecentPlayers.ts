import { ref } from "vue";

import { useClient } from "@/composables/useClient";

const recentPlayerMap = ref<Map<string, string>>(new Map());

export const useRecentPlayers = () => {
  const { onPlayerJoined } = useClient();

  onPlayerJoined((payload) => {
    recentPlayerMap.value.set(payload.PrimaryId, payload.PlayerName);
  });

  return {
    recentPlayerMap,
  };
};
