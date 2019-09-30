import React, { FC, useMemo } from 'react'
import { Dropdown } from 'vtex.styleguide'
import useInputValue from './useInputValue'
import OptionBox from './OptionBox'
import styles from '../styles.css'

const DropdownOptions: FC<Props> = ({ inputValueInfo }) => {
  const [state, onChange] = useInputValue(inputValueInfo)

  const handleChange = (e: any) => {
    const value = e.target.value
    onChange({ value })
  }

  const options = useMemo(() => {
    return inputValueInfo.domain.map((option) => ({ value: option, label: option }))
  }, [inputValueInfo.domain])

  return (
    <div className={`${styles.optionsInputValueDropdown} mb4`}>
      <Dropdown
        value={state}
        onChange={handleChange}
        label={inputValueInfo.label}
        options={options} />
    </div>
  )
}

const BoxOptions: FC<Props> = ({ inputValueInfo }) => {
  const [state, onChange] = useInputValue(inputValueInfo)

  const handleKeyDown = (event: KeyboardEvent) => {
    const selected = state as string
    const options = inputValueInfo.domain
    const selectedIndex = options.indexOf(selected)

    switch (event.key) {
      case "ArrowRight": {
        const count = options.length
        const nextSelectedIndex = (selectedIndex + 1) % count
        const newValue = options[nextSelectedIndex]
        onChange({ value: newValue })
        break;
      }
      case "ArrowLeft": {
        const count = options.length
        const previousSelectedIndex = (selectedIndex - 1 + count) % count
        const newValue = options[previousSelectedIndex]
        onChange({ value: newValue })
        break;
      }
      case "Home": {
        const newValue = options[0]
        onChange({ value: newValue })
        break;
      }
      case "End": {
        const count = options.length
        const newValue = options[count - 1]
        onChange({ value: newValue })
        break;
      }
      default: {
      }
    }
  }

  return (
    <div className={`${styles.optionsInputValue} mb4`}>
      <div className={`${styles.optionsInputValueLabelContainer} mb3`}>
        <span className={`${styles.optionsInputValueLabel} c-muted-1 t-small overflow-hidden`}>
          {inputValueInfo.label}
        </span>
      </div>
      <div className={`${styles.optionsInputValueOptionBoxContainer} inline-flex flex-wrap flex items-center`}>
        {inputValueInfo.domain.map(option =>
          <OptionBox
            key={option}
            onKeyDown={handleKeyDown}
            option={option}
            selected={state === option}
            onClick={() => onChange({ value: option })} />
        )}
      </div>
    </div>
  )
}

const OptionsInputValue: FC<Props> = ({ optionsDisplay = 'select', inputValueInfo }) => {
  return optionsDisplay === 'box'
    ? <BoxOptions inputValueInfo={inputValueInfo} />
    : <DropdownOptions inputValueInfo={inputValueInfo} />
}

export type OptionDisplay = 'select' | 'box' | 'smart'

interface Props {
  optionsDisplay?: OptionDisplay
  inputValueInfo: OptionsInputValue
}

export default OptionsInputValue