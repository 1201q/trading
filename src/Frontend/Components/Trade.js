import dayjs from "dayjs";
import styled from "styled-components";

const Trade = ({ trade }) => {
  const formatter = (n) => {
    return n.toLocaleString();
  };

  return (
    <Center>
      <TradeContainer>
        <Header>
          <List Lwidth={"20%"}>체결시간</List>
          <List Lwidth={"25%"}>체결가격</List>
          <List Lwidth={"30%"}>체결량</List>
          <List Lwidth={"25%"}>체결금액</List>
        </Header>
        {trade
          .slice(0)
          .reverse()
          .map((data, i) => (
            <Line key={i} sbgColor={i % 2 === 0 ? "white" : "#F9fafc"}>
              <List Lwidth={"20%"}>
                {dayjs(data.trade_timestamp).format("HH:mm:ss")}
              </List>
              <List Lwidth={"25%"}>{formatter(data.trade_price)}</List>
              <List
                Lwidth={"30%"}
                fontColor={data.ask_bid === "ASK" ? "#3c87e5" : "#CD614D"}
              >
                {data.trade_volume.toFixed(6)}
              </List>
              <List Lwidth={"25%"}>
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
  width: ${(props) => (props.Lwidth ? props.Lwidth : "25%")};
`;
export default Trade;