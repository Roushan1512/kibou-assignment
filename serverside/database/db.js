import { createClient } from "@supabase/supabase-js";

const ConnectDB = async () => {
  try {
    const supabase = await createClient(
      process.env.SupaURL,
      process.env.SupaServiceKey
    );
    console.log("DB Connected");
    return supabase;
  } catch (error) {
    console.log("Supabase Not Connected");
    ProcessingInstruction.exit(1);
  }
};

export default ConnectDB;
