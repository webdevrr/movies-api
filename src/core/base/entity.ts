export class Entity {
  private _id: number;

  constructor(id: number) {
    this.id = id;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
