import { ADD_NEW_TASK, apiPrefix, COMPLETE_TASK, DELETE_TASK, EDIT_TASK, GET_ALL_TASKS, LOGIN, REGISTER } from "./backend";

export const registerAPI = (data) => apiPrefix.post(REGISTER,data);
export const loginAPI = (data) => apiPrefix.post(LOGIN, data)

export const getTasks = (token) => apiPrefix.get(
  GET_ALL_TASKS, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
)

export const addNewTask = (data, token) => apiPrefix.post(
  ADD_NEW_TASK, 
  data, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
)

export const editTask = (id, data, token) => apiPrefix.put(
  `${EDIT_TASK}/${id}`, 
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
)

export const deleteTask = (id, token) => apiPrefix.delete(
  `${DELETE_TASK}/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
)

export const completeTask = (id, token) => apiPrefix.put(
  `${COMPLETE_TASK}/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
)