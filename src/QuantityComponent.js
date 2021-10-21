import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
`

export default function QuantityComponent() {
    return (
        <Container>
            <button>-</button>
            <input type="text" />
            <button>+</button>
        </Container>
    )
}
