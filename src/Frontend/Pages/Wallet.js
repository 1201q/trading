import BottomTab from "../Components/BottomTab";
import styled from "styled-components";
import { motion } from "framer-motion";
import WalletInfo from "../Components/WalletInfo";
import WalletDetail from "../Components/WalletDetail";
import LoginPopup from "../Components/LoginPopup";
import { useEffect, useState } from "react";

const Wallet = ({ userData, tab, setTab }) => {
  const [modalOnOff, setModalOnOff] = useState("false");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Center>
      <WalletContainer
      // initial={{ opacity: 0.7, x: -10 }}
      // animate={{ opacity: 1, x: 0 }}
      // exit={{ opacity: 0, x: -10 }}
      // transition={{
      //   duration: 0.2,
      // }}
      >
        <WalletInfo />
      </WalletContainer>
      <WalletDetailContainer>
        <WalletDetail />
        <button
          onClick={() => {
            setModalOnOff("true");
          }}
        >
          로그인
        </button>
        <LoginPopup
          userData={userData}
          modalOnOff={modalOnOff}
          setModalOnOff={setModalOnOff}
        />
      </WalletDetailContainer>

      <BottomTab tab={tab} setTab={setTab} />
    </Center>
  );
};

const Center = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 450px;
  width: 100vw;
  height: 100%;
  background-color: #ebeff0;
`;

const WalletContainer = styled(motion.div)``;

const WalletDetailContainer = styled.div`
  height: 100vh;
`;

export default Wallet;
