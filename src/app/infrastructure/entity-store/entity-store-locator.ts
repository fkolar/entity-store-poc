import {Inject, Injectable} from '@angular/core';
import {EntityStore, REQS} from './entity-store';
import {EntityComposite} from './types';
import {Requisition} from '../../domain/data/requisition.entity';
import {ENTITY_STORES} from './entity-store.module';

@Injectable({providedIn: 'root'})
export class EntityStoreLocator {
  cache: Map<string, EntityStore<any>> = new Map<string, EntityStore<any>>();

  constructor(@Inject(ENTITY_STORES) private stores: EntityStore<any>[]) {
    stores.forEach(e => this.cache.set(e.forType, e));
  }

  find<T>(type: string): EntityStore<T> {
    if (this.cache.has(type)) {
      return this.cache.get(type);
    }
    return null;
  }
}
