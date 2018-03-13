import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';

console.log(Router);


ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
