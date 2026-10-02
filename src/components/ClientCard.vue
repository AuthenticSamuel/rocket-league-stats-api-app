<script setup lang="ts">
import type { ClientGameEvents } from "@infernaldev/rlstats";
import { onMounted, ref } from "vue";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useRocketLeagueStatsClient } from "@/composables/useRocketLeagueStatsClient";

const { client } = useRocketLeagueStatsClient();

const updateState = ref<ClientGameEvents["UpdateState"][0] | null>(null);
const lastGoalScored = ref<ClientGameEvents["GoalScored"][0] | null>(null);

type Player = {
  id: string;
  username: string;
  platform: "steam" | "epic";
};

const players = ref<Player[]>([]);

onMounted(() => {
  client.value!.on("UpdateState", (payload) => {
    updateState.value = payload;
  });

  client.value!.on("GoalScored", (payload) => {
    lastGoalScored.value = payload;
  });

  client.value!.on("PlayerJoined", (payload) => {
    const [platform, id] = payload.PrimaryId.split("|");
    const player: Player = {
      id,
      username: payload.PlayerName,
      platform: platform.toLowerCase() as Player["platform"],
    };
    players.value.push(player);
  });

  client.value!.on("PlayerLeft", (payload) => {
    const [, id] = payload.PrimaryId.split("|");
    players.value = players.value.filter((player) => {
      return player.id !== id;
    });
  });
});

const getPlayerTrackerHref = (player: Player) => {
  const base = "https://rocketleague.tracker.network/rocket-league/profile";

  if (player.platform === "epic") {
    return [base, player.platform, player.username].join("/");
  }

  return [base, player.platform, player.id].join("/");
};
</script>

<template>
  <Card>
    <CardHeader>
      <a
        v-for="player in players"
        :key="player.id"
        :href="getPlayerTrackerHref(player)"
        target="_blank"
      >
        <Button>
          {{ player.username }}
        </Button>
      </a>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-2 divide-x">
        <pre>{{ JSON.stringify(updateState, null, 2) }}</pre>
        <pre>{{ JSON.stringify(lastGoalScored, null, 2) }}</pre>
      </div>
    </CardContent>
  </Card>
</template>
