import axios from 'axios';

export const apiPrefix = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

if (typeof window !== "undefined") {
  apiPrefix.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));
}

export const LOGIN = `/api/auth/login`
export const REGISTER = `/api/auth/register`
export const CHANGE_PASSWORD = `/api/auth/change-password`
export const LOGOUT = `/api/auth/logout`

export const GET_ALL_TASKS = `/api/tasks`
export const ADD_NEW_TASK = `/api/tasks/add`
export const EDIT_TASK = `/api/tasks/edit`
export const DELETE_TASK = `/api/tasks/delete`
export const COMPLETE_TASK = `api/tasks/complete`

export const GET_ALL_USERS = `/api/users`
export const EDIT_USER = `/api/users/edit`
export const DELETE_USER = `/api/users/delete`