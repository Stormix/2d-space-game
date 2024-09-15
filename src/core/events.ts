import { Event, EventProcessors, EventType } from '@/types/events';
import { Engine } from './engine';
import { GameEventProcessor, UIEventProcessor } from './processors';

export const isValid = (event: EventType | unknown): event is EventType => {
  return Object.values(EventType).includes(event as EventType);
};

export class EventQueue {
  queue: Event[] = [];
  maxEventsPerUpdate = 10;
  processors: EventProcessors;

  constructor(
    readonly engine: Engine,
    maxEventsPerUpdate: number = 10
  ) {
    this.maxEventsPerUpdate = maxEventsPerUpdate;
    this.engine = engine;

    this.processors = [new UIEventProcessor(this.engine), new GameEventProcessor(this.engine)].reduce(
      (acc, processor) => {
        acc[processor.eventType] = processor;
        return acc;
      },
      {} as EventProcessors
    );
  }

  push(event: Event) {
    this.queue.push(event);
    this.queue.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
  }

  pop() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  length() {
    return this.queue.length;
  }

  update() {
    for (let i = 0; i < Math.min(this.queue.length, this.maxEventsPerUpdate); i++) {
      const event = this.queue.pop();
      if (!event || !isValid(event.type)) {
        console.warn('Invalid event found in queue', event);
        continue;
      }

      const processor = this.processors[event.type];
      if (!processor) {
        console.warn(`No processor found for event type: ${event.type}`);
        continue;
      }

      processor.process(event);
    }
  }
}
