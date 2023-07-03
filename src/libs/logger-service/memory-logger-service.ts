import { LoggerService } from "@/src/libs/logger-service/logger-service";

export class MemoryLogger implements LoggerService {
  public logQueue: any[];
  constructor() {
    this.logQueue = [];
  }
  debug(...msg: any): void {
    this.logQueue.push(msg);
  }
  info(...msg: any): void {
    this.logQueue.push(msg);
  }
  warning(...msg: any): void {
    this.logQueue.push(msg);
  }
  error(...msg: any): void {
    this.logQueue.push(msg);
  }

  public reset() {
    this.logQueue = [];
  }
}
