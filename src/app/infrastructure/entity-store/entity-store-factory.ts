import {Injectable, Type} from '@angular/core';
import {DefaultEntityStore, EntityStore} from './entity-store';
import {EntityComposite} from './types';
import {EntityStoreLocator} from './entity-store-locator';
import {Requisition} from '../../domain/data/requisition.entity';


// this should be more abstract factory
@Injectable({providedIn: 'root'})
export class EntityStoreFactory {
  private currentImpl: EntityStore<Requisition>;

  constructor(private storeLocator: EntityStoreLocator) {
  }

  create<T extends EntityComposite>(type?: Type<T>): EntityStore<T> {
    return new DefaultEntityStore(this.currentImpl);
  }

  forEntity(type: Type<any>): EntityStoreFactory {
    this.currentImpl = this.storeLocator.find<Requisition>(type.name);
    return this;
  }

  withFirstResult(start: number): EntityStoreFactory {
    return this;
  }

  withMaxResult(start: number): EntityStoreFactory {
    return this;
  }


}
