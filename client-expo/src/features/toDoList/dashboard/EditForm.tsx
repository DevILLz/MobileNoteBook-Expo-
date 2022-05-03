import { toDo } from '../../../app/models/toDo';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, View, Text } from 'react-native';
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
            todo.creationDate = new Date();
            todo.description = description;
            todo.isImportant = isImportant;            
            createToDo(todo).then(() => {
                closeForm();
            });
        }
    }
    return (
        <View style={styles.ColumnsGroup}>
            <View style={styles.column1}>
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
                    textStyle={styles.title}
                    iconStyle={{ borderColor: "green", alignSelf: "center" }}
                    onPress={(isChecked: boolean) => { setIsImportant(isChecked) }}
                />
            </View>
            <View style={styles.column2}>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>accept</Text>
                </Pressable>
                <Pressable style={styles.button2} onPress={closeForm}>
                    <Text style={styles.buttonText}>cancel</Text>
                </Pressable>
            </View>
        </View>
    )
})
const styles = StyleSheet.create({
    ColumnsGroup:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    column1:{
        width: "73%",
    },
    column2:{
        justifyContent: "center",
        width: "25%",
    },
    title: {
        fontSize: 20,
        color: "black",
        marginVertical: 4,
        textDecorationLine: "none",
    },
    input: {
        height: 30,
        borderWidth: 1,
        padding: 5,
        marginBottom: 5,
        marginRight: 5,
        borderRadius: 5
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#038c2c',
      },
      button2: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#ff2e2e',
      },
      buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textTransform: 'uppercase',
      }
});
