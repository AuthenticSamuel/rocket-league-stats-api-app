import type { ClientGameEvents } from "rocket-league-stats-api-client";

type Player = ClientGameEvents["UpdateState"][0]["Players"][0];

type Team = ClientGameEvents["UpdateState"][0]["Game"]["Teams"][0];

type GameEvent<K extends keyof ClientGameEvents> = ClientGameEvents[K][0];
