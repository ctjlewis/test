
const throwIfFalse = (condition: boolean, message: string) => {
  if (!condition) {
    throw new Error(message);
  }
};

export const shouldBeEqual = (value1: unknown, value2: unknown) => throwIfFalse(
  value1 === value2,
  `expected ${value1} to equal ${value2}`
);

export const shouldBeTruthy = (value: unknown) => throwIfFalse(
  Boolean(value),
  `expected ${value} to be truthy`
);

export const shouldBeFalsy = (value: unknown) => throwIfFalse(
  !Boolean(value),
  `expected ${value} to be falsy`
);

export const shouldThrow = async (fn: () => unknown | Promise<unknown>) => {
  let _shouldThrow = false;
  try {
    await fn();
    _shouldThrow = true;
  } catch (err) {
    _shouldThrow = false;
  }

  if (_shouldThrow) {
    throw new Error(`should throw, but did not`);
  }
}

export const shouldNotThrow = async (fn: () => unknown | Promise<unknown>) => {
  try {
    await fn();
  } catch (err) {
    throw new Error(`should not throw, but threw: ${err}`);
  }
}