import React from 'react'
import Select from 'react-select'

export default function SearchComponent() {
    return (
        <SearchBox>
            <Select options={options}
                onChange={handleChange}
            />
        </SearchBox>
    )
}
