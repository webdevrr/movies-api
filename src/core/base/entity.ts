export class Entity {
  private _id: number;

  set id(value: number) {
    this._id = value;
  }

  get id() {
    return this._id;
  }
}
