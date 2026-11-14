// router: 아이콘 + 글자 버튼 4개. 화면 선택(제목 접두 라우터)은 buildScreens가 맡는다.
import { Screen, ButtonList } from "json-ui-react";

export default (
  <Screen id="router" title="Router: screen picked by title prefix">
    <ButtonList name="buttons" count={4} />
  </Screen>
);
