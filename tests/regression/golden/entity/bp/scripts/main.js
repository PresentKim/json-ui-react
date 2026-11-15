// 엔티티 예시 진입점: 빌드가 만든 SCREENS(칸 번호)를 화면마다 setup에 넘긴다.
import { SCREENS } from "./generated/entity-screens.js";
import { setup as setupMenuLab } from "./menu-lab.js";
import { setup as setupResearch } from "./research.js";
import { setup as setupE2048 } from "./e2048.js";
import { setup as setupMatchmaking } from "./matchmaking.js";

setupMenuLab(SCREENS["menu-lab"]);
setupResearch(SCREENS["research"]);
setupE2048(SCREENS["e2048"]);
setupMatchmaking(SCREENS["matchmaking"]);
