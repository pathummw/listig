import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import styled from 'styled-components'
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';


const Li = styled.li`
background-color: #333333;
color: white;
padding: 5px;
margin: 5px auto;
border-radius: 5px;

`

export default function ShoppingList() {
    const location = useLocation()
    const name = location.state?.name

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div>
            <h1>Here is your shopping list {name}</h1>
            {console.log(name)}
            <SearchBar options={options} />

        </div>
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
            <Select options={options}
                onChange={handleChange}
            />
            <ShoppingItemsList myshoppingList={myshoppingList} />
        </>
    );
}

const ShoppingItemsList = ({ myshoppingList }) => {
    console.log(myshoppingList)
    return (
        <div>

            <h3>Items list</h3>
            <SwipeableList>
                <ul>
                    {myshoppingList.map(item => (
                        <Item item={item} />
                    ))}
                </ul>
            </SwipeableList>
        </div>

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
                <Li>{item.label}</Li>
            </SwipeableListItem>
        </div>
    )
}
