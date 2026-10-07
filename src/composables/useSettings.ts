import { createEventHook, useStorage } from "@vueuse/core";
import { computed, watch } from "vue";

const host = useStorage("CLIENT_HOST", "localhost");
const port = useStorage("CLIENT_PORT", 49124);

type Settings = {
  host: string;
  port: number;
};

const settings = computed<Settings>(() => ({
  host: host.value,
  port: port.value,
}));

const settingsChangeHook = createEventHook<Settings>();

watch(settings, settingsChangeHook.trigger);

export const useSettings = () => {
  return {
    host,
    port,
    settings,

    onSettingsChange: settingsChangeHook.on,
  };
};
