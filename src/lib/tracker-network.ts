import { PLATFORM, getPlayerMeta } from "@/lib/rocket-league";

const PLATFORM_MAP = {
  [PLATFORM.STEAM]: "steam",
  [PLATFORM.EPIC]: "epic",
  [PLATFORM.PS4]: "psn",
  [PLATFORM.XBOX_ONE]: "xbl",
  [PLATFORM.SWITCH]: "switch",
  [PLATFORM.UNKNOWN]: null,
} as const;

export const getTrackerNetworkHref = (primaryId: string, username: string) => {
  const base = "https://rocketleague.tracker.network/rocket-league/profile";

  const { platform, id } = getPlayerMeta(primaryId);
  const trnPlatform = PLATFORM_MAP[platform];

  if (!platform) return null;

  if (platform === PLATFORM.STEAM) {
    return [base, trnPlatform, id].join("/");
  }

  return [base, trnPlatform, username].join("/");
};
