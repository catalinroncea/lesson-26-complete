import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectDisplayName = createSelector(
    [selectUser],
    user => user.displayName
);

export const selectEmail = createSelector(
    [selectUser],
    user => user.email
);

export const selectPassword = createSelector(
    [selectUser],
    user => user.password
);

export const selectConfirmPassword = createSelector(
    [selectUser],
    user => user.confirmPassword
);
