import _ from 'lodash';

function Input(props) {
    const {label} = props;
    const attr = _.omit(props, 'label');

    return (
        <div className='input-group'>
            {label &&
                <label>{label}</label>
            }
            <input {...attr}/>
        </div>
    )
}

export default Input