import { Entity } from './entity';

export abstract class Mapper<I extends Entity, O> {
  abstract toDto(param: I): O;
}
