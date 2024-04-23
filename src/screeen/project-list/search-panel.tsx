import { Input, Select } from 'antd';
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
            <Input
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
            <Select value={param.personId} onChange={(val) => {
                setParam({
                    ...param,
                    personId: val
                })
            }}>
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map(person => {
                        return <Select.Option 
                                key={person.id} 
                                value={person.id}
                            >
                                {person.name}
                            </Select.Option>
                    })
                }
            </Select>
        </form>
        
    </div>
    
  );
};