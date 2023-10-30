import React from 'react';

const initialState = {
  hideBalance: false,
};

const userSettingsContextWrapper = (component?: React.Component) => ({
  ...initialState,
  toggleHideBalance: () => {
    initialState.hideBalance = !initialState.hideBalance;
    component?.setState({ context: userSettingsContextWrapper(component) });
  },
});

type Context = ReturnType<typeof userSettingsContextWrapper>;

export const UserSettingsContext = React.createContext<Context>(
  userSettingsContextWrapper(),
);

interface State {
  context: Context;
}

export class UserSettingsContextProvider extends React.Component {
  state: State = {
    context: userSettingsContextWrapper(this),
  };

  render() {
    return (
      <UserSettingsContext.Provider value={this.state.context}>
        {this.props.children}
      </UserSettingsContext.Provider>
    );
  }
}
