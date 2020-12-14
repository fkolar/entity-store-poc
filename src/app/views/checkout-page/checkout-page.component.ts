import {Component, OnDestroy, OnInit} from '@angular/core';
import {EntityStore} from '../../infrastructure/entity-store/entity-store';
import {Requisition} from '../../domain/data/requisition.entity';
import {EntityStoreFactory} from '../../infrastructure/entity-store/entity-store-factory';
import {Observable} from 'rxjs';
import {EntityStateMonitor} from '../../infrastructure/entity-store/domain-state-monitor.service';
import {EntityBuilder} from '../../infrastructure/entity-store/builders/entity.builder';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  private entityStore: EntityStore<Requisition>;
  requisition$: Observable<Requisition>;

  constructor(private entityStoreFactory: EntityStoreFactory, private eb: EntityBuilder<Requisition>) {
    this.entityStore = this.entityStoreFactory
      .forEntity(Requisition)
      .create<Requisition>();
  }

  ngOnInit(): void {
    const requisition = this.eb.instanceFor(Requisition, 'Requisition');
    requisition.title = 'new iPhone';
    requisition.amount = 111;
    console.log('requisition.title = ', requisition.title);

    const requisition1 = this.eb.newInstance();

    console.log(requisition1);


    this.requisition$ = this.entityStore.get('identity-1');
    EntityStateMonitor.getInstance().startMonitoring();
  }

  ngOnDestroy(): void {
    EntityStateMonitor.getInstance().stopMonitoring();
  }


  changeQty(pr: Requisition): void {
    console.log('Qantity Changed by User: ', pr.lineItems[0].quantity);
    pr.lineItems[0].quantity++;

  }


}
