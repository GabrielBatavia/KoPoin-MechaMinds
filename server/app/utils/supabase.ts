import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import WebSocket from "ws";

dotenv.config();

// ponytail: Pass ws library to realtime.websocket to support Node.js versions < 22, and disable persistSession for backend server.
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

// Graceful fallback for environment variables missing at initialization (e.g. during Vercel function cold starts before configuration)
const makeDummy = (path: string): any => {
  const dummyFn = () => {
    throw new Error(
      `Supabase client is not initialized. Please configure SUPABASE_URL and SUPABASE_KEY in your environment variables. (Failed at ${path})`
    );
  };
  return new Proxy(dummyFn, {
    get(target, prop) {
      if (typeof prop === "symbol" || prop === "then" || prop === "inspect" || prop === "prototype") {
        return undefined;
      }
      return makeDummy(`${path}.${String(prop)}`);
    },
  });
};

if (!supabaseUrl || !supabaseKey) {
  console.warn("WARNING: SUPABASE_URL and/or SUPABASE_KEY is missing from environment variables. Supabase client is not fully initialized.");
}

export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
      realtime: {
        websocket: WebSocket,
      },
    } as any)
  : makeDummy("supabase");

