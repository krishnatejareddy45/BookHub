import './index.css'

const Value = props => {
  const {obj, passingValue, Active} = props
  const {value, label} = obj
  const objClicked = () => {
    passingValue(value, label)
  }

  const addColor = Active ? 'color' : ''
  const bg = Active ? 'bg-color' : ''

  return (
    <>
      <button className={`value-rec-button ${bg}`} onClick={objClicked}>
        <p className={`tag-color ${addColor}`}>{obj.label}</p>
      </button>
      <br />
    </>
  )
}
export default Value
