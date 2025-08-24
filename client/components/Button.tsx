import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  btnStyle?: string
  btnType?: 'submit' | 'button' | 'reset'
  onClick?: () => void
}

export default function Button({
  title,
  btnStyle = '',
  btnType = 'button',
  onClick,
  ...rest
}: Props) {
  return (
    <button
      type={btnType}
      className={`py-2 px-4 rounded ${btnStyle}`}
      onClick={onClick}
      {...rest}
    >
      {title}
    </button>
  )
}
