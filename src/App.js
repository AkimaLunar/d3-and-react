import React from 'react';

import Competition from './components/Competition';
import Inventory from './components/Inventory';
import Page from './components/Page';

const App = () => (
    <div className="App">
        <Page className="centered" alt>
            <Inventory />
        </Page>
        <Page>
            <Competition />
        </Page>
    </div>
);

export default App;
