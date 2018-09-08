
import { RootReducerInterface } from 'redux/rootReducer'

export const getRepos = (state: RootReducerInterface) => state.issue.repos
export const getCurrUser = (state: RootReducerInterface) => state.issue.user
export const getIssues = (state: RootReducerInterface) => state.issue.issues
export const getActiveRepo = (state: RootReducerInterface) => state.issue.activeRepo
export const isLoadingRepos = (state: RootReducerInterface) => state.issue.isLoadingRepos
export const isLoadingIssues = (state: RootReducerInterface) => state.issue.isLoadingIssues
export const getActiveRepoDescription = (state: RootReducerInterface) => state.issue.activeRepoDescription
