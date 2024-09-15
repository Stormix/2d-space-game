import { Event, EventType, GameEventType } from '@/types/events';
import { Engine } from './engine';

export abstract class EventProcessor<T extends EventType | unknown = unknown> {
  static eventType: EventType;
  constructor(readonly engine: Engine) {
    this.engine = engine;
  }
  abstract process(event: Event<T>): void;
}

export class UIEventProcessor extends EventProcessor<EventType.UI> {
  eventType = EventType.UI;

  process(event: Event<EventType.UI>) {
    console.log('UI Event Processor', event);
  }
}

export class GameEventProcessor extends EventProcessor<EventType.GAME> {
  eventType = EventType.GAME;

  process(event: Event<EventType.GAME>) {
    console.log('Game Event Processor', event);
    const gameEvent = event.data;
    switch (gameEvent.type) {
      case GameEventType.SHIP_DESTROYED: {
        const payload = gameEvent.data;
        const attacker = this.engine.entities.find((e) => e.id === payload.attacker);

        if (attacker) {
          attacker.score ??= 0;
          attacker.score += 100;
        }
      }
    }
  }
}
