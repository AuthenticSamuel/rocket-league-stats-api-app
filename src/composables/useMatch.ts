import { computed, ref, watch } from "vue";

import { useTeams } from "@/composables/useTeams";
import { useUpdateState } from "@/composables/useUpdateState";

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
  }, 3000);
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
    ballSpeed,
    highestRecentBallSpeed,
    ballLastTouchedBy,
  };
};
