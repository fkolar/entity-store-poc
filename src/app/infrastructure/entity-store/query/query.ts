import {Type} from '@angular/core';
import {AndPredicate, EqPredicate, Predicate} from './predicate';
import {EntityComposite} from '../types';
import {Observable, of} from 'rxjs';

§

export class Query<TModel extends EntityComposite> {
  entityId: string;

  // we definitely replace this with some OrderBy object
  orderByFields: Array<string>;


  constructor(private resultType: Type<TModel>) {
  }

  where(specification: Predicate<TModel>): Query<TModel> {

    return this;
  }

  byId(id: string): Query<TModel> {
    this.entityId = id;
    return this;
  }


  eq<PType extends keyof TModel>(property: PType, value: TModel[PType]): EqPredicate<TModel, PType> {
    return null;
  }

  find(): Observable<TModel | Array<TModel>> {
    return of(null);
  }


  select(): Observable<TModel | Array<TModel>> {
    return of(null);
  }
}


export function and<TModel>(left: Predicate<TModel>, right: Predicate<TModel>): AndPredicate<TModel> {
  return new AndPredicate<TModel>([left, right]);
}


export function eq<TModel extends EntityComposite,
  PType extends keyof TModel>(property: PType,
                              value: any): EqPredicate<TModel, PType> {
  return new EqPredicate<TModel, PType, PVal>(property, value);
}


