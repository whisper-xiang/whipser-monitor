export interface Plugin {
  name: string;
  monitor: (emit: (data: any) => void) => void;
  transform: (collectedData: any) => any;
  [key: string]: any;
}
