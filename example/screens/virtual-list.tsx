// virtual-list: 2열 가상 목록 화면 하나. 칸 수는 서버가 보낸 버튼 수에 묶인다.
import { Screen, VirtualList } from "json-ui-react";

export const virtualListScreen = (id: string, count: number) => (
  <Screen id={id} title={`Grid list: ${count} cells (2 columns)`}>
    <VirtualList name="list" count={count} />
  </Screen>
);
