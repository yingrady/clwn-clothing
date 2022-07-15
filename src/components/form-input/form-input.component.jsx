import {FormInputLabel, Group, Input} from './form-input.styles';

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <Group>
            <Input onChange={handleChange} {...otherProps} />
            {label ? (
                <FormInputLabel shrink={otherProps.value.length}>{label}
                </FormInputLabel>
            ) : null}
        </Group>
    );
};

export default FormInput;