"use client";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const router = useRouter();

  const goToPage = (path: string) => {
    if (path === "profile") {
      router.push("/profile");
    }
  };
  return (
    <div className="flex flex-wrap justify-between gap-2 p-4">
      <div className="flex text-6xl w-3 cursor-default">뒷배</div>
      <div className="flex flex-wrap gap-4 cursor-pointer">
        <div onClick={() => goToPage("profile")}>내 정보</div>
        <div>로그아웃</div>
      </div>
    </div>
  );
};

export default Topbar;
