import { Entity } from './entity';

export abstract class Repository<TEntity extends Entity> {
  abstract list(): Promise<TEntity[]>;
  abstract create(entity: TEntity): void;
}
