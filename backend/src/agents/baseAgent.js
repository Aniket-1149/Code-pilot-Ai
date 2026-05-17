class BaseAgent {
  constructor(name) {
    this.name = name;
  }

  async run(input) {
    throw new Error(`${this.name} agent not implemented`);
  }
}

module.exports = { BaseAgent };
