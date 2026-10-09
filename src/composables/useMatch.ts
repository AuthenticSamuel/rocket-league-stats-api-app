import { computed, ref, watch } from "vue";

import { useClient } from "@/composables/useClient";
import { useTeams } from "@/composables/useTeams";
import { useUpdateState } from "@/composables/useUpdateState";

const { onUpdateState } = useClient();

const isInMatch = ref(false);
let timeoutId: number | null = null;

onUpdateState(() => {
  isInMatch.value = true;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    isInMatch.value = false;
  }, 2_000);
});

const { state } = useUpdateState();
const { getTeamByNum } = useTeams();

const ballSpeed = computed(() => {
  if (!state.value) return null;
  return state.value.Game.Ball.Speed;
});

const recentBallSpeedHistory = ref<number[]>([]);

const updateRecentBallSpeedHistory = (speed: number | null) => {
  if (speed === null) return;
  recentBallSpeedHistory.value.push(speed);
  setTimeout(() => {
    recentBallSpeedHistory.value.shift();
  }, 5_000);
};

watch(ballSpeed, updateRecentBallSpeedHistory);

const highestRecentBallSpeed = computed(() => {
  return Math.max(0, Math.max(...recentBallSpeedHistory.value));
});

const ballLastTouchedBy = computed(() => {
  if (!state.value) return null;
  const team = getTeamByNum(state.value.Game.Ball.TeamNum);
  return team ?? null;
});

export const useMatch = () => {
  return {
    isInMatch,
    ballSpeed,
    highestRecentBallSpeed,
    ballLastTouchedBy,
  };
};
