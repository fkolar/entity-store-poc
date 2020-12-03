import {CommonModule} from '@angular/common';
import {EntityStore} from './entity-store';
import {Constructor} from './constructor';
import {InjectionToken, Injector, ModuleWithProviders, NgModule} from '@angular/core';

export const ENTITY_STORES = new InjectionToken('ENTITY_STORES');

@NgModule({
  imports: [CommonModule],
})
export class EntityStoreModule {


  static configureStores(stores: Constructor<EntityStore<any>>[]
  ): ModuleWithProviders<EntityStoreModule> {
    console.log('configureStores');
    return {
      ngModule: EntityStoreModule,
      providers: [
        stores,
        {
          provide: ENTITY_STORES,
          useFactory: (injector: Injector) => createStores(injector, stores),
          deps: [Injector],
        },
      ],
    };
  }

}


export function createStores(injector: Injector, stores: Constructor<EntityStore<any>>[]) {
  return stores.map(store => injector.get(store));
}
