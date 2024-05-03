import { useState } from 'react';
import {useParams} from 'react-router-dom'


export const ProjectScreen = () => {
    const {id} = useParams<{id: string}>()
    // const {data: currentProject} = useProject(Number(id))
    return (
        <div>
            <h1>{'Projectscreen'}</h1>
        </div>
    )
}