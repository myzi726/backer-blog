"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [capsLockFlag, setCapsLockFlag] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("아이디 또는 비밀번호를 입력해주세요");
      return;
    }
    try {
      const res = await fetch("/api/session/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();
      console.log("res", data);

      if (res.ok && data.message === "로그인 성공") {
        alert("로그인 성공");
        router.push("/");
      }
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };

  const checkCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const capsLock = e.getModifierState("CapsLock");
    setCapsLockFlag(capsLock);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold mb-5">Login</div>
      <div className="flex flex-col gap-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="아이디"
          className="border-2 border-gray-300 p-2 rounded-md w-72"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => checkCapsLock(e)}
          type="password"
          placeholder="비밀번호"
          className="border-2 border-gray-300 p-2 rounded-md"
        />
        <span className="text-sm text-red-500">
          {capsLockFlag ? "Caps Lock이 켜져 있습니다" : ""}
        </span>
        <button
          className="bg-black rounded-md p-3 text-white font-bold text-lg"
          onClick={() => handleLogin()}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
