import { createClient } from "@supabase/supabase-js";

// 서버 사이드 전용 — 프론트엔드에서 직접 사용 금지
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
