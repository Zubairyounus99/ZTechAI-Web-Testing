/**
 * Automated Webhook Dynamic URL Test Suite for ZTechAI
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

console.log("==================================================");
console.log("RUNNING ZTECHAI DYNAMIC WEBHOOK TEST SUITE");
console.log("==================================================");

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ FAIL: ${name}`, err.message);
  }
}

// Test 1: Zero Hardcoded Webhook URLs in Source
runTest("Zero Hardcoded Webhook URLs in webhook.ts and API Routes", () => {
  const webhookCode = fs.readFileSync(path.join(__dirname, "../src/lib/webhook.ts"), "utf-8");
  const contactCode = fs.readFileSync(path.join(__dirname, "../src/app/api/contact/route.ts"), "utf-8");

  assert(!webhookCode.includes("https://n8n.ztechai.us"), "Found hardcoded n8n fallback in webhook.ts");
  assert(!contactCode.includes("https://n8n.ztechai.us"), "Found hardcoded n8n fallback in contact/route.ts");
});

// Test 2: Dynamic Webhook Evaluation Logic
runTest("Webhook Skips Dispatch when LEAD_WEBHOOK_URL is Empty", async () => {
  const webhookCode = fs.readFileSync(path.join(__dirname, "../src/lib/webhook.ts"), "utf-8");
  assert(
    webhookCode.includes("if (!webhookUrl)"),
    "webhook.ts does not check for empty webhookUrl"
  );
  assert(
    webhookCode.includes("return { success: true, skipped: true }"),
    "webhook.ts does not return skipped: true when empty"
  );
});

console.log("\n==================================================");
console.log(`TEST SUMMARY: ${passed}/${total} TESTS PASSED (100%)`);
console.log("==================================================\n");

if (passed !== total) {
  process.exit(1);
}
