import { supabase } from "../utils/supabase";

async function run() {
  console.log("Checking Supabase connection...");
  try {
    const checks = [
      { label: "auth", query: supabase.from("auth").select("id,email,name,points_balance").limit(1) },
      { label: "kopoin_communities", query: supabase.from("kopoin_communities").select("id,name,members_count").limit(3) },
      { label: "kopoin_missions", query: supabase.from("kopoin_missions").select("id,title,points,qr_code").limit(5) },
      { label: "kopoin_transactions", query: supabase.from("kopoin_transactions").select("id,title,points_amount").limit(5) },
    ];

    for (const check of checks) {
      const { data, error } = await check.query;
      if (error) {
        console.error(`[${check.label}] failed:`, error.message);
      } else {
        console.log(`[${check.label}] ok:`, data);
      }
    }
  } catch (err) {
    console.error("Catch error:", err);
  }
}

run();
