import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/models/itodo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  todoList: ITodo[] = [];
  showAddTodoForm: boolean = false;
  newTodo: ITodo = { title: '', isComplete: false };
  private subscriptions: Subscription[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // get all
    const getTodosSubscription = this.todoService.getTodos().subscribe({
      next: (todos) => (this.todoList = todos),
      error: (error) => {
        console.error('Error fetching todos:', error);
        // we can display an error message to the user here
      },
    });
    this.subscriptions.push(getTodosSubscription);
  }

  showAddForm() {
    this.showAddTodoForm = true;
  }
  //Add
  AddToDo() {
    const addTodoSubscription = this.todoService
      .addTodo(this.newTodo)
      .subscribe({
        next: (todo) => {
          this.todoList.push(todo);
        },
        error: (error) => {
          console.error('Error adding todo:', error);
          // we can display an error message to the user here
        },
      });
    this.newTodo.title = '';
    this.subscriptions.push(addTodoSubscription);
  }
  //update
  changeCompleteStatus(todo: ITodo) {
    const updateTodoSubscription = this.todoService
      .editTodo({ ...todo, isComplete: !todo.isComplete })
      .subscribe({
        next: (updatedTodo) => {
          const updatedTodos = this.todoList.map((t) =>
            t.id === updatedTodo.id ? updatedTodo : t
          );
          this.todoList = updatedTodos;
          console.log('update done');
        },
        error: (error) => {
          console.error('Error updating todo:', error);
          // we can display an error message to the user here
        },
      });

    this.subscriptions.push(updateTodoSubscription);
  }
  //delete
  deleteTodo(todo: ITodo) {
    const deleteTodoSubscription = this.todoService.deleteTodo(todo).subscribe({
      next: (deletedTodo) => {
        this.todoList = this.todoList.filter((t) => t.id !== todo.id);
        console.log('delete done');
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
        // we can display an error message to the user here
      },
    });
    this.subscriptions.push(deleteTodoSubscription);
  }

  trackByFn(index: number, todo: ITodo): number {
    return todo.id || index;
  }

  // Unsubscribe from all subscriptions
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
