import { css } from "@emotion/css";
import React, { useEffect, useState } from 'react';
import { Input, Select,Form } from 'antd';

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
    // 加上layout='inline'后Form.Item在一行中展示，否则是垂直展示
    <Form
        className={css`
            margin-bottom: 2rem;
        `} 
        layout='inline' 
    >
        <Form.Item>
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
        </Form.Item>
        <Form.Item>
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
        </Form.Item>
    </Form>
    
  );
};