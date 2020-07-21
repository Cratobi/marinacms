import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

const Password = ({ label, icon, peek, onChange, value = '' }) => {
  const [ isEmpty, setIsEmpty ] = useState(value === '')
  const [ isFocus, setIsFocus ] = useState(false)
  const [ type, setType ] = useState('password')

  useEffect(() => setIsEmpty(value === ''), [ value ])

  const togglePeek = () => (type === 'password' ? setType('text') : setType('password'))

  return (
    <LabelStyled>
      <InputStyled
        type={type}
        onChange={({ target }) => onChange(target.value)}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        isEmpty={isEmpty}
        icon={icon}
        isFocus={isFocus}
      />
      <TextStyled isEmpty={isEmpty} icon={icon} isFocus={isFocus}>
        {label}
      </TextStyled>
      <IconStyled isEmpty={isEmpty} className='material-icons'>
        {icon}
      </IconStyled>

      {peek && (
        <PeekStyled className='material-icons' onClick={togglePeek}>
          {type === 'password' ? 'visibility' : 'visibility_off'}
        </PeekStyled>
      )}
    </LabelStyled>
  )
}

const LabelStyled = styled.label`
  width: 100%;
  color: #aaa;
  display: inline-flex;
  flex-direction: column;
  padding: 0.5rem 0;
  padding-right: ${({ peek }) => '3rem'};
  margin: 0.5rem 0;
  border: 0.3rem solid #e1e1e1;
  border-radius: 0.8rem;
`
const InputStyled = styled.input`
  width: 100%;
  background: #ffffff;
  color: #262626;
  font-size: 100%;
  padding-top: 1.3rem;
  padding-left: ${({ icon }) => (icon ? '3.2rem' : '1rem')};
  border-width: 0;
  outline: none;

  :focus {
    border-color: #a25eda;
  }
`
const IconStyled = styled.i`
  position: relative;
  height: 0;
  width: 0;
  margin: 0;

  top: ${({ isEmpty }) => (isEmpty ? '-2.3rem' : '-1.8rem')};
  left: 0.8rem;

  color: #777;
  font-size: 1.8rem;

  transition-property: top;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${InputStyled}:focus ~ & {
    color: #a25eda;
    top: -1.8rem;
  }
`
const PeekStyled = styled.i`
  position: relative;
  height: 0;
  width: 0;
  margin: 0;

  right: 0rem;
  top: -2.3rem;

  align-self: flex-end;
  font-size: 1.8rem;

  :hover {
    color: #777;
  }
  :active {
    color: #262626;
  }
`
const TextStyled = styled.span`
  position: relative;
  height: 0;
  width: 0;
  margin: 0;

  top: ${({ isEmpty }) => (isEmpty ? '-2.2rem' : '-2.9rem')};
  left: 1rem;
  left: ${({ isEmpty, icon }) => (isEmpty && icon ? '3.2rem' : '1rem')};

  font-size: ${({ isEmpty }) => (isEmpty ? '100%' : '62%')};

  white-space: nowrap;
  transition-property: top, left;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${InputStyled}:focus + & {
    color: #777;
    font-size: 62%;
    top: -2.9rem;
    left: 1rem;
  }
`

export default Password
