import { Entity } from './entity';

export abstract class Repository<TEntity extends Entity> {
  abstract create(entity: TEntity): void;
}
