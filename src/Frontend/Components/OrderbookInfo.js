import OrderbookBar from "./OrderbookBar";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const OrderbookInfo = ({
  setMenuSelect,
  orderbookSumInfo,
  orderBookBarAnimationControl,
}) => {
  return (
    <OrderbookInfoContainer>
      <Padding>
        <Header
          onClick={() => {
            setMenuSelect("orderbook");
          }}
        >
          호가
          <FontAwesomeIcon
            icon={faAngleRight}
            color={"#AAAAAA"}
            style={{ paddingRight: "5px" }}
          />
        </Header>
        <OrderbookBar
          orderbookSumInfo={orderbookSumInfo}
          orderBookBarAnimationControl={orderBookBarAnimationControl}
        />
      </Padding>
    </OrderbookInfoContainer>
  );
};

const Padding = styled.div`
  padding: 0px 15px;
`;

const OrderbookInfoContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0px 0px;
  border-radius: 10px;
  background-color: white;

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
`;

export default OrderbookInfo;
