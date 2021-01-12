import {Injectable, Type} from '@angular/core';
import {EntityComposite} from '../types';
import {Query} from '../query/query';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class QueryBuilder<TModel extends EntityComposite> {

  constructor() {

  }

  newQuery(resultType: Type<TModel>): Query<TModel> {
    // set some implicit query params based on some globally injected options
    return new Query<TModel>(resultType);
  }

}


