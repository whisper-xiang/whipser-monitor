import { EventTypes } from "./constants";
import { ReportData } from "./tracker";
export interface Plugin {
  name: string;
  monitor: (emit: (data: any) => void) => void;
  transform: (collectedData: any) => any;
  // transform: (collectedData: any) => ReportData<any>;
}

export interface CollectedType {
  type: EventTypes;
  data: ErrorEvent | MouseEvent | any;
}
