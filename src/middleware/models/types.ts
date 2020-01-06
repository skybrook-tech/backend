export interface Column {
  id?: number;
  name: string;
  type: string;
  options: any;
  _delete?: boolean;
}

export interface Model {
  id?: number;
  name: string;
}

export interface MigrationArgs {
  prevValue?: Column | Model;
  nextValue?: Column | Model;
  project?: any;
  model?: any;
}
