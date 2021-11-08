import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import styled, { keyframes } from 'styled-components'
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoopIcon from '@mui/icons-material/Loop';
import { getDatabase, ref, set, onValue, update, remove } from "firebase/database";
import QuantityComponent from './QuantityComponent';
import { GROCERY_ITEMS_DATA } from './data'
import { StyledLink } from './GlobalStyles';
import InfoIcon from '@mui/icons-material/Info';
import BackButton from './BackButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SnackbarComponent from './SnackbarComponent';
import swal from 'sweetalert';
import { AuthContext } from "./Auth.js";




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

const glowing = keyframes`
 0% {
    border: solid 2px #FFFF00;
    box-shadow: 0 0 3px #FFFF00;
  }
  50% {
    border: solid 2px #FFFF00;
    box-shadow: 0 0 10px #FFFF00;
  }
  100% {
    border: solid 2px #FFFF00;
    box-shadow: 0 0 3px #FFFF00;
  }
`
const anm = keyframes`
`
const Li = styled.li`
    background-color: #E1E1E1;
    color: #353535;
    font-weight: 500;
    font-family: "Roboto";
    padding: 5px;
    margin: 7px auto;
    border-radius: 10px;
    cursor: pointer;
    animation: ${props => props.green_points < 3 ? 'glowing 1300ms infinite' : 'none'} ;
    animation-name: ${props => props.green_points < 3 ? glowing : anm};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    transition: 1s;
    position: relative;  //To set quantity and expand components relative to the Li
    ${props => {
        if (props.expand) {
            return `
            background-color: #D0D0D0;
            height: 100px;
            transition: 1s;
            section{
                display: block;
            }
            `;
        } else if (!props.expand) {
            return `
            section{
                display: none;
            }
            `;
        }
    }
    }
`
const ItemSpan = styled.span`
    text-decoration: ${props => props.checked ? 'line-through' : 'none'};
`

const SpanButton = styled.span`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #353535;
    font-weight: 400;
    font-size: medium;
    margin-left: 30px;
    :hover{
        color: #110b11;
    }
`

const MyInfoIcon = styled(InfoIcon)`
    padding: 3px 10px;
`
const MyLoopIcon = styled(LoopIcon)`
    padding: 3px 10px;
`

const QuantityContainerSpan = styled.span`
    position: absolute;
    right: 50px;
    top: 15px;
`

const Icon = styled(ExpandMoreIcon)`
    cursor: pointer;
    position: absolute;
    right: 25px;
    top: 15px;
`

const H1 = styled.h1`
    font-weight: bold;
    text-align: center;
`
const KlimatKvitto = styled.div`
    background-color: ${props => props.color};
    font-weight: bold;
    padding: 14px;
    border-radius: 10px;
    position: sticky;
    bottom: 5px;
    color:  ${props => props.color == '#EDE641' ? '#000000' : '#FFFFFF'};
    height: ${props => props.expandKvitto ? '90vh' : ''};
    font-weight: 500;
    h1{
        text-align: center; 
        font-weight: 400;
        font-size: larger;
        margin: 50px 0;
    }
    h3{
        text-align: center;
        font-style: italic;
        font-weight: 400;
        font-size: medium;
        margin: 50px 0;
    }
`

const PointsSpan = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: whitesmoke;
    color: black; 
    margin: 50px auto;
`

const ExpandIconContainer = styled.span`
    position: absolute;
    right: 10px;
`
const KlimatInfoSection = styled.span`
    display: ${props => props.expandKvitto ? 'block' : 'none'};
`


export default function ShoppingList() {
    const location = useLocation();
    const listName = location.state?.name;
    const newList = location.state?.new_list;

    const { currentUser } = useContext(AuthContext);

    const [listObjArr, setListObjectArr] = useState([]);
    const [groceryItemsArray, setGroceryItemsArray] = useState([]);

    //Used to display snackbar messages
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState("");


    useEffect(() => {

        let isMounted = true;

        setGroceryItemsArray(GROCERY_ITEMS_DATA)
        //When user create a new shopping list, save the empty list with the Shopping list name to db
        const db = getDatabase();
        if (newList && isMounted) {
            //console.log(`Shopping List created with the name ${listName} `)
            set(ref(db, 'users/' + currentUser + '/lists/' + listName + '/'), {
                time_stamp: Date.now()
            })
                .then(() => {
                    //console.log("Created a new Shopping list successfully")
                })
                .catch((error) => {
                    setMessage(error);
                })
            return () => {
            }
        } else if (!newList && isMounted) {

            //If list is alreday created, avoid creating it
            //If so,load the data from db of the already created list
            const dbRef = ref(db, 'users/' + currentUser + '/lists/' + listName);

            onValue(dbRef, (snapshot) => {
                /* snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    console.log(childKey)
                    console.log(childData)
                }); */
                const openedListItemsObj = snapshot.val();

                let keys = [];
                let listsArr = [];
                let templistObjArr = [];

                for (let key in openedListItemsObj) {
                    if (key !== 'time_stamp') {  //Avoid adding time_stamp to the list of items
                        keys.push(key)
                        listsArr.push(openedListItemsObj[key])
                        templistObjArr.push({
                            value: key, label: openedListItemsObj[key].label, id: openedListItemsObj[key].id,
                            green_points: openedListItemsObj[key].green_points, isSelected: openedListItemsObj[key].isSelected,
                            category: openedListItemsObj[key].category, group: openedListItemsObj[key].group,
                            quantity: openedListItemsObj[key].quantity, quantity_type: openedListItemsObj[key].quantity_type
                        })
                    }

                }


                if (isMounted) {
                    setListObjectArr(templistObjArr);
                }

            }, {
                onlyOnce: true
            });
        }

        return () => {
            isMounted = false;
        }

    }, []);

    const handleSnackbar = (message, severity) => {
        setMessage(message);
        setSeverity(severity);
    };

    const clearSnackbar = () => {
        setMessage('');
        setSeverity('');
    }



    return (
        <MainContainer>
            <StyledLink to="/">
                <BackButton />
            </StyledLink>

            <H1>{listName}</H1>

            <SearchBar options={groceryItemsArray} listName={listName} currentUser={currentUser} listObjArr={listObjArr} handleSnackbar={handleSnackbar} message={message} />

            {message && <SnackbarComponent message={message} severity={severity} clearSnackbar={clearSnackbar} />}

        </MainContainer>
    )
}

const SearchBar = ({ options, listName, currentUser, listObjArr, handleSnackbar, message }) => {


    const [myshoppingList, setMyShoppingList] = useState([]);
    const [expandKvitto, setExpandKvitto] = useState(false);
    const [greenPointsTotal, setGreenPointsTotal] = useState(null);


    /* --------------If user clicked on a already created list,fetch the list from db-------------------- */
    useEffect(() => {


        let isMounted = true;
        if (isMounted && listObjArr) {
            setMyShoppingList(
                ...myshoppingList,
                listObjArr
            );

            //Set total green points of the items that is on selected list
            let totalGreenPoints = listObjArr.reduce(function (accumulator, item) {
                return accumulator + item.green_points
            }, 0);

            setGreenPointsTotal(Math.round((totalGreenPoints / listObjArr.length) * 20));

        }
        return () => {
            isMounted = false;
        }
    }, [listObjArr])

    /* ---------------------------------- */


    const handleChange = (selectedItem) => {


        //Check temp array: to check if the selected item is alredy exist on the shopping list
        if (!myshoppingList.find(i => i.id === selectedItem.id)) {

            setMyShoppingList([
                ...myshoppingList,
                selectedItem
            ]);

            /* console.log(myshoppingList) */
            ////1.Save the selected item to the db if the item not exist already
            const db = getDatabase();
            set(ref(db, 'users/' + currentUser + '/lists/' + listName + '/' + selectedItem.value), {
                id: selectedItem.id,
                label: selectedItem.label,
                green_points: selectedItem.green_points,
                quantity_type: selectedItem.quantity_type,
                quantity: '1',
                category: selectedItem.category,
                group: selectedItem.group,
                isSelected: false

            })
                .then(() => {
                    handleSnackbar("Varan har sparats", 'success')
                })
                .catch((error) => {
                    handleSnackbar('Något gick fel. Försök igen', 'error');
                })

        } else {

            swal({
                title: `${selectedItem.label}`,
                text: "finns redan i inköpslistan",
                icon: "info",
                button: "Okej",
            });
        }



    }

    const handleDeleted = (itemId) => {
        //Remove deleted item from myshoppingList array and setState to re-render 
        setMyShoppingList(myshoppingList.filter(item => item.id !== itemId));
    }

    const onClickKlimatKvitto = () => {
        setExpandKvitto(!expandKvitto);
    }

    return (
        <>


            <SearchBox>
                <Select options={options}
                    onChange={handleChange}
                />
            </SearchBox>
            <ShoppingItemsList myshoppingList={myshoppingList} currentUser={currentUser} listName={listName} handleDeleted={handleDeleted} handleSnackbar={handleSnackbar} message={message} />

            {/* Render the Klimatkvitto comp. only if there is items on shopping list && send bg color to styled components accroding to green points 
            => if there is at least one item that green_points are below 3, set bg yellow*/}
            {myshoppingList && !!myshoppingList.length &&
                <KlimatKvitto color={myshoppingList.filter(x => x.green_points < 3).length >= 1 ? '#EDE641' : '#26AE60'} onClick={onClickKlimatKvitto} expandKvitto={expandKvitto}>
                    Klimatkvitto
                    <ExpandIconContainer>{expandKvitto ? <ExpandMoreIcon /> : <ExpandLessIcon />}</ExpandIconContainer>
                    <KlimatInfoSection expandKvitto={expandKvitto}>

                        {greenPointsTotal > 80 ? <h3> Bra jobbat 👍 </h3> : <h3> Finns förbättring 👎 </h3>}
                        <h1>Totalt antal gröna poäng du har tjänat : </h1>
                        <PointsSpan>{greenPointsTotal} %</PointsSpan>
                    </KlimatInfoSection>

                </KlimatKvitto>}

        </>
    );
}

const ShoppingItemsList = ({ myshoppingList, currentUser, listName, handleDeleted, handleSnackbar, message }) => {


    return (
        <ShoppingListContainer>

            <Ul>
                {myshoppingList && myshoppingList?.map(item => (

                    <Item key={item.id} item={item} currentUser={currentUser} listName={listName} handleDeleted={handleDeleted} handleSnackbar={handleSnackbar} message={message} />

                ))}


            </Ul>
        </ShoppingListContainer>

    );
}

const Item = ({ item, currentUser, listName, handleDeleted, handleSnackbar, message }) => {

    const [expand, setExpand] = useState(false);
    const [checked, setChecked] = useState(false);
    const [greenPoints, setGreenPoints] = useState(null);



    useEffect(() => {
        if (item) {
            setChecked(item.isSelected);
            setGreenPoints(item.green_points);
        }
        return () => {
            //cleanup
        }
    }, [])





    const handleOnClickExpand = (e) => {
        if (e.target.closest('input')) {
            return;
        } else {
            setExpand(!expand);
        }

    }

    const handleChangeCheckbox = (e) => {
        setChecked(e.target.checked);
        updateListItem(e.target.checked);
    }

    const updateListItem = (isSelected) => {
        const db = getDatabase();

        update(ref(db, 'users/' + currentUser + '/lists/' + listName + '/' + item.value), {
            isSelected: isSelected
        })
            .then(() => {
                handleSnackbar('Varan har uppdaterats', 'success')
            })
            .catch((error) => {
                handleSnackbar('Något gick fel. Försök igen', 'error');
            })
        return () => {
        }
    }

    //UPDATE QUANTITY
    const handleCallback = (quantity) => {

        const db = getDatabase();

        if (quantity === 0) { //Delete an item from the list when user select quantity as 0

            remove(ref(db, 'users/' + currentUser + '/lists/' + listName + '/' + item.value))
                .then(() => {
                    /* console.log("Item deleted") */
                    handleSnackbar('Varan har tagits bort från listan.', 'success');
                    handleDeleted(item.id); ///Callback function to remove deleted item li from the list
                })
                .catch((error) => {
                    handleSnackbar('Något gick fel. Försök igen', 'error');
                })
            return () => {
            }
        } else {

            update(ref(db, 'users/' + currentUser + '/lists/' + listName + '/' + item.value), {
                quantity: quantity
            })
                .then(() => {
                    /* console.log("Quantity updated successfully") */
                    handleSnackbar('Kvantiteten har uppdaterats', 'success');
                })
                .catch((error) => {
                    handleSnackbar('Något gick fel. Försök igen', 'error');
                })
            return () => {
            }
        }


    }


    return (
        <div>

            <Li expand={expand} green_points={greenPoints} onClick={handleOnClickExpand} > <Checkbox onChange={handleChangeCheckbox} checked={checked} /> <ItemSpan checked={checked}> {item.label}  </ItemSpan> <Icon onClick={handleOnClickExpand} />
                <QuantityContainerSpan><QuantityComponent handleCallback={handleCallback} quantity={item.quantity} /></QuantityContainerSpan>

                <section>
                    <StyledLink to={{
                        pathname: "/climate-impact",
                        state: {
                            item: item,
                            currentUser: currentUser,
                            listName: listName
                        }
                    }}>
                        <SpanButton> <MyInfoIcon /> Klimat påverkan</SpanButton>
                    </StyledLink>
                    <StyledLink to={{
                        pathname: "/alternative",
                        state: {
                            item: item,
                            currentUser: currentUser,
                            listName: listName
                        }
                    }}>
                        <SpanButton><MyLoopIcon /> Alternativ på hållbara varor</SpanButton>
                    </StyledLink>

                </section>
            </Li>


        </div>
    )
}

