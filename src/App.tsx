import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Properties from './pages/dashboard/Properties';
import PropertyUpload from './pages/upload/PropertyUpload';
import PropertyDetails from './pages/property/PropertyDetails';
import AuctionPage from './pages/auction/AuctionPage';
import PlaceBidPage from './pages/auction/PlaceBidPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
          </>
        } />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="properties" element={<Properties />} />
        </Route>
        <Route path="/upload" element={
          <>
            <Navbar />
            <PropertyUpload />
          </>
        } />
        <Route path="/property/:id" element={
          <>
            <Navbar />
            <PropertyDetails />
          </>
        } />
        <Route path="/auction/:id" element={
          <>
            <Navbar />
            <AuctionPage />
          </>
        } />
        <Route path="/auction/:id/bid" element={
          <>
            <Navbar />
            <PlaceBidPage />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;