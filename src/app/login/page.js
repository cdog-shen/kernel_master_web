"use client";
import {
  NormalInput,
  CommonButton,
  NormalCheckBox,
} from "@/components/input/input";
import { LoginFetch } from "@/fetchs/control/user";
import { BingDaily } from "@/fetchs/control/common";
import { Alert, useAlert } from "@/components/alert/alert";
import { Divider } from "@/components/containers/dividers";
import { useState, useEffect, use } from "react";

export default function App() {
  const { isVisible, message, showAlert, hideAlert } = useAlert();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [bingDaily, setBingDaily] = useState("https://dailybing.com/api/v1");

  // useEffect(() => {
  //   BingDaily().then((resp) => {
  //     if (resp.code != 200) {
  //       showAlert("获取背景图片失败.");
  //       console.log(resp);
  //     } else {
  //       setBingDaily(resp.data);
  //     }
  //   });
  // }, []);

  const handleLogin = async (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为
    try {
      const resp = await LoginFetch(username, password, rememberMe);
      if (resp.code != 200) {
        console.log(error);
        showAlert("登陆失败.");
      } else {
        localStorage.setItem(
          "JWT",
          `${resp.data.token_type} ${resp.data.token}`
        );
        localStorage.setItem("uid", Number(resp.data.uid));
        window.location.href = "/control/home";
      }
    } catch (error) {
      console.log(error);
      showAlert("登陆失败.");
    }
  };
  console.log(bingDaily);

  return (
    <div
      className={`flex p-5 relative min-h-screen w-full justify-center items-center bg-[rgba(30,58,95,1)] bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${bingDaily})` }}
    >
      <div className="flex h-auto">
        {/* login form */}
        <div className="flex-1 w-[30%] bg-white/80 p-5 shadow-lg rounded-l-3xl">
          <div className="max-w-[300px] mx-auto">
            <img
              src="/km_logo.png"
              alt="KM Logo"
              className="w-[100px] mb-5 rounded-3xl mx-auto"
            />
            <form onSubmit={handleLogin}>
              <NormalInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <NormalInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <NormalCheckBox
                label="Remember Me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                divStyle={{ textAlign: "right" }}
                labelStyle={{ color: "red" }}
              />
              <a
                className="block text-center mt-2.5 text-[#ff4545] no-underline"
                onClick={() => {
                  console.log("nothing there");
                }}
              >
                Forgot Password?
              </a>
              <CommonButton label="Log In" type="submit" />
              <a
                className="block text-center mt-2.5 text-[#ff4545] no-underline"
                onClick={() => {
                  console.log("nothing there");
                }}
              >
                Register New User?
              </a>
            </form>
            {isVisible && <Alert message={message} onClose={hideAlert} />}
          </div>
        </div>

        {/* welcome message */}
        <div className="flex-1 w-[60%] bg-[rgba(30,58,95,0.8)] p-5 text-white relative rounded-r-3xl">
          <div className="max-w-[600px] mx-auto">
            <h1 className="mb-5">
              Welcome to <b>Kernel master</b>
            </h1>
            <Divider />
            <main>
              <p className="mb-5">
                It is an operating platform for managing multi-region server
                assets.
              </p>
              <p className="mb-5">Powered by:</p>
              <p className="mb-5">Rust acitx as backend API</p>
              <p className="mb-5">React Next.JS as frontend</p>
              <p className="mb-5">MYSQL as database.</p>
              <p className="mb-5">--Cdog Shen</p>
              <a
                href="https://github.com/cdog-shen/kernel_master_ws"
                className="text-[#ff4545] no-underline"
              >
                Read more...
              </a>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
