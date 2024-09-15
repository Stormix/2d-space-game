import { Event } from '@/types/events';
import { Entity } from './entity';
import { Observer } from './observer';

export class EventManager {
  observers = new Set<Observer>();

  add(observer: Observer) {
    this.observers.add(observer);
  }

  remove(observer: Observer) {
    this.observers.delete(observer);
  }

  notify(entity: Entity, event: Event) {
    for (const observer of this.observers) {
      observer.onNotify(entity, event);
    }
  }
}
