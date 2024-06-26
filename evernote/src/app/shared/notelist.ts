import {Note} from "./note";
import {User} from "./user";

export class Notelist {
  constructor(
    public id:number,
    public name:string,
    public visibility:boolean,
    public creator_id:number,
    //public creator: User,
    public notes: Note[],
    public user?: User[]
  ) {}
}
