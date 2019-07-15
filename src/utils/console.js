import chalk from 'chalk';
import cli from 'cli-progress';

class Logger {
  constructor(config = {}) {
    this.verbose = config.verbose;
    this.bar = new cli.Bar({ clearOnComplete: true }, cli.Presets.shades_classic);
  }

  progress = {
    start: function(totalValue, startValue) {
      if (this.verbose === false) {
        return;
      }
      this.bar.start(totalValue, startValue);
    }.bind(this),

    update: function() {
      if (this.verbose === false) {
        return;
      }
      this.bar.update(arguments);
    }.bind(this),

    increment: function(amount) {
      if (this.verbose === false) {
        return;
      }
      this.bar.increment(amount);
    }.bind(this),

    stop: function() {
      if (this.verbose === false) {
        return;
      }
      this.bar.stop();
    }.bind(this),
  }

  log = (message, type) => {
    if (this.verbose === false) {
      return;
    }

    const color = type === 'error' ? 'red' :
      type === 'success' ? 'green' :
        type === 'warning' ? 'yellow' : 'cyan';

    const logFunc = type === 'error' ? console.error :
      type === 'warning' ? console.warn : console.log;

    if (type) {
      logFunc(chalk[color](type), message);
    } else {
      logFunc(message);
    }
  };
}

const defaultLogger = new Logger();
const log = defaultLogger.log;

export {
  Logger,
  log
};
