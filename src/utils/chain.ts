class Chain {
  handler: (...args) => any;
  successor: Chain;
  constructor(handler) {
    this.handler = handler;
    this.successor = null;
  }

  setSuccessor(successor) {
    this.successor = successor;
    return this;
  }

  passRequest(...args) {
    const result = this.handler(...args);
    if (result === 'next') {
      return this.successor && this.successor.passRequest(...args);
    }
    return result;
  }
}
