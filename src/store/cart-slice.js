import {createSlice} from '@reduxjs/toolkit'

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        itemsList:[],
        totalQuantity:0,
        showCart:false
    },
    reducers:{
        addToCart(state,action){
            const newItem=action.payload;
            //to check if the item is alredy avalble
            const existingitem=state.itemsList.find((item)=>item.id===newItem.id)
            if(existingitem){
                existingitem.quantity++
                existingitem.totalPrice+=newItem.price
            }else{
                state.itemsList.push({
                    id:newItem.id,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                    name:newItem.name
                })
                state.totalQuantity++
            }
        },
        removeFromCart(state, action){
            const id=action.payload
            const existingitem=state.itemsList.find((item)=>item.id===id)
            if(existingitem.quantity===1){
                state.itemsList=state.itemsList.filter(item=>item.id !==id)
                state.totalQuantity--
            }else{
                existingitem.quantity--;
                existingitem.totalPrice-=existingitem.price
            }
        },
        setShowCart(state){
            state.showCart=!state.showCart
        }
    }
})

export const cartActions=cartSlice.actions
export default cartSlice