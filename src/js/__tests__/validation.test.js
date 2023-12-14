import ValidationForm from "../validation";

test("testing if validate handles valid input correctly", () => {
  const validateForm = new ValidationForm();

  const received = "30166559752996";
  validateForm.validate(received);

  expect(validateForm.checked).toBeTruthy();
});

test.each([
  ["5372241410009996", "mastercard"],
  ["4111111111111111", "visa"],
  ["371449635398431", "amex"],
  ["220433693734721288", "mir"],
  ["3530111333300000", "jcb"],
  ["6011111111111117", "discover"],
  ["30569309025904", "diners"],
])("testing if card belongs to expected paysystem", (value, expected) => {
  const validateForm = new ValidationForm();

  validateForm.validate(value);

  expect(validateForm.card).toBe(expected);
});

test("testing if validate handles valid input incorrectly", () => {
  const validateForm = new ValidationForm();

  const received = "301665";
  validateForm.validate(received);

  expect(validateForm.checked).toBeFalsy();
});

test("testing if card went through luhn algorythm validation", () => {
  const validateForm = new ValidationForm();

  const received = "5372241410009996";
  validateForm.getCheckedLuhn(received);

  expect(validateForm.checkedLuhn).toBeTruthy();
});
