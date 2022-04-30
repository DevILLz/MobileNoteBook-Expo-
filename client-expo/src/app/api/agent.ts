import { toDo, toDoFormValues } from '../models/toDo';
import axios, { AxiosError, AxiosResponse } from 'axios';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = "http://192.168.1.72:5000/api";

axios.interceptors.response.use(async response => {
    
    if (process.env.NODE_ENV === 'development')
        await sleep(200)
    return response

}, (error: AxiosError) => {
    const { data, status, config} = error.response!;
    console.log(axios.defaults.baseURL);
    switch (status) {
        case 400:
            // if (typeof data === 'string') {
                
            // }
            // if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
            //     history.push('/not-found');
            // }
            // if (data.errors) {
            //     const modalStateErrors = [];
            //     for (const key in data.errors)
            //         if (data.errors[key])
            //             modalStateErrors.push(data.errors[key])
            //     throw modalStateErrors.flat();
            // }
            break;

        case 404:
            // history.push('/not-found')
            break;

    }
    return Promise.reject(error);
})
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}
const toDoList = {
    list: () => requests.get<toDo[]>('/toDo'),
    details: (id: string) => requests.get<toDo>(`/toDo/${id}`),
    create: (toDo: toDoFormValues) => requests.post<void>(`/toDo/`, toDo),
    update: (toDo: toDoFormValues) => requests.put<void>(`/toDo/${toDo.id}`, toDo),
    delete: (id: string) => requests.delete<void>(`/toDo/${id}`),
}


const agent = {
    toDoList    
}
export default agent;