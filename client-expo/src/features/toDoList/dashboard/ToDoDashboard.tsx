import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import ToDoList from './ToDoList';
import { useStore } from './../../../app/stores/store';
import { View } from 'react-native';

export default observer(function ToDoDashboard() {
    
    const {ToDoListStore} = useStore();
    const {loadtoDoList, toDoList} = ToDoListStore;
    useEffect(() => { 
        if (toDoList.size <= 1) loadtoDoList();
     }, [loadtoDoList, toDoList])
  

    
    return (
        <View>
            <ToDoList/>            
        </View>
    )
})