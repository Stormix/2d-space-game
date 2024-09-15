import { Entity } from '@/core/entity';
import { EventProcessor } from '@/core/processors';

export enum Priority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  CRITICAL = 3
}

export enum EventType {
  UI = 'ui',
  GAME = 'game'
}

export enum GameEventType {
  SHIP_DESTROYED = 'ship_destroyed'
}

export type GameEventPayload = {
  [GameEventType.SHIP_DESTROYED]: {
    ship: Entity;
    attacker: Entity['id'] | null;
  };
};

export interface GameEvent {
  type: GameEventType;
  data: GameEventPayload[keyof GameEventPayload];
}

export interface UiEvent {
  type: string;
  data: unknown;
}

type EventPayload<T extends EventType | unknown> = T extends EventType.UI
  ? UiEvent
  : T extends EventType.GAME
    ? GameEvent
    : unknown;

export interface Event<T extends EventType | unknown = unknown> {
  priority?: number;
  type: T;
  data: EventPayload<T>;
}

export type EventProcessors = Record<EventType, EventProcessor>;
