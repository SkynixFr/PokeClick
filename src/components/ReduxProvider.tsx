import React from 'react';
import { store } from '../app/store';
import { Provider } from 'react-redux';

export const ReduxProvider = (props: React.PropsWithChildren) => {
	return <Provider store={store}>{props.children}</Provider>;
};
