import styled from "styled-components";

const WalletInfo = () => {
  return (
    <WalletInfoContainer>
      <Header Hbold="200" HfontSize={"18px"}>
        총 보유자산
      </Header>
      <Header Hbold="600" HfontSize={"32px"}>
        1원
      </Header>
      <Summary>
        <SummaryBox>
          <SummaryContainer>
            <SummaryHeader>KRW</SummaryHeader>
            <SummaryMymoney>109,000,000</SummaryMymoney>
          </SummaryContainer>
        </SummaryBox>
        <SummaryBox>
          <SummaryContainer>
            <SummaryHeader>Coin</SummaryHeader>
            <SummaryMymoney>0</SummaryMymoney>
          </SummaryContainer>
        </SummaryBox>
      </Summary>
    </WalletInfoContainer>
  );
};

const WalletInfoContainer = styled.div`
  padding: 20px;
  padding-top: 50px;
  height: 200px;
  background-color: #464ae3;
`;

const Header = styled.p`
  margin: 0;
  color: white;
  font-size: ${(props) => props.HfontSize};
  font-weight: ${(props) => props.Hbold || 600};
`;

const Summary = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const SummaryBox = styled.div`
  width: 48%;
  height: 100px;
  background-color: #f2f7ff;
  border-radius: 10px;
`;

const SummaryContainer = styled.div`
  padding: 15px;
`;

const SummaryHeader = styled.p`
  width: max-content;
  background-color: #464ae3;
  color: WHITE;
  padding: 5px;
  font-size: 12px;
  border-radius: 5px;
  margin: 0;
  padding: 2px 7px;
`;

const SummaryMymoney = styled.p`
  margin-top: 10px;
  font-size: 1.4rem;
  font-weight: 600;
`;

export default WalletInfo;
