"use client";

import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const handleKakaoLogin = () => {
    signIn.social({
      provider: "kakao",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-sm">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">셀피쉬클럽</h1>
          <p className="text-[#888888]">로그인하고 더 많은 혜택을 만나보세요</p>
        </div>

        {/* 카카오 로그인 버튼 */}
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

        {/* 안내 사항 */}
        <div className="mt-8 space-y-4">
          <div className="bg-white/5 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white">
              기존 회원이신가요?
            </h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              카카오 로그인 시 <span className="text-white">전화번호</span>를
              기준으로 기존 멤버십 · 결제 내역을 자동으로 불러옵니다.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white">
              전화번호가 바뀌었나요?
            </h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              전화번호가 달라 기존 정보가 연결되지 않으면, 이메일로 다시 한번
              찾아볼게요. 그래도 안 되면{" "}
              <a
                href="http://pf.kakao.com/_dxmxixhG/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E2E545] underline underline-offset-2"
              >
                카카오 채널
              </a>
              로 문의해 주세요.
            </p>
          </div>
        </div>

        <p className="text-center text-[#888888] text-xs mt-8">
          로그인 시 서비스 이용약관에 동의하게 됩니다
        </p>
      </div>
    </div>
  );
}
