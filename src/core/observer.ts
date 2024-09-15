import { Event, EventType } from '@/types/events';
import { Entity } from './entity';

export abstract class Observer<T extends EventType | unknown = unknown> {
  abstract onNotify(entity: Entity, event: Event<T>): void;
}
