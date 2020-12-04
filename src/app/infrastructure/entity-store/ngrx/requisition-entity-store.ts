import {EntityStore, REQS} from '../entity-store';
import {LineItem, Requisition} from '../../../domain/data/requisition.entity';
import {EntityComposite} from '../types';
import {Observable, of} from 'rxjs';
import {Inject, Injectable} from '@angular/core';

/**
 * This simulates concrete library implementations that supposed to comunicate with REST API
 * let's say this would implement ngrx data service collection
 *
 * see EntityCollectionServiceBase
 *
 */
@Injectable()
export class RequisitionEntityStoreService implements EntityStore<Requisition> {
  // this just local adjustments. For Ngrx/data you can pass the type constructor
  forType = 'Requisition';

  constructor(@Inject(REQS) private prDB: Requisition[]) {
    console.log('registering.. req service');
  }

  create(data: EntityComposite): void {
    return undefined;
  }

  findAll(): Observable<Requisition[]> {
    return of(this.prDB);
  }

  findBy(predicate: Map<string, any>): Observable<Requisition[]> {
    return undefined;
  }

  get(id: string): Observable<Requisition> {
    return of(this.prDB.filter((pr) => pr.id === id)[0]);
  }

  updateLineItem(lineItem: LineItem): void {
    console.log('LI Updated');
  }

}
