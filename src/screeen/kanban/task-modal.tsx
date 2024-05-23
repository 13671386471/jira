import { Button, Form, Input, Modal } from "antd"
import { TaskTypeSelect } from "components/task-type-select"
import { UserSelect } from "components/userSelect"
import { useEffect } from "react"
import { useTaskDelete, useTaskEdit } from "utils/task"
import { useTaskModal, useTasksQueryKey } from "./util"
import { useForm } from "antd/es/form/Form"

const layout = {
    labelCol: {span: 8},// 每一项的左边的文字
    wrapperCol: {span: 16}// 每一项的右边的元素
}

export const TaskModal = () => {
    const [ form ]= useForm();
    const {editingTaskId, editingTask, close} = useTaskModal();
    const {mutateAsync: editTask, isLoading: edingLoading} = useTaskEdit(useTasksQueryKey());
    const { mutateAsync: deleteTask } = useTaskDelete(useTasksQueryKey());
    const onCancle = () => {
        close();
        form.resetFields();
    }

    const onOk = async () => {
        await editTask({...editingTask, ...form.getFieldsValue() });
        close();
    }
    const startDelete = () => {
        close();
        Modal.confirm({
            title: '确认删除看板吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                return deleteTask({id: Number(editingTaskId)});
            }
        })
    }
    useEffect(() => {
        form.setFieldsValue(editingTask);
    }, [form, editingTask])

    return <Modal
        onCancel={onCancle}
        onOk={onOk}
        okText="确认"
        cancelText="取消"
        title="编辑任务"
        confirmLoading={edingLoading}
        open={!!editingTaskId}
        forceRender={true}

    >
        <Form 
            {...layout}
            initialValues={editingTask}
            form={form}
        >
            <Form.Item 
                label="任务名" 
                name="name"
                rules={[{required: true, message: '请输入任务名'}]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="经办人" name="processorId">
                <UserSelect defaultOptionName="经办人" />
            </Form.Item>
            <Form.Item label="类型" name="typeId">
                <TaskTypeSelect  />
            </Form.Item>
            <div style={{textAlign: 'right'}}>
                <Button size="small" style={{fontSize: '14px'}} onClick={startDelete}>
                    删除
                </Button>
            </div>
        </Form>
    </Modal>
}