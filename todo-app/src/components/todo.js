import React, { Component } from 'react';
import Header from './Header'
import TodoForm from './TodoForm';
import TodoList from './TodoList'
import './Todo.css';
class Todo extends Component {

  constructor() {
    super()
    this.state = {
      arrayOfTask: [],
      taskEditing: null,
      editingText: ''
    }
  }

  saveTask = (enteredTask) => {
    const currentTask = {
      title: enteredTask,
      id: Math.random().toString(),
      completed: false,
    };
    this.setState([{ arrayOfTask: this.state.arrayOfTask.push(currentTask) }])
  };

  handleRemove = (id) => {
    const updatedArrayOfTask = this.state.arrayOfTask.filter(element => (element.id !== id))
    this.setState({ arrayOfTask: updatedArrayOfTask })
  }

  handleCompleted = (id) => {
    const updatedArrayOfTask = this.state.arrayOfTask.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    })
    this.setState([{ arrayOfTask: updatedArrayOfTask }])
  }

  editTask = (id) => {
    console.log('jiiii')
    const updatedArrayOfTask = this.state.arrayOfTask.map((task) => {
      if (task.id === id) {
        task.title = this.state.editingText
      }
      return task;
    })
    this.setState({ arrayOfTask: updatedArrayOfTask });
    this.setState({ taskEditing: null })
    this.setState({ editingText: '' })

  }

  render() {
    return (
      <section>
        <Header />
        <TodoForm onSaveTask={this.saveTask} />
        <ul className="todo-list-items" id="ul-list">
          {this.state.arrayOfTask.map((task) => (
            <TodoList
              onRemove={() => this.handleRemove(task.id)}
              onComplete={() => this.handleCompleted(task.id)}
              onChecked={task.completed}
              onSubmitEdit={() => this.editTask(task.id)}
              onChangeInput={(e) => this.setState({ editingText: e.target.value })}
              onChangingTitle={() => { this.setState({ taskEditing: task.id }) }}
              editingText={this.state.editingText}
              taskEditing={this.state.taskEditing}
              title={task.title}
              key={task.id}
              id={task.id}
            />
          ))}
        </ul>

      </section>

    );
  }
}

export default Todo;
