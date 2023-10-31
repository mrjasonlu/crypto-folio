import React, { useReducer, useMemo } from 'react';

type AccountSettingsState = {
  hideBalance: boolean;
  currency: string;
};

type HideBalanceAction = {
  type: 'toggle_hide_balance';
  payload?: boolean;
};

type AccountActions = HideBalanceAction;

type AccountContextState = {
  state: AccountSettingsState;
  dispatch: React.Dispatch<HideBalanceAction>;
};

const initialState = {
  hideBalance: false,
  currency: 'AUD',
};

export const AccountSettingsContext =
  React.createContext<AccountContextState | null>(null);

function accountReducer(state: AccountSettingsState, action: AccountActions) {
  switch (action.type) {
    case 'toggle_hide_balance': {
      return {
        ...state,
        hideBalance: !state.hideBalance,
      };
    }
    //todo: add update currency action
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function AccountSettingsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AccountSettingsContext.Provider value={contextValue}>
      {children}
    </AccountSettingsContext.Provider>
  );
}
