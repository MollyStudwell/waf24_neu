import {Image} from "./image";

export class User {
  constructor(
    public id:number,
    public firstname:string,
    public lastname:string,
    public email:string,
    public picture? : Image) {
  }
}
