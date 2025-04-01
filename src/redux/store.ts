import {configureStore} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { personReduser } from './reducer/PersonsReducer'

export const store = configureStore({
    reducer: {
        persons: personReduser,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(thunk)
})

export type RootState = ReturnType<typeof store.getState>