import { Button, Drawer, Form, Input, Spin } from "antd"
import { useProjectAdd, useProjectEdit, useProjects } from "utils/project"
import { useProjectQueryKey, useProjectsModal } from "./util"
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/userSelect";
import styled from "@emotion/styled";


export const ProjectModal = () => {
    const {projectModalOpen, close, editingProject, isLoading} = useProjectsModal();
    const useMutateProject = editingProject ? useProjectEdit : useProjectAdd;

    const {mutateAsync, error, isLoading: mutateLoading} = useMutateProject(useProjectQueryKey());
    const [ form ] = useForm() 
    const onFinish = async (values: any) => {
        await mutateAsync({...editingProject, ...values});
        form.resetFields();
        close()
    }
    const closeModal = () => {
        form.resetFields();
        close();
    }

    const title = editingProject ? '编辑项目' : '新建项目';

    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form])



    return <Drawer
        forceRender={true}
        open={projectModalOpen} 
        onClose={closeModal}
        width={'100%'}
    >
        <Container>
        {
            isLoading?
            <Spin size="large" />:
            <>
                <h1>{title}</h1>
                <ErrorBox error={error} />
                <Form
                    onFinish={onFinish}
                    form={form}
                    layout='vertical'
                    style={{ width: '40rem' }}
                >
                    <Form.Item label='名称' name='name'>
                        <Input placeholder='请输入项目名称' />
                    </Form.Item>
                    <Form.Item label='部门' name='organization'>
                        <Input placeholder='请输入部门名称' />
                    </Form.Item>
                    <Form.Item label='负责人' name='personId'>
                        <UserSelect defaultOptionName='负责人' />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={isLoading || mutateLoading}
                        >
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </>
        }
        </Container>
        
        
    </Drawer>
}

const Container = styled.div`
    height: 80vh ;
    display: flex;
    flex-direction: column;
    align-items: center ;
    justify-content: center;

`