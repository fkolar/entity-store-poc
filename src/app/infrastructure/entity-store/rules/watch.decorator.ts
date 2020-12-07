import {EntityModelStateChanged, EntityStateMonitor} from '../domain-state-monitor.service';

export function Watch<T = any>(event: EntityModelStateChanged) {
  const cachedValueKey = Symbol();
  const isFirstChangeKey = Symbol();

  return (target: any, key: PropertyKey, index?: number) => {
    const values = new Map<any, T>();

    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      set: function(value) {

        this[isFirstChangeKey] = this[isFirstChangeKey] === undefined;
        if (this[isFirstChangeKey] || this[cachedValueKey] === value) {
          return;
        }
        const oldValue = this[cachedValueKey];
        this[cachedValueKey] = value;
        const entityStateMonitor = EntityStateMonitor.getInstance();
        if (!entityStateMonitor.monitor) {
          return;
        }
        console.log('Watch Decorator detected chane  => ', `oldValue: ${oldValue}  , currentValue: ${this[cachedValueKey]}`);

        entityStateMonitor.entityStateChanges$.next({
          fetchStrategy: event.fetchStrategy,
          type: event.type,
          currentValue: this[cachedValueKey],
          previousValue: oldValue,
          property: key as string,
          context: this['__context__'],
          subContext: this
        });
      },
      get: function() {
        return this[cachedValueKey];
      }
    });
  };
}
