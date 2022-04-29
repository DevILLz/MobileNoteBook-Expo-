import { observer } from 'mobx-react-lite';
import { Header, Item, Segment, Grid } from 'semantic-ui-react';
import { useStore } from './../../../app/stores/store';
import { toDo } from './../../../app/models/toDo';
import { Button } from 'semantic-ui-react';
import EditForm from '../form/EditForm'
import { useState } from 'react';
import ToDoItem from './ToDoItem';

export default observer(function ToDoList() {
    const [isAdd, setIsAdd] = useState(false);
    const { ToDoListStore } = useStore();
    const { groupedListByDate: toDoList, selectedToDo, setSelectedTodo } = ToDoListStore;

    function HandleAdd(todo?: toDo) {
        if (todo) setSelectedTodo(todo);
        setIsAdd(!isAdd);
    }
    return (
        <Grid centered>
            <Grid.Row >
                <Button style={{ position: 'static', top: '20px' }} content="Add" onClick={() => HandleAdd()} />
            </Grid.Row>
            <Grid.Column width={16}>
                {isAdd && !selectedToDo && <EditForm />}
            </Grid.Column>
            <Grid.Column width={16}>
                {toDoList.map(([group, list]) => (
                    <Segment compact={false} key={group}>
                        <Item.Group divided>
                            <Header content={group} color="teal" />
                            {list.map(toDo => (
                                <ToDoItem toDo={toDo}  key={toDo.id}/>
                            ))}
                        </Item.Group>
                    </Segment>
                ))}
            </Grid.Column>
        </Grid>
    )    
})
