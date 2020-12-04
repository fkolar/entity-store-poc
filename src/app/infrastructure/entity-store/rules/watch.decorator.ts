import {SimpleChange} from '@angular/core';
import {environment} from '../../../../environments/environment';

export function Watch<T = any>(what: string) {
  const cachedValueKey = Symbol();
  const isFirstChangeKey = Symbol();

  return (target: any, key: PropertyKey, index?: number) => {
    const values = new Map<any, T>();
    if (!environment.monitor) {
      return;
    }

    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      set: function(value) {
        // change status of "isFirstChange"
        this[isFirstChangeKey] = this[isFirstChangeKey] === undefined;
        if (this[isFirstChangeKey] || this[cachedValueKey] === value) {
          return;
        }
        const oldValue = this[cachedValueKey];
        this[cachedValueKey] = value;

        const simpleChange: SimpleChange = {
          firstChange: this[isFirstChangeKey],
          previousValue: oldValue,
          currentValue: this[cachedValueKey],
          isFirstChange: () => this[isFirstChangeKey],
        };

        // here inject some EntityMonitoringService and emit event that this is changed and based on passed inputs to this WATCH
        // EntityStores updates or resets the entity or do some other actions.
        // console.log('Watcher => ', this[cachedValueKey]);
      },
      get: function() {
        return this[cachedValueKey];
      }
    });
  };
}
