/* istanbul ignore file */
import { LoggerService } from "@/src/libs/logger-service/logger-service";

export class StdoutLogger implements LoggerService {
  debug(...msg: any): void {
    console.debug(...msg);
  }
  info(...msg: any): void {
    console.info(...msg);
  }
  warning(...msg: any): void {
    console.warn(...msg);
  }
  error(...msg: any): void {
    console.error(...msg);
  }
}
