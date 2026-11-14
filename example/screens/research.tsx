// research: 탭 2개(연구 필요·완료), 탭마다 6x8 칸과 페이지 버튼, 칸마다 미리 만든 상세(FFR 방식 E).
// 고수준 부품으로 조립한다. ItemDetail은 사용자 정의 상세: 자기 상세 화면도 이렇게 부품을 쌓아 만든다.
// 서버 데이터: { tabs: [[글자, 아이콘], ...], needed: [{ icon, name, status, desc, mats, rewards, action }], done: [...] }
import { Screen, Tabs, Tab, SelectGrid, Pager, Placeholder, DetailPanel, IconTitle, TextBlock, IconRow, Spacer, ActionButton } from "json-ui-react";

/** 칸 하나의 상세: 아이콘 + 이름·상태, 설명, 재료·보상 아이콘 줄, 아래 고정 버튼. */
const ItemDetail = () => (
  <DetailPanel footer={<ActionButton name="action" />}>
    <IconTitle name="name" subtitle="status" />
    <Spacer h={3} />
    <TextBlock name="desc" />
    <Spacer h={4} />
    <IconRow name="mats" label="Required materials" count={8} />
    <Spacer h={4} />
    <IconRow name="rewards" label="Reward recipes" count={8} badge="+1" />
  </DetailPanel>
);

export default (
  <Screen id="research" title="E: selection by toggle, 96 details prebuilt" layout="split">
    <Tabs name="tabs" mode="follow">
      <Tab>
        <SelectGrid name="needed" rows={6} cols={8} detail={<ItemDetail />} />
        <Pager name="neededPages" />
      </Tab>
      <Tab>
        <SelectGrid name="done" rows={6} cols={8} detail={<ItemDetail />} />
        <Pager name="donePages" />
      </Tab>
    </Tabs>
    <Placeholder text="Pick a research." />
  </Screen>
);
