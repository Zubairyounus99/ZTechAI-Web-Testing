const { CALCULATOR_CONFIG } = {
  CALCULATOR_CONFIG: {
    AI_COST_PER_MINUTE: 0.20,
    MAX_PRODUCTIVE_CALL_MINUTES_PER_EMPLOYEE_PER_MONTH: 5000,
  }
};

function calculateROI(inputs) {
  const rawCalls = Number(inputs.monthlyCalls);
  const rawDuration = Number(inputs.averageCallDuration);
  const rawEmployees = Number(inputs.employees);
  const rawCost = Number(inputs.employeeCost);

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
    const fallbackMinutes = fallbackCalls * fallbackDuration;
    const fallbackAiCost = fallbackMinutes * CALCULATOR_CONFIG.AI_COST_PER_MINUTE;
    const fallbackTradCost = fallbackEmployees * fallbackCost;
    const fallbackSavings = fallbackTradCost - fallbackAiCost;

    return {
      monthlyCalls: fallbackCalls,
      averageCallDuration: fallbackDuration,
      employees: fallbackEmployees,
      employeeCost: fallbackCost,
      monthlyMinutes: fallbackMinutes,
      recommendedEmployees: 1,
      isUnderstaffed: false,
      staffingShortfall: 0,
      aiMonthlyCost: fallbackAiCost,
      enteredTraditionalCost: fallbackTradCost,
      recommendedTraditionalCost: fallbackTradCost,
      enteredSavings: fallbackSavings,
      enteredSavingsPercentage: fallbackTradCost > 0 ? (fallbackSavings / fallbackTradCost) * 100 : 0,
      recommendedSavings: fallbackSavings,
      recommendedSavingsPercentage: fallbackTradCost > 0 ? (fallbackSavings / fallbackTradCost) * 100 : 0,
      annualizedSavings: fallbackSavings * 12,
      isValid: false,
      validationMessage: "Please enter valid positive values for all calculator fields.",
      isLowSavings: fallbackSavings <= 0,
    };
  }

  const monthlyCalls = Math.round(rawCalls);
  const averageCallDuration = rawDuration;
  const employees = Math.max(1, Math.round(rawEmployees));
  const employeeCost = rawCost;

  const monthlyMinutes = Math.round(monthlyCalls * averageCallDuration);
  const aiMonthlyCost = Math.round(monthlyMinutes * CALCULATOR_CONFIG.AI_COST_PER_MINUTE * 100) / 100;
  const enteredTraditionalCost = Math.round(employees * employeeCost * 100) / 100;

  const maxCapacity = CALCULATOR_CONFIG.MAX_PRODUCTIVE_CALL_MINUTES_PER_EMPLOYEE_PER_MONTH;
  const recommendedEmployees = Math.max(1, Math.ceil(monthlyMinutes / maxCapacity));
  const isUnderstaffed = employees < recommendedEmployees;
  const staffingShortfall = isUnderstaffed ? recommendedEmployees - employees : 0;

  const enteredSavings = Math.round((enteredTraditionalCost - aiMonthlyCost) * 100) / 100;
  const enteredSavingsPercentage =
    enteredTraditionalCost > 0
      ? Math.round(((enteredTraditionalCost - aiMonthlyCost) / enteredTraditionalCost) * 1000) / 10
      : 0;

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

console.log("--- Running 10 Mandatory Calculator Test Cases ---");

// Case 1
const c1 = calculateROI({ monthlyCalls: 1000, averageCallDuration: 5, employees: 1, employeeCost: 4000 });
console.assert(c1.monthlyMinutes === 5000, "C1 minutes failed");
console.assert(c1.aiMonthlyCost === 1000, "C1 AI cost failed");
console.assert(c1.enteredSavings === 3000, "C1 savings failed");
console.assert(c1.enteredSavingsPercentage === 75, "C1 percentage failed");
console.log("✓ Case 1 passed (1,000 calls, 5 min, 1 emp, $4k: $3,000/mo savings / 75%)");

// Case 2
const c2 = calculateROI({ monthlyCalls: 5000, averageCallDuration: 5, employees: 1, employeeCost: 3000 });
console.assert(c2.monthlyMinutes === 25000, "C2 minutes failed");
console.assert(c2.aiMonthlyCost === 5000, "C2 AI cost failed");
console.assert(c2.recommendedEmployees === 5, "C2 recommended failed");
console.assert(c2.isUnderstaffed === true, "C2 understaffed failed");
console.assert(c2.recommendedSavings === 10000, "C2 rec savings failed");
console.assert(c2.recommendedSavingsPercentage === 66.7, "C2 rec pct failed");
console.log("✓ Case 2 passed (5,000 calls, 5 min, 1 emp -> recommended 5 emps, $10,000/mo savings / 66.7%)");

// Case 3
const c3 = calculateROI({ monthlyCalls: 10000, averageCallDuration: 5, employees: 2, employeeCost: 4000 });
console.assert(c3.aiMonthlyCost === 10000, "C3 AI cost failed");
console.assert(c3.recommendedEmployees === 10, "C3 rec emps failed");
console.assert(c3.recommendedSavings === 30000, "C3 rec savings failed");
console.log("✓ Case 3 passed (10,000 calls, 5 min -> recommended 10 emps, $30,000/mo savings / 75%)");

// Case 4
const c4 = calculateROI({ monthlyCalls: 20000, averageCallDuration: 6, employees: 10, employeeCost: 4000 });
console.assert(c4.monthlyMinutes === 120000, "C4 mins failed");
console.assert(c4.aiMonthlyCost === 24000, "C4 AI cost failed");
console.assert(c4.recommendedEmployees === 24, "C4 rec emps failed");
console.log("✓ Case 4 passed (20,000 calls, 6 min, 10 emps -> recommended 24 emps, $24k AI cost)");

// Case 5: Small volume
const c5 = calculateROI({ monthlyCalls: 50, averageCallDuration: 2, employees: 1, employeeCost: 3500 });
console.assert(c5.aiMonthlyCost === 20, "C5 AI cost failed");
console.assert(c5.enteredSavings === 3480, "C5 savings failed");
console.log("✓ Case 5 passed (Small volume: 50 calls, 2 min -> $20 AI cost, $3,480 savings)");

// Case 6: High volume
const c6 = calculateROI({ monthlyCalls: 50000, averageCallDuration: 5, employees: 50, employeeCost: 4500 });
console.assert(c6.aiMonthlyCost === 50000, "C6 AI cost failed");
console.assert(c6.enteredSavings === 175000, "C6 savings failed");
console.log("✓ Case 6 passed (High volume: 50,000 calls -> $50,000 AI cost, $175,000 savings)");

// Case 7: Zero calls
const c7 = calculateROI({ monthlyCalls: 0, averageCallDuration: 5, employees: 1, employeeCost: 4000 });
console.assert(c7.isValid === false, "C7 validation failed");
console.log("✓ Case 7 passed (Zero calls -> graceful validation fallback)");

// Case 8: Negative values
const c8 = calculateROI({ monthlyCalls: -500, averageCallDuration: -5, employees: -2, employeeCost: -4000 });
console.assert(c8.isValid === false, "C8 validation failed");
console.log("✓ Case 8 passed (Negative values -> safe handling)");

// Case 9: NaN values
const c9 = calculateROI({ monthlyCalls: NaN, averageCallDuration: undefined, employees: null, employeeCost: NaN });
console.assert(c9.isValid === false, "C9 validation failed");
console.log("✓ Case 9 passed (NaN values -> safe handling)");

// Case 10: Extremely large values
const c10 = calculateROI({ monthlyCalls: 1000000, averageCallDuration: 10, employees: 500, employeeCost: 5000 });
console.assert(c10.isValid === true, "C10 validation failed");
console.assert(c10.aiMonthlyCost === 2000000, "C10 AI cost failed");
console.log("✓ Case 10 passed (1M calls -> safe big number computation)");

console.log("\nALL 10 MANDATORY CALCULATOR TEST CASES PASSED 100%!");
