import create, { StateCreator } from 'zustand';
import { State } from 'zustand'
import { generateId } from '../helpers';

interface Task {
    id: string,
    title: string,
    createdAt: number
}

interface ToDoStore{
    tasks: Task[];
    createTask: (title : string) => void;
    updateTask: (id : string, title: string) => void;
    removeTask: (id:string) => void;
}

function isToDoStore(object: any) : object is ToDoStore{
    return 'tasks' in object
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>):
StateCreator<T> =>(set,get,api) => config((nextState, ...args)=>{
    if(isToDoStore(nextState)){
        window.localStorage.setItem('tasks',JSON.stringify(
        nextState.tasks));}
    set(nextState, ...args);

},get,api)


const currentState = (JSON.parse(window.localStorage.getItem('tasks')||'[]')) as Task[];
    




export const  useToDoStore = create<ToDoStore>(localStorageUpdate((set,get) =>({
  tasks:currentState,
  createTask: (title) => {
    const {tasks} = get();
    //console.log(tasks,11);
    const newTask = {
        id: generateId(),
        title,
        createdAt: Date.now(),
    }
    set({
        tasks: [newTask].concat(tasks),
    })
 },
  updateTask: (id, title) => {
    const {tasks} = get();
    set({
        tasks: tasks.map((task) => ({
            ...task,
            title: task.id === id ? title : task.title,
        })),
    })
  },
  removeTask: (id) => {const {tasks} = get();
  set({
      tasks: tasks.filter((task) => task.id !== id
      )
  })
},
})));