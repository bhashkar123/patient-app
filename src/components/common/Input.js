import React, { Fragment } from 'react';
import { Form, Button, Badge } from 'react-bootstrap';

const Input = (props) => {

    let inputElement = null;
    const variant = props.variant ? props.variant : 'dark';
    let minLength = props.minLength ? props.minLength : 0;
    let maxLength = props.maxLength ? props.maxLength : 15;
    const name = props.name;
    const required = props.required;
    const disabled = props.disabled ? props.disabled : false;
    const options = props.options ? props.options : [];
    const buttonType = props.type ? props.type : 'submit';
    const buttonValue = props.value ? props.value : 'Submit';
    const blockButton = props.blockButton ? 'block' : '';
    const fieldValue = props.value ? props.value : '';
    const readOnly = props.readOnly ? props.readOnly : false;
    const errors = props.errors;
    const pattern = props.pattern ? props.pattern : '';
    let errorMessage = '';

    const onClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    const selectOptions = () => {
        return options.map(option => <option key={option.value} value={option.value}>{option.name}</option>);
    }

    const renderComponent = () => {
        if (props.label) return <Fragment>

            <Form.Label><h6><Badge variant={variant}>{props.label}</Badge></h6></Form.Label>
            {inputElement}
        </Fragment>;

        return inputElement;

    }

    if (errors) {
        if (errors[name]) {
            if (errors[name].type === 'required')
                errorMessage = 'This Field can not be empty!';
            else if (errors[name].type === 'minLength')
                errorMessage = 'Minimun Field length should be ' + minLength + ' characters';
            else if (errors[name].type === 'maxLength')
                errorMessage = 'Field length can not exceed ' + maxLength + ' characters';
            else if (errors[name].type === 'pattern')
                errorMessage = 'Email should be in the format abc@pqr.com';
        }
    }
    switch (props.elementType) {
        case 'text': inputElement = (<Form.Group>
            <Form.Control type="text" autoComplete="off" minLength={minLength} readOnly={readOnly} maxLength={maxLength} name={name} placeholder={props.placeholder} onChange={props.onChange} value={props.value} ref={props.register({ required: required, minLength: minLength, maxLength: maxLength })} />
            <Form.Text className="text-danger">
                {errorMessage}
            </Form.Text>
        </Form.Group>); break;

        case 'number': inputElement = (<Form.Group>
            <Form.Control type="number" autoComplete="off" minLength={minLength} readOnly={readOnly} maxLength={maxLength} name={name} placeholder={props.placeholder} onChange={props.onChange} value={props.value} ref={props.register({ required: required, minLength: minLength, maxLength: maxLength })} />
            <Form.Text className="text-danger">
                {errorMessage}
            </Form.Text>
        </Form.Group>); break;

        case 'color': inputElement = (<Form.Group>
            <Form.Control type="color" autoComplete="off" minLength={minLength} readOnly={readOnly} maxLength={maxLength} name={name} placeholder={props.placeholder} onChange={props.onChange} value={props.value} ref={props.register({ required: required, minLength: minLength, maxLength: maxLength })} />
            <Form.Text className="text-danger">
                {errorMessage}
            </Form.Text>
        </Form.Group>); break;

        case 'date': inputElement = (<Form.Group>
            <Form.Control type="date" autoComplete="off" minLength={minLength} readOnly={readOnly} maxLength={maxLength} name={name} placeholder={props.placeholder} onChange={props.onChange} value={props.value} ref={props.register({ required: required, minLength: minLength, maxLength: maxLength })} />
            <Form.Text className="text-danger">
                {errorMessage}
            </Form.Text>
        </Form.Group>); break;

        case 'password': inputElement = (<Form.Group>
            <Form.Control type="password" minLength={minLength} maxLength={maxLength} readOnly={readOnly} name={name} placeholder={props.placeholder} onBlur={props.onBlur} onChange={props.onChange} ref={props.register({ required: required, minLength: minLength, maxLength: maxLength })} />
            <Form.Text className="text-danger">
                {errorMessage}
            </Form.Text>
        </Form.Group>); break;

        case 'email': inputElement = (<Form.Group>
            <Form.Control type="email" minLength={minLength} maxLength={maxLength} readOnly={readOnly} name={name} placeholder={props.placeholder} onChange={props.onChange} value={props.value} ref={props.register({ required: required, minLength: minLength, maxLength: maxLength, pattern: pattern })} />
            <Form.Text className="text-danger">
                {errorMessage}
            </Form.Text>
        </Form.Group>); break;

        case 'textarea': inputElement = (<Form.Group>
            <Form.Control as="textarea" rows="3" minLength={minLength} maxLength={maxLength} name={name} placeholder={props.placeholder} onChange={props.onChange} value={fieldValue} ref={props.register({ required: required, minLength: minLength, maxLength: maxLength })} />
            <Form.Text className="text-danger">
                {errorMessage}
            </Form.Text>
        </Form.Group>); break;

        case 'checkbox': inputElement = (<Form.Group>
            <Form.Check type="checkbox" onChange={props.onChange} label={props.value} checked={props.checked} />
        </Form.Group>); break;

        case 'button': inputElement = (<Button onClick={onClick} variant={props.variant} disabled={disabled} type={buttonType} block={blockButton}> {buttonValue}
        </Button>); break;

        case 'select': inputElement = (<Form.Group>
            <Form.Control as="select" name={name} onChange={props.onChange} value={props.value} ref={props.register({ required: required })}>
                {selectOptions()}
            </Form.Control>
            <Form.Text className="text-danger">
                {errorMessage}
            </Form.Text>
        </Form.Group>); break;

        case 'label': inputElement = ''; break;

        default: inputElement = (<Form.Group>
            <Form.Control type="text" placeholder={props.placeholder} onChange={props.onChange} />
        </Form.Group>);
    }

    return (
        renderComponent()
    );


}


export default Input;