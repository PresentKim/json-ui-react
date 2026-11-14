// tabs-follow: 탭 2개, 탭마다 버튼 2개. 내용이 탭 토글 상태를 따라 보인다(방식 C).
// 탭 글자·아이콘은 서버 데이터 tabs에서 온다.
import { Screen, Tabs, Tab, ButtonList } from "json-ui-react";

export default (
  <Screen id="tabs-follow" title="Tabs: follow toggle state (C)">
    <Tabs name="tabs" mode="follow">
      <Tab>
        <ButtonList name="tab1" count={2} />
      </Tab>
      <Tab>
        <ButtonList name="tab2" count={2} />
      </Tab>
    </Tabs>
  </Screen>
);
