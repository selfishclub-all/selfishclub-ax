const stats = [
  { label: "총 멤버십 회원", value: "—", sub: "연동 후 표시" },
  { label: "이번 달 신규 가입", value: "—", sub: "연동 후 표시" },
  { label: "이번 달 매출", value: "—", sub: "연동 후 표시" },
  { label: "진행 중 프로그램", value: "—", sub: "연동 후 표시" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">대시보드</h1>
      <p className="text-sm text-[#888888] mb-8">셀피쉬클럽 운영 현황</p>

      {/* 주요 지표 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 border border-[#E5E5E5]">
            <p className="text-xs text-[#888888] mb-2">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-[#888888] mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* 빠른 실행 */}
      <h2 className="text-lg font-bold mb-4">빠른 실행</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-[#E5E5E5]">
          <p className="font-semibold mb-1">프로그램 등록</p>
          <p className="text-sm text-[#888888]">새 공유회/챌린지 등록</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-[#E5E5E5]">
          <p className="font-semibold mb-1">알림톡 발송</p>
          <p className="text-sm text-[#888888]">Claude API 문구 자동 생성</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-[#E5E5E5]">
          <p className="font-semibold mb-1">블로그 발행</p>
          <p className="text-sm text-[#888888]">팀 블로그 새 글 작성</p>
        </div>
      </div>
    </div>
  );
}
