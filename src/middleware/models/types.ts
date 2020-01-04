export interface Column {
  id?: number;
  name: string;
  type: string;
  options: any;
  _delete?: boolean;
}

export interface MigrationArgs {
  prevValue?: Column;
  nextValue?: Column;
  project?: any;
  model?: any;
}
