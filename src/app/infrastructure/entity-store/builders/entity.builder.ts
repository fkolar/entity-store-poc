import {Injectable, Type} from '@angular/core';
import {EntityStoreFactory} from '../entity-store-factory';
import {EntityComposite} from '../types';

@Injectable({providedIn: 'root'})
export class EntityBuilder<TModel extends EntityComposite> {
  protected internalState: TModel;

  constructor(private entityStoreFactory: EntityStoreFactory) {
    this.internalState = null;
  }

  instanceFor(model: Type<TModel>, typeName: string): TModel {
    this.internalState = new model();
    this.internalState.className = typeName;
    const proxy = new Proxy(this.internalState, new EntityStateHandler<TModel>());
    return proxy;
  }

  instanceFrom(model: TModel, typeName: string): TModel {
    this.internalState = model;
    const proxy = new Proxy(this.internalState, new EntityStateHandler<TModel>());
    return proxy;
  }

  newInstance(): TModel {
    // TModel implements our lifecyle internet
    // (internalState as EntityLifecyle).invokeCreate();

    // check constraints - check any decorator validator ?
    // reset any internal state
    // this.internalState = null;
    // add this created entity to UoW

    const newState = this.internalState;
    return newState;
  }
}


export class EntityStateHandler<TModel> {
  target: any;


  constructor() {
  }


  get(t: any, p: PropertyKey, r: any): any {
    return this.target[p];
  }

  set(target: TModel, key: PropertyKey, value: any, receiver: any): boolean {
    console.log('Setting internally property', key);

    target[key] = value;
    return true;
  }

}
