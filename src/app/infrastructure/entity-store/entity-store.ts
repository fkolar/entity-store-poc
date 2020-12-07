import {Observable} from 'rxjs';
import {EntityComposite} from './types';
import {InjectionToken} from '@angular/core';
import {EntityModelStateChanged, EntityStateMonitor} from './domain-state-monitor.service';

export const REQS = new InjectionToken('REQ_DB');

export interface EntityStore<T> {
  // this just local adjustments. For Ngrx/data you can pass the type to the constructor
  forType?: string;

  findAll(): Observable<T[]>;

  findBy(predicate: Map<string, any>): Observable<T[]>;

  get(id: string): Observable<T>;

  create(data: EntityComposite): void;
}


export class DefaultEntityStore<T> implements EntityStore<T> {
  ɵsrv: EntityStore<any>;

  constructor(storeImpl: EntityStore<any>) {
    this.ɵsrv = storeImpl;

    this.registerWatchers();
  }

  create(data: EntityComposite): void {
    return this.ɵsrv.create(data);
  }

  findAll(): Observable<T[]> {
    return this.ɵsrv.findAll();
  }

  findBy(predicate: Map<string, any>): Observable<T[]> {
    return this.ɵsrv.findBy(predicate);
  }

  get(id: string): Observable<T> {
    return this.ɵsrv.get(id);
  }

  private registerWatchers(): void {
    EntityStateMonitor.getInstance().entityStateChanges$.subscribe((event) => {
      console.log('Entity Store: Received state chaned', event)
      this.handleStateChanged(event);
    });
  }

  private handleStateChanged(event: EntityModelStateChanged) {
    if (event?.fetchStrategy === 'PUSH_AND_FETCH') {
      console.log('Entity Store: handle state changed: ', event)
    }

  }
}
