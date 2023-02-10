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
            <Line key={i}>
              <List>{data.trade_time}</List>
              <List>{formatter(data.trade_price)}</List>
              <List
                style={{ fontWeight: 600 }}
                fontColor={data.ask_bid === "ASK" ? "#3c87e5" : "#CD614D"}
              >
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
  margin: 40px 0px;
  padding: 5px;
  width: 100%;
  max-width: 480px;
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  /* border: 1px solid black; */
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  display: flex;
  margin-bottom: 3px;
  font-size: 20px;
  font-weight: 600;
`;

const Line = styled.div`
  display: flex;
`;

const List = styled.div`
  text-align: center;
  color: ${(props) => props.fontColor};
  display: flex;
  justify-content: center;

  width: 100%;
`;
export default Trade;
