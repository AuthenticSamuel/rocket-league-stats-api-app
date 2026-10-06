import { useStorage } from "@vueuse/core";

const host = useStorage("CLIENT_HOST", "localhost");
const port = useStorage("CLIENT_PORT", 49124);

export const useSettings = () => {
  return {
    host,
    port,
  };
};
