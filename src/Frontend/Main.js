import React, { useEffect, useState } from "react";
import Orderbook from "./Orderbook";
import Trade from "./Trade";

const Main = () => {
  const [price, setPrice] = useState(0); // 가격
  const [changePrice, setChangePrice] = useState(0); // [어제 종가, 현재 등락율]
  const [orderbook, setOrderbook] = useState([]); // 호가 배열
  const [orderbookSumInfo, setOrderbookSumInfo] = useState([]); // [timestamp, sum, sum]
  const [orderPrice, setOrderPrice] = useState(0); // 내가 호가창에서 선택한 가격

  //
  const [trade, setTrade] = useState([]); //

  let testCoinCode = "KRW-ETH";
  let arr = [];

  useEffect(() => {
    getPrice();
    getOrderbook();
    getTrade();
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
        setChangePrice([text.prev_closing_price, text.signed_change_rate]);
        // console.log(text);
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

  //getTrade 이 함수는 건들일없음
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

  return (
    <div>
      <div>웹소켓 테스트</div>
      <div>{price.toLocaleString()}</div>
      <div>{orderPrice.toLocaleString()}</div>
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
