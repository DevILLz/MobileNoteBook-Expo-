import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { useStore } from './../../../app/stores/store';
import { toDo } from './../../../app/models/toDo';
import { Text, StyleSheet, Button } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
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
        <Grid>
            <Col size={80}>
                {toDo.isImportant && <Text style={styles.important}>Important</Text>}
                <Text style={styles.title}>
                    <BouncyCheckbox
                        isChecked={toDo.isCompleted}
                        size={20}
                        fillColor="green"
                        unfillColor="#aaa"
                        iconStyle={{ borderColor: "green", alignSelf: "center" }}
                        onPress={(isChecked: boolean) => { handleIsCompleated(isChecked) }}
                    />
                    {toDo.description}
                </Text>
                {toDo.deadLine
                    ? <Text style={styles.deadline}>
                        Deadline:  {format(toDo.deadLine, 'dd MMM yyyy')}
                    </Text>
                    :
                    <Text style={styles.deadline}>
                        No deadline
                    </Text>
                }
            </Col>
            <Col size={20}>
                <Button title="edit" onPress={() => edit(toDo)} color='green' />
                <Button title="del" onPress={handleDelete} color='red' />
            </Col>
        </Grid>
    )
})
const styles = StyleSheet.create({

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
    button: {
        margin: 3
    },
    important: {
        color: "red",
        fontSize: 14,
        margin: 3,
        alignSelf: "center",
    }
});