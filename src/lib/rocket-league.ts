export const PLATFORM = {
  STEAM: "Steam",
  EPIC: "Epic",
  PS4: "PS4",
  XBOX_ONE: "XboxOne",
  SWITCH: "Switch",
  UNKNOWN: "Unknown",
} as const;

type PlatformKey = keyof typeof PLATFORM;
export type Platform = (typeof PLATFORM)[PlatformKey];

export const PLATFORMS = {
  [PLATFORM.STEAM]: {
    label: "Steam",
  },
  [PLATFORM.EPIC]: {
    label: "Epic Games",
  },
  [PLATFORM.PS4]: {
    label: "PlayStation 4",
  },
  [PLATFORM.XBOX_ONE]: {
    label: "Xbox One",
  },
  [PLATFORM.SWITCH]: {
    label: "Nintendo Switch",
  },
  [PLATFORM.UNKNOWN]: {
    label: "Unknown",
  },
};

export const getPlayerMeta = (primaryId: string) => {
  const [platform, id, splitScreen] = primaryId.split("|") as [
    Platform,
    string,
    string,
  ];

  return {
    platform,
    id,
    isSplitScreen: splitScreen === "1",
  };
};
