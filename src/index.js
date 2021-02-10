import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import store from './redux/store';
import { Provider } from 'react-redux';

const MainApp = () => {
	return (
		<Provider store={store}>
			<App/>
		</Provider>
	)
}

ReactDOM.render(<MainApp/>, document.getElementById('root'));