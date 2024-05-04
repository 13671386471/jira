import { Select } from "antd";


type SelectProps = Omit<React.ComponentProps<typeof Select>, 'value' | 'onChange' | 'options'>;

// 解决透传组件原本自带所有属性的问题，因为不可能把组件的所有属性再定义一边
interface IdSelectProps extends SelectProps {
    value?: number | string | null | undefined,
    onChange?: (value?: number) => void,
    defaultOptionName?: string,
    options?: {name: string, id: number}[]
}

/**
 * value 可以传入多种类型的值
 * onChange只会回调 number|undefined 类型
 * 当 isNaN(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
    const {value, onChange, defaultOptionName, options, ...restProps} = props;
    return <Select 
        value={options?.length? toNumber(value): 0} 
        onChange={(value) => {
            onChange?.(toNumber(value) || undefined);
        }}
        {...restProps}
    >
        {
            defaultOptionName 
            ? <Select.Option value={0}>{defaultOptionName}</Select.Option> 
            : null
        }
        {
            options?.map(option => {
                return <Select.Option 
                    key={option.id} 
                    value={option.id}
                >
                    {option.name}
                </Select.Option>
            })
        }

    </Select>
}
const toNumber = (value: unknown) => {
    return isNaN(Number(value)) ? 0 : Number(value)
}