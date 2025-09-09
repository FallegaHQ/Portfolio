import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Portfolio from '@components/portfolio';

const App: React.FC = () => {
    return (<Routes>
        <Route path="/" element={<Portfolio/>}/>
        <Route path="/experience" element={<Portfolio/>}/>
        <Route path="/education" element={<Portfolio/>}/>
        <Route path="/skills" element={<Portfolio/>}/>
        <Route path="/projects" element={<Portfolio/>}/>
        <Route path="/github" element={<Portfolio/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>);
};

export default App;