import styled, { keyframes, css } from "styled-components";
import {
  numberFormatter,
  percentageFormatter,
} from "../Context/FormatterContext";

const Header = ({ price, coinCode, changePrice }) => {
  return (
    <HeaderContainer>
      <Padding>
        <CoinName>{coinCode}</CoinName>
        <CoinPrice
          fontColor={
            changePrice[3] === "RISE"
              ? "#CD614D"
              : changePrice[3] === "FALL"
              ? "#3c87e5"
              : "#424242"
          }
        >
          {`${numberFormatter(price)}원`}{" "}
          {percentageFormatter(changePrice[1] * 100)}
        </CoinPrice>
      </Padding>
    </HeaderContainer>
  );
};

const Padding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    padding: 0;
    margin: 0;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: white;
  max-width: 450px;
  width: 100vw;
  z-index: 10; //test
  top: 0;
  height: 40px;
`;

const CoinName = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: #60656b;
`;

const CoinPrice = styled.p`
  font-size: 11px;
  font-weight: 500;
  color: ${(props) => props.fontColor};
`;

export default Header;
