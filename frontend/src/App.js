import React from 'react';
import './App.css';

const API_URL = 'http://127.0.0.1:8000/api/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        task_id: null,
        title: '',
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    console.log('Fetching...');

    fetch(`${API_URL}task-list/`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          todoList: data,
        })
      );
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Name:', name);
    console.log('Value:', value);

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('ITEM:', this.state.activeItem);

    const csrftoken = this.getCookie('csrftoken');

    let url = `${API_URL}task-create/`;

    if (this.state.activeItem.task_id) {
      url = `${API_URL}task-update/${this.state.activeItem.task_id}/`;
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(this.state.activeItem),
    })
      .then(() => {
        this.fetchTasks();
        this.setState({
          activeItem: {
            task_id: null,
            title: '',
            completed: false,
          },
        });
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  };

  startEdit = (task) => {
    this.setState({
      activeItem: task,
    });
  };

  deleteItem = (task) => {
    const csrftoken = this.getCookie('csrftoken');

    fetch(`${API_URL}task-delete/${task.task_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    })
      .then(() => {
        this.fetchTasks();
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  };

  strikeUnstrike = (task) => {
    console.log(task.completed)
    console.log(task.title)
    const updatedTask = { ...task };
    updatedTask.completed = !task.completed;
    const csrftoken = this.getCookie('csrftoken');
    const url = `${API_URL}task-update/${task.task_id}/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ completed: updatedTask.completed, title: updatedTask.title }),
    })
      .then(() => {
        this.fetchTasks();
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });

    console.log('TASK:', updatedTask.completed);
  };

  getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  render() {
    const { todoList, activeItem } = this.state;

    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    onChange={this.handleChange}
                    className="form-control"
                    id="title"
                    value={activeItem.title}
                    type="text"
                    name="title"
                    placeholder="Add task.."
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                </div>
              </div>
            </form>
          </div>

          <div id="list-wrapper">
            {todoList.map((task, index) => (
              <div key={index} className="task-wrapper flex-wrapper">
                <div onClick={() => this.strikeUnstrike(task)} style={{flex:7}}>
                  {task.completed === false ? (
                      <span>{task.title}</span>
                    ) : (
                      <strike>{task.title}</strike>
                    )}
                  </div>
                <div style={{ flex: 1 }}>
                  <button onClick={() => this.startEdit(task)} className="btn btn-sm btn-outline-info">
                    Edit
                  </button>
                </div>
                <div style={{ flex: 1 }}>
                  <button onClick={() => this.deleteItem(task)} className="btn btn-sm btn-outline-dark delete">
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
