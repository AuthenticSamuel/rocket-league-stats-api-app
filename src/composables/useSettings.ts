import { createEventHook, useStorage } from "@vueuse/core";
import { computed, watch } from "vue";

const host = useStorage("CLIENT_HOST", "localhost");
const port = useStorage("CLIENT_PORT", 49124);
const autoConnect = useStorage("CLIENT_AUTO_CONNECT", false);

type Settings = {
  host: string;
  port: number;
  autoConnect: boolean;
};

const settings = computed<Settings>(() => ({
  host: host.value,
  port: port.value,
  autoConnect: autoConnect.value,
}));

const settingsChangeHook = createEventHook<Settings>();

watch(settings, settingsChangeHook.trigger);

export const useSettings = () => {
  return {
    host,
    port,
    autoConnect,
    settings,

    onSettingsChange: settingsChangeHook.on,
  };
};
