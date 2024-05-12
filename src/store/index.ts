import { configureStore } from '@reduxjs/toolkit'
import { projectListSlice } from './reduceSlice/project-list-slice';
import { authSlice } from './reduceSlice/auth-slice';

 
export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
})

// store.getState 是一个函数，返回值是一个泛型S，ReturnType是ts自带的 给它穿入一个函数，会返回传入函数的返回值
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch