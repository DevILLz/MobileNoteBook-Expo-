import MyTextArea from '../../../app/common/form/MyTextArea';
import MyDateInput from '../../../app/common/form/MyDateInput';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { toDo, toDoFormValues } from '../../../app/models/toDo';
import { useStore } from '../../../app/stores/store';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Item, Checkbox } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { Segment } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';
import { format } from 'date-fns';

export default observer(function EditForm() {
    const [isImportant, setIsImportant] = useState(false);
    const { ToDoListStore } = useStore();
    const { createToDo, updateToDo, loadingInitial, clearSelectedToDo, selectedToDo, loading } = ToDoListStore;
    const [ToDo, setToDo] = useState<toDoFormValues>(new toDoFormValues());
    const [isOpen, setIsOpen] = useState(true);

    const validationSchema = Yup.object({
        description: Yup.string().required('The description is required')
    })

    useEffect(() => {
        if (selectedToDo) {
            setIsImportant(selectedToDo.isImportant);
            setToDo(new toDoFormValues(selectedToDo));
        }

    }, [])

    function handleFromSubmit(toDo: toDoFormValues) {
        if (!toDo.creationDate)
            toDo.creationDate = new Date();
        toDo.isImportant = isImportant;
        if (!toDo.id) {
            toDo.id = uuid();
            createToDo(toDo).then(() => {
                setIsOpen(false);
                clearSelectedToDo();
            });
        }
        else
            updateToDo(toDo).then(() => {
                setIsOpen(false);
                clearSelectedToDo();
            });

    }

    if (loadingInitial) return <LoadingComponent content="Loading note..." />
    return (
        <div>
            {isOpen &&
                <Segment clearing>
                    <Header content={format(new Date(), 'dd MMM yyyy')} color="teal" />

                    <Item id="itemHeader" >
                        <Formik
                            validationSchema={validationSchema}
                            enableReinitialize
                            initialValues={ToDo}
                            onSubmit={values => handleFromSubmit(values)}>
                            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                <Form onSubmit={handleSubmit} autoComplete="off">
                                    <MyTextArea rows={2} placeholder="Description" name="description" />
                                    <MyDateInput
                                        placeholderText="Date"
                                        name="deadLine"
                                        showTimeSelect
                                        timeCaption='time'
                                        dateFormat='MMM d, yyy h:mm aa'
                                    />
                                    <Checkbox defaultChecked={selectedToDo?.isImportant ?? false } onChange={(e, data) => setIsImportant(data.checked!)}
                                        content="Is important" />
                                    <Button
                                        disabled={isSubmitting || !isValid}
                                        loading={isSubmitting} floated="right" positive type="submit" content="Submit" />

                                    <Button floated="right" negative type="button" content="Cancel" onClick={() => {setIsOpen(false);}} />
                                </Form>
                            )}
                        </Formik>

                    </Item>
                </Segment>}
        </div>

    )
})