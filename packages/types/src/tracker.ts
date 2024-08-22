import { EventTypes } from "./constants";
export interface ReportData {
  type: EventTypes;
  timestamp: number;
  error?: string;
  component?: string;
  info?: string;
  [key: string]: any;
}
