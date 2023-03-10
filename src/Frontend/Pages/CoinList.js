import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import BottomTab from "../Components/BottomTab";
import { motion } from "framer-motion";
import {
  volumeFormatter,
  numberFormatter,
  percentageFormatter,
} from "../Context/FormatterContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const List = ({ setTab, tab }) => {
  const [coinList, setCoinList] = useState([]);
  const [coinPriceArr, setCoinPriceArr] = useState([]);
  const [coinListLoading, setCoinListLoading] = useState(true);

  const wsURL = "wss://api.upbit.com/websocket/v1";
  const wsPrice = useRef(null);

  useEffect(() => {
    if (coinList.length === 0) {
      getCoinList();
    }

    if (coinList.length !== 0) {
      getCoinPrice();
    }

    return () => {
      if (wsPrice.current !== null && wsPrice.current.readyState === 1) {
        wsPrice.current.close();
        console.log("코인리스트 웹소켓 종료");
      }
    };
  }, [coinList]);

  useEffect(() => {
    if (!coinListLoading) console.log("로딩");
  }, [coinListLoading]);

  async function getCoinList() {
    let arr = [];
    let t = await axios
      .get("https://api.upbit.com/v1/market/all")
      .then((res) => res.data);

    t.filter((coin) => coin.market.includes("KRW")).map((data) => {
      arr.push([data.market, data.korean_name]);
    });

    setCoinList(arr);
  }

  function getCoinPrice() {
    try {
      wsPrice.current = new WebSocket(wsURL);
      wsPrice.current.onopen = () => {
        wsPrice.current.send(
          `[{"ticket" : "2"}, {"type" : "ticker","codes": [${coinList}]}]`
        );
        console.log("코인리스트 웹소켓 열림");
      };

      wsPrice.current.onmessage = async (e) => {
        const { data } = e;
        const text = await new Response(data).json();

        const coinTempList = coinList.map((data) => data[0]);
        const coinIndex = coinTempList.indexOf(text.code);

        let tmp = [...coinList];
        tmp[coinIndex][2] = text.trade_price;
        tmp[coinIndex][3] = text.signed_change_price;
        tmp[coinIndex][4] = text.signed_change_rate;
        tmp[coinIndex][5] = text.acc_trade_price_24h;

        setCoinPriceArr(tmp.sort((a, b) => b[5] - a[5]));

        setCoinListLoading(false);
      };
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Center>
      {!coinListLoading ? (
        <ListContainer>
          {coinPriceArr.map((coin, i) => (
            <Line key={i}>
              <LineContainer>
                <HeaderBox>
                  <Link to={`/exchange/${coin[0]}`} key={coin[0]}>
                    <CoinKRnameBtn>{coin[1]}</CoinKRnameBtn>
                  </Link>
                  <CoinEnname>{coin[0]}</CoinEnname>
                </HeaderBox>
                <Box
                  fontColor={
                    coin[3] > 0
                      ? "#CD614D"
                      : coin[3] < 0
                      ? "#3c87e5"
                      : "#424242"
                  }
                >
                  <div>{numberFormatter(coin[2])}</div>
                </Box>
                <Box
                  fontColor={
                    coin[3] > 0
                      ? "#CD614D"
                      : coin[3] < 0
                      ? "#3c87e5"
                      : "#424242"
                  }
                >
                  <div>{numberFormatter(coin[3])}</div>
                  <div>{percentageFormatter(coin[4] * 100)}</div>
                </Box>
                <Box>{coin[5] && volumeFormatter(coin[5])}</Box>
              </LineContainer>
            </Line>
          ))}
        </ListContainer>
      ) : (
        <ListContainer>
          {Array(50)
            .fill(0)
            .map(() => (
              <Line>
                <LoadingContainer>
                  <LoadingBox Boxwidth={"25%"}>
                    <Skeleton count={2} height={16} />
                  </LoadingBox>
                  <LoadingBox Boxwidth={"20%"}>
                    <Skeleton count={1} height={20} />
                  </LoadingBox>
                  <LoadingBox Boxwidth={"20%"}>
                    <Skeleton count={2} height={14} />
                  </LoadingBox>
                  <LoadingBox Boxwidth={"20%"}>
                    <Skeleton count={1} height={30} />
                  </LoadingBox>
                </LoadingContainer>
              </Line>
            ))}
        </ListContainer>
      )}
      <BottomTab setTab={setTab} tab={tab} />
    </Center>
  );
};
const Center = styled(motion.div)`
  position: static;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 450px;
  width: 100vw;
  height: 100%;
`;

const ListContainer = styled(motion.div)`
  margin: 0px 0px;
  padding: 10px 0px 15px 0px;
  margin-top: 20px;
  margin-bottom: 50px;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  width: 100%;
  height: 54px;
  /* box-shadow: 0 0 0 1px #eff1f2 inset; */
  border-bottom: 1px solid #ebeff0;
`;

const LineContainer = styled.div`
  display: flex;
  padding: 10px 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const CoinKRnameBtn = styled.button`
  border: none;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
  cursor: pointer;
  background-color: white;
  color: #424242;
  padding: 0;
`;

const CoinEnname = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #aaaaaa;
`;

const HeaderBox = styled.div`
  width: 25%;
`;

const LoadingBox = styled.div`
  width: ${(props) => props.Boxwidth};
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 25%;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.fontColor};
`;

export default List;
