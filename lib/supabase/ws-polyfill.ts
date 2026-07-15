// Node < 22 does not expose a global `WebSocket`, which the current
// @supabase/supabase-js needs to construct its realtime client (even
// though we never open a realtime subscription). Provide one.
//
// Server-only. Never import this from the Edge middleware — the Edge
// runtime already has a global WebSocket, and `ws` is not Edge-compatible.
import ws from "ws";

if (typeof (globalThis as { WebSocket?: unknown }).WebSocket === "undefined") {
  (globalThis as { WebSocket?: unknown }).WebSocket = ws;
}
