import Main from "./Frontend/Pages/Main";
import List from "./Frontend/Pages/List";
import Wallet from "./Frontend/Pages/Wallet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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

const queryClient = new QueryClient();

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
      console.log(doc.data());
    });
  }, []);

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
              element={<List userData={userData} setTab={setTab} tab={tab} />}
            ></Route>
            <Route
              path="/wallet"
              element={<Wallet setTab={setTab} tab={tab} />}
            ></Route>
            <Route path="/exchange" element={<Main />}></Route>
            <Route path="/exchange/:param_coincode" element={<Main />}></Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;
