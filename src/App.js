import Main from "./Frontend/Pages/Main";
import List from "./Frontend/Pages/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { authService } from "./firebase";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Main
function App() {
  const [login, setLogin] = useState();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        console.log("로그인되어있음");
        console.log(user);
        setLogin(true);
        setUserData(user);
      } else {
        console.log("꺼지셈");
        setLogin(false);
        setUserData(null);
      }
    });
  }, []);

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

  return (
    <QueryClientProvider client={queryClient}>
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
