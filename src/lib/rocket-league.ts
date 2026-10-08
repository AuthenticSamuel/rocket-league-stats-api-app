import {
  Bomb,
  CirclePlus,
  Crosshair,
  Handshake,
  type LucideIcon,
  Medal,
  Shield,
  ShieldPlus,
  Sparkle,
  Trophy,
} from "@lucide/vue";

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
type PlatformMeta = {
  label: string;
};

export const PLATFORMS: Record<Platform, PlatformMeta> = {
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

export const EVENT_FEED_EVENT = {
  MVP: "MVP",
  WIN: "Win",
  ASSIST: "Assist",
  GOAL: "Goal",
  SHOT: "Shot",
  SAVE: "Save",
  EPIC_SAVE: "EpicSave",
  HAT_TRICK: "HatTrick",
  DEMO: "Demolish",
} as const;

type EventFeedEventKey = keyof typeof EVENT_FEED_EVENT;
export type EventFeedEvent = (typeof EVENT_FEED_EVENT)[EventFeedEventKey];
type EventFeedEventMeta = {
  icon: LucideIcon;
};

export const EVENT_FEED_EVENTS: Record<EventFeedEvent, EventFeedEventMeta> = {
  [EVENT_FEED_EVENT.MVP]: {
    icon: Medal,
  },
  [EVENT_FEED_EVENT.WIN]: {
    icon: Trophy,
  },
  [EVENT_FEED_EVENT.ASSIST]: {
    icon: Handshake,
  },
  [EVENT_FEED_EVENT.GOAL]: {
    icon: CirclePlus,
  },
  [EVENT_FEED_EVENT.SHOT]: {
    icon: Crosshair,
  },
  [EVENT_FEED_EVENT.SAVE]: {
    icon: Shield,
  },
  [EVENT_FEED_EVENT.EPIC_SAVE]: {
    icon: ShieldPlus,
  },
  [EVENT_FEED_EVENT.HAT_TRICK]: {
    icon: Sparkle,
  },
  [EVENT_FEED_EVENT.DEMO]: {
    icon: Bomb,
  },
};
