// tabs-inside: 탭 2개, 탭마다 버튼 2개. 켠 탭 얼굴 안에 내용을 넣는다(방식 B).
// 탭 글자·아이콘은 서버 데이터 tabs에서 온다.
import { Screen, Tabs, Tab, ButtonList } from "json-ui-react";

export default (
  <Screen id="tabs-inside" title="Tabs: pane inside the toggle (B)">
    <Tabs name="tabs" mode="inside">
      <Tab>
        <ButtonList name="tab1" count={2} />
      </Tab>
      <Tab>
        <ButtonList name="tab2" count={2} />
      </Tab>
    </Tabs>
  </Screen>
);
