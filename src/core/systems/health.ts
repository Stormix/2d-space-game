import { Ship } from '@/game/entities/ship';
import { EventType, GameEventType } from '@/types/events';
import { Engine } from '../engine';
import { Component, EntityType } from '../entity';
import { System } from '../system';

export class HealthSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.Health]);
  }

  update() {
    for (const entity of this.entities) {
      if (entity.health! <= 0) {
        switch (entity.type) {
          case EntityType.Ship: {
            const ship = entity as Ship;
            const event = {
              type: EventType.GAME,
              data: {
                type: GameEventType.SHIP_DESTROYED,
                data: {
                  ship,
                  attacker: ship.lastAttacker
                }
              }
            };

            this.engine.eventManager.notify(ship, event);
            this.engine.queue.push(event);
            this.engine.remove(entity);
            break;
          }
          default:
            break;
        }
      }
    }
  }
}
