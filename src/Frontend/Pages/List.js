import { Link } from "react-router-dom";
import axios from "axios";
import LoginPopup from "../Components/LoginPopup";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import BottomTab from "../Components/BottomTab";
import { motion } from "framer-motion";

const List = ({ userData, setTab, tab }) => {
  const [coinList, setCoinList] = useState([]);
  const [coinPriceArr, setCoinPriceArr] = useState([]);
  const [coinPriceArrReady, setCoinPriceArrReady] = useState(false);
  const [modalOnOff, setModalOnOff] = useState("false");

  const wsURL = "wss://api.upbit.com/websocket/v1";
  const wsPrice = useRef(null);

  useEffect(() => {
    if (coinList.length === 0) {
      getCoinList();
    }

    if (coinList.length !== 0) {
      getCoinPrice();
    }
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
    console.log(arr);
  }

  function getCoinPrice() {
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
          `[{"ticket" : "2"}, {"type" : "ticker","codes": [${coinList}]}]`
        );
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

        tmp.sort((a, b) => b[5] - a[5]);

        setCoinPriceArr(tmp);
        setCoinPriceArrReady(true);
      };
    } catch (e) {
      console.log(e);
    }
  }

  // const numberFormatter = (n) => {
  //   let newNumber = n;
  //   if (n >= 1 && n < 100) {
  //     newNumber = n.toFixed(2).toLocaleString();
  //   } else if (n >= 100) {
  //     newNumber = Math.floor(n).toLocaleString();
  //   } else if (n < 1) {
  //     newNumber = n.toFixed(4).toLocaleString();
  //   }
  //   return newNumber;
  // };

  const percentageFormatter = (n) => {
    if (n > 0) {
      return `+${n.toFixed(2)}%`;
    } else if (n < 0) {
      return `${n.toFixed(2)}%`;
    } else if (n === 0) {
      return ` ${n.toFixed(2)}%`;
    }
  };

  const numberFormatter = (n) => {
    let newNumber = n;

    if (Math.abs(n) >= 1 && Math.abs(n) < 100) {
      newNumber = n.toFixed(2).toLocaleString();
    } else if (Math.abs(n) >= 100) {
      newNumber = Math.floor(n).toLocaleString();
    } else if (Math.abs(n) < 1) {
      newNumber = n.toFixed(4).toLocaleString();
    }

    return newNumber;
  };

  // 백만
  const volumeFormatter = (n) => {
    let tmp = (n / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });

    return `${tmp}백만`;
  };

  return (
    <Center>
      <button
        onClick={() => {
          setModalOnOff("true");
        }}
      >
        로그인
      </button>
      <LoginPopup
        userData={userData}
        modalOnOff={modalOnOff}
        setModalOnOff={setModalOnOff}
      />
      {coinPriceArrReady && (
        <ListContainer
          initial={{ opacity: 0.7, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{
            duration: 0.2,
          }}
        >
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
  /* box-shadow: 0 0 0 1px #eff1f2 inset; */
  border-bottom: 1px solid #ebeff0;
`;

const LineContainer = styled.div`
  display: flex;
  padding: 10px 10px;
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
