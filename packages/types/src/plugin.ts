import { EventTypes } from "./constants";
import { ReportData } from "./tracker";
export interface Plugin {
  name: string;
  observer: (emit: (data: any) => void) => void;
  watcher: (collectedData: any) => any;
  // watcher: (collectedData: any) => ReportData<any>;
}

export interface CollectedType {
  type: EventTypes;
  data: ErrorEvent | MouseEvent | any;
  [key: string]: any;
}
