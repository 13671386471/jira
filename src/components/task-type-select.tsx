import React, { useState, useEffect } from "react";
import { IdSelect } from "./id-select";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";


export const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: taskTypes } = useTaskTypes();
    return <IdSelect options={taskTypes || []} {...props} />;
}