import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";
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
import CoinListComponents from "../Components/CoinListComponent";

const List = ({ setTab, tab }) => {
  const [coinList, setCoinList] = useState([]);
  const [coinPriceDataArr, setCoinPriceDataArr] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [coinListLoading, setCoinListLoading] = useState(true);

  const wsURL = "wss://api.upbit.com/websocket/v1";
  const wsPrice = useRef(null);

  const memoizedCoinPriceDataArr = useMemo(() => {
    return coinPriceDataArr;
  }, [coinPriceDataArr]);

  useEffect(() => {
    if (coinList.length === 0) {
      getCoinList();
    }

    if (coinList.length !== 0) {
      getCoinPriceData();
    }

    return () => {
      if (wsPrice.current !== null && wsPrice.current.readyState === 1) {
        wsPrice.current.close();
        console.log("코인리스트 웹소켓 종료");
      }
    };
  }, [coinList]);

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

  function getCoinPriceData() {
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

        let updatedCoinList = [...coinList];
        updatedCoinList[coinIndex][2] = text.trade_price;
        updatedCoinList[coinIndex][3] = text.signed_change_price;
        updatedCoinList[coinIndex][4] = text.signed_change_rate;
        updatedCoinList[coinIndex][5] = text.acc_trade_price_24h;

        updatedCoinList.sort((a, b) => b[5] - a[5]);

        setCoinPriceDataArr(updatedCoinList);

        setTimeout(() => {
          setCoinListLoading(false);
        }, 200);
      };
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Center>
      {!coinListLoading ? (
        <ListContainer>
          {coinPriceDataArr.map((coin, i) => (
            <CoinListComponents coin={coin} key={i} loading={coinListLoading} />
          ))}
        </ListContainer>
      ) : (
        <ListContainer>
          {Array(50)
            .fill(0)
            .map((data, i) => (
              <CoinListComponents key={i} loading={coinListLoading} />
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

export default List;
