export interface toDo {
    id: string;
    description: string;
    isCompleted: boolean;
    isImportant: boolean;
    creationDate: Date | null;
    deadLine: Date | null;
}

export class toDo implements toDo {
    constructor(init?: toDoFormValues){
        Object.assign(this, init)
    }
}

export class toDoFormValues{
    id?: string = undefined;
    description: string = '';
    isCompleted: boolean = false;
    isImportant: boolean = false;
    creationDate: Date | null = null;
    deadLine: Date | null = null;
    constructor (toDo?: toDo){
        if (toDo){
            this.id = toDo.id;
            this.description = toDo.description;
            this.isCompleted = toDo.isCompleted;
            this.isImportant = toDo.isImportant;
            this.creationDate = toDo.creationDate;
            this.deadLine = toDo.deadLine;

        }
    }
}
