// 엔티티 2048 서버 스크립트: 게임 규칙과 칸 쓰기. 세션 루프와 버튼 폴링은 runtime.js가 맡는다.
import { createEntityMenu, paper } from "./runtime.js";

const PACK_VERSION = "v1.1.0";
const BUTTON_MARK = "§r§e§r§s§b§r";
const SIZE = 4;
const CELLS = SIZE * SIZE;
const WIN_EXP = 11;

const games = new Map();

function lines(dir) {
  const result = [];
  for (let a = 0; a < SIZE; a++) {
    const line = [];
    for (let b = 0; b < SIZE; b++) {
      if (dir === "L") line.push(a * SIZE + b);
      if (dir === "R") line.push(a * SIZE + (SIZE - 1 - b));
      if (dir === "U") line.push(b * SIZE + a);
      if (dir === "D") line.push((SIZE - 1 - b) * SIZE + a);
    }
    result.push(line);
  }
  return result;
}

function spawn(board) {
  const empty = board.flatMap((v, i) => (v ? [] : [i]));
  if (!empty.length) return -1;
  const index = empty[Math.floor(Math.random() * empty.length)];
  board[index] = Math.random() < 0.9 ? 1 : 2;
  return index;
}

function canMove(board) {
  for (let i = 0; i < CELLS; i++) {
    if (!board[i]) return true;
    if (i % SIZE < SIZE - 1 && board[i] === board[i + 1]) return true;
    if (i + SIZE < CELLS && board[i] === board[i + SIZE]) return true;
  }
  return false;
}

function newGame() {
  const board = Array(CELLS).fill(0);
  const spawned = [spawn(board), spawn(board)];
  return {
    board,
    score: 0,
    won: false,
    parity: "a",
    previous: Array(CELLS).fill(0),
    movers: Array(CELLS).fill("E"),
    finals: board.map((v, i) => (!v ? "E" : spawned.includes(i) ? "P" : "N")),
  };
}

function move(game, dir) {
  const old = game.board;
  const board = Array(CELLS).fill(0);
  const merged = Array(CELLS).fill(false);
  const movers = Array(CELLS).fill("E");
  let moved = false;
  for (const line of lines(dir)) {
    let next = 0;
    line.forEach((from, k) => {
      const value = old[from];
      if (!value) return;
      const last = line[next - 1];
      let dest;
      if (next > 0 && board[last] === value && !merged[last]) {
        dest = next - 1;
        board[last] = value + 1;
        merged[last] = true;
        game.score += 2 ** (value + 1);
      } else {
        dest = next;
        board[line[dest]] = value;
        next++;
      }
      const distance = k - dest;
      if (distance) moved = true;
      movers[from] = distance ? `${dir}${distance}` : "S0";
    });
  }
  const spawned = moved ? spawn(board) : -1;
  game.previous = old;
  game.board = board;
  game.movers = movers;
  game.finals = board.map((v, i) => (!v ? "E" : i === spawned ? "P" : merged[i] ? "M" : "N"));
  // 홀짝을 뒤집어 같은 모양도 새 키가 되게 한다(애니메이션 다시 재생).
  game.parity = game.parity === "a" ? "b" : "a";
  if (board.some((v) => v >= WIN_EXP)) game.won = true;
}

function status(game) {
  if (!canMove(game.board)) return "Game over. Press New.";
  if (game.won) return "You made 2048!";
  return PACK_VERSION;
}

function tile(code, exp, parity) {
  return code === "E" || !exp ? undefined : paper(`${code}${parity}t${exp}`);
}

function render(s) {
  const game = games.get(s.player.id);
  for (let i = 0; i < CELLS; i++) {
    s.put("mover", i, tile(game.movers[i], game.previous[i], game.parity));
    s.put("final", i, tile(game.finals[i], game.board[i], game.parity));
  }
  s.put("score", 0, paper(`Score ${game.score}`));
  s.put("status", 0, paper(status(game)));
}

export function setup(screen) {
  const menu = createEntityMenu({
    screen,
    entityType: "jure:e2048_box",
    launcherTag: "jure:test_launcher",
    tag: "jure_e2048",
    mark: BUTTON_MARK,
    onStart(s) {
      if (!games.has(s.player.id)) games.set(s.player.id, newGame());
    },
    onPress(s, name) {
      const game = games.get(s.player.id);
      if (name === "New") games.set(s.player.id, { ...newGame(), parity: game.parity === "a" ? "b" : "a" });
      else move(game, name);
    },
    render,
  });
  menu.start();
  return menu;
}
