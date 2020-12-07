import {BehaviorSubject} from 'rxjs';


export interface EntityModelStateChanged {
  type: 'UPDATE' | 'RESET';
  fetchStrategy: 'NONE' | 'FETCH_ONLY' | 'PUSH_AND_FETCH' | 'PUSH';
  property?: string;
  previousValue?: any;
  currentValue?: any;
  context?: any;
  subContext?: any;
}

export class EntityStateMonitor {
  private static _instance: EntityStateMonitor;
  entityStateChanges$ = new BehaviorSubject<EntityModelStateChanged>(null);

  monitor = false;

  private constructor() {
  }


  public static getInstance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  /**
   * This more method for UnitofWork that I described in gitbook, where we create Entity, build, .. and from that points we need to listen
   * for all teh changes and stop listening when UoW - the specific usecase is completed.
   *
   * This is just temporary so Watch decorators is not firing like crazy.
   */
  startMonitoring(): void {
    this.monitor = true;
  }


  stopMonitoring(): void {
    this.monitor = false;
  }
}
