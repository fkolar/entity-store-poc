import {Component, OnInit} from '@angular/core';
import {EntityStore} from '../../infrastructure/entity-store/entity-store';
import {Requisition} from '../../domain/data/requisition.entity';
import {EntityStoreFactory} from '../../infrastructure/entity-store/entity-store-factory';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  private entityStore: EntityStore<Requisition>;
  requisition$: Observable<Requisition>;

  constructor(private entityStoreFactory: EntityStoreFactory) {
    this.entityStore = this.entityStoreFactory
      .forEntity(Requisition)
      .create<Requisition>();
  }

  ngOnInit(): void {
    this.requisition$ = this.entityStore.get('identity-1');
  }

  changeQty(pr: Requisition): void {
    pr.lineItems[0].quantity++;
    console.log('Qantity Changed by User: ', pr.lineItems[0].quantity);
  }
}
