import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoText: string = '';
  filter: 'all' | 'active' | 'completed' = 'all';
  private readonly STORAGE_KEY = 'todos';

  ngOnInit(): void {
    this.loadTodos();
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem(this.STORAGE_KEY);
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  private saveTodos(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
  }

  addTodo(): void {
    if (this.newTodoText.trim()) {
      this.todos.push({
        id: Date.now(),
        text: this.newTodoText.trim(),
        completed: false
      });
      this.saveTodos();
      this.newTodoText = '';
    }
  }

  toggleTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  get filteredTodos(): Todo[] {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  get remainingTodos(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveTodos();
  }
} 