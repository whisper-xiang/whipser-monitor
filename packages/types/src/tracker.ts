import { EventTypes } from "./constants";
export interface ReportData<T> {
  type: EventTypes;
  timestamp: number;
  dat: T;
}
