import { useStorage } from "@vueuse/core";
import { computed } from "vue";

import type { Player } from "@/types/types";

const trackedId = useStorage<string | null>("SELF_PRIMARY_ID", null);

const isTracking = computed(() => !!trackedId.value);

const getIsTracking = (player: Player) => {
  return trackedId.value === player.PrimaryId;
};

const startTracking = (player: Player) => {
  trackedId.value = player.PrimaryId;
};

const stopTracking = () => {
  trackedId.value = null;
};

export const useTracker = () => {
  return {
    trackedId,
    isTracking,
    getIsTracking,
    startTracking,
    stopTracking,
  };
};
