import type { ClientGameEvents } from "@infernaldev/rlstats";

type Player = ClientGameEvents["UpdateState"][0]["Players"][0];

type Team = {
  Name: string;
  TeamNum: number;
  Score: number;
  ColorPrimary: string;
  ColorSecondary: string;
};
