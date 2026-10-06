import { RocketLeagueStatsClient } from "@infernaldev/rlstats";
import { ref, watch } from "vue";

import { useSettings } from "@/composables/useSettings";

const { host, port } = useSettings();

const client = ref<RocketLeagueStatsClient | null>(null);

export const useClient = () => {
  const start = () => {
    if (client.value) stop();

    client.value = new RocketLeagueStatsClient({
      host: host.value,
      port: port.value,
    });
  };

  const stop = () => {
    if (!client.value) return;
    client.value.disconnect();
    client.value = null;
  };

  watch(host, () => stop());
  watch(port, () => stop());

  return {
    client,

    start,
    stop,
  };
};
