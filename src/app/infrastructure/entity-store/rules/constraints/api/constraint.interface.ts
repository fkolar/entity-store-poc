export interface Constraint<TModel> {
  isValid(value: TModel): boolean;
}

export class NotEmptyConstraint implements Constraint<string> {

  constructor() {
  }

  isValid(value: string): boolean {
    return false;
  }
}
