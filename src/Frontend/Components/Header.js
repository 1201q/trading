import { useEffect, useRef } from "react";
import styled from "styled-components";

const Header = () => {
  const headerRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const yPos = headerRef.current.getBoundingClientRect().top;
  //     const isMobile = window.innerWidth < 768;
  //     let top = 0;

  //     if (isMobile) {
  //       // 모바일
  //       const topOffset = window.pageYOffset; // 제자리에서 얼마나 y축으로 스크롤됐나
  //       // console.log(yPos); //
  //       if (topOffset < 0) {
  //         // 헤더에 붙음
  //         headerRef.current.style.position = "fixed";
  //         headerRef.current.style.top = `${topOffset + 40}px`;
  //       } else {
  //         // 헤더에 떨어져 있음
  //         headerRef.current.style.position = "sticky";
  //       }
  //     } else {
  //       // pc
  //       headerRef.current.style.position = "sticky";
  //       headerRef.current.style.top = "40px";
  //     }

  //     // if (40 > yPos) {
  //     //   headerRef.current.style.position = "fixed";
  //     //   headerRef.current.style.top = "40px";
  //     // } else {
  //     //   headerRef.current.style.position = "sticky";
  //     // }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.addEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return <He ref={headerRef}>11111111111111</He>;
};

const He = styled.div`
  width: 100%;
  background-color: bisque;
  z-index: 5;
  position: sticky;
  height: 50px;
  top: 0;
`;

export default Header;
