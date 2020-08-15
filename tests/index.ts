import BoltLogger from '../src/index';
import { assert } from 'console';

describe('logger tests', () => {
  it('basic validation', (done) => {
    let logger = BoltLogger.createLogger();

    logger.log({ test: 1 });

    assert(true, 'no errors were thrown');

    done();
  });
});
