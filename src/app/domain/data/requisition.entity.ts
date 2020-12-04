import {EntityComposite, ValueComposite} from '../../infrastructure/entity-store/types';
import {Watch} from '../../infrastructure/entity-store/rules/watch.decorator';

export class Requisition implements EntityComposite {
  state: 'prototype' | 'instance' = 'prototype';
  className = 'Requisition';
  title: string;

  constructor(public id: string, title?: string, public amount?: number,
              public requester?: User, public lineItems: Array<LineItem> = []) {
    this.title = title;
  }


  addLineItem(lineItem: LineItem): void {
    Object.defineProperty(lineItem, '__parent_', {value: this, configurable: true, enumerable: false, writable: false});
    this.lineItems.push(lineItem);
  }
}

export class LineItem implements ValueComposite {

  name: string;

  @Watch('LineItem')
  public quantity: number = 0;

  get className(): string {
    return 'LineItem';
  }

  constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }
}


export class User implements EntityComposite {
  get className(): string {
    return 'User';
  }

  constructor(public id: string, public fullName: string) {
  }
}
