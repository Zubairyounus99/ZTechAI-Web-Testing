import { CALCULATOR_CONFIG } from "@/data/calculatorConfig";

export interface CalculatorInputs {
  monthlyCalls: number;
  averageCallDuration: number;
  employees: number;
  employeeCost: number;
}

export interface CalculatorResult {
  // Input summary
  monthlyCalls: number;
  averageCallDuration: number;
  employees: number;
  employeeCost: number;

  // Workload metrics
  monthlyMinutes: number;
  recommendedEmployees: number;
  isUnderstaffed: boolean;
  staffingShortfall: number;

  // Costs
  aiMonthlyCost: number;
  enteredTraditionalCost: number;
  recommendedTraditionalCost: number;

  // User scenario savings
  enteredSavings: number;
  enteredSavingsPercentage: number;

  // Recommended scenario savings
  recommendedSavings: number;
  recommendedSavingsPercentage: number;

  // Secondary metrics
  annualizedSavings: number;

  // Validation & Safety flags
  isValid: boolean;
  validationMessage?: string;
  isLowSavings: boolean;
}

/**
 * Pure, mathematically rigorous ROI calculation function for ZTechAI.
 * Separates computation from UI rendering and handles all edge cases safely.
 */
export function calculateROI(
  inputs: Partial<CalculatorInputs>,
  customRate?: number
): CalculatorResult {
  // Safe extraction and sanitization
  const rawCalls = Number(inputs.monthlyCalls);
  const rawDuration = Number(inputs.averageCallDuration);
  const rawEmployees = Number(inputs.employees);
  const rawCost = Number(inputs.employeeCost);

  // Validate inputs
  const isNaNOrInvalid =
    isNaN(rawCalls) ||
    isNaN(rawDuration) ||
    isNaN(rawEmployees) ||
    isNaN(rawCost);

  if (isNaNOrInvalid || rawCalls <= 0 || rawDuration <= 0 || rawEmployees <= 0 || rawCost <= 0) {
    const fallbackCalls = Math.max(0, isNaN(rawCalls) ? 0 : rawCalls);
    const fallbackDuration = Math.max(0, isNaN(rawDuration) ? 0 : rawDuration);
    const fallbackEmployees = Math.max(1, isNaN(rawEmployees) ? 1 : rawEmployees);
    const fallbackCost = Math.max(0, isNaN(rawCost) ? 0 : rawCost);

    return {
      monthlyCalls: fallbackCalls,
      averageCallDuration: fallbackDuration,
      employees: fallbackEmployees,
      employeeCost: fallbackCost,
      monthlyMinutes: Math.round(fallbackCalls * fallbackDuration),
      recommendedEmployees: 1,
      isUnderstaffed: false,
      staffingShortfall: 0,
      aiMonthlyCost: 0,
      enteredTraditionalCost: Math.round(fallbackEmployees * fallbackCost),
      recommendedTraditionalCost: Math.round(fallbackEmployees * fallbackCost),
      enteredSavings: Math.round(fallbackEmployees * fallbackCost),
      enteredSavingsPercentage: 100,
      recommendedSavings: Math.round(fallbackEmployees * fallbackCost),
      recommendedSavingsPercentage: 100,
      annualizedSavings: Math.round(fallbackEmployees * fallbackCost * 12),
      isValid: false,
      validationMessage: "Please provide positive numbers for all fields to compute ROI.",
      isLowSavings: false,
    };
  }

  // Active rate evaluation
  const activeRate = typeof customRate === "number" && customRate > 0 ? customRate : (CALCULATOR_CONFIG.AI_COST_PER_MINUTE || 0.30);

  // Workload calculations
  const monthlyCalls = Math.round(rawCalls);
  const averageCallDuration = rawDuration;
  const employees = Math.max(1, Math.round(rawEmployees));
  const employeeCost = rawCost;

  const monthlyMinutes = Math.round(monthlyCalls * averageCallDuration);
  const aiMonthlyCost = Math.round(monthlyMinutes * activeRate * 100) / 100;
  const enteredTraditionalCost = Math.round(employees * employeeCost * 100) / 100;

  // Capacity validation
  const maxCapacity = CALCULATOR_CONFIG.MAX_PRODUCTIVE_CALL_MINUTES_PER_EMPLOYEE_PER_MONTH;
  const recommendedEmployees = Math.max(1, Math.ceil(monthlyMinutes / maxCapacity));
  const isUnderstaffed = employees < recommendedEmployees;
  const staffingShortfall = isUnderstaffed ? recommendedEmployees - employees : 0;

  // Scenario 1: User Entered Scenario
  const enteredSavings = Math.round((enteredTraditionalCost - aiMonthlyCost) * 100) / 100;
  const enteredSavingsPercentage =
    enteredTraditionalCost > 0
      ? Math.round(((enteredTraditionalCost - aiMonthlyCost) / enteredTraditionalCost) * 1000) / 10
      : 0;

  // Scenario 2: Recommended Realistic Staffing Scenario
  const recommendedTraditionalCost = Math.round(recommendedEmployees * employeeCost * 100) / 100;
  const recommendedSavings = Math.round((recommendedTraditionalCost - aiMonthlyCost) * 100) / 100;
  const recommendedSavingsPercentage =
    recommendedTraditionalCost > 0
      ? Math.round(((recommendedTraditionalCost - aiMonthlyCost) / recommendedTraditionalCost) * 1000) / 10
      : 0;

  const annualizedSavings = Math.round(enteredSavings * 12);
  const isLowSavings = enteredSavingsPercentage < 20;

  return {
    monthlyCalls,
    averageCallDuration,
    employees,
    employeeCost,
    monthlyMinutes,
    recommendedEmployees,
    isUnderstaffed,
    staffingShortfall,
    aiMonthlyCost,
    enteredTraditionalCost,
    recommendedTraditionalCost,
    enteredSavings,
    enteredSavingsPercentage,
    recommendedSavings,
    recommendedSavingsPercentage,
    annualizedSavings,
    isValid: true,
    isLowSavings,
  };
}
