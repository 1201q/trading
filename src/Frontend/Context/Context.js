import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// 코인리스트
const getCoinList = async () => {
  let list = await axios
    .get("https://api.upbit.com/v1/market/all")
    .then((res) => res.data);

  // KRW 마켓만
  return list
    .filter((coin) => coin.market.includes("KRW"))
    .map((data) => [data.market, data.korean_name]);
};

const CoinListState = atom({
  key: "CoinListState",
  default: [],
});

const KRWCoinListState = selector({
  key: "FilteredCoinListState",
  get: ({ get }) => {
    const data = get(CoinListState);
    return data;
  },
  set: ({ set }, newValue) => {
    set(CoinListState, newValue);
  },
});

export const useCoinList = () => {
  const [coinList, setCoinList] = useRecoilState(KRWCoinListState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinList = async () => {
      const data = await getCoinList();
      setLoading(false);
      setCoinList(data);
    };
    fetchCoinList();
  }, []);

  if (loading) {
    return [];
  }
  return coinList;
};

// 웹소켓
const BtcPriceState = atom({
  key: "BTCPriceState",
  default: [],
});

const TestBtcPriceState = selector({
  key: "TestBtcPriceState",
  get: ({ get }) => {
    const data = get(BtcPriceState);
    return data;
  },
  set: ({ set }, newValue) => {
    set(BtcPriceState, newValue);
  },
});

const returnWS = (coinCode) => {
  const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
  ws.onopen = () => {
    ws.send(`[{"ticket" : "2"}, {"type" : "ticker","codes": [${coinCode}]}]`);
  };
  return ws;
};

export const useCoinPrice = (coinCode) => {
  const [BTCPrice, setBtcPrice] = useRecoilState(TestBtcPriceState);

  useEffect(() => {
    let ws = null; // 웹소켓 연결할 예정

    if (coinCode.length > 0) {
      ws = returnWS(coinCode);
      ws.onmessage = async (e) => {
        const { data } = e;
        const text = await new Response(data).json();
        setBtcPrice(text); // 이친구는 마운트될때마다 한번만 실행됨
      }; // 이유는 recoil 자체 매커니즘으로 price가 변경되기때문
    }

    return () => {
      if (ws) {
        ws.close();
        console.log("종료됨");
      }
    }; // 컴포넌트 언마운트되면 웹소켓 종료
  }, [coinCode]);

  return BTCPrice;
};

//위ws설명
// useBtcPrice 훅은 test 셀렉터를 구독하고 있음.
// 그리고 이 셀렉터는 atom 값을 참조중.
// test 셀렉터의 get 함수는 atom값을 반환함.
// 따라서 atom 값이 변경되면 test selector 값도 변경됨
// 변경된 값은 훅 안의 [BTCprice]로 설정됨.
// ////////다만 이과정에서 setbtcPrice가 호출되지 않음.
// setbtcprice로 btcprice를 수정함으로서 BTCPriceState atom를 업뎃
// btcprice 값의 변경은 setbtcprice의 함수가 아니라
// recoil 내부 매커니즘으로 발생
// 이 매커니즘은 atom을 구독하고 있는 모든 셀렉터를 다시 계산해
// 새로운 값을 반환하는 것
