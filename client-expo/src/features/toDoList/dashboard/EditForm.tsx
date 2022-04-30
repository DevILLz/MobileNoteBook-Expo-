import { toDo, toDoFormValues } from '../../../app/models/toDo';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import { StyleSheet, TextInput, Button } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { runInAction } from 'mobx';

interface Props {
    closeForm: () => void;
}

export default observer(function EditForm({ closeForm }: Props) {
    const { ToDoListStore } = useStore();
    const { createToDo, updateToDo, clearSelectedToDo, selectedToDo } = ToDoListStore;

    const [description, setDescription] = useState('')
    const [isImportant, setIsImportant] = useState(false);
    const [date, setDate] = useState<Date>(new Date());


    useEffect(() => {
        if (selectedToDo) {
            setIsImportant(selectedToDo.isImportant);
            setDescription(selectedToDo.description);
        }
    }, [])

    function handleSubmit() {
        if (selectedToDo) {
            runInAction(() => {
                selectedToDo.isImportant = isImportant;
                selectedToDo.description = description;
            });
            updateToDo(selectedToDo).then(() => {
                clearSelectedToDo();
                closeForm();
            });
        }
        else{
            const todo = new toDo();
            todo.id = uuid();
            todo.creationDate = new Date();
            todo.description = description;
            todo.isImportant = isImportant;
            
            createToDo(todo).then(() => {
                closeForm();
            });
        }
    }
    return (
        <Grid>
            <Col size={80}>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Description"
                    keyboardType="default"
                />

                <BouncyCheckbox
                    isChecked={selectedToDo?.isImportant ?? false}
                    size={20}
                    fillColor="green"
                    unfillColor="#aaa"
                    text="Is Important ?"
                    iconStyle={{ borderColor: "green", alignSelf: "center" }}
                    onPress={(isChecked: boolean) => { setIsImportant(isChecked) }}
                />
            </Col>
            <Col size={20}>
                <Button title="accept" onPress={handleSubmit} color='green' />
                <Button title="cancel" onPress={closeForm} color='red' />
            </Col>
        </Grid>
    )
})
const styles = StyleSheet.create({
    input: {
        height: 30,
        borderWidth: 1,
        padding: 5,
        marginBottom: 5,
        marginRight: 5,
        borderRadius: 5
    },
});
