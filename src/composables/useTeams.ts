import { computed } from "vue";

import { useUpdateState } from "@/composables/useUpdateState";

export const useTeams = () => {
  const { state } = useUpdateState();

  const teams = computed(() => {
    if (!state.value) return [];
    return state.value.Game.Teams;
  });

  const getTeamByNum = (num: number) => {
    const team = teams.value.find((team) => {
      return team.TeamNum === num;
    });

    return team ?? null;
  };

  return {
    teams,
    getTeamByNum,
  };
};
