import React, { useEffect, useState } from "react";
import Orderbook from "./Orderbook";

const Main = () => {
  const [price, setPrice] = useState(0);
  const [changePrice, setChangePrice] = useState(0);
  const [orderbook, setOrderbook] = useState([]);
  const [orderbookSumInfo, setOrderbookSumInfo] = useState([]);

  const [orderPrice, setOrderPrice] = useState(0);

  useEffect(() => {
    getPrice();
    getOrderbook();
  }, []);

  useEffect(() => {
    // console.log(orderbook);
  }, [orderbook]);

  function getPrice() {
    try {
      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.onopen = () => {
        ws.send(`[{"ticket" : "2"}, {"type" : "ticker","codes": ["KRW-BTC"]}]`);
      };
      ws.onmessage = async (e) => {
        const { data } = e;
        const text = await new Response(data).json();
        setPrice(text.trade_price);
        setChangePrice([text.prev_closing_price, text.signed_change_rate]);
      };
    } catch (e) {
      console.log(e);
    }
  }

  function getOrderbook() {
    try {
      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.onopen = () => {
        ws.send(`[{"ticket":"3"},{"type":"orderbook","codes": ["KRW-BTC"]}]`);
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
    </div>
  );
};

export default Main;
