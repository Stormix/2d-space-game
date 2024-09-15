import { Entity, EntityType } from '@/core/entity';
import { PhysicsEngine } from '@/core/physics';
import { Body, Box } from 'planck';
import { BoxGeometry, Group, Mesh, MeshBasicMaterial, Vector2 } from 'three';

export class Ship extends Entity {
  size = new Vector2(50, 50);
  scale = new Vector2(1, 1);
  mesh: Group;
  shooting = false;
  lockCamera = false;
  _health = 100;
  physics: Body;
  lastAttacker: string | null = null;

  createHealthBar(relativePosition = new Vector2(0, 0)) {
    const health = new Mesh(new BoxGeometry(this.size.x, 5), new MeshBasicMaterial({ color: 0xff0000 }));
    const missingHealth = new Mesh(new BoxGeometry(this.size.x, 5), new MeshBasicMaterial({ color: 0x00ff00 }));

    health.position.set(...relativePosition.toArray(), 0);
    missingHealth.position.set(...relativePosition.toArray(), 1);

    return {
      health,
      missingHealth
    };
  }

  constructor(position: Vector2, color: number = 0x00ff00) {
    super(EntityType.Ship);

    const shipGeometry = new BoxGeometry(this.size.x, this.size.y);
    const material = new MeshBasicMaterial({ color });

    this.physics = PhysicsEngine.instance.world.createBody({
      gravityScale: 0,
      type: 'dynamic',
      position: position,
      angle: 0,
      angularDamping: 2.0,
      linearDamping: 0.5,
      userData: {
        id: this.id
      }
    });

    this.physics.createFixture({
      shape: new Box(10, 10),
      density: 1,
      friction: 0
    });

    this.physics.setMassData({
      mass: 10,
      center: { x: 0, y: 0 },
      I: 1
    });

    const { health, missingHealth } = this.createHealthBar(new Vector2(0, this.size.y / 2 + 0));

    this.mesh = new Group();

    this.mesh.add(new Mesh(shipGeometry, material));
    this.mesh.add(health);
    this.mesh.add(missingHealth);

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
    return `Ship: position=${JSON.stringify(this.position)}, velocity=${JSON.stringify(this.velocity)}, rotation=${this.rotation}, shooting=${this.shooting}, health=${this.health}`;
  }

  get health() {
    return this._health;
  }

  set health(health: number) {
    this._health = health;

    if (this.mesh.children?.[2]) {
      const percentage = health / 100;
      this.mesh.children[2].scale.x = percentage;
      this.mesh.children[2].position.x =
        this.mesh.children[1].position.x - (this.size.x - this.size.x * percentage) / 2;
    }
  }
}
