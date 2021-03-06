import agent from '../api/agent';
import { toDo, toDoFormValues } from '../models/toDo'
import { makeAutoObservable, runInAction } from 'mobx'
import { format } from 'date-fns';

export default class ToDoListStore {
    toDoList = new Map<string, toDo>();
    selectedToDo: toDo | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    totalTasks = 0;
    totalCompleatedTasks = 0;
    constructor() {
        makeAutoObservable(this)
    }

    get toDoListByDate() {
        return Array.from(this.toDoList.values()).sort((a, b) =>
            a.creationDate!.getTime() - b.creationDate!.getTime());
    }
    get groupedListByDate() {
        return Object.entries(this.toDoListByDate.reduce((list, toDo) => {
            const date = format(toDo.creationDate!, 'dd MMM yyyy')
            list[date] = list[date] ? [...list[date], toDo] : [toDo];
            return list;
        }, {} as {[key : string]: toDo[]}))
    }
    loadtoDoList = async () => {
        this.setLoadingInitial(true);
        const toDoList = await agent.toDoList.list();
        try {
            // Не пихать async\await внутрь
            toDoList.forEach(todo => this.setToDo(todo))
            this.checkTasks(toDoList);
            this.setLoadingInitial(false);
        }
        catch (e) {
            console.log(e);
            this.setLoadingInitial(false);
        }
    }    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    createToDo = async (newNote: toDoFormValues) => {
        try {
            const id = await agent.toDoList.create(newNote);
            newNote.id = id;
            const createdNote = new toDo(newNote);

            this.setToDo(createdNote);
            this.checkTasks(Array.from(this.toDoList.values()));

        } catch (error) {
            console.log(error);
        }
    }
    updateToDo = async (note: toDoFormValues) => {
        try {
            await agent.toDoList.update(note);
            runInAction(() => {
                if (note.id){
                    let updatednote = {...this.getToDo(note.id), ...note}
                    this.toDoList.set(note.id, updatednote as toDo);
                }
                this.checkTasks(Array.from(this.toDoList.values()));
            });
        } catch (error) {
            console.log(error);
        }
    }
    deleteToDo = async (id: string) => {
        this.loading = true;
        try {
            await agent.toDoList.delete(id);
            runInAction(() => {
                this.toDoList.delete(id);
                this.loading = false;
                this.checkTasks(Array.from(this.toDoList.values()));
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    
    setSelectedTodo = (todo?:toDo) => {
        this.selectedToDo = todo;
    }
    clearSelectedToDo = () => {
        this.selectedToDo = undefined;
    }
    private setToDo(toDo: toDo) {
        toDo.creationDate = new Date(toDo.creationDate!)
        if (toDo.deadLine)
            toDo.deadLine = new Date(toDo.deadLine)
        this.toDoList.set(toDo.id, toDo)
    }
    private getToDo = (id: string) => {
        return this.toDoList.get(id);
    }
    private checkTasks = (list: toDo[]) => {
        this.totalTasks = list.length;
        this.totalCompleatedTasks = list.filter(x => x.isCompleted == true).length;
    }
}