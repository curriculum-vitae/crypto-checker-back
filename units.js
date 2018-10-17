const units = [];

const sampleAsyncAction = (wait = 10) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          data: `DataFromSingleUnitAsString at ${Date.now()}`
        }),
      wait
    );
  });
};

units.push({
  title: "Existance in the universe",
  run: async form => {
    try {
      const result = await sampleAsyncAction(100);
      return {
        error: false,
        result: result.data
      };
    } catch (e) {
      return {
        error: true,
        result: "Bad data"
      };
    }
  }
});

units.push({
  title: "Shitting unicorn",
  run: async form => {
    try {
      const result = await sampleAsyncAction(500);
      return {
        error: false,
        result: result.data
      };
    } catch (e) {
      return {
        error: true,
        result: "Bad data"
      };
    }
  }
});

units.push({
  title: "Unit with details",
  run: async form => {
    try {
      const result = await sampleAsyncAction(1000);
      return {
        error: false,
        details: `<p>Client version: Dash 1.1.1</p> <p>Protocol: 70001</p><p>Last block: 100500</p>`,
        result: result.data
      };
    } catch (e) {
      return {
        error: true,
        result: "Bad data"
      };
    }
  }
});

units.push({
  title: "And the answer to the universe is...",
  run: async form => {
    try {
      const result = await sampleAsyncAction(1000);
      return {
        error: false,
        result: result.data
      };
    } catch (e) {
      return {
        error: true,
        result: "Bad data"
      };
    }
  }
});

units.push({
  title: "... wait for it...",
  run: async form => {
    try {
      const result = await sampleAsyncAction(2000);
      return {
        error: false,
        result: result.data
      };
    } catch (e) {
      return {
        error: true,
        result: "Bad data"
      };
    }
  }
});

units.push({
  title: "... faking error... creating suspensious ...",
  run: async form => {
    try {
      const result = await sampleAsyncAction(1000);
      return {
        error: true,
        result: result.data
      };
    } catch (e) {
      return {
        error: true,
        result: "Bad data"
      };
    }
  }
});

units.push({
  title: "42",
  run: async form => {
    try {
      const result = await sampleAsyncAction(3000);
      return {
        error: false,
        result: result.data
      };
    } catch (e) {
      return {
        error: true,
        result: "Bad data"
      };
    }
  }
});

module.exports = units;
