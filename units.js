const units = [];

const sampleActionToTestInput = (input, wait = 10) => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          /*
            This data goes to description field
          */
          data:
            Math.random() > 0.5
              ? `Description generated at ${Date.now()}`
              : null
        }),
      wait
    );
  });
};

units.push({
  title: "Existance in the universe",
  run: async input => {
    try {
      const result = await sampleActionToTestInput(input, 100);
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
  run: async input => {
    try {
      const result = await sampleActionToTestInput(input, 500);
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
  run: async input => {
    try {
      const result = await sampleActionToTestInput(input, 1000);
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
  run: async input => {
    try {
      const result = await sampleActionToTestInput(input, 1000);
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
  run: async input => {
    try {
      const result = await sampleActionToTestInput(input, 2000);
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
  run: async input => {
    try {
      const result = await sampleActionToTestInput(input, 1000);
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
  run: async input => {
    try {
      const result = await sampleActionToTestInput(input, 3000);
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
