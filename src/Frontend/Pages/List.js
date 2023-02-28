import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const List = () => {
  const [coinList, setCoinList] = useState([]);

  const [coinFetchData, setCoinFetchData] = useState();
  const [coinDataArr, setCoinDataArr] = useState(Array(150).fill(null));

  const wsURL = "wss://api.upbit.com/websocket/v1";
  const wsPrice = useRef(null);

  useEffect(() => {
    if (coinList.length === 0) {
      getCoinList();
    }

    // if (coinList.length !== 0) {
    //   getCoinListPrice();
    //   getFetch();
    // }
  }, [coinList]);

  // useEffect(() => {
  //   const tmpArr = [...coinDataArr];
  //   coinList.forEach((list, i) => {
  //     if (list[0].includes(coinFetchData?.code)) {
  //       tmpArr[i] = coinFetchData.trade_price;
  //     }
  //   });
  //   setCoinDataArr(tmpArr);
  // }, [coinFetchData]);

  async function getCoinList() {
    let arr = [];
    let t = await axios
      .get("https://api.upbit.com/v1/market/all")
      .then((res) => res.data);

    t.filter((coin) => coin.market.includes("KRW")).map((data) => {
      arr.push([data.market, data.korean_name]);
    });
    console.log(arr);
    setCoinList(arr);
  }

  // function getCoinListPrice() {
  //   if (wsPrice.current !== null) {
  //     if (wsPrice.current.readyState === 1) {
  //       wsPrice.current.close();
  //       console.log("check");
  //     }
  //   }

  //   try {
  //     wsPrice.current = new WebSocket(wsURL);
  //     wsPrice.current.onopen = () => {
  //       wsPrice.current.send(
  //         `[{"ticket" : "2"}, {"type" : "ticker","codes": [${coinList}]}]`
  //       );
  //     };
  //     wsPrice.current.onmessage = async (e) => {
  //       const { data } = e;
  //       const text = await new Response(data).json();

  //       setCoinFetchData(text);
  //     };
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // async function getFetch() {
  //   let arr = [];
  //   let i = 0;

  //   const fetchData = async () => {
  //     if (i < 10) {
  //       await axios
  //         .get(`https://api.upbit.com/v1/ticker?markets=${coinList[i][0]}`)
  //         .then((res) => {
  //           arr[i] = res.data[0].trade_price;
  //         });
  //       i++;
  //       setTimeout(fetchData, 100);
  //       setCoinDataArr(arr);
  //     } else if (i >= 10 && i < coinList.length) {
  //       await axios
  //         .get(`https://api.upbit.com/v1/ticker?markets=${coinList[i][0]}`)
  //         .then((res) => {
  //           arr[i] = res.data[0].trade_price;
  //         });

  //       i++;
  //       setTimeout(fetchData, 200);
  //       setCoinDataArr(arr);
  //     }

  //     if (i === coinList.length) {
  //       setCoinDataArr(arr);
  //     }
  //   };
  //   fetchData();
  // }

  return (
    <Center>
      <ListContainer>
        {coinList.map((coin, i) => (
          <Line>
            <div>
              <Link to={`/exchange/${coin[0]}`} key={coin[0]}>
                <CoinKRnameBtn>{coin[1]}</CoinKRnameBtn>
              </Link>
              <CoinEnname>{coin[0]}</CoinEnname>
            </div>
          </Line>
        ))}
      </ListContainer>
    </Center>
  );
};
const Center = styled.div`
  display: flex;
  justify-content: center;
  max-width: 450px;
  width: 100vw;
`;

const ListContainer = styled.div`
  margin: 0px 0px;
  padding: 10px 15px 15px 15px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;

const CoinKRnameBtn = styled.button`
  border: none;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  background-color: white;
  padding: 0;
`;
const CoinEnname = styled.div`
  font-weight: 300;
`;

const Price = styled.div`
  display: flex;
`;
export default List;
