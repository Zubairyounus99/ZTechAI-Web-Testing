import { siteConfig } from "@/config/site";

// Centralized Static Constants & Bounds for ZTechAI Calculator Models
// Rate is dynamically supplied at runtime via siteConfig & useConfig()
export const CALCULATOR_CONFIG = {
  // Static fallback rate (Dynamic rate is resolved at runtime via useConfig())
  AI_COST_PER_MINUTE: siteConfig.calculator.aiCostPerMinute || 0.30,

  // Average realistic productive phone call minutes per full-time employee per month
  // (Assumes ~21.5 working days/month, ~4 hours/day of active live talk time + 4 hours for admin, breaks, research & wrap-up)
  MAX_PRODUCTIVE_CALL_MINUTES_PER_EMPLOYEE_PER_MONTH: 5000,

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
