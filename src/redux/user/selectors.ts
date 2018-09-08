
import { RootReducerInterface } from 'redux/rootReducer'

export const isLoading = (state: RootReducerInterface) => state.user.isLoading
export const getUserError = (state: RootReducerInterface) => state.user.error
export const getUsers = (state: RootReducerInterface) => state.user.items
export const getUserSearchTerm = (state: RootReducerInterface) => state.user.username
