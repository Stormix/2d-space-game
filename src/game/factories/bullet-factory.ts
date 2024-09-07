import { Factory } from '../../core/factory';
import { Bullet } from '../entities/bullet';

export class BulletFactory extends Factory<Bullet> {
  create(components: Partial<Bullet>) {
    const bullet = new Bullet(
      components.position || undefined,
      components.rotation || undefined,
      components.velocity || undefined
    );

    return bullet;
  }
}
