import styled from "styled-components";
import { faCoins, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const BottomTab = ({ tab, setTab }) => {
  return (
    <Nav>
      <NN>
        <StyledLink
          to="/"
          tabcolor={tab === "exchange" ? "white" : "rgba(215, 226, 254, 0.5)"}
        >
          <Menu
            onClick={() => {
              setTab("exchange");
            }}
          >
            <FontAwesomeIcon icon={faCoins} />
            <p>거래소</p>
          </Menu>
        </StyledLink>
        <StyledLink
          to="/wallet"
          tabcolor={tab === "wallet" ? "white" : "rgba(215, 226, 254, 0.5)"}
        >
          <Menu
            onClick={() => {
              setTab("wallet");
            }}
          >
            <FontAwesomeIcon icon={faUser} />
            <p>내정보</p>
          </Menu>
        </StyledLink>
      </NN>
    </Nav>
  );
};

const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 3;
  height: 45px;
`;

const NN = styled.div`
  display: flex;
  background-color: #464ae3;
  border: 1px solid #464ae3;
  width: 100%;
  max-width: 450px;
  margin: 0px 0px 0px 0px;
  padding-bottom: 0px;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0px;
  border-radius: 12px;
  font-weight: 800;
  color: ${(props) => props.tabcolor};
  text-decoration: none;
  p {
    margin: 0;
    margin-top: 3px;
    font-size: 13px;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default BottomTab;
