import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

export const percentageFormatter = (n) => {
  if (n > 0) {
    return `+${n.toFixed(2)}%`;
  } else if (n < 0) {
    return `${n.toFixed(2)}%`;
  } else if (n === 0) {
    return ` ${n.toFixed(2)}%`;
  }
};

export const numberFormatter = (n) => {
  let newNumber = n;

  if (Math.abs(n) >= 1 && Math.abs(n) < 100) {
    newNumber = n.toFixed(2).toLocaleString();
  } else if (Math.abs(n) >= 100) {
    newNumber = Math.floor(n).toLocaleString();
  } else if (Math.abs(n) < 1) {
    newNumber = n.toFixed(4).toLocaleString();
  }

  return newNumber;
};

export const volumeFormatter = (n) => {
  let tmp = (n / 1000000).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });

  return `${tmp}백만`;
};

//체결창 가격
export const formatter = (n) => {
  return n.toLocaleString();
};
