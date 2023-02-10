import { useEffect, useState } from "react";
import styled from "styled-components";
import Barchart from "./BarChart";

const Orderbook = ({
  orderbook,
  orderbookSumInfo,
  price,
  changePrice,
  setOrderPrice,
}) => {
  const numberFormatter = (n) => {
    let newNumber = n;
    if (n >= 1 && n < 100) {
      newNumber = n.toFixed(2).toLocaleString();
    } else if (n >= 100) {
      newNumber = Math.floor(n).toLocaleString();
    } else if (n < 1) {
      newNumber = n.toFixed(4).toLocaleString();
    }
    return newNumber;
  };

  const percentageFormatter = (n) => {
    if (n > 0) {
      return `+${n.toFixed(2)}%`;
    } else if (n < 0) {
      return `${n.toFixed(2)}%`;
    } else if (n === 0) {
      return ` ${n.toFixed(2)}%`;
    }
  };

  return (
    <Center>
      <OrderbookContainer>
        <Header>
          <HogaList>{numberFormatter(orderbookSumInfo[1])}</HogaList>
          <HogaList>호가</HogaList>
          <HogaList>{numberFormatter(orderbookSumInfo[2])}</HogaList>
        </Header>
        {orderbook.map((data, i) => (
          <Hoga
            key={data[0]}
            onClick={() => {
              setOrderPrice(data[0]);
            }}
          >
            <HogaList bgColor={i > 14 ? "" : "#ecf3fa"}>
              {i <= 14 ? <p>{numberFormatter(data[1])}</p> : " "}
              {i <= 14 ? (
                <Barchart
                  hoga={Number(data[1])}
                  color={"#d0dff3"}
                  max={orderbookSumInfo[1]}
                  reverse={true}
                />
              ) : (
                " "
              )}
            </HogaList>
            <HogaList
              bgColor={i > 14 ? "#fbf1ef" : "#ecf3fa"}
              border={data[0] === price && "0 0 0 1.5px #343A40 inset"}
            >
              <HogaPrice
                fontColor={
                  ((data[0] - changePrice[0]) / changePrice[0]) * 100 < 0
                    ? "#3c87e5"
                    : ((data[0] - changePrice[0]) / changePrice[0]) * 100 === 0
                    ? "#343A40"
                    : "#CD614D"
                }
              >
                {numberFormatter(data[0])}
              </HogaPrice>
              <HogaChangePrice
                fontColor={
                  ((data[0] - changePrice[0]) / changePrice[0]) * 100 < 0
                    ? "#3c87e5"
                    : ((data[0] - changePrice[0]) / changePrice[0]) * 100 === 0
                    ? "#343A40"
                    : "#CD614D"
                }
              >
                {percentageFormatter(
                  ((data[0] - changePrice[0]) / changePrice[0]) * 100
                )}
              </HogaChangePrice>
            </HogaList>
            <HogaList bgColor={i <= 14 ? "" : "#fbf1ef"}>
              {i > 14 ? (
                <Barchart
                  hoga={Number(data[1])}
                  color={"#F4DbD6"}
                  max={orderbookSumInfo[2]}
                  reverse={false}
                />
              ) : (
                " "
              )}
              {i > 14 ? <p>{numberFormatter(data[1])}</p> : " "}
            </HogaList>
          </Hoga>
        ))}
      </OrderbookContainer>
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

const OrderbookContainer = styled.div`
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

  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  width: 100%;
  justify-content: space-around;
  display: flex;
  background-color: ${(props) => props.bgColor};
  margin-bottom: 5px;
`;

const Hoga = styled.div`
  width: 100%;
  justify-content: space-around;
  display: flex;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
    background-color: #e9ecf1;
  }
`;

const HogaList = styled.div`
  position: relative;
  width: 32%;
  height: 27px;
  display: flex;
  justify-content: center;
  margin: 1px;
  margin-bottom: 4px;
  padding-top: 4px;
  font-size: 18px;
  font-weight: 300;
  background-color: ${(props) => props.bgColor};
  box-shadow: ${(props) => props.border};
  color: #9e9e9e;
  p {
    font-weight: 300;
    margin: 0;
    margin-top: 4px;
    position: absolute;
    z-index: 2;
    color: #60656b;
    font-size: 12px;
  }
`;

const HogaPrice = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  padding-top: 4px;
  margin-left: 15px;
  color: ${(props) => props.fontColor};
`;

const HogaChangePrice = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-end;
  text-align: center;
  font-size: 5px;
  margin-right: 5px;
  padding-top: 5px;
  color: ${(props) => props.fontColor};
`;

export default Orderbook;
