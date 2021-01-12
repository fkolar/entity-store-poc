import {EntityComposite} from '../types';


export interface Predicate<TModel> {
  operands: Predicate<TModel> | Array<Predicate<TModel>>;
}


export abstract class BinaryPredicate<TModel extends EntityComposite> implements Predicate<TModel> {

  constructor(public readonly operands: Array<Predicate<TModel>>) {
  }
}

export class AndPredicate<TModel> {

  constructor(public readonly operands: Array<Predicate<TModel>>) {
  }
}

export class EqPredicate<TModel> implements Partial<Predicate<TModel>> {
  operands: Predicate<TModel> | Array<Predicate<TModel>>;

  constructor(public readonly property: PType, public readonly value: PVal) {
  }

}

