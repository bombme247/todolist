type ButtonPropsType = {
  title: string
  onClickHandler: () => void
  disabled?: boolean
  styles?: string
}

// export const Button = (props: ButtonPropsType) => { если деструктурировать пропсы, будет такой вариант:
  export const Button = ({title, onClickHandler, disabled, styles}: ButtonPropsType) => {
  return (
    <button className={styles} disabled={disabled} onClick={onClickHandler}>
      {title}
    </button>
  )
}