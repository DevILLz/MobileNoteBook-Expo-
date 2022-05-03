import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { useStore } from './../../../app/stores/store';
import { toDo } from './../../../app/models/toDo';
import { Text, StyleSheet, Button, View, Pressable } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { runInAction } from 'mobx';

interface Props {
    toDo: toDo;
    edit: (todo: toDo) => void;
}

export default observer(function ToDoItem({ toDo, edit }: Props) {
    const { ToDoListStore } = useStore();
    function handleIsCompleated(checked: boolean) {
        if (!toDo.id)
            toDo.id = uuid();
        runInAction(() => { toDo.isCompleted = checked; })

        ToDoListStore.updateToDo(toDo)
    }

    function handleDelete() {
        ToDoListStore.deleteToDo(toDo.id)
    }

    return (
        <View style={styles.ColumnsGroup}>
            <View style={styles.column1}>
                {toDo.isImportant && <Text style={styles.important}>Important</Text>}

                <BouncyCheckbox
                    isChecked={toDo.isCompleted}
                    size={20}
                    fillColor="green"
                    unfillColor="#aaa"
                    text={toDo.description}
                    textStyle={styles.title}
                    textContainerStyle={styles.title}
                    iconStyle={{ borderColor: "green", alignSelf: "center" }}
                    onPress={(isChecked: boolean) => { handleIsCompleated(isChecked) }}
                >
                </BouncyCheckbox>

                {toDo.deadLine
                    ? <Text style={styles.deadline}>
                        Deadline:  {format(toDo.deadLine, 'dd MMM yyyy')}
                    </Text>
                    :
                    <Text style={styles.deadline}>
                        No deadline
                    </Text>
                }
            </View>
            <View style={styles.column2}>
                <Pressable style={styles.button} onPress={() => edit(toDo)}>
                    <Text style={styles.buttonText}>edit</Text>
                </Pressable>
                <Pressable style={styles.button2} onPress={handleDelete}>
                    <Text style={styles.buttonText}>del</Text>
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
        width: "75%",
    },
    column2:{
        justifyContent: "center",
        width: "20%",
    },
    title: {
        fontSize: 20,
        color: "black",
        marginVertical: 4
    },
    deadline: {
        fontSize: 14,
        padding: 5,
        color: "#666",
        textAlignVertical: "center",
    },
    important: {
        color: "red",
        fontSize: 14,
        margin: 3,
        // alignSelf: "center",
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