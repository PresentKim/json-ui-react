// tabs-lazy: 탭 2개, 탭마다 버튼 2개. 탭을 처음 고를 때 팩토리로 내용을 만든다(방식 D). 첫 탭은 미리 만든다.
// 탭 글자·아이콘은 서버 데이터 tabs에서 온다.
import { Screen, Tabs, Tab, ButtonList } from "json-ui-react";

export default (
  <Screen id="tabs-lazy" title="Tabs: built by factory on select (D)">
    <Tabs name="tabs" mode="lazy">
      <Tab>
        <ButtonList name="tab1" count={2} />
      </Tab>
      <Tab>
        <ButtonList name="tab2" count={2} />
      </Tab>
    </Tabs>
  </Screen>
);
