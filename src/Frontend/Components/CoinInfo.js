import styled from "styled-components";
import {
  numberFormatter,
  percentageFormatter,
} from "../Context/FormatterContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CoinInfo = ({ coinCode, price, changePrice, morePriceInfo }) => {
  return (
    <CoinInfoContainer>
      <Padding>
        <Name>{coinCode}</Name>
        <Info
          fontColor={
            changePrice[3] === "RISE"
              ? "#CD614D"
              : changePrice[3] === "FALL"
              ? "#3c87e5"
              : "#424242"
          }
        >
          <PriceInfo fSize="27px">{numberFormatter(price)}</PriceInfo>
          <PriceInfo fSize="12px" fMarginTop="10px">
            {percentageFormatter(changePrice[1] * 100)}
          </PriceInfo>

          <PriceInfo fSize="12px" fMarginTop="10px">
            {numberFormatter(changePrice[2])}
          </PriceInfo>
        </Info>
        <MoreInfo>
          <div>
            <MoreInfoHeader>고가</MoreInfoHeader>
            <MoreInfoData fontColor="#CD614D">
              {numberFormatter(morePriceInfo[0])}
            </MoreInfoData>
          </div>
          <div>
            <MoreInfoHeader>저가</MoreInfoHeader>
            <MoreInfoData fontColor="#3c87e5">
              {numberFormatter(morePriceInfo[1])}
            </MoreInfoData>
          </div>
          <div>
            <MoreInfoHeader>거래량</MoreInfoHeader>
            <MoreInfoData>{numberFormatter(morePriceInfo[2])}</MoreInfoData>
          </div>
          <div>
            <MoreInfoHeader>거래대금 (KRW)</MoreInfoHeader>
            <MoreInfoData>{numberFormatter(morePriceInfo[3])}</MoreInfoData>
          </div>
        </MoreInfo>
        {/* {candle.length > 1 ? <LineChart candle={candle} price={price} /> : ""} */}
      </Padding>
    </CoinInfoContainer>
  );
};

const Padding = styled.div`
  padding: 0px 20px;
`;

const CoinInfoContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 100%;
  height: 88px;
  overflow-y: auto;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.fontColor};
  font-weight: 600;
`;

const MoreInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.fontColor};
  font-weight: 600;
  margin-top: 5px;
`;

const PriceInfo = styled.p`
  margin: 0;
  margin-right: 5px;
  margin-top: ${(props) => props.fMarginTop};
  font-size: ${(props) => props.fSize};
`;

const MoreInfoHeader = styled.div`
  font-size: 13px;
  color: ${(props) => props.fontColor};
  margin-right: 2px;
  font-weight: 300;
`;

const MoreInfoData = styled.div`
  font-size: 13px;
  color: ${(props) => props.fontColor};
  margin-right: 5px;
  font-weight: 600;
`;

export default CoinInfo;
