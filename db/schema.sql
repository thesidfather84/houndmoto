-- HoundMoto analytics schema
-- Run once in your Vercel Postgres console or psql client

CREATE TABLE IF NOT EXISTS analytics_events (
  id          SERIAL PRIMARY KEY,
  session_id  TEXT        NOT NULL,
  event       TEXT        NOT NULL,
  data        JSONB       NOT NULL DEFAULT '{}',
  device_type TEXT,
  browser     TEXT,
  referrer    TEXT,
  country     TEXT,
  region      TEXT,
  city        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ae_event      ON analytics_events (event);
CREATE INDEX IF NOT EXISTS idx_ae_session    ON analytics_events (session_id);
CREATE INDEX IF NOT EXISTS idx_ae_created    ON analytics_events (created_at);
CREATE INDEX IF NOT EXISTS idx_ae_event_date ON analytics_events (event, created_at);

CREATE TABLE IF NOT EXISTS admin_access_logs (
  id         SERIAL PRIMARY KEY,
  ip_hash    TEXT        NOT NULL,
  success    BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_aal_created ON admin_access_logs (created_at);
