import { observer } from 'mobx-react-lite';
import { Item, Checkbox, Grid } from 'semantic-ui-react';
import { useStore } from './../../../app/stores/store';
import { Label } from 'semantic-ui-react';
import { format } from 'date-fns';
import { toDo } from './../../../app/models/toDo';

import { v4 as uuid } from 'uuid';
import { Button } from 'semantic-ui-react';
import EditForm from '../form/EditForm'
import { useState } from 'react';

interface Props {
    toDo: toDo;
}


export default observer(function ToDoItem({ toDo }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const { ToDoListStore } = useStore();
    const { selectedToDo, setSelectedTodo } = ToDoListStore;
    function handleIsCompleated(checked: boolean, todo: toDo) {
        if (!todo.id)
            todo.id = uuid();
        todo.isCompleted = checked;
        ToDoListStore.updateToDo(todo)
    }
    function handleEdit(toDo: toDo): void {
        setIsEditing(true);
        setSelectedTodo(toDo);
    }
    function handleDelete(todo: toDo) {
        ToDoListStore.deleteToDo(todo.id)
    }

    return (
        <div>
            {(selectedToDo === toDo && isEditing)
                ? <EditForm />
                :
                <Grid>
                    <Grid.Column width={13}>
                        <Item id="itemHeader">
                            <Item.Content>
                                {toDo.isImportant &&
                                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, fontSize: 8, marginTop: -15 }}
                                        ribbon color='red' content="Important" />}
                                <Item.Header>
                                    <Checkbox defaultChecked={toDo.isCompleted} onChange={(e, data) => handleIsCompleated(data.checked!, toDo)}
                                        style={{ marginTop: 10, marginRight: 3 }} />
                                    {" "} {toDo.description}
                                </Item.Header>

                                <Item.Description>
                                    Deadline: {format(toDo.deadLine!, 'dd MMM yyyy')}
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button icon='edit'  onClick={() => handleEdit(toDo)} />
                        <Button icon="trash"  onClick={() => handleDelete(toDo)} />
                    </Grid.Column>
                </Grid>}
        </div>
    )
})
