import {EntityComposite, ValueComposite} from '../../infrastructure/entity-store/types';

export class Requisition implements EntityComposite {
  className = 'Requisition';
  title: string;

  constructor(public id: string,
              title?: string,
              public amount?: number,
              public requester?: User, public lineItems: Array<LineItem> = []) {
    this.title = title;
  }


  addLineItem(lineItem: LineItem): void {
    Object.defineProperty(lineItem, '__context__', {value: this, configurable: true, enumerable: false, writable: false});
    this.lineItems.push(lineItem);
  }
}

export class LineItem implements ValueComposite {
  // @Trigger({propageTo: {'companyCode', 'accounting'}, action: Default })
  // @NotEmpty()
  public quantity: number = 0;

  // @OnStateChange('quantity', Handler1)
  name: string;


  get className(): string {
    return 'LineItem';
  }

  constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }
}


export class User implements EntityComposite {
  className: string;

  constructor(public id: string, public fullName: string) {
  }
}
