import { css } from "@emotion/css";
import React, { useEffect, useState } from 'react';
import { Input, Select,Form } from 'antd';
import { Project } from "./list";
import { UserSelect } from "components/userSelect";

export interface User{
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}
interface SearchPanelProps {
    param: Partial<Pick<Project, 'name' | 'personId'>>;
    // param: {
    //     name: string;
    //     personId: string;
    // };
    setParam: (param: SearchPanelProps['param']) => void;
    users: User[]
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
            <UserSelect
                defaultOptionName={"负责人"}
                value={param.personId} 
                onChange={(val: number | undefined) => {
                    setParam({
                        ...param,
                        personId: val
                    })
                }} 
            />
            {/* <Select value={param.personId} onChange={(val) => {
                setParam({
                    ...param,
                    personId: Number(val)
                })
            }}>
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map(person => {
                        return <Select.Option 
                                key={person.id} 
                                value={Number(person.id)}
                            >
                                {person.name}
                            </Select.Option>
                    })
                }
            </Select> */}
        </Form.Item>
    </Form>
    
  );
};