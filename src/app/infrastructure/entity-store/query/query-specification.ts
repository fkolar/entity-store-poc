import {Predicate} from './predicate';

export class QuerySpecification<TModel> {


  constructor(private predicateSpecification: Predicate<TModel>) {
  }
}
