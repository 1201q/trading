import styled from "styled-components";

const Trade = ({ trade }) => {
  const formatter = (n) => {
    return n.toLocaleString();
  };
  return (
    <Center>
      <TradeContainer>
        <Header>
          <List>체결시간</List>
          <List>체결가격</List>
          <List>체결량</List>
          <List>체결금액</List>
        </Header>
        {trade
          .slice(0)
          .reverse()
          .map((data, i) => (
            <Line key={i} sbgColor={i % 2 === 0 ? "white" : "#F9fafc"}>
              <List>{data.trade_time}</List>
              <List>{formatter(data.trade_price)}</List>
              <List fontColor={data.ask_bid === "ASK" ? "#3c87e5" : "#CD614D"}>
                {data.trade_volume.toFixed(8)}
              </List>
              <List>
                {formatter(Math.round(data.trade_volume * data.trade_price))}
              </List>
            </Line>
          ))}
      </TradeContainer>
    </Center>
  );
};

const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TradeContainer = styled.div`
  margin: 20px 0px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #eeeeee;
  width: 87%;
  padding: 15px 15px;
  max-width: 420px; // padding 15 없음
  height: 320px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  /* border: 1px solid black; */
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  font-size: 14px;
  color: #9e9e9e;
  font-weight: 300;
  text-align: center;
`;

const Line = styled.div`
  display: flex;
  background-color: ${(props) => props.sbgColor};
  padding: 5px 0px;
`;

const List = styled.div`
  font-size: 13px;
  text-align: center;
  color: ${(props) => props.fontColor};

  display: flex;
  justify-content: flex-start;
  font-weight: 300;
  width: 100%;
`;
export default Trade;
