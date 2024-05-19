import { useEffect, useState } from "react";
import { Project } from "screeen/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { clearnObject, useMount, useDebounce } from "utils";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectSearchParams } from "screeen/project-list/util";
import { useAddConfig, useConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";
import { Kanban } from "types/kanban";


export const useKanbans = (param?: Partial<Kanban>) => {
    const ajax = useHttp();
    return useQuery<Kanban[]>(
        ['kanbans', param], 
        () => ajax('kanbans', { data: param })  
    )
}