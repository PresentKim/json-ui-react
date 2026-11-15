// 매치메이킹(모의) 화면 스크립트: 로비·모의 플레이어·준비 확인·액션바 로직은 원본(bedrock-research
// entity-matchmaking/bp/scripts/main.js) 그대로이고, 세션 루프·버튼 감지·차등 쓰기는 runtime.js가 맡는다.
import { system, world } from "@minecraft/server";
import { createEntityMenu, paper, text } from "./runtime.js";

const PACK_VERSION = "v2.0.0";
const LAUNCHER = "jure:matchmaking";
const BOX = "jure:matchmaking_box";
const BOX_TAG = "jure_matchmaking";
const SCREEN_MARK = "§8Entity Matchmaking";

const TPS = 20;
const READY_SECONDS = 10;
const START_SECONDS = 4;
const MESSAGE_SECONDS = 4;
const DECLINE_CHANCE = 0.1;
const AFK_CHANCE = 0.05;
const PARTY_CHANCE = 0.15;
const LEAVE_CHANCE_PER_SECOND = 0.025;
const STAY_AFTER_FAIL = 0.85;
const PIPS = 10;
const ROW_PART = { button: 0, name: 1, subtitle: 2, online: 3, state: 4 };

const GAMES = [
  { name: "Sky Duels", mode: "1v1", size: 2, description: "Knock your rival off a floating island.", join: [3, 12], estimate: [5, 15], online: 420 },
  { name: "Bed Rush", mode: "4 teams of 2", size: 8, description: "Guard your bed and break everyone else's.", join: [1.5, 6], estimate: [12, 30], online: 1350 },
  { name: "Parkour Race", mode: "Free for all", size: 6, description: "First to the last checkpoint wins.", join: [3, 10], estimate: [15, 35], online: 260 },
  { name: "Hide and Seek", mode: "2 seekers, 8 hiders", size: 10, description: "Hide as a block or hunt the hiders down.", join: [1, 5], estimate: [12, 30], online: 880 },
];

const BOT_NAMES = [
  "Kiro", "xNova", "PixelPanda", "Mossy", "TurboTaco", "Blaze_09", "Nightowl", "CraftyCat", "Quartzy", "LuckyLlama",
  "Rift", "BeeKeeper", "Sn0wfall", "Dusk", "ToastLord", "ZeroLag", "Mintchip", "Creeperoni", "Vex", "Pebble",
  "Jumpman77", "Sora", "IronMika", "ParrotPal", "Glitchy", "Ember", "Waffle", "Stormy", "Noodle", "Axolotl_Ace",
];

const players = new Map();
const forming = new Map();
const lobbies = new Set();
const online = GAMES.map((game) => game.online);

const now = () => system.currentTick;
const random = (min, max) => min + Math.random() * (max - min);
const randomInt = (min, max) => Math.floor(random(min, max + 1));
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const seconds = (s) => Math.round(s * TPS);

function clock(ticks) {
  const total = Math.max(0, Math.floor(ticks / TPS));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

const thousands = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function stateOf(player) {
  let state = players.get(player.id);
  if (!state) {
    state = { selected: 0, phase: "idle", lobby: undefined, queuedAt: 0, estimate: 0, message: "", messageUntil: 0 };
    players.set(player.id, state);
  }
  return state;
}

function tell(state, message) {
  state.message = message;
  state.messageUntil = now() + seconds(MESSAGE_SECONDS);
}

function freeBotName(lobby) {
  const taken = new Set(lobby.members.map((m) => m.name));
  const free = BOT_NAMES.filter((name) => !taken.has(name));
  return free.length ? pick(free) : `Player${randomInt(100, 999)}`;
}

function addBot(lobby) {
  const member = { name: freeBotName(lobby), playerId: undefined };
  lobby.members.push(member);
  return member;
}

function feed(lobby, member, text) {
  lobby.feed = { name: member.name, playerId: member.playerId, text };
}

function bots(lobby) {
  return lobby.members.filter((m) => !m.playerId);
}

function realMembers(lobby) {
  return lobby.members.filter((m) => m.playerId);
}

function scheduleJoin(lobby) {
  lobby.nextJoinAt = now() + seconds(random(...GAMES[lobby.game].join));
}

function createLobby(game) {
  const size = GAMES[game].size;
  const lobby = { game, phase: "forming", members: [], feed: undefined, nextJoinAt: 0 };
  const initial = randomInt(0, Math.max(0, Math.min(size - 2, Math.floor(size * 0.5))));
  for (let k = 0; k < initial; k++) addBot(lobby);
  scheduleJoin(lobby);
  forming.set(game, lobby);
  lobbies.add(lobby);
  return lobby;
}

function dissolve(lobby) {
  lobbies.delete(lobby);
  if (forming.get(lobby.game) === lobby) forming.delete(lobby.game);
}

function joinQueue(player, state) {
  const lobby = forming.get(state.selected) ?? createLobby(state.selected);
  const member = { name: player.name, playerId: player.id };
  lobby.members.push(member);
  feed(lobby, member, " joined the queue");
  const [low, high] = GAMES[state.selected].estimate;
  Object.assign(state, { phase: "queued", lobby, queuedAt: now(), estimate: seconds(randomInt(low, high)) });
  player.playSound("random.orb", { pitch: 1.4 });
}

function leaveLobby(playerId, lobby) {
  const member = lobby.members.find((m) => m.playerId === playerId);
  lobby.members = lobby.members.filter((m) => m !== member);
  if (member) feed(lobby, member, " left the queue");
  if (!realMembers(lobby).length) dissolve(lobby);
}

function cancelQueue(player, state) {
  if (state.lobby) leaveLobby(player.id, state.lobby);
  Object.assign(state, { phase: "idle", lobby: undefined });
  tell(state, "You left the queue.");
  player.playSound("note.bass", { pitch: 0.8 });
}

function forEachReal(lobby, action) {
  for (const member of realMembers(lobby)) {
    const player = world.getEntity(member.playerId);
    const state = players.get(member.playerId);
    if (player && state) action(player, state, member);
  }
}

function startReadyCheck(lobby) {
  forming.delete(lobby.game);
  lobby.phase = "ready";
  lobby.readyEndsAt = now() + seconds(READY_SECONDS);
  lobby.responses = new Map();
  lobby.botPlans = new Map();
  const candidates = bots(lobby);
  const spoiler = candidates.length && Math.random() < DECLINE_CHANCE + AFK_CHANCE ? pick(candidates) : undefined;
  const afk = spoiler && Math.random() < AFK_CHANCE / (DECLINE_CHANCE + AFK_CHANCE);
  for (const bot of candidates) {
    if (bot === spoiler && afk) continue;
    const answer = bot === spoiler ? "declined" : "accepted";
    const delay = bot === spoiler ? random(2, READY_SECONDS - 1) : random(0.6, READY_SECONDS - 2.5);
    lobby.botPlans.set(bot, { answer, at: now() + seconds(delay) });
  }
  feed(lobby, { name: "", playerId: undefined }, "Match found");
  forEachReal(lobby, (player, state) => {
    state.phase = "ready";
    state.barKey = state.barKey === "Ta" ? "Tb" : "Ta";
    player.playSound("random.levelup", { pitch: 1.2 });
  });
}

function respond(lobby, member, answer) {
  lobby.responses.set(member, answer);
  feed(lobby, member, answer === "accepted" ? " accepted" : " declined");
}

function returnToQueue(lobby, kept) {
  const target = forming.get(lobby.game);
  if (!target) {
    Object.assign(lobby, { phase: "forming", members: kept, responses: undefined, botPlans: undefined });
    forming.set(lobby.game, lobby);
    scheduleJoin(lobby);
    if (!realMembers(lobby).length) dissolve(lobby);
    return lobby;
  }
  dissolve(lobby);
  const merged = [...kept, ...target.members];
  const real = merged.filter((m) => m.playerId);
  const room = Math.max(0, GAMES[lobby.game].size - 1 - real.length);
  target.members = [...real, ...merged.filter((m) => !m.playerId).slice(0, room)];
  return target;
}

function failReadyCheck(lobby, timedOut) {
  const kept = [];
  for (const member of lobby.members) {
    const answer = lobby.responses.get(member);
    const state = member.playerId && players.get(member.playerId);
    const player = member.playerId && world.getEntity(member.playerId);
    const dropped = answer === "declined" || (timedOut && !answer);
    if (!dropped) {
      if (state || (!member.playerId && Math.random() < STAY_AFTER_FAIL)) kept.push(member);
      continue;
    }
    if (!state) continue;
    Object.assign(state, { phase: "idle", lobby: undefined });
    tell(state, answer === "declined" ? "You declined the match." : "You missed the ready check.");
    player?.playSound("note.bass", { pitch: 0.6 });
  }
  const target = returnToQueue(lobby, kept);
  feed(target, { name: "", playerId: undefined }, "A player did not accept. Back in the queue");
  forEachReal(target, (player, state) => {
    if (state.phase === "ready" || state.lobby === lobby) {
      Object.assign(state, { phase: "queued", lobby: target });
      tell(state, "A player did not accept. You keep your spot.");
      player.playSound("note.bass", { pitch: 1 });
    }
  });
}

function startMatch(lobby) {
  lobby.phase = "starting";
  lobby.startAt = now() + seconds(START_SECONDS);
  forEachReal(lobby, (player, state) => {
    state.phase = "starting";
    player.playSound("random.orb", { pitch: 0.8 });
  });
}

function finishMatch(lobby) {
  const game = GAMES[lobby.game];
  forEachReal(lobby, (player, state) => {
    Object.assign(state, { phase: "idle", lobby: undefined });
    tell(state, `Mock ${game.name} match is over.`);
    player.sendMessage(`§7[Matchmaking] ${game.name}: this is a mock queue, no match was played.`);
  });
  dissolve(lobby);
}

function tickForming(lobby) {
  const game = GAMES[lobby.game];
  const t = now();
  if (t % TPS === 0) {
    const leaving = bots(lobby);
    if (leaving.length && Math.random() < LEAVE_CHANCE_PER_SECOND) {
      const member = pick(leaving);
      lobby.members = lobby.members.filter((m) => m !== member);
      feed(lobby, member, " left the queue");
    }
  }
  if (t >= lobby.nextJoinAt && lobby.members.length < game.size) {
    const room = game.size - lobby.members.length;
    const party = room >= 2 && Math.random() < PARTY_CHANCE ? randomInt(2, Math.min(3, room)) : 1;
    const leader = addBot(lobby);
    for (let k = 1; k < party; k++) addBot(lobby);
    feed(lobby, leader, party > 1 ? `'s party (${party}) joined` : " joined the queue");
    scheduleJoin(lobby);
  }
  if (lobby.members.length >= game.size) startReadyCheck(lobby);
}

function tickReady(lobby) {
  const t = now();
  for (const [bot, plan] of lobby.botPlans) {
    if (t < plan.at) continue;
    lobby.botPlans.delete(bot);
    respond(lobby, bot, plan.answer);
  }
  const answers = [...lobby.responses.values()];
  if (answers.includes("declined")) return failReadyCheck(lobby, false);
  if (t >= lobby.readyEndsAt) return failReadyCheck(lobby, true);
  if (answers.length === lobby.members.length) startMatch(lobby);
}

function tickLobbies() {
  for (const lobby of [...lobbies]) {
    if (!lobbies.has(lobby)) continue;
    if (lobby.phase === "forming") tickForming(lobby);
    else if (lobby.phase === "ready") tickReady(lobby);
    else if (lobby.phase === "starting" && now() >= lobby.startAt) finishMatch(lobby);
  }
}

function driftOnline() {
  GAMES.forEach((game, g) => {
    const pull = (game.online - online[g]) * 0.1;
    online[g] = Math.max(12, Math.round(online[g] + pull + random(-0.03, 0.03) * online[g]));
  });
}

function inventory(entity) {
  return entity.getComponent("inventory")?.container;
}

function holdsLauncher(player) {
  return inventory(player)?.getItem(player.selectedSlotIndex)?.typeId === LAUNCHER;
}

function feedLine(lobby, player) {
  const entry = lobby?.feed;
  if (!entry) return "";
  if (!entry.name) return `§8${entry.text}`;
  return `§8${entry.playerId === player.id ? "You" : entry.name}${entry.text}`;
}

function pipCodes(player, state, game) {
  const lobby = state.lobby;
  const codes = Array(PIPS).fill("");
  const left = Math.floor((PIPS - game.size) / 2);
  for (let k = 0; k < game.size; k++) {
    const member = lobby?.members[k];
    let code = "E";
    if (member) {
      const answer = lobby.responses?.get(member);
      if (lobby.phase === "starting" || answer === "accepted") code = "A";
      else if (answer === "declined") code = "X";
      else code = member.playerId === player.id ? "Y" : "F";
    }
    codes[left + k] = code;
  }
  return codes;
}

function memberOf(lobby, player) {
  return lobby?.members.find((m) => m.playerId === player.id);
}

function detail(player, state, game) {
  const lobby = state.lobby;
  const t = now();
  const dots = ".".repeat(1 + (Math.floor(t / 10) % 3));
  if (state.phase === "queued") {
    return {
      header: `Finding match${dots}`,
      timer: clock(t - state.queuedAt),
      estimate: `Estimated ${clock(state.estimate)}`,
      count: `${lobby.members.length} / ${game.size} players`,
      primary: "§4Cancel",
    };
  }
  if (state.phase === "ready") {
    const answered = lobby.responses.has(memberOf(lobby, player));
    const accepted = [...lobby.responses.values()].filter((a) => a === "accepted").length;
    return {
      header: "§2Match found!",
      timer: `${Math.ceil(Math.max(0, lobby.readyEndsAt - t) / TPS)}`,
      estimate: answered ? "Waiting for the other players" : "Accept to join the match",
      count: `${accepted} / ${game.size} accepted`,
      primary: answered ? "" : "§2Accept",
      secondary: answered ? "" : "§4Decline",
      bar: state.barKey,
    };
  }
  if (state.phase === "starting") {
    return {
      header: "§2Match starting",
      timer: `${Math.ceil(Math.max(0, lobby.startAt - t) / TPS)}`,
      estimate: `Sending you to ${game.name}${dots}`,
      count: `${game.size} / ${game.size} accepted`,
    };
  }
  const [low, high] = game.estimate;
  return {
    header: "§8Not in queue",
    timer: "",
    estimate: `Usual wait ${clock(seconds(low))} - ${clock(seconds(high))}`,
    count: `${game.size} players per match`,
    primary: "§2Play",
  };
}


// 숫자로 시작하는 글자는 text()가 §r을 붙인다(mm_digit_prefix, EXP-30). 빈 글자는 빈 칸.
const label = (str) => paper(str ? text(str) : undefined);

function render(s) {
  const player = s.player;
  const state = stateOf(player);
  const t = now();
  GAMES.forEach((game, g) => {
    const row = `row${g}`;
    const queuedHere = state.phase !== "idle" && state.lobby?.game === g;
    s.put(row, ROW_PART.name, label(g === state.selected ? `§1${game.name}` : game.name));
    s.put(row, ROW_PART.subtitle, label(queuedHere ? `§2In queue ${clock(t - state.queuedAt)}` : `§8${game.mode}`));
    s.put(row, ROW_PART.online, label(`§8${thousands(online[g])} playing`));
    s.put(row, ROW_PART.state, label(queuedHere ? "Q" : g === state.selected ? "S" : ""));
  });
  const game = GAMES[state.selected];
  const view = detail(player, state, game);
  s.put("game", 0, label(game.name));
  s.put("description", 0, label(`§8${game.description}`));
  s.put("header", 0, label(view.header));
  s.put("timer", 0, label(view.timer && `§1${view.timer}`));
  s.put("estimate", 0, label(`§8${view.estimate}`));
  s.put("count", 0, label(`§8${view.count}`));
  s.put("feed", 0, label(state.phase === "idle" ? "" : feedLine(state.lobby, player)));
  s.put("footer", 0, label(t < state.messageUntil ? `§6${state.message}` : `§8${PACK_VERSION}`));
  s.put("ready", 0, label(view.bar));
  pipCodes(player, state, game).forEach((code, k) => s.put("pips", k, label(code)));
  // 라벨이 빈 버튼은 끈다: 버튼 칸이 비어 hideWhenEmpty 버튼이 숨는다(mm_hidden_buttons).
  s.put("primary_label", 0, label(view.primary));
  s.put("secondary_label", 0, label(view.secondary));
  s.setButton("primary", 0, !!view.primary);
  s.setButton("secondary", 0, !!view.secondary);
}

function press(s, name, index) {
  const player = s.player;
  const state = stateOf(player);
  if (name === "game") {
    const row = index;
    if (state.phase === "idle") state.selected = row;
    else if (row !== state.selected) tell(state, "Leave the queue to switch games.");
    return;
  }
  const member = memberOf(state.lobby, player);
  if (name === "primary") {
    if (state.phase === "idle") joinQueue(player, state);
    else if (state.phase === "queued") cancelQueue(player, state);
    else if (state.phase === "ready" && member && !state.lobby.responses.has(member)) respond(state.lobby, member, "accepted");
  }
  if (name === "secondary" && state.phase === "ready" && member && !state.lobby.responses.has(member)) {
    respond(state.lobby, member, "declined");
  }
}

function actionBar(player, state) {
  if (state.phase === "idle" || !state.lobby) return;
  const game = GAMES[state.lobby.game];
  const t = now();
  const holding = holdsLauncher(player);
  if (state.phase === "queued") {
    player.onScreenDisplay.setActionBar(`§e${game.name}§r  ${clock(t - state.queuedAt)}  §7${state.lobby.members.length}/${game.size}`);
  } else if (state.phase === "ready") {
    const left = Math.ceil(Math.max(0, state.lobby.readyEndsAt - t) / TPS);
    const answered = state.lobby.responses.has(memberOf(state.lobby, player));
    const hint = answered ? "Waiting for the other players" : holding ? "Tap the screen to accept" : "Hold the Matchmaking item and tap to accept";
    player.onScreenDisplay.setActionBar(`§aMatch found! §r${hint} §7(${left})`);
  } else if (state.phase === "starting") {
    player.onScreenDisplay.setActionBar(`§aMatch starting: ${game.name}`);
  }
}


export function setup(screen /* ScreenInfo */) {
  const menu = createEntityMenu({
    screen,
    entityType: BOX,
    launcherTag: LAUNCHER,
    tag: BOX_TAG,
    mark: SCREEN_MARK,
    onPress: press,
    render,
    tickEvery: { 4: render },
  });

  // 로비 진행·접속자 수·액션바는 화면을 안 들고 있어도 계속 돈다.
  system.runInterval(() => {
    tickLobbies();
    if (now() % (TPS * 3) === 0) driftOnline();
    if (now() % 10 === 0) {
      for (const player of world.getAllPlayers()) actionBar(player, stateOf(player));
    }
  }, 1);

  world.afterEvents.playerLeave.subscribe((event) => {
    const state = players.get(event.playerId);
    const lobby = state?.lobby;
    const box = menu.sessions.get(event.playerId)?.box;
    if (box?.isValid) box.remove();
    players.delete(event.playerId);
    menu.sessions.delete(event.playerId);
    if (!lobby || !lobbies.has(lobby)) return;
    if (lobby.phase === "ready") {
      const member = lobby.members.find((m) => m.playerId === event.playerId);
      if (member) lobby.responses.set(member, "declined");
      return;
    }
    leaveLobby(event.playerId, lobby);
  });

  menu.start();
  return menu;
}
