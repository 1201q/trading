import BottomTab from "../Components/BottomTab";
import styled from "styled-components";
import { motion } from "framer-motion";
import List from "./List";

const Wallet = ({ tab, setTab }) => {
  return (
    <div>
      <WalletContainer
        initial={{ opacity: 0.7, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{
          duration: 0.2,
        }}
      >
        테스트
      </WalletContainer>

      <BottomTab tab={tab} setTab={setTab} />
    </div>
  );
};

const WalletContainer = styled(motion.div)``;

export default Wallet;
