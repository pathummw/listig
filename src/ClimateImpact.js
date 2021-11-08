import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StyledLink } from './GlobalStyles';

const Container = styled.div`
    margin: 0 20px;
    box-sizing: border-box;
`

const Card = styled.div`
box-sizing: border-box;
    display: flex; 
    flex-direction: column;
    align-items: center;
    background-color: #F1F1F1;
    border-radius: 10px;
    margin-top: 20px;
    padding: 30px;
    text-align: center;
`

const Button = styled.button`
    display: flex;
    align-items: center;
    font-style: italic;
    font-size: 15px;
    border: none;
    background-color: transparent;
    margin-top: 20px;
`

const GreenPointsCircle = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: red;
    color: whitesmoke;
    font-size: 3rem;
    font-weight: bold;
    background-color: ${props => props.percentage > 50 ? '#26AE60' : '#DA0909'};
    span{
        font-size: 1.5rem;
        font-weight: 300;
    }
    margin: 20px 0;
`
const ButtonAlternative = styled.button`
    background-color: #252525;
    color: white;
    border: none;
    text-align: center;
    /* font-family: Roboto; */
    border-radius: 10px;
    padding: 5px 30px;
    text-transform: uppercase;
    margin: 20px;
    height: 40px;
    cursor: pointer;
    -webkit-box-shadow: 6px 6px 27px 5px #A3A3A3; 
    box-shadow: 6px 6px 27px 5px #A3A3A3;
`

export default function ClimateImpact() {

    const location = useLocation();
    const item = location.state?.item;
    const currentUser = location.state?.currentUser;
    const listName = location.state?.listName;
    let history = useHistory();

    const percentage = ((item.green_points / 5) * 100);


    return (

        <Container>
            <Button onClick={() => history.goBack()}> <ArrowBackIcon /> Back</Button>
            <Card>


                <h1>{item.label}</h1>
                <p>{item.label} är det
                    exempel som har högst klimatpåverkan eftersom exemplen släpper
                    ut metan.
                    {item.label}  som produceras i intensiva
                    uppfödningssystem, där exemplen äter spannmål och soja, kan ha negativ miljöpåverkan
                    i form av minskad biologisk mångfald och ökad användning av bekämpningsmedel.</p>

                <GreenPointsCircle percentage={percentage}> {percentage}
                    {/* <Presentage>%</Presentage> */}
                    <span>%</span>
                </GreenPointsCircle>

                <StyledLink to={{
                    pathname: "/alternative",
                    state: {
                        item: item,
                        currentUser: currentUser,
                        listName: listName
                    }
                }}>

                    <ButtonAlternative>Se alternativa varor</ButtonAlternative>
                </StyledLink>
            </Card>
        </Container>
    )
}




