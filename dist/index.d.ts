import debug, { Debugger } from 'debug';
declare type scalar = string | number;
export declare class BoltLogger {
    private instance;
    private inheritedData?;
    private logger;
    constructor(instance: Debugger, inheritedData?: Record<scalar, any> | undefined);
    static createLogger(): BoltLogger;
    rawerror(obj: any, record?: Record<scalar, any>): void;
    log(record: Record<scalar, any>): void;
    private logSub;
    error(record: Record<scalar, any>): void;
    panic(record: Record<scalar, any>): void;
    warning(record: Record<scalar, any>): void;
    timing(record: Record<scalar, any> & {
        timediff: number;
        uuid: string;
    }): void;
    verbose(record: Record<scalar, any>): void;
    extend(namespace: string, appendData?: Record<scalar, any>): BoltLogger;
    /**
     * Pushes extra data on the current stack to be added on ever subsequent log call
     * Return the instance itself for convenience
     * @param appendData
     */
    pushExtraData(appendData: Record<scalar, any>): BoltLogger;
    _debug(): debug.Debugger;
}
export default BoltLogger;
