import {TodoList} from "./todo-list";


export class TodoFactory {

  static empty() : TodoList {
    return new TodoList(
      0,'', false, false, undefined,'',
      undefined, undefined, undefined, undefined
    )
  }

  static fromObject (rawTodo:any):TodoList {
    return new TodoList(
      rawTodo.id,
      rawTodo.title,
      rawTodo.visibility,
      rawTodo.completed,
      rawTodo.creator_id,
      rawTodo.description,
      rawTodo.due_date,
      rawTodo.notelist_id,
      rawTodo.note_id,
      rawTodo.responsible_person_id,

    );
  }
}
