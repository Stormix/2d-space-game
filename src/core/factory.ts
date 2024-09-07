import { Entity } from './entity';

export abstract class Factory<E extends Entity> {
  abstract create(components: Partial<E>): E;
}
