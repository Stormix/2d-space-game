import { Bullet } from '@/game/entities/bullet';
import { Ship } from '@/game/entities/ship';
import { BULLET_DAMAGE, SHIP_COLLISION_DAMAGE } from '../../config';
import { Engine } from '../engine';
import { Component, Entity, EntityType } from '../entity';
import { System } from '../system';

export class CollisionSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.Physics]);
  }

  update() {
    const entitiesById = new Map<string, Entity>();
    const physicsProcessed = new Set<Entity['id']>();

    for (const entity of this.entities) {
      entitiesById.set(entity.id, entity);
    }

    for (const entity of this.entities.filter((e) => !physicsProcessed.has(e.id))) {
      for (let edge = entity.physics!.getContactList(); edge; edge = edge.next) {
        const c = edge.contact;
        const a = c?.getFixtureA()?.getBody()?.getUserData() as { id: string };
        const b = c?.getFixtureB()?.getBody()?.getUserData() as { id: string };
        if (!a || !b) continue;

        const entityA = entitiesById.get(a.id);
        const entityB = entitiesById.get(b.id);

        if (entityA && entityB) {
          // Handle collision between entities
          const shipToShip = entityA.type === EntityType.Ship && entityB.type === EntityType.Ship;
          const bulletToShip =
            (entityA.type === EntityType.Bullet && entityB.type === EntityType.Ship) ||
            (entityA.type === EntityType.Ship && entityB.type === EntityType.Bullet);

          if (shipToShip) {
            // Handle collision between two ships
            entityA.health! -= SHIP_COLLISION_DAMAGE;
            entityB.health! -= SHIP_COLLISION_DAMAGE;
            continue;
          }

          if (bulletToShip) {
            // Handle collision between a bullet and a ship
            const bullet = (entityA.type === EntityType.Bullet ? entityA : entityB) as Bullet;
            const ship = (entityA.type === EntityType.Ship ? entityA : entityB) as Ship;

            // Ignore collision if the bullet was fired by the ship
            if (bullet.parent! === ship.id) {
              continue;
            }

            ship.health! -= BULLET_DAMAGE;
            ship.lastAttacker = bullet.parent;
            bullet.lifetime = 0;
            continue;
          }
        }

        physicsProcessed.add(entityA!.id);
        physicsProcessed.add(entityB!.id);
      }
    }
  }
}
