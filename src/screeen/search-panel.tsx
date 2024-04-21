import { useEffect, useState } from 'react';
export interface User{
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}
interface SearchPanelProps {
    param: {
        name: string;
        personId: string;
    };
    setParam: (param: SearchPanelProps['param']) => void;
    users: User[]
    // users: {
    //     id: string;
    //     name: string;
    //     email: string;
    //     title: string;
    //     organization: string;
    //     token: string;
    // }[];
    
}

export const SearchPanel = ({param, setParam, users}: SearchPanelProps) => {
    
  return (
    <div>
        <form>
            <input
                type="text"
                className="form-control search-input"
                placeholder="type to search"
                value={param.name}
                onChange={(e) => {
                    setParam({
                        ...param,
                        name: e.target.value
                    })
                }}
            />
            <select value={param.personId} onChange={(e) => {
                setParam({
                    ...param,
                    personId: e.target.value
                })
            }}>
                <option value="">负责人</option>
                {
                    users.map(person => {
                        return <option 
                                key={person.id} 
                                value={person.id}
                            >
                                {person.name}
                            </option>
                    })
                }
            </select>
        </form>
        
    </div>
    
  );
};