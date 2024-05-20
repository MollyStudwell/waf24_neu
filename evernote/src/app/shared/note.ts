import {Image} from "./image";
export {Image} from "./image";
import {Category} from "./category";
import {TodoList} from "./todo-list";
export {Category} from "./category";

export class Note {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public notelist_id: number,
    public categories?: Category[],
    public todos?: TodoList[],
    public images?: Image[]

  ) {}
}
