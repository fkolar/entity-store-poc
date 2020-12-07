import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CheckoutPageComponent} from './views/checkout-page/checkout-page.component';
import {LineItem, Requisition, User} from './domain/data/requisition.entity';
import {EntityStoreModule} from './infrastructure/entity-store/entity-store.module';
import {RequisitionEntityStoreService} from './infrastructure/entity-store/ngrx/requisition-entity-store';
import {REQS} from './infrastructure/entity-store/entity-store';


@NgModule({
  declarations: [
    AppComponent,
    CheckoutPageComponent
  ],
  imports: [
    BrowserModule,
    EntityStoreModule.configureStores([RequisitionEntityStoreService])
  ],
  providers: [
    {
      provide: REQS,
      useFactory: () => createReqsDB(),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


export function createReqsDB(): Requisition[] {
  const prs: Requisition[] = [];

  for (let i = 1; i < 100; i++) {
    const pr = new Requisition(`identity-${i}`,
      `title-${i}`,
      100 * i,
      new User(`uid-${i}`, `fullName-${i}`));

    for (let l = 1; l < 50; l++) {
      pr.addLineItem(new LineItem(`name-${l}`, 3));
    }
    prs.push(pr);
  }
  return prs;
}
