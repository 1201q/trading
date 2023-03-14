import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  numberFormatter,
  percentageFormatter,
  volumeFormatter,
} from "../Context/FormatterContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CoinListComponents = ({ coin, loading }) => {
  return (
    <Line>
      {!loading ? (
        <LineContainer>
          <HeaderBox>
            <Link to={`/exchange/${coin[0]}`} key={coin[0]}>
              <CoinKRnameBtn>{coin[1]}</CoinKRnameBtn>
            </Link>
            <CoinEnname>{coin[0]}</CoinEnname>
          </HeaderBox>
          <Box
            fontColor={
              coin[3] > 0 ? "#CD614D" : coin[3] < 0 ? "#3c87e5" : "#424242"
            }
          >
            <div>{numberFormatter(coin[2])}</div>
          </Box>
          <Box
            fontColor={
              coin[3] > 0 ? "#CD614D" : coin[3] < 0 ? "#3c87e5" : "#424242"
            }
          >
            <div>{numberFormatter(coin[3])}</div>
            <div>{percentageFormatter(coin[4] * 100)}</div>
          </Box>
          <Box>{coin[5] && volumeFormatter(coin[5])}</Box>
        </LineContainer>
      ) : (
        <LoadingContainer>
          <LoadingBox Boxwidth={"25%"}>
            <Skeleton count={2} height={16} duration={0.2} />
          </LoadingBox>
          <LoadingBox Boxwidth={"20%"}>
            <Skeleton count={1} height={20} duration={0.2} />
          </LoadingBox>
          <LoadingBox Boxwidth={"20%"}>
            <Skeleton count={2} height={14} duration={0.2} />
          </LoadingBox>
          <LoadingBox Boxwidth={"20%"}>
            <Skeleton count={1} height={30} duration={0.2} />
          </LoadingBox>
        </LoadingContainer>
      )}
    </Line>
  );
};

const Line = styled.div`
  width: 100%;
  height: 54px;
  /* box-shadow: 0 0 0 1px #eff1f2 inset; */
  border-bottom: 1px solid #ebeff0;
`;

const LineContainer = styled.div`
  display: flex;
  padding: 10px 20px;
`;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const CoinKRnameBtn = styled.button`
  border: none;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
  cursor: pointer;
  background-color: white;
  color: #424242;
  padding: 0;
`;

const CoinEnname = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #aaaaaa;
`;

const HeaderBox = styled.div`
  width: 25%;
`;
const LoadingBox = styled.div`
  width: ${(props) => props.Boxwidth};
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 25%;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.fontColor};
`;
export default CoinListComponents;
