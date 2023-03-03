import { useEffect, useState } from "react";
import { authService, dbService } from "../../firebase";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";
import {
  faRightToBracket,
  faUserPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Goo from "../icons/Google.js";
import { motion } from "framer-motion";

const LoginPopup = ({ modalOnOff, setModalOnOff, userData }) => {
  const [login, setLogin] = useState(); // 현재 로그인이 되어있는지
  const [signInOrCreateUser, setSignInOrCreateUser] = useState("in");

  const [id, setID] = useState("");
  const [pw, setPW] = useState("");

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  const emailLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, id, pw)
      .then((userData) => {
        console.log(userData);
      })
      .catch((error) => console.log(error));
  };

  const emailCreateUser = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    // 이메일 회원가입
    createUserWithEmailAndPassword(auth, id, pw)
      .then((userData) => {
        console.log(userData);
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <ModalContainer modalonoff={modalOnOff}>
      <Modal>
        <ModalLogin>
          <ModalHeader>
            {signInOrCreateUser === "in" ? "로그인" : "회원가입"}
          </ModalHeader>
          <ModalForm
            onSubmit={
              signInOrCreateUser === "in" ? emailLogin : emailCreateUser
            }
          >
            <ModalInput
              type="email"
              value={id}
              placeholder="이메일"
              onChange={(e) => {
                setID(e.target.value);
              }}
            />
            <ModalInput
              type="password"
              value={pw}
              placeholder="비밀번호"
              onChange={(e) => {
                setPW(e.target.value);
              }}
            />
            <LoginBtn
              type="submit"
              value={signInOrCreateUser === "in" ? "로그인" : "회원가입"}
            />
          </ModalForm>
          <ModalLoginOption>
            <GoogleLoginBtn
              onClick={() => {
                socialLogin();
              }}
            >
              <Goo></Goo>
            </GoogleLoginBtn>
            {/* <button onClick={signOut}>로그아웃</button> */}
            <GoogleLoginBtn
              onClick={() => {
                if (signInOrCreateUser === "in") {
                  setSignInOrCreateUser("create");
                } else if (signInOrCreateUser === "create") {
                  setSignInOrCreateUser("in");
                }
              }}
            >
              {signInOrCreateUser === "in" ? (
                <FontAwesomeIcon icon={faUserPlus} color="#424242" />
              ) : (
                <FontAwesomeIcon icon={faRightToBracket} color="#424242" />
              )}
            </GoogleLoginBtn>
            {userData && userData.email}
          </ModalLoginOption>
        </ModalLogin>
        <ModalOffBtn
          onClick={() => {
            setModalOnOff("false");
          }}
        >
          <FontAwesomeIcon icon={faX} color="#9BA1A8"></FontAwesomeIcon>
        </ModalOffBtn>
      </Modal>
    </ModalContainer>
  );
};

const ModalContainer = styled(motion.div)`
  display: ${(props) => (props.modalonoff === "false" ? "none" : "")};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(249, 249, 249, 0.85);
  z-index: 99;
`;

const Modal = styled.div`
  width: 80%;
  max-width: 420px;
  height: 300px;
  position: fixed;
  top: 50%;
  bottom: 0;
  right: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: white;
  padding: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalHeader = styled.p`
  margin: 0;
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ModalLogin = styled.div``;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalInput = styled.input`
  font-size: 15px;
  border: none;
  border-bottom: 1px solid #9ba1a8;
  background: none;
  margin-bottom: 5px;
  padding: 10px 5px;
`;

const LoginBtn = styled.input`
  cursor: pointer;
  font-size: 20px;
  border: none;
  background: #464ae3;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px 5px;
  border-radius: 5px;
  color: white;
  font-weight: 800;
`;

const ModalLoginOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoogleLoginBtn = styled.button`
  cursor: pointer;
  background-color: white;
  border: 2px solid #e6e9ec;
  padding: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin: 0px 10px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ModalOffBtn = styled.button`
  cursor: pointer;
  font-size: 20px;
  color: black;
  background: none;
  border: none;
  border-radius: 5px;
  position: absolute;
  right: 0;
  margin-right: 20px;
`;

export default LoginPopup;
