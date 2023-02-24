import styled from "styled-components";

const NavBar = ({ orderPrice }) => {
  return (
    <Nav style={{ display: !orderPrice && "none" }}>
      <NN>
        <Btn bgColor="#E12343">매수</Btn>
        <Btn bgColor="#3182f6">매도</Btn>
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
  height: 70px;
`;

const NN = styled.div`
  display: flex;
  background-color: white;
  border: mone;
  width: 450px;
  margin: 0px 0px 0px 0px;
  padding: 0px 10px;
  padding-bottom: 15px;
`;

const Btn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5px;
  border-radius: 12px;
  font-size: 17px;
  color: white;
  background-color: ${(props) => props.bgColor};
`;

export default NavBar;
