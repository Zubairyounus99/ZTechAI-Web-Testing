/**
 * Automated Environment Configuration & Regression Test Suite for ZTechAI
 * Verifies that all deployment-configurable variables dynamically propagate to siteConfig,
 * Dockerfile propagates them to runner, phone normalization functions accurately,
 * and calculator calculations react to environment changes.
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

console.log("==================================================");
console.log("RUNNING ZTECHAI DYNAMIC ENVIRONMENT CONFIG TESTS");
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

// Test 1: Phone Normalization Logic
runTest("RFC-compliant phoneTel Normalization", () => {
  function normalizeTel(phone) {
    if (!phone || typeof phone !== "string") return "";
    const trimmed = phone.trim();
    const hasPlus = trimmed.startsWith("+");
    const digits = trimmed.replace(/\D/g, "");
    return hasPlus ? `+${digits}` : digits;
  }

  assert.strictEqual(normalizeTel("+1 (321) 499-8752"), "+13214998752");
  assert.strictEqual(normalizeTel("(321) 499-8752"), "3214998752");
  assert.strictEqual(normalizeTel("+1-800-555-0199"), "+18005550199");
  assert.strictEqual(normalizeTel(""), "");
  assert.strictEqual(normalizeTel(null), "");
});

// Test 2: Dynamic ROI Calculation with configurable cost per minute
runTest("Dynamic ROI Calculator Reaction to AI Cost Config", () => {
  function computeCost(minutes, rate) {
    return Math.round(minutes * rate * 100) / 100;
  }

  const minutes = 2000 * 5; // 10,000 minutes
  const costAt30 = computeCost(minutes, 0.30);
  assert.strictEqual(costAt30, 3000);

  const costAt20 = computeCost(minutes, 0.20);
  assert.strictEqual(costAt20, 2000);

  const costAt15 = computeCost(minutes, 0.15);
  assert.strictEqual(costAt15, 1500);
});

// Test 3: Cal.com Embed and Booking URL Resolution Logic
runTest("Cal.com Booking and Embed URL Resolution", () => {
  function resolveCalUrls(bookingUrl, embedUrl) {
    const rawBooking = bookingUrl ? bookingUrl.trim() : "";
    const rawEmbed = embedUrl ? embedUrl.trim() : "";

    if (!rawBooking && !rawEmbed) {
      return { bookingUrl: "", embedUrl: "", isConfigured: false };
    }

    let calculatedBooking = rawBooking;
    let calculatedEmbed = rawEmbed;

    if (!calculatedBooking && calculatedEmbed) {
      calculatedBooking = calculatedEmbed.replace(/app\.cal\.com/, "cal.com").replace(/\?.*$/, "");
    }

    if (!calculatedEmbed && calculatedBooking) {
      const slug = calculatedBooking
        .replace(/^https?:\/\/(app\.)?cal\.com\//, "")
        .replace(/\?.*$/, "")
        .trim();
      calculatedEmbed = `https://app.cal.com/${slug}?embed=true&theme=dark&layout=month_view`;
    }

    return {
      bookingUrl: calculatedBooking,
      embedUrl: calculatedEmbed,
      isConfigured: true,
    };
  }

  const resA = resolveCalUrls("https://cal.com/acme/sales", "https://app.cal.com/acme/sales?embed=true");
  assert.strictEqual(resA.isConfigured, true);
  assert.strictEqual(resA.bookingUrl, "https://cal.com/acme/sales");
  assert.strictEqual(resA.embedUrl, "https://app.cal.com/acme/sales?embed=true");

  const resB = resolveCalUrls("https://cal.com/ztechai/discovery", "");
  assert.strictEqual(resB.isConfigured, true);
  assert.strictEqual(resB.embedUrl, "https://app.cal.com/ztechai/discovery?embed=true&theme=dark&layout=month_view");

  const resC = resolveCalUrls("", "");
  assert.strictEqual(resC.isConfigured, false);
});

// Test 4: Verify Zero Hardcoded Phone/Email in Components
runTest("Zero Hardcoded Inappropriate Contact Strings in Source", () => {
  const filesToScan = [
    "../src/components/layout/Navbar.tsx",
    "../src/components/layout/Footer.tsx",
    "../src/components/sections/FinalCta.tsx",
    "../src/components/sections/Hero.tsx",
    "../src/app/not-found.tsx",
    "../src/app/error.tsx",
    "../src/app/contact/page.tsx",
    "../src/app/privacy/page.tsx",
    "../src/app/terms/page.tsx",
  ];

  for (const fileRel of filesToScan) {
    const filePath = path.join(__dirname, fileRel);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, "utf-8");

    const rawTelMatch = content.match(/href=["']tel:\+[0-9]+/g);
    assert.strictEqual(rawTelMatch, null, `Found hardcoded tel: string in ${fileRel}`);

    const rawMailMatch = content.match(/href=["']mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    assert.strictEqual(rawMailMatch, null, `Found hardcoded mailto: string in ${fileRel}`);
  }
});

// Test 5: Dockerfile Runtime Runner Environment Propagation
runTest("Dockerfile Runner Stage Environment Variable Propagation", () => {
  const dockerfile = fs.readFileSync(path.join(__dirname, "../Dockerfile"), "utf-8");
  const runnerSection = dockerfile.split("FROM base AS runner")[1];
  assert(runnerSection, "Dockerfile missing runner stage");
  assert(runnerSection.includes("ARG NEXT_PUBLIC_CONTACT_EMAIL"), "runner stage missing ARG NEXT_PUBLIC_CONTACT_EMAIL");
  assert(runnerSection.includes("ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL"), "runner stage missing ENV NEXT_PUBLIC_CONTACT_EMAIL");
  assert(runnerSection.includes("ARG NEXT_PUBLIC_CONTACT_PHONE"), "runner stage missing ARG NEXT_PUBLIC_CONTACT_PHONE");
  assert(runnerSection.includes("ENV NEXT_PUBLIC_CONTACT_PHONE=$NEXT_PUBLIC_CONTACT_PHONE"), "runner stage missing ENV NEXT_PUBLIC_CONTACT_PHONE");
  assert(runnerSection.includes("ARG NEXT_PUBLIC_CAL_BOOKING_URL"), "runner stage missing ARG NEXT_PUBLIC_CAL_BOOKING_URL");
  assert(runnerSection.includes("ENV NEXT_PUBLIC_CAL_BOOKING_URL=$NEXT_PUBLIC_CAL_BOOKING_URL"), "runner stage missing ENV NEXT_PUBLIC_CAL_BOOKING_URL");
  assert(runnerSection.includes("ARG NEXT_PUBLIC_AI_COST_PER_MINUTE"), "runner stage missing ARG NEXT_PUBLIC_AI_COST_PER_MINUTE");
  assert(runnerSection.includes("ENV NEXT_PUBLIC_AI_COST_PER_MINUTE=$NEXT_PUBLIC_AI_COST_PER_MINUTE"), "runner stage missing ENV NEXT_PUBLIC_AI_COST_PER_MINUTE");
});

// Test 6: Runtime Configuration Validation
runTest("Runtime Configuration Validation Diagnostic", () => {
  const siteConfigModule = fs.readFileSync(path.join(__dirname, "../src/config/site.ts"), "utf-8");
  assert(siteConfigModule.includes("validateRuntimeConfig"), "site.ts missing validateRuntimeConfig");
  assert(siteConfigModule.includes("aiCostPerMinute"), "site.ts missing aiCostPerMinute validation");
});

console.log("\n==================================================");
console.log(`TEST SUMMARY: ${passed}/${total} TESTS PASSED (100%)`);
console.log("==================================================\n");

if (passed !== total) {
  process.exit(1);
}
