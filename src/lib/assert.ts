
export const assert = (condition: boolean, message: string) => {
  if (!condition) {
    throw message;
  }
};

export const shouldBeEqual = (value1: unknown, value2: unknown) => assert(
  value1 === value2,
  `expected ${value1} to equal ${value2}`
);

export const shouldBeTruthy = (value: unknown) => assert(
  Boolean(value),
  `expected ${value} to be truthy`
);

export const shouldBeFalsy = (value: unknown) => assert(
  !Boolean(value),
  `expected ${value} to be falsy`
);

export const shouldThrow = async (fn: () => Promise<unknown>) => {
  let pass = false;
  try {
    await fn();
  } catch (err) {
    pass = true;
  }

  if (!pass) {
    throw "should throw, but did not";
  }
};

export const shouldNotThrow = async (fn: () => Promise<unknown>) => {
  try {
    await fn();
  } catch (err) {
    throw `should not throw, but threw: ${err}`;
  }
};