import { Factory } from '@/core/factory';
import { Bullet } from '../entities/bullet';

export class BulletFactory extends Factory<Bullet> {
  create(components: Partial<Bullet>) {
    return new Bullet(components.position, components.rotation, components.velocity, components.parent);
  }
}
