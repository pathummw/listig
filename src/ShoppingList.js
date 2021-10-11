import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import styled from 'styled-components'
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { AuthUserContext } from './App'


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
    const location = useLocation();
    const listName = location.state?.name;


    const options = [
        { value: 'chocolate', label: 'Chocolate', id: 112, green_points: 3 },
        { value: 'strawberry', label: 'Strawberry', id: 113, green_points: 4 },
        { value: 'vanilla', label: 'Vanilla', id: 114, green_points: 5 }
    ]

    return (
        <MainContainer>
            <h1>Here is your shopping list {listName}</h1>
            {console.log(listName)}
            <SearchBar options={options} listName={listName} />

        </MainContainer>
    )
}

const SearchBar = ({ options, listName }) => {

    const authUserId = useContext(AuthUserContext);
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

        //Check temp array: to check if the selected item is alredy exist on the shopping list
        const itemExist = (myshoppingList.some((item) => {
            return item.value === selectedItem.value
        }))

        console.log(itemExist)
        //1.Save the selected item to the db if the item not exist already
        if (!itemExist) {
            console.log("INSIDE ITEM SAVE")
            const db = getDatabase();
            set(ref(db, 'users/' + authUserId + '/lists/' + listName + '/' + selectedItem.value), {
                id: selectedItem.id,
                quantity: '1kg',
                green_points: selectedItem.green_points
            })
                .then(() => {
                    console.log("Item saved successfully")
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            console.log("Item already exist in shopping list")
        }



        /* if (myshoppingList.includes((item) => {
            item.value === selectedItem.value
            console.log("Item exists")
        })) */

        //2. Read the data from db after adding an item
        /* set(ref(db, 'users/' + authUserId + '/lists/' + listName + '/' + selectedItem.value) */
        if (!itemExist) {
            console.log(itemExist)
            const db = getDatabase();
            const starCountRef = ref(db, 'users/' + authUserId + '/lists/' + listName);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                /* updateStarCount(postElement, data); */
                console.log(data)
            });
        }



    }
    /* const listItems = myshoppingList.map((item) =>
        <li>{item}</li>
    ); */
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
    /* console.log(myshoppingList) */
    console.log("Shopping item fun. call")
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
    /* console.log(item); */
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
