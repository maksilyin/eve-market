function Checkbox({label, value, onChange, checked}) {
    return (
        <label className='checkbox'>
            <input
                className='filled-in'
                type='checkbox'
                onChange = { onChange }
                checked = { checked }
                value = { value }
            />
            <span>{label}</span>
        </label>
    )
}

export default Checkbox;