import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LayoutHeader from './components/LayoutHeader'
import LayoutFooter from './components/LayoutFooter'

import PageHome from './components/PageHome'
import PageJobDetails from './components/PageJobDetails'
import PageAddJob from './components/PageAddJob'
import PageEditJob from './components/PageEditJob'

export default function App() {
    return (
        <Router>
            <LayoutHeader />
            <Routes>
                <Route path="/" element={<PageHome />}></Route>
                <Route path="/view/:id" element={<PageJobDetails />}></Route>
                <Route path="/add_job/" element={<PageAddJob />}></Route>
                <Route path="/edit/:id" element={<PageEditJob />}></Route>
            </Routes>
            <LayoutFooter />
        </Router>
    )
} 