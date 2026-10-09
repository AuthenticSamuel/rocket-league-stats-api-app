import { computed } from "vue";

import { useRecentMatches } from "@/composables/useRecentMatches";
import { useTracker } from "@/composables/useTracker";

import type { GameEvent } from "@/types/types";

const { recentMatches } = useRecentMatches();
const { isTracking, trackedId } = useTracker();

const getIsWin = (state: GameEvent<"UpdateState">) => {
  if (!isTracking.value) return null;

  const player = state.Players.find((player) => {
    return player.PrimaryId === trackedId.value;
  });
  if (!player) return null;

  const teams = state.Game.Teams;
  if (teams[0].Score === teams[1].Score) return null;

  const winningTeam = teams.reduce((prev, curr) => {
    return prev && prev.Score > curr.Score ? prev : curr;
  });

  return player.TeamNum === winningTeam.TeamNum;
};

const wins = computed(() => {
  return recentMatches.value.filter((state) => {
    return getIsWin(state) === true;
  });
});

const losses = computed(() => {
  return recentMatches.value.filter((state) => {
    return getIsWin(state) === false;
  });
});

const underminedOutcomes = computed(() => {
  return recentMatches.value.filter((state) => {
    return getIsWin(state) === null;
  });
});

const streak = computed(() => {
  let streak = 0;
  let previousIsWin: boolean | null = null;

  for (const match of recentMatches.value.slice().reverse()) {
    const isWin = getIsWin(match);
    if (isWin === null) continue;
    if (isWin === true && [true, null].includes(previousIsWin)) streak++;
    if (isWin === false && [false, null].includes(previousIsWin)) streak--;
    if (previousIsWin !== null && previousIsWin !== isWin) break;
    previousIsWin = isWin;
  }

  return streak;
});

export const useStreak = () => {
  return {
    wins,
    losses,
    underminedOutcomes,
    streak,
  };
};
