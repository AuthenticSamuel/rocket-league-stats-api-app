import { PLATFORM, getPlayerMeta } from "@/lib/rocket-league";

import type { Player } from "@/types/types";

const PLATFORM_MAP = {
  [PLATFORM.STEAM]: "steam",
  [PLATFORM.EPIC]: "epic",
  [PLATFORM.PS4]: "psn",
  [PLATFORM.XBOX_ONE]: "xbl",
  [PLATFORM.SWITCH]: "switch",
} as const;

export const getTrackerNetworkHref = (player: Player) => {
  const base = "https://rocketleague.tracker.network/rocket-league/profile";

  const { platform, id } = getPlayerMeta(player);
  const trnPlatform = PLATFORM_MAP[platform];

  if (platform === PLATFORM.STEAM) {
    return [base, trnPlatform, id].join("/");
  }

  return [base, trnPlatform, player.Name].join("/");
};
