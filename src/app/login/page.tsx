"use client";

import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const handleKakaoLogin = () => {
    signIn.social({
      provider: "kakao",
      callbackURL: "/mypage",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">셀피쉬클럽</h1>
          <p className="text-[#888888]">로그인하고 더 많은 혜택을 만나보세요</p>
        </div>

        <button
          onClick={handleKakaoLogin}
          className="w-full flex items-center justify-center gap-2 bg-[#FEE500] text-[#191919] font-semibold py-3 px-4 rounded-lg hover:brightness-95 transition-all cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 1C4.582 1 1 3.87 1 7.404c0 2.246 1.495 4.222 3.746 5.334-.165.614-.597 2.226-.684 2.57-.108.428.157.422.33.307.136-.09 2.167-1.474 3.047-2.073.513.074 1.04.112 1.561.112 4.418 0 8-2.87 8-6.25S13.418 1 9 1z"
              fill="#191919"
            />
          </svg>
          카카오로 시작하기
        </button>

        <p className="text-center text-[#888888] text-xs mt-6">
          로그인 시 서비스 이용약관에 동의하게 됩니다
        </p>
      </div>
    </div>
  );
}
