/**
 * Test Suite: API Validation, Email Payload & Cal.com URL Parsing
 */

function parseCalLink(bookingUrl) {
  if (!bookingUrl) return "";
  return bookingUrl.replace(/^https?:\/\/cal\.com\//, "").replace(/\?.*$/, "").trim();
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(String(email).trim().toLowerCase());
}

function validateLeadPayload(payload) {
  const { name, businessName, email, phone, industry, honeypot } = payload;
  if (honeypot) return { valid: true, isSpam: true };
  if (!name || !businessName || !email || !phone || !industry) {
    return { valid: false, error: "Missing required fields" };
  }
  if (!validateEmail(email)) {
    return { valid: false, error: "Invalid email" };
  }
  return { valid: true, isSpam: false };
}

console.log("--- Running Cal.com URL Parsing Tests ---");
const testUrl1 = "https://cal.com/ztechai/15min";
const testUrl2 = "https://cal.com/zubair-sales/discovery?embed=true";
const testUrl3 = "ztechai-team/30min";
const testUrlEmpty = "";

if (parseCalLink(testUrl1) !== "ztechai/15min") throw new Error("Test 1 failed");
if (parseCalLink(testUrl2) !== "zubair-sales/discovery") throw new Error("Test 2 failed");
if (parseCalLink(testUrl3) !== "ztechai-team/30min") throw new Error("Test 3 failed");
if (parseCalLink(testUrlEmpty) !== "") throw new Error("Test 4 failed");
console.log("✓ Cal.com URL Parsing tests passed (4/4)");

console.log("--- Running Lead Validation & Spam Tests ---");
const validLead = {
  name: "Dr. John Doe",
  businessName: "Doe Dental Care",
  email: "john@doedental.com",
  phone: "(321) 555-0199",
  industry: "Dental",
};
const res1 = validateLeadPayload(validLead);
if (!res1.valid || res1.isSpam) throw new Error("Valid lead test failed");

const spamLead = {
  ...validLead,
  honeypot: "I am a bot",
};
const res2 = validateLeadPayload(spamLead);
if (!res2.valid || !res2.isSpam) throw new Error("Spam honeypot test failed");

const invalidEmailLead = {
  ...validLead,
  email: "not-an-email",
};
const res3 = validateLeadPayload(invalidEmailLead);
if (res3.valid) throw new Error("Invalid email test failed");

const missingFieldLead = {
  ...validLead,
  name: "",
};
const res4 = validateLeadPayload(missingFieldLead);
if (res4.valid) throw new Error("Missing field test failed");

console.log("✓ Lead Validation & Spam tests passed (4/4)");
console.log("\nALL API AND CAL TESTS PASSED 100%!");
