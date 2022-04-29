import { Grid, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import ToDoList from './ToDoList';
import LoadingComponent from './../../../app/layout/LoadingComponents';
import { useStore } from './../../../app/stores/store';


export default observer(function ToDoDashboard() {
    
    const {ToDoListStore} = useStore();
    const {loadtoDoList, toDoList} = ToDoListStore;
    useEffect(() => { 
        if (toDoList.size <= 1) loadtoDoList();
     }, [loadtoDoList, toDoList])
  
     
    if (ToDoListStore.loadingInitial) return <LoadingComponent content="Loading app" />
    return (
        <ToDoList/>
    )
})