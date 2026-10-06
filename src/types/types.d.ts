import type { ClientGameEvents } from "@infernaldev/rlstats";

type Player = ClientGameEvents["UpdateState"][0]["Players"][0];

type Team = ClientGameEvents["UpdateState"][0]["Game"]["Teams"][0];
