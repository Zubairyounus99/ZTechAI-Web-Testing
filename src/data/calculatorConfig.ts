import { siteConfig } from "@/config/site";

const envRate = Number(process.env.NEXT_PUBLIC_AI_COST_PER_MINUTE);
const dynamicRate = !isNaN(envRate) && envRate > 0 ? envRate : siteConfig.calculator.aiCostPerMinute;

// Centralized Configuration Constants for ZTechAI Calculator & Economic Models
export const CALCULATOR_CONFIG = {
  // Internal calculation value only — never publicly displayed in page text or metadata
  AI_COST_PER_MINUTE: dynamicRate || 0.30,

  // Average realistic productive phone call minutes per full-time employee per month
  // (Assumes ~21.5 working days/month, ~4 hours/day of active live talk time + 4 hours for admin, breaks, research & wrap-up)
  MAX_PRODUCTIVE_CALL_MINUTES_PER_EMPLOYEE_PER_MONTH: siteConfig.calculator.maxProductiveMinutesPerEmployeePerMonth,

  // Default values for initial calculator state
  DEFAULTS: {
    monthlyCalls: 2000,
    averageCallDuration: 5,
    employees: 3,
    employeeCost: 4000,
  },

  // Input bounds
  BOUNDS: {
    minCalls: 50,
    maxCalls: 50000,
    minDuration: 1,
    maxDuration: 30,
    minEmployees: 1,
    maxEmployees: 50,
    minEmployeeCost: 500,
    maxEmployeeCost: 20000,
  },
};
