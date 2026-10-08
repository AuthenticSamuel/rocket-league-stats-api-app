import { computed, ref } from "vue";

import { useClient } from "@/composables/useClient";
import { usePlayers } from "@/composables/usePlayers";
import { useTracker } from "@/composables/useTracker";

const history = ref<boolean[]>([]);

const winCount = computed(() => {
  return history.value.filter((isWin) => isWin).length;
});

const lossCount = computed(() => {
  return history.value.filter((isWin) => !isWin).length;
});

const streak = computed(() => {
  const isWinStreak = history.value.at(-1) ?? null;
  if (isWinStreak === null) return null;

  let streakCount = 0;
  for (let i = history.value.length - 1; i >= 0; i--) {
    const isWin = history.value[i];
    if (isWin !== isWinStreak) break;
    streakCount++;
  }

  return {
    isWinStreak,
    streakCount,
  };
});

const { onMatchEnded } = useClient();
const { players } = usePlayers();
const { trackedId } = useTracker();

onMatchEnded((payload) => {
  const player = players.value.find((player) => {
    const isCorrectPlayer = player.PrimaryId === trackedId.value;
    const isCorrectTeam = player.TeamNum === payload.WinnerTeamNum;
    return isCorrectPlayer && isCorrectTeam;
  });

  history.value.push(!!player);
});

export const useStreak = () => {
  return {
    winCount,
    lossCount,
    streak,
  };
};
