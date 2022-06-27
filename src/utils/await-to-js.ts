export function to<T, U = Error>(promise: Promise<T>, errorExt?: object) {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parseError = Object.assign({}, err, errorExt);
        return [parseError, undefined];
      }
      return [err, undefined];
    });
}

export default to;