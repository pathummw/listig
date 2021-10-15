import React from 'react'
import Select from 'react-select'
import styled from 'styled-components'

export default function SearchComponent() {
    return (
        <SearchBox>
            <Select options={options}
                onChange={handleChange}
            />
        </SearchBox>
    )
}
