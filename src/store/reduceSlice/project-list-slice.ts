import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
    projectModalOpen: boolean;
}

const initialState: State = {
    projectModalOpen: false,
};

export const projectListSlice = createSlice({
    name: "projectList",// 本slice的命名空间
    initialState,// 初始化状态
    reducers: {// 定义action
        opennProjectModal: (state) => {
            state.projectModalOpen = true;//redux-toolkit借助immer(immutable)实现对state的修改
        },
        closeProjectModal: (state) => {
            state.projectModalOpen = false;
        },
    },
});

// export const { opennProjectModal, closeProjectModal } = projectListSlice.actions;
export const projectListActions = projectListSlice.actions;
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;