import { useEffect, useState } from "react";
import styled from "styled-components";
import OrderbookPriceBar from "./OrderbookPriceBar";

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
        {/* <Header>
          <HogaList>{numberFormatter(orderbookSumInfo[1])}</HogaList>
          <HogaList>호가</HogaList>
          <HogaList>{numberFormatter(orderbookSumInfo[2])}</HogaList>
        </Header> */}
        {orderbook.map((data, i) => (
          <Hoga
            key={data[0]}
            onClick={() => {
              setOrderPrice(data[0]);
            }}
          >
            <HogaBar>
              {i > 14 ? (
                <OrderbookPriceBar
                  hoga={Number(data[1])}
                  color={"#FFEFF1"}
                  max={orderbookSumInfo[2]}
                  reverse={false}
                />
              ) : (
                <OrderbookPriceBar
                  hoga={Number(data[1])}
                  color={"#E3F2FF"}
                  max={orderbookSumInfo[1]}
                  reverse={false}
                />
              )}
              <p>{numberFormatter(data[1])}</p>
            </HogaBar>
            <HogaList border={data[0] === price && "0 0 0 1.5px #343A40 inset"}>
              {" "}
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
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
    background-color: #e9ecf1;
  }
`;

const HogaBar = styled.div`
  position: relative;
  width: 70%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2px;
  background-color: ${(props) => props.bgColor};
  box-shadow: ${(props) => props.border};
  color: #9e9e9e;
  p {
    font-weight: 300;
    margin: 0;
    margin-top: 7px;
    padding-left: 5px;
    position: absolute;
    z-index: 2;
    color: #60656b;
    font-size: 13px;
  }
`;

const HogaList = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  padding: 0px 4px;
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  box-shadow: ${(props) => props.border};
  color: #9e9e9e;
`;

const HogaPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
  color: ${(props) => props.fontColor};
`;

const HogaChangePrice = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  color: ${(props) => props.fontColor};
`;

export default Orderbook;
