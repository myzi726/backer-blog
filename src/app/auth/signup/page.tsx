"use client";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [isConfirmPwd, setIsConfirmPwd] = useState(true);

  // const router = useRouter();
  //
  useEffect(() => {
    checkPwd();
  }, [password, pwdCheck]);

  const checkPwd = () => {
    if (password === "" && pwdCheck === "") {
      setIsConfirmPwd(true);
    } else {
      setIsConfirmPwd(password === pwdCheck);
    }
  };

  const handleSignup = async () => {
    if (!isConfirmPwd) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const res = await fetch("/api/session/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          name: name,
          password: password,
          passwordCheck: pwdCheck,
        }),
      });

      const data = await res.json();

      console.log("data", data);

      if (data[0].defaultMessage === "로그인 아이디가 중복됩니다.") {
        alert("이미 존재하는 아이디입니다.");
        return;
      }
    } catch (error) {
      console.error("handleSignup Error", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl font-bold">뒷배</div>
      <div className="flex flex-col gap-2 my-16">
        <label htmlFor="username" className="text-sm font-bold">
          아이디
        </label>
        <input
          value={username}
          id="username"
          type="text"
          className="border-2 border-gray-300 p-2 rounded-md w-72"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="name" className="text-sm font-bold">
          닉네임
        </label>
        <input
          value={name}
          id="name"
          type="text"
          className="border-2 border-gray-300 p-2 rounded-md w-72"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="password" className="text-sm font-bold">
          비밀번호
        </label>
        <input
          value={password}
          id="password"
          type="password"
          className="border-2 border-gray-300 p-2 rounded-md w-72"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="passwordCheck" className="text-sm font-bold">
          비밀번호 확인
        </label>
        <input
          value={pwdCheck}
          id="passwordCheck"
          type="password"
          className="border-2 border-gray-300 p-2 rounded-md w-72"
          onChange={(e) => setPwdCheck(e.target.value)}
        />
        {!isConfirmPwd && (
          <span className="text-xs text-red-500 p-1">
            비밀번호가 일치하지 않습니다.
          </span>
        )}

        <button
          className="bg-black text-white p-3 rounded-md font-bold mt-7 cursor-pointer"
          onClick={() => handleSignup()}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
