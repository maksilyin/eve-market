import React from "react";
import { Routes, Route} from "react-router-dom";
import Header from './components/Header';
import MarketPage from './pages/marketPage';
import ConfigContext from './contexts/configContext';
import useConfig from "./hooks/useConfig";

function App() {
    const config = useConfig();
    React.lang = config.lang;
    return (
        <div className="App gallente-theme">
            <ConfigContext.Provider value={{...config}}>
                <Header />
                <div className="main">
                    <Routes>
                        <Route path="/" element={<MarketPage />} />
                    </Routes>
                </div>
            </ConfigContext.Provider>
        </div>
    );
}

export default App;
