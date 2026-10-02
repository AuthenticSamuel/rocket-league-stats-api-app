import { RocketLeagueStatsClient } from "@infernaldev/rlstats";
import { ref } from "vue";

const client = ref<RocketLeagueStatsClient | null>(null);

export const useRocketLeagueStatsClient = () => {
  const start = () => {
    if (client.value) stop();

    client.value = new RocketLeagueStatsClient({
      host: "localhost",
      port: 49124,
    });
  };

  const stop = () => {
    if (!client.value) return;
    client.value.disconnect();
    client.value = null;
  };

  return {
    client,

    start,
    stop,
  };
};
