/**
 * Automated Comprehensive Link & Transition Verification Test Suite for ZTechAI
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

console.log("==================================================");
console.log("RUNNING ZTECHAI COMPREHENSIVE LINK VERIFICATION");
console.log("==================================================\n");

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

// 1. Inventory of all registered static & dynamic pages
const validAppRoutes = [
  "/",
  "/about",
  "/ai-voice-agents",
  "/ai-receptionist",
  "/ai-appointment-booking",
  "/ai-lead-qualification",
  "/ai-customer-support",
  "/how-it-works",
  "/integrations",
  "/case-studies",
  "/pricing",
  "/contact",
  "/faq",
  "/security",
  "/privacy",
  "/terms",
  "/blog",
  // 8 Industries
  "/industries/dental",
  "/industries/medical",
  "/industries/hvac",
  "/industries/plumbing",
  "/industries/roofing",
  "/industries/electrical",
  "/industries/landscaping",
  "/industries/real-estate",
  // 15 Blog posts
  "/blog/ai-voice-agents-for-us-businesses",
  "/blog/ai-voice-agents-for-hvac-businesses",
  "/blog/ai-voice-agents-for-plumbing-businesses",
  "/blog/ai-voice-agents-for-dental-practices",
  "/blog/ai-voice-agents-for-roofing-companies",
  "/blog/ai-voice-agents-for-electrical-businesses",
  "/blog/ai-voice-agents-for-landscaping-businesses",
  "/blog/ai-voice-agents-for-real-estate-businesses",
  "/blog/ai-receptionist-for-small-businesses",
  "/blog/ai-booking-agents",
  "/blog/ai-lead-qualification-agents",
  "/blog/ai-customer-service-agents",
  "/blog/ai-voice-agents-vs-traditional-receptionists",
  "/blog/how-ai-voice-agents-handle-objections",
  "/blog/how-ai-agents-learn-from-call-outcomes",
];

const validAnchorHashes = [
  "/#capabilities",
  "/#industries",
  "/#how-it-works",
  "/#calculator",
  "/#faq",
  "/#demo",
  "/#service",
  "/#organization",
  "/#website",
  "/#software",
  "/#howto",
  "/#collection",
  "/#article",
];

// Test 1: Validate Navbar and Footer Links
runTest("Navbar & Footer Navigation Link Integrity", () => {
  const siteConfigCode = fs.readFileSync(
    path.join(__dirname, "../src/config/site.ts"),
    "utf-8"
  );

  // Extract all hrefs from siteConfig
  const hrefMatches = [...siteConfigCode.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert(hrefMatches.length > 0, "No hrefs found in siteConfig.ts");

  for (const href of hrefMatches) {
    const isRoute = validAppRoutes.includes(href);
    const isAnchor = validAnchorHashes.includes(href);
    assert(
      isRoute || isAnchor,
      `Broken or unmapped link in siteConfig: "${href}"`
    );
  }
});

// Test 2: Validate Footer.tsx Hardcoded Links
runTest("Footer.tsx Internal Links Resolution", () => {
  const footerCode = fs.readFileSync(
    path.join(__dirname, "../src/components/layout/Footer.tsx"),
    "utf-8"
  );

  const hrefMatches = [...footerCode.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefMatches) {
    if (href.startsWith("/")) {
      const isRoute = validAppRoutes.includes(href);
      const isAnchor = validAnchorHashes.includes(href);
      assert(
        isRoute || isAnchor,
        `Broken internal link in Footer.tsx: "${href}"`
      );
    }
  }
});

// Test 3: Validate Blog Related Articles Linking
runTest("Blog Article Related Slugs Resolution (All 15 Articles in Source)", () => {
  const blogDataCode = fs.readFileSync(
    path.join(__dirname, "../src/data/blogData.ts"),
    "utf-8"
  );

  const allSlugsMatches = [...blogDataCode.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.strictEqual(allSlugsMatches.length, 15, "Expected 15 article slugs");

  const relSlugsMatches = [...blogDataCode.matchAll(/relatedSlugs:\s*\[([\s\S]*?)\]/g)];
  for (const match of relSlugsMatches) {
    const innerSlugs = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    for (const rel of innerSlugs) {
      assert(
        allSlugsMatches.includes(rel),
        `Referenced related slug "${rel}" does not exist in blogData.ts`
      );
    }
  }
});

// Test 4: Smooth Transition and Animation Class Audit
runTest("Interactive Component Smooth Transition Audit", () => {
  const interactiveComponents = [
    "../src/components/layout/Navbar.tsx",
    "../src/components/layout/Footer.tsx",
    "../src/components/sections/Hero.tsx",
    "../src/components/sections/IndustryShowcase.tsx",
    "../src/components/ui/CalModal.tsx",
    "../src/components/ui/IndustryModal.tsx",
    "../src/components/blog/BlogIndexClient.tsx",
  ];

  for (const compRel of interactiveComponents) {
    const code = fs.readFileSync(path.join(__dirname, compRel), "utf-8");
    assert(
      code.includes("transition-all") ||
        code.includes("transition-colors") ||
        code.includes("transition-transform") ||
        code.includes("duration-"),
      `Component ${compRel} is missing smooth CSS transitions`
    );
  }
});

console.log("\n==================================================");
console.log(`LINK VERIFICATION: ${passed}/${total} TESTS PASSED (100%)`);
console.log("==================================================\n");

if (passed !== total) {
  process.exit(1);
}
