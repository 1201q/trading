import styled from "styled-components";
import OrderbookPriceBar from "./OrderbookPriceBar";

const Orderbook = ({
  orderbook,
  orderbookSumInfo,
  price,
  changePrice,
  orderPrice,
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
      return ` +${n.toFixed(2)}%`;
    }
  };

  return (
    <OrderbookContainer>
      <Padding>
        {orderbook.map((data, i) => (
          <Hoga
            key={data[0]}
            onClick={() => {
              if (data[0] !== orderPrice) {
                setOrderPrice(data[0]);
              } else {
                setOrderPrice(null);
              }
            }}
            selectBgColor={data[0] === orderPrice ? "#e9ecf1" : ""}
            selectOpacity={data[0] === orderPrice ? "1" : "1"}
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
              <HogaChangePercent
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
              </HogaChangePercent>
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
      </Padding>
    </OrderbookContainer>
  );
};
const Padding = styled.div`
  padding: 0px 20px;
`;

const OrderbookContainer = styled.div`
  margin: 0px 0px;
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Hoga = styled.div`
  width: 100%;
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  background-color: ${(props) => props.selectBgColor};

  &:hover {
    cursor: pointer;
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
    font-size: 12px;
  }

  @media screen and (max-width: 500px) {
    width: 60%;
  }
`;

const HogaList = styled.div`
  width: 30%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  box-shadow: ${(props) => props.border};
  color: #9e9e9e;

  @media screen and (max-width: 500px) {
    width: 40%;
  }
`;

const HogaPrice = styled.div`
  text-align: justify;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 5px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.fontColor};
`;

const HogaChangePercent = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  color: ${(props) => props.fontColor};
`;

export default Orderbook;
