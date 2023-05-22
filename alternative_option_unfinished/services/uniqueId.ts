import USID from "https://deno.land/x/usid@1.0.2/mod.ts";

const usid = new USID();

export function uniqueId() {
  return usid.uuid();
}
