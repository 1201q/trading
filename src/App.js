import Main from "./Frontend/Pages/Main";
import List from "./Frontend/Pages/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { authService, dbService } from "./firebase";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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

const queryClient = new QueryClient();

//https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0
// Main
function App() {
  const [login, setLogin] = useState();
  const [userData, setUserData] = useState(null);

  const [id, setID] = useState("");
  const [pw, setPW] = useState("");

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

  const emailLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    // // 이메일 회원가입
    // createUserWithEmailAndPassword(auth, id, pw)
    //   .then((userData) => {
    //     console.log(userData);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // 로그인
    signInWithEmailAndPassword(auth, id, pw)
      .then((userData) => {
        console.log(userData);
      })
      .catch((error) => console.log(error));
  };

  const socialLogin = async () => {
    try {
      if (!login) {
        const provider = new GoogleAuthProvider();
        await new signInWithRedirect(authService, provider);
        const result = await getRedirectResult(authService);
        console.log(result);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const signOut = async () => {
    await authService.signOut();
    return;
  };

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
    <QueryClientProvider client={queryClient}>
      <form onSubmit={emailLogin}>
        <input
          type="email"
          value={id}
          onChange={(e) => {
            setID(e.target.value);
          }}
        />
        <input
          type="password"
          value={pw}
          onChange={(e) => {
            setPW(e.target.value);
          }}
        />
        <input type="submit" value="회원가입" />
      </form>
      <button
        onClick={() => {
          socialLogin();
        }}
      >
        1
      </button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
      {userData && userData.email}
      <button
        onClick={() => {
          update();
        }}
      >
        저장소
      </button>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<List />}></Route>
            <Route path="/exchange" element={<Main />}></Route>
            <Route path="/exchange/:param_coincode" element={<Main />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
