import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const List = () => {
  const [coinList, setCoinList] = useState([]);
  useEffect(() => {
    getCoinList();
  }, []);

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

  return (
    <Center>
      <ListContainer>
        {coinList.map((coin) => (
          <Line>
            <Link to={`/exchange/${coin[0]}`} key={coin[0]}>
              <button>{coin[1]}</button>
            </Link>
          </Line>
        ))}
      </ListContainer>
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

const ListContainer = styled.div`
  margin: 0px 0px;
  padding: 10px 15px 15px 15px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #eeeeee;
  width: 87%;
  max-width: 420px;
  height: 620px;
  display: flex;
  flex-direction: column;

  overflow-y: auto;

  button {
    border: none;

    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }
`;

const Line = styled.div`
  border: 1px solid black;
  margin-bottom: 5px;
`;
export default List;
