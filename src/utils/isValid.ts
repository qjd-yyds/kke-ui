const isValid = (value: unknown) => {
  return value !== undefined && value !== null && value !== '';
};

export { isValid };
