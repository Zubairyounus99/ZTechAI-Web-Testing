// Centralized Static Constants & Bounds for ZTechAI Calculator Models
// The active AI rate is supplied only by ConfigProvider at runtime.
export const CALCULATOR_CONFIG = {
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
