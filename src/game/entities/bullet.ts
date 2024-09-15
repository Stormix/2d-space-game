import { Entity, EntityType } from '@/core/entity';
import { PhysicsEngine } from '@/core/physics';
import { Body, CircleShape } from 'planck';
import { CircleGeometry, Group, Mesh, MeshBasicMaterial, Vector2 } from 'three';

export class Bullet extends Entity {
  size = new Vector2(10, 10);
  scale = new Vector2(1, 1);
  mesh: Group;
  projectile = true;
  physics: Body;
  lifetime = 100;
  parent: Entity['id'] | null;

  constructor(position = new Vector2(0, 0), rotation = 0, velocity = new Vector2(0, 0), parent: string | null = null) {
    super(EntityType.Bullet);

    this.physics = PhysicsEngine.instance.world.createBody({
      bullet: true,
      type: 'dynamic',
      position,
      angle: rotation,
      linearDamping: 0,
      angularDamping: 0.1,
      allowSleep: false,
      userData: {
        id: this.id
      }
    });

    this.physics.createFixture({
      shape: new CircleShape(this.size.x),
      density: 1,
      friction: 0.01
    });

    this.physics.setMassData({
      mass: 1,
      center: { x: 0, y: 0 },
      I: 1
    });

    this.velocity = velocity;
    this.parent = parent;

    const geometry = new CircleGeometry(this.size.x);
    const material = new MeshBasicMaterial({ color: 0xff0000 });

    this.mesh = new Group();
    this.mesh.add(new Mesh(geometry, material));
    this.mesh.position.set(position.x, position.y, 0);
  }

  get position() {
    const { x, y } = this.physics.getPosition();
    return new Vector2(x, y);
  }

  set position(position: Vector2) {
    this.physics.setPosition(position);
  }

  get rotation() {
    return this.physics.getAngle();
  }

  set rotation(rotation: number) {
    this.physics.setAngle(rotation);
  }

  get velocity() {
    const { x, y } = this.physics.getLinearVelocity();
    return new Vector2(x, y);
  }

  set velocity(velocity: Vector2) {
    this.physics.setLinearVelocity(velocity);
  }

  toString() {
    return `Bullet (${JSON.stringify(this.position)}, v=${JSON.stringify(this.velocity)}, r=${this.rotation}, mass=${this.physics.getMass()})`;
  }
}
