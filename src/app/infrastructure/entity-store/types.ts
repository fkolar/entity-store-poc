export interface Composite {
  readonly className: string;
}

export interface EntityComposite extends Composite {
  id: string;
}


// tslint:disable-next-line:no-empty-interface
export interface ValueComposite extends Composite {
}


