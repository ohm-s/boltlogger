import debug, { Debugger } from 'debug';

type scalar = string | number;

export class BoltLogger {
  private logger: Record<string, BoltLogger> = {};

  constructor(private instance: Debugger, private inheritedData?: Record<scalar, any>) {}

  static createLogger(): BoltLogger {
    return new BoltLogger(debug('root'));
  }
  rawerror(obj: any, record?: Record<scalar, any>): void {
    this.error({ err: obj.message, stack: obj.stack ?? '', ...(record ?? {}) });
  }

  log(record: Record<scalar, any>): void {
    if (!this.instance.enabled) return; // Don't execute any JSON stringify operation if logging is not enabled for this tag
    if (this.inheritedData) {
      this.instance(
        JSON.stringify({
          ...(this.inheritedData ?? {}),
          ...record,
        }),
      );
    } else {
      this.instance(JSON.stringify(record));
    }
  }

  private logSub(subNamespace: string, record: Record<scalar, any>): void {
    if (!this.logger[subNamespace]) {
      this.logger[subNamespace] = this.extend(subNamespace);
    }
    this.logger[subNamespace].log(record);
  }

  error(record: Record<scalar, any>): void {
    if (!this.instance.enabled) return;
    this.logSub('error', record);
  }

  panic(record: Record<scalar, any>): void {
    if (!this.instance.enabled) return;
    this.logSub('panic', record);
  }

  warning(record: Record<scalar, any>): void {
    if (!this.instance.enabled) return;
    this.logSub('warning', record);
  }

  timing(record: Record<scalar, any> & { timediff: number; uuid: string }): void {
    if (!this.instance.enabled) return;
    this.logSub('timing', record);
  }

  verbose(record: Record<scalar, any>): void {
    if (!this.instance.enabled) return; // Don't execute any JSON stringify operation if logging is not enabled for this tag
    this.logSub('verbose', record);
  }

  extend(namespace: string, appendData?: Record<scalar, any>): BoltLogger {
    return new BoltLogger(this.instance.extend(namespace), {
      ...(this.inheritedData ?? {}),
      ...(appendData ?? {}),
    });
  }

  _debug() {
    return this.instance;
  }
}

export default BoltLogger;