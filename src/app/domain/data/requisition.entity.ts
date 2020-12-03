import {EntityComposite, ValueComposite} from '../../infrastructure/entity-store/types';

export class Requisition implements EntityComposite {
  className = 'Requisition';

  constructor(public id: string, public title?: string, public amount?: number,
              public requester?: User, public lineItems: Array<LineItem> = []) {
  }
}


export class LineItem implements ValueComposite {

  get className(): string {
    return 'LineItem';
  }

  constructor(public name: string, public quantity: number) {
  }
}


export class User implements EntityComposite {
  get className(): string {
    return 'User';
  }
  
  constructor(public id: string, public fullName: string) {
  }
}
