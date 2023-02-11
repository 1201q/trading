import styled from "styled-components";
const CoinInfo = ({ price, changePrice, morePriceInfo }) => {
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
      <CoinInfoContainer>
        <Name>KRW-BTC</Name>
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
      </CoinInfoContainer>
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

const CoinInfoContainer = styled.div`
  margin: 0px 0px;
  padding: 10px 15px 15px 15px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #eeeeee;
  width: 87%;
  max-width: 420px;
  height: 100%;
  display: flex;
  flex-direction: column;
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
