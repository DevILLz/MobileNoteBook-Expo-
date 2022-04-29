import {createContext, useContext} from 'react'
import ToDoListStore from './ToDoListStore';

interface Store {
    ToDoListStore: ToDoListStore;

}

export const store: Store ={
    ToDoListStore: new ToDoListStore()
}

export const StoreContext = createContext(store);
export function useStore() {
    return useContext(StoreContext);
}