import { calculateROI } from "../calculator";

describe("ROI Calculator Pure Engine Tests", () => {
  test("Case 1: 1,000 calls, 5 min, 1 employee, $4,000", () => {
    const result = calculateROI({
      monthlyCalls: 1000,
      averageCallDuration: 5,
      employees: 1,
      employeeCost: 4000,
    });

    expect(result.monthlyMinutes).toBe(5000);
    expect(result.aiMonthlyCost).toBe(1000); // 5,000 * 0.20
    expect(result.enteredTraditionalCost).toBe(4000);
    expect(result.enteredSavings).toBe(3000);
    expect(result.enteredSavingsPercentage).toBe(75);
    expect(result.recommendedEmployees).toBe(1);
    expect(result.isUnderstaffed).toBe(false);
  });

  test("Case 2: 5,000 calls, 5 min, 1 employee, $3,000 (Understaffed scenario)", () => {
    const result = calculateROI({
      monthlyCalls: 5000,
      averageCallDuration: 5,
      employees: 1,
      employeeCost: 3000,
    });

    expect(result.monthlyMinutes).toBe(25000);
    expect(result.aiMonthlyCost).toBe(5000); // 25,000 * 0.20
    expect(result.enteredTraditionalCost).toBe(3000);
    // User entered is understaffed (1 emp for 25k mins, recommended = 5)
    expect(result.recommendedEmployees).toBe(5);
    expect(result.isUnderstaffed).toBe(true);
    expect(result.staffingShortfall).toBe(4);
    expect(result.recommendedTraditionalCost).toBe(15000); // 5 * 3,000
    expect(result.recommendedSavings).toBe(10000); // 15,000 - 5,000
    expect(result.recommendedSavingsPercentage).toBe(66.7);
  });

  test("Case 3: 10,000 calls, 5 min, 2 employees, $4,000", () => {
    const result = calculateROI({
      monthlyCalls: 10000,
      averageCallDuration: 5,
      employees: 2,
      employeeCost: 4000,
    });

    expect(result.monthlyMinutes).toBe(50000);
    expect(result.aiMonthlyCost).toBe(10000);
    expect(result.recommendedEmployees).toBe(10);
    expect(result.isUnderstaffed).toBe(true);
    expect(result.recommendedTraditionalCost).toBe(40000);
    expect(result.recommendedSavings).toBe(30000);
    expect(result.recommendedSavingsPercentage).toBe(75);
  });

  test("Case 4: 20,000 calls, 6 min, 10 employees, $4,000", () => {
    const result = calculateROI({
      monthlyCalls: 20000,
      averageCallDuration: 6,
      employees: 10,
      employeeCost: 4000,
    });

    expect(result.monthlyMinutes).toBe(120000);
    expect(result.aiMonthlyCost).toBe(24000);
    expect(result.recommendedEmployees).toBe(24);
    expect(result.isUnderstaffed).toBe(true);
  });

  test("Case 5: Very small call volume (50 calls, 2 min)", () => {
    const result = calculateROI({
      monthlyCalls: 50,
      averageCallDuration: 2,
      employees: 1,
      employeeCost: 3500,
    });

    expect(result.monthlyMinutes).toBe(100);
    expect(result.aiMonthlyCost).toBe(20);
    expect(result.enteredTraditionalCost).toBe(3500);
    expect(result.enteredSavings).toBe(3480);
    expect(result.isUnderstaffed).toBe(false);
  });

  test("Case 6: Very high call volume (50,000 calls, 5 min)", () => {
    const result = calculateROI({
      monthlyCalls: 50000,
      averageCallDuration: 5,
      employees: 50,
      employeeCost: 4500,
    });

    expect(result.monthlyMinutes).toBe(250000);
    expect(result.aiMonthlyCost).toBe(50000);
    expect(result.enteredTraditionalCost).toBe(225000);
    expect(result.enteredSavings).toBe(175000);
    expect(result.enteredSavingsPercentage).toBe(77.8);
  });

  test("Case 7: Zero calls (Graceful fallback)", () => {
    const result = calculateROI({
      monthlyCalls: 0,
      averageCallDuration: 5,
      employees: 1,
      employeeCost: 4000,
    });

    expect(result.isValid).toBe(false);
    expect(result.monthlyMinutes).toBe(0);
    expect(result.aiMonthlyCost).toBe(0);
  });

  test("Case 8: Negative values (Sanitized)", () => {
    const result = calculateROI({
      monthlyCalls: -500,
      averageCallDuration: -5,
      employees: -2,
      employeeCost: -4000,
    });

    expect(result.isValid).toBe(false);
    expect(result.aiMonthlyCost).toBe(0);
  });

  test("Case 9: NaN / Empty values", () => {
    const result = calculateROI({
      monthlyCalls: NaN,
      averageCallDuration: undefined,
      employees: null as unknown as number,
      employeeCost: NaN,
    });

    expect(result.isValid).toBe(false);
  });

  test("Case 10: Extremely large values", () => {
    const result = calculateROI({
      monthlyCalls: 1000000,
      averageCallDuration: 10,
      employees: 500,
      employeeCost: 5000,
    });

    expect(result.isValid).toBe(true);
    expect(result.monthlyMinutes).toBe(10000000);
    expect(result.aiMonthlyCost).toBe(2000000);
  });
});
