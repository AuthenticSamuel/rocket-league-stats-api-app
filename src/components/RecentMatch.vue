<script setup lang="ts">
import { ChevronsDown, ChevronsUp, CircleQuestionMark } from "@lucide/vue";
import { computed } from "vue";

import TeamIndicator from "@/components/TeamIndicator.vue";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useTracker } from "@/composables/useTracker";

import type { GameEvent } from "@/types/types";

const props = defineProps<{
  match: GameEvent<"UpdateState">;
}>();

const { isTracking, trackedId } = useTracker();

const isWin = computed(() => {
  if (!isTracking.value) return null;

  const player = props.match.Players.find((player) => {
    return player.PrimaryId === trackedId.value;
  });
  if (!player) return null;

  const teams = props.match.Game.Teams;
  if (teams[0].Score === teams[1].Score) return null;

  const winningTeam = teams.reduce((prev, curr) => {
    return prev && prev.Score > curr.Score ? prev : curr;
  });

  return player.TeamNum === winningTeam.TeamNum;
});
</script>

<template>
  <Item variant="muted">
    <ItemContent class="flex-row justify-between">
      <ItemTitle>
        <template v-if="isWin === true">
          <ChevronsUp class="size-4 stroke-green-700" />
          Win
        </template>
        <template v-else-if="isWin === false">
          <ChevronsDown class="size-4 stroke-red-700" />
          Loss
        </template>
        <template v-else>
          <CircleQuestionMark class="size-4 stroke-muted-foreground" />
        </template>
        {{ match.Game.Teams[0].Score }}
        -
        {{ match.Game.Teams[1].Score }}
      </ItemTitle>
      <ItemDescription class="flex items-center gap-x-2">
        <TeamIndicator :team="match.Game.Teams[0]" />
        <span>vs</span>
        <TeamIndicator :team="match.Game.Teams[1]" />
      </ItemDescription>
    </ItemContent>
  </Item>
</template>
