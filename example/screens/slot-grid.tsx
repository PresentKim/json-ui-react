// slot-grid: 3x8 고정 칸 격자. 칸을 고르면 오른쪽 판에 그 칸의 아이콘과 이름이 뜬다.
import { Screen, SlotGrid } from "json-ui-react";

export default (
  <Screen id="slot-grid" title="Fixed slot grid with selection detail" layout="split">
    <SlotGrid name="cells" rows={3} cols={8} detail="Pick a slot." />
  </Screen>
);
