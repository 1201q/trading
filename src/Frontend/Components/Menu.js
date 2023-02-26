import { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";

const Menu = () => {
  const [x, setX] = useState(21);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerRef.current.getBoundingClientRect().y;
      //header 40px

      if (headerHeight < 40) {
        headerRef.current.style.position = "fixed";
        headerRef.current.style.top = "40px";
      } else {
        headerRef.current.style.position = "sticky";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <MenuContainer ref={headerRef}>
      <MenuInner>
        <ul>
          <li onClick={() => setX(21)}>차트</li>
          <li onClick={() => setX(70)}>호가</li>
          <li onClick={() => setX(121)}>체결</li>
          <li onClick={() => setX(171)}>주문</li>
        </ul>
      </MenuInner>
      <UnderBarContainer>
        <UnderBar xx={x}></UnderBar>
      </UnderBarContainer>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  z-index: 20;
  position: sticky;
  top: 0;
  width: 100%;
  max-width: 450px;
  height: 30px;
`;

const MenuInner = styled.div`
  background-color: white;
  padding: 10px 20px 0px 20px;
  height: 100%;

  li {
    font-weight: 500;
    width: 50px;
    list-style: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  ul {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 0;
    margin: 0;
    margin-bottom: 4px;
    list-style: none;
  }
`;

const UnderBarContainer = styled.div`
  /* border-bottom: 1px solid #eff1f2; */
  box-shadow: 0 0 0 1px #eff1f2 inset;
  width: 100%;
`;

const UnderBar = styled.div`
  width: 26px;
  height: 1.3px;
  background-color: #424242;
  border-radius: 3px;
  transform: ${(props) => `translateX(${props.xx}px)`};
  transition: all 0.15s ease-in-out;
`;

export default Menu;
