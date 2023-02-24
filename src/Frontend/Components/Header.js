import { useEffect, useRef } from "react";
import styled from "styled-components";

const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const yPos = headerRef.current.getBoundingClientRect().y;

      if (40 > yPos) {
        // 45 헤더 높이
        headerRef.current.style.position = "fixed";
        headerRef.current.style.top = "41px";
      } else {
        headerRef.current.style.position = "sticky";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return <He ref={headerRef}>11111111111111</He>;
};

const He = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
  position: ${(props) => props.positionType};
  position: sticky;
  background-color: bisque;

  z-index: 5;
`;

export default Header;
