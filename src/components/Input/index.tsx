import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'

import { Container, TextInput, Icon } from './styles'

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueRefference {
  value: string,
}

interface InputRef {
  foucus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {

  const inputElementRef = useRef<any>(null)
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<InputValueRefference>({ value: defaultValue })

  useImperativeHandle(ref, () => ({
    foucus() {

      inputElementRef.current.focus()

    }
  }))

  useEffect(() => {
    registerField<string>({

      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {

        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })

      },

      clearValue() {

        inputValueRef.current.value = ''
        inputElementRef.current.clear()

      }
    })
  }, [fieldName, registerField])

  return (
    <Container>

      <Icon
        name={icon}
        size={20}
        color="#666360"
      />

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value
        }}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input)
