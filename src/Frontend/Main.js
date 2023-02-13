import React, { useEffect, useState } from "react";
import Trade from "./Trade";
import Chart from "./Chart";
import axios from "axios";
import Orderbook from "./Orderbook";
import CoinInfo from "./CoinInfo";
import LineChart from "./LineChart";
import dayjs from "dayjs";

const Main = () => {
  const [price, setPrice] = useState(0); // 가격
  const [changePrice, setChangePrice] = useState([]); // [어제 종가, 현재 등락율]
  const [morePriceInfo, setMorePriceInfo] = useState([]);
  const [orderbook, setOrderbook] = useState([]); // 호가 배열
  const [orderbookSumInfo, setOrderbookSumInfo] = useState([]); // [timestamp, sum, sum]
  const [orderPrice, setOrderPrice] = useState(0); // 내가 호가창에서 선택한 가격

  //
  const [trade, setTrade] = useState([]); //

  let testCoinCode = "KRW-BTC";
  let arr = [];

  const [dayCandle, setDayCandle] = useState([]);
  const [candle, setCandle] = useState([]);
  // candle
  const axiosOptions = {
    method: "GET",
    // url: "https://api.upbit.com/v1/candles/days",
    url: "https://api.upbit.com/v1/candles/minutes/10",
    params: {
      market: testCoinCode,
      count: "200",
    },
    headers: { accept: "application/json" },
  };

  useEffect(() => {
    getPrice();
    getOrderbook();
    getTrade();
    getCandle();
  }, []);

  function getPrice() {
    try {
      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.onopen = () => {
        ws.send(
          `[{"ticket" : "2"}, {"type" : "ticker","codes": [${testCoinCode}]}]`
        );
      };
      ws.onmessage = async (e) => {
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
    try {
      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.onopen = () => {
        ws.send(
          `[{"ticket":"3"},{"type":"orderbook","codes": [${testCoinCode}]}]`
        );
      };
      ws.onmessage = async (e) => {
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
    try {
      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.onopen = () => {
        ws.send(`[{"ticket":"4"},{"type":"trade","codes": [${testCoinCode}]}]`);
      };
      ws.onmessage = async (e) => {
        const { data } = e;
        const text = await new Response(data).json();
        if (arr.length >= 20) {
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
    let newArr = [];
    let newArr2 = [];

    let newArr3 = [];

    fetch
      .filter((data) => {
        data.candle_date_time_kst.includes("2023-02-13");
      })
      .map((data) => {
        newArr3.push(data);
      });
    console.log(newArr3);

    fetch.reverse().map((data) => {
      newArr.push({
        time: dayjs(data.candle_date_time_kst).format("YYYY-MM-DD"),
        open: data.opening_price,
        high: data.high_price,
        low: data.low_price,
        close: data.trade_price,
      });
    });
    setDayCandle(newArr);

    //1111111111111
    // fetch.map((data) => {
    //   newArr2.push({
    //     value: data.trade_price,
    //     time: dayjs(data.candle_date_time_kst).format("YYYY-MM-DD"),
    //   });
    // });

    ///22222222222222222222
    fetch.map((data) => {
      newArr2.push({
        value: data.trade_price,
        time: dayjs(data.timestamp).unix(),
      });
    });

    setCandle(newArr2);
  }

  return (
    <div>
      <CoinInfo
        price={price}
        changePrice={changePrice}
        morePriceInfo={morePriceInfo}
        candle={candle}
      />
      <Orderbook
        orderbook={orderbook}
        orderbookSumInfo={orderbookSumInfo}
        price={price}
        changePrice={changePrice}
        setOrderPrice={setOrderPrice}
      />
      <Trade trade={trade} />
    </div>
  );
};

export default Main;
