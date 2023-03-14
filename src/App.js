import CoinDetail from "./Frontend/Pages/CoinDetail";
import CoinList from "./Frontend/Pages/CoinList";
import Wallet from "./Frontend/Pages/Wallet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authService, dbService } from "./firebase";
import {
  addDoc,
  doc,
  query,
  collection,
  onSnapshot,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

//https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0
// Main

function App() {
  const [login, setLogin] = useState();
  const [userData, setUserData] = useState(null);

  const [tab, setTab] = useState(() => {
    if (window.location.pathname === "/wallet") {
      return "wallet";
    } else if (window.location.pathname === "/") {
      return "exchange";
    } else {
      return "wallet";
    }
  });

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        setLogin(true);
        setUserData(user);
      } else {
        setLogin(false);
        setUserData(null);
      }
    });

    // //전부 가져옴
    // onSnapshot(query(collection(dbService, "siba")), (q) => {
    //   q.forEach((doc) => {
    //     console.log(doc.data());
    //   });
    // });

    // 특정한 유저만 가져옴
    onSnapshot(doc(dbService, "siba", "kbvqheO4hkTccxvYw353"), (doc) => {
      // console.log(doc.data());
    });

    window.addEventListener("popstate", handleGoBackException);
    return () => {
      window.addEventListener("popstate", handleGoBackException);
    };
  }, []);

  function handleGoBackException() {
    if (window.location.pathname === "/") {
      setTab("exchange");
    } else if (window.location.pathname === "/wallet") {
      setTab("wallet");
    }
  }

  async function add() {
    await addDoc(collection(dbService, "siba"), {
      text: "sibad",
    });
  }

  async function update() {
    await updateDoc(doc(dbService, "siba", "kbvqheO4hkTccxvYw353"), {
      text: "업뎃dd ",
    });
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
            <Route
              path="/"
              element={
                <CoinList userData={userData} setTab={setTab} tab={tab} />
              }
            ></Route>
            <Route
              path="/wallet"
              element={<Wallet userData={userData} setTab={setTab} tab={tab} />}
            ></Route>
            <Route path="/exchange" element={<CoinDetail />}></Route>
            <Route
              path="/exchange/:param_coincode"
              element={<CoinDetail />}
            ></Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;
