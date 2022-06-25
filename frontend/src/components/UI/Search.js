import React from 'react'
import { useTranslation } from 'react-i18next';
import Input from "./Input";

function Search ({onInput}) {
    const { t } = useTranslation();
    return (
        <div className='search'>
            <Input onInput={ onInput } type='text' placeholder={t('Search')}/>
        </div>
    )
}

export default Search;