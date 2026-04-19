-- 1. blog 테이블 생성
CREATE TABLE IF NOT EXISTS blog (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  author TEXT,
  content TEXT,
  thumbnail TEXT,
  description TEXT,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. aitools 테이블 생성
CREATE TABLE IF NOT EXISTS aitools (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  referral_url TEXT,
  benefit TEXT,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 기존 item 테이블에 is_visible 컬럼 추가
ALTER TABLE item ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;
