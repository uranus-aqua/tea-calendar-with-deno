import { assertEquals } from "https://deno.land/std@0.200.0/assert/mod.ts";
import { Teac } from "./teac.min.js";
Deno.test("Teac mod test", () => {
  const r = new Teac('2023-08-20').num();
  assertEquals(r, [40,7,5,false]);
});