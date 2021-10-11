import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import styled from 'styled-components'
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 20px;
`
const ShoppingListContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const SearchBox = styled.div`
    /* position: fixed;
    top: 100px; */
`
const Ul = styled.ul`
    list-style-type: none;
    padding: 0;
`
const Li = styled.li`
    display: flex;
    background-color: whitesmoke;
    color: #aaa;
    padding: 5px;
    margin: 5px auto;
    border-radius: 10px;
    align-items: center;
`
const Icon = styled(ExpandMoreIcon)`
    position: absolute;
    right: 25px;
`

export default function ShoppingList() {
    const location = useLocation()
    const name = location.state?.name

    const options = [
        { value: 'chocolate', label: 'Chocolate', id: 112, eco_points: 3 },
        { value: 'strawberry', label: 'Strawberry', id: 113, eco_points: 4 },
        { value: 'vanilla', label: 'Vanilla', id: 114, eco_points: 5 }
    ]

    return (
        <MainContainer>
            <h1>Here is your shopping list {name}</h1>
            {console.log(name)}
            <SearchBar options={options} />

        </MainContainer>
    )
}

const SearchBar = ({ options }) => {

    const [myshoppingList, setMyShoppingList] = useState([]);

    let shoppingList = [];
    const handleChange = (selectedItem) => {
        /* console.log(selectedItem); */
        /* shoppingList.push(selectedItem); */
        /* console.log(shoppingList) */
        /* setMyShoppingList.push(shoppingList) */
        /* setMyShoppingList(...myshoppingList, selectedItem) */
        setMyShoppingList([
            ...myshoppingList,
            selectedItem
        ])
    }
    const listItems = myshoppingList.map((item) =>
        <li>{item}</li>
    );
    /* console.log(myshoppingList) */

    return (
        <>


            <SearchBox>
                <Select options={options}
                    onChange={handleChange}
                />
            </SearchBox>
            <ShoppingItemsList myshoppingList={myshoppingList} />

        </>
    );
}

const ShoppingItemsList = ({ myshoppingList }) => {
    console.log(myshoppingList)
    return (
        <ShoppingListContainer>

            <h3>Items list</h3>
            <SwipeableList>
                <Ul>
                    {myshoppingList.map(item => (
                        <Item item={item} />
                    ))}
                </Ul>
            </SwipeableList>
        </ShoppingListContainer>

    );
}

const Item = ({ item }) => {
    console.log(item);
    return (
        <div>
            <SwipeableListItem
                swipeLeft={{
                    action: () => console.info('swipe action triggered')
                }}
                swipeRight={{
                    action: () => console.info('swipe action triggered')
                }}
            >
                <Li> <Checkbox /> {item.label}  <Icon /> </Li>
            </SwipeableListItem>
        </div>
    )
}
