import { Entity } from './entity';

export abstract class PersistenceMapper<I extends Entity, O> {
  abstract toPersistence(param: I): O;
  abstract toEntity(param: O): I;
}
