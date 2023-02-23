import React, { useEffect, useState, useRef } from "react";
import Trade from "./Trade";
// import Chart from "./Chart";
import axios from "axios";
import Orderbook from "./Orderbook";
import CoinInfo from "./CoinInfo";
import LineChart from "./LineChart";
import dayjs from "dayjs";
import BongChart from "./BongChart";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  let { param_coincode } = useParams();

  const [price, setPrice] = useState(0); // 가격
  const [changePrice, setChangePrice] = useState([]); // [어제 종가, 현재 등락율]
  const [morePriceInfo, setMorePriceInfo] = useState([]);
  const [orderbook, setOrderbook] = useState([]); // 호가 배열
  const [orderbookSumInfo, setOrderbookSumInfo] = useState([]); // [timestamp, sum, sum]
  const [orderPrice, setOrderPrice] = useState(null); // 내가 호가창에서 선택한 가격

  //
  const [trade, setTrade] = useState([]); //

  const [candle, setCandle] = useState([]);

  const [candleData, setCandleData] = useState(0); // 봉차트 테스트
  const [volume, setVolume] = useState(0);

  const [coinCode, setCoinCode] = useState(
    !param_coincode ? "KRW-BTC" : param_coincode
  );

  // visible
  const [orderbookVisible, setOrderbookVisible] = useState(true);
  const [tradeVisible, setTradeVisible] = useState(true);
  const [chartVisible, setChartVisible] = useState(true);

  // websocket
  const wsURL = "wss://api.upbit.com/websocket/v1";
  const wsPrice = useRef(null);
  const wsOrderbook = useRef(null);
  const wsTrade = useRef(null);

  // candle
  const axiosOptions = {
    method: "GET",
    url: "https://api.upbit.com/v1/candles/days",
    // url: "https://api.upbit.com/v1/candles/minutes/10",
    params: {
      market: coinCode,
      // count: "145",
      count: "200",
    },
    headers: { accept: "application/json" },
  };
  let arr = [];

  useEffect(() => {
    getPrice();
    getOrderbook();
    getTrade();
    getCandle();
  }, [coinCode]);

  //웹소켓
  function getPrice() {
    if (wsPrice.current !== null) {
      if (wsPrice.current.readyState === 1) {
        wsPrice.current.close();
        console.log("check");
      }
    }

    try {
      wsPrice.current = new WebSocket(wsURL);
      wsPrice.current.onopen = () => {
        wsPrice.current.send(
          `[{"ticket" : "2"}, {"type" : "ticker","codes": [${coinCode}]}]`
        );
      };
      wsPrice.current.onmessage = async (e) => {
        const { data } = e;
        const text = await new Response(data).json();
        setPrice(text.trade_price);
        setChangePrice([
          text.prev_closing_price,
          text.signed_change_rate,
          text.signed_change_price,
          text.change,
        ]);
        setMorePriceInfo([
          text.high_price,
          text.low_price,
          text.acc_trade_volume_24h,
          text.acc_trade_price_24h,
          [text.highest_52_week_date, text.highest_52_week_price],
          [text.lowest_52_week_date, text.lowest_52_week_price],
        ]);
      };
    } catch (e) {
      console.log(e);
    }
  }

  function getOrderbook() {
    if (wsOrderbook.current !== null) {
      if (wsOrderbook.current.readyState === 1) {
        wsOrderbook.current.close();
        console.log("check");
      }
    }

    try {
      wsOrderbook.current = new WebSocket(wsURL);
      wsOrderbook.current.onopen = () => {
        wsOrderbook.current.send(
          `[{"ticket":"3"},{"type":"orderbook","codes": [${coinCode}]}]`
        );
      };
      wsOrderbook.current.onmessage = async (e) => {
        const { data } = e;
        const text = await new Response(data).json();

        let ask = [];
        let bid = [];

        text.orderbook_units.map((data, i) => {
          ask[14 - i] = [data.ask_price, data.ask_size];
          bid[i] = [data.bid_price, data.bid_size];
        });

        setOrderbookSumInfo([
          text.timestamp,
          text.total_ask_size,
          text.total_bid_size,
        ]);
        setOrderbook(ask.concat(bid));
      };
    } catch (e) {
      console.log(e);
    }
  }

  function getTrade() {
    if (wsTrade.current !== null) {
      if (wsTrade.current.readyState === 1) {
        wsTrade.current.close();
        console.log("check");
      }
    }
    try {
      wsTrade.current = new WebSocket(wsURL);
      wsTrade.current.onopen = () => {
        wsTrade.current.send(
          `[{"ticket":"4"},{"type":"trade","codes": [${coinCode}]}]`
        );
      };
      wsTrade.current.onmessage = async (e) => {
        const { data } = e;
        const text = await new Response(data).json();

        if (arr.length >= 50) {
          arr.shift();
        }
        arr.push(text);

        setTrade(arr);
      };
    } catch (e) {
      console.log(e);
    }
  }

  async function getCandle() {
    let fetch = await axios
      .get(axiosOptions.url, axiosOptions)
      .then((res) => res.data);
    getDayCandle(fetch);
    console.log(fetch);
  }

  function getDayCandle(fetch) {
    let arr = [];
    let vol = [];
    fetch.reverse().map((data, i) => {
      arr[i] = {
        open: data.opening_price,
        high: data.high_price,
        low: data.low_price,
        close: data.trade_price,
        time: dayjs(data.candle_date_time_utc).add(9, "hour").unix(),
      };
    });

    fetch.map((data, i) => {
      vol[i] = {
        time: dayjs(data.candle_date_time_utc).add(9, "hour").unix(),
        value: data.candle_acc_trade_volume,
        color:
          arr[i].open >= arr[i].close
            ? "rgba(23,99,182,0.3)"
            : "rgba(225,35,67, 0.3)",
      };
    });
    setVolume(vol);
    setCandleData(arr);
  }

  return (
    <div>
      <CoinInfo
        coinCode={coinCode}
        price={price}
        changePrice={changePrice}
        morePriceInfo={morePriceInfo}
        candle={candle}
      />
      {chartVisible && (
        <BongChart candleData={candleData} price={price} volume={volume} />
      )}
      <Center>
        <Container>
          <button
            onClick={() => {
              setTradeVisible(true);
              setChartVisible(true);
              setOrderbookVisible(true);
            }}
          >
            메인
          </button>
          <button
            onClick={() => {
              setChartVisible(false);
              setTradeVisible(false);
              setOrderbookVisible(true);
            }}
          >
            호가
          </button>
          <button
            onClick={() => {
              setChartVisible(false);
              setOrderbookVisible(false);
              setTradeVisible(true);
            }}
          >
            체결
          </button>
          <button
            onClick={() => {
              setTradeVisible(false);
              setChartVisible(false);
              setOrderbookVisible(false);
            }}
          >
            지갑
          </button>
        </Container>
      </Center>
      {orderbookVisible && (
        <Orderbook
          orderbook={orderbook}
          orderbookSumInfo={orderbookSumInfo}
          price={price}
          changePrice={changePrice}
          orderPrice={orderPrice}
          setOrderPrice={setOrderPrice}
        />
      )}
      {tradeVisible && <Trade trade={trade} />}
      <Nav style={{ display: !orderPrice && "none" }}>
        <NN>
          <Btn bgColor="#E12343">매수</Btn>
          <Btn bgColor="#3182f6">매도</Btn>
        </NN>
      </Nav>
    </div>
  );
};

const Nav = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 3;
  height: 70px;
`;

const NN = styled.div`
  display: flex;
  background-color: white;
  border: mone;
  width: 450px;
  margin: 0px 15px 0px 15px;
  padding-bottom: 15px;
`;

const Btn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5px;
  border-radius: 12px;
  font-size: 17px;
  color: white;
  background-color: ${(props) => props.bgColor};
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  margin: 0px 0px;
  padding: 10px 15px 10px 15px;
  margin-top: 20px;
  background-color: #093687;
  width: 87%;
  max-width: 420px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    padding: 0px 10px;
    border-radius: 5px;
    border: none;
    color: #093687;
    font-size: 14px;
    font-weight: 600;
    background-color: white;
    cursor: pointer;
  }
`;

export default Main;
