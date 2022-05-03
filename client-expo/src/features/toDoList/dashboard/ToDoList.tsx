import { View, StyleSheet, SectionList, Text, StatusBar, Pressable } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from './../../../app/stores/store';
import { toDo } from './../../../app/models/toDo';
import EditForm from './EditForm'
import { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';

interface list {
    title: string;
    data: toDo[];
}

export default observer(function ToDoList() {
    const [isAdd, setIsAdd] = useState(false);
    const [DATA, setDATA] = useState<list[]>([]);
    const { ToDoListStore } = useStore();
    const { groupedListByDate: toDoList, selectedToDo, setSelectedTodo, totalTasks, totalCompleatedTasks } = ToDoListStore;
    const [isEditing, setIsEditing] = useState(false);
    function handleEdit(todo?: toDo): void {
        setIsEditing(todo ? true : false);
        setSelectedTodo(todo);
    }

    function HandleAdd() {
        setIsAdd(!isAdd);
    }

    useEffect(() => {
        const data: list[] = [];
        toDoList.forEach((group) => {
            data.push({ title: group[0], data: group[1] });
        });
        if (data.length == toDoList.length)
            setDATA(data);
    }, [toDoList])
    return (
        <View style={styles.list}>
            <View style={styles.NavBar}>
                <Text>Completed {totalCompleatedTasks} / {totalTasks}   </Text>
                <Pressable style={styles.addButton} onPress={HandleAdd}>
                    <Text style={styles.buttonText}>Add new Note</Text>
                </Pressable>
            </View>
            {isAdd
                && <View style={styles.item}>
                    <EditForm closeForm={HandleAdd} />
                </View>
            }
            <SectionList
                sections={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <View style={styles.item}>
                        {(selectedToDo === item && isEditing)
                            ? <EditForm closeForm={handleEdit} />
                            : <ToDoItem toDo={item} edit={handleEdit} />}
                    </View>
                }
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    NavBar:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 5,
        margin: 5
    },
    item: {
        fontSize: 24,
        backgroundColor: "#bbb",
        padding: 10,
        marginVertical: 4,
        alignSelf: "stretch",
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5
        
    },
    header: {
        fontSize: 32,
        color: "teal",
        alignSelf: "center",
        marginVertical: 4
    },
    title: {
        fontSize: 24
    },
    list: {
        alignContent: "stretch",
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#ffb833',
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