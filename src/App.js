import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignUp from './components/signUpPage/SignUp';
import SignIn from './components/signUpPage/SignIn';
import ShowNavbar from './components/ShowNavbar';
import ShowFooter from './components/ShowFooter';
import Navbar from './components/Navbar';
import Swipper from './components/Swipper';
import HomePage from './components/binYousaf/HomePage';
import ProductPage from './components/binYousaf/ProductPage';
import DescriptionPage from './components/binYousaf/DescriptionPage';
import CartPage from './components/binYousaf/CartPage';
import WishListPage from './components/binYousaf/WishListPage';
import CustomerPage from './components/binYousaf/CustomerPage';
import Footer from './components/Footer';
import Confirmation from './components/binYousaf/Confirmation';
import ContactUs from './components/binYousaf/ContactUs';
import DashboardRoutes from './components/AdminDashboard/DashboardRoutes';
import StatPage from './components/AdminDashboard/StatPage';
import DAaddProducts from './components/AdminDashboard/DAaddProducts';
import DAProductsPage from './components/AdminDashboard/DAProductsPage';
import DAOrdersPage from './components/AdminDashboard/DAOrdersPage';
import DAEdtiProduct from './components/AdminDashboard/DAEdtiProduct';
import ProfileInfo from './components/AdminDashboard/ProfileInfo';

const App = () => {
  return (
  <div className="App">
      <BrowserRouter>

        <ShowNavbar>
          <Swipper />
          <Navbar />
        </ShowNavbar>
        
              <Routes>
                <Route path="/" element = {<SignUp />} />
                <Route path="SignIn" element = {<SignIn />} />

                <Route path='/AdminDashboardRoute' element = {<DashboardRoutes />} >
                  <Route index element = {<StatPage />} />
                  <Route path="DAaddProduct" element={<DAaddProducts />} />
                  <Route path="DAEditProduct" element={<DAEdtiProduct />} />  
                  <Route path="DAProduct" element={<DAProductsPage />} />
                  <Route path="DAOrders" element={<DAOrdersPage />} />
                  <Route path="DAProfileInfoPage" element={<ProfileInfo />} />
                </Route>

                <Route path='HomePage' element = {<HomePage />} />
                <Route path='ProductPage' element = {<ProductPage />} />
                <Route path='DescriptionPage' element = {<DescriptionPage />} />
                <Route path='CartPage' element = {<CartPage />} />
                <Route path='WishListPage' element = {<WishListPage />} />
                <Route path='CustomerPage' element = {<CustomerPage />} />
                <Route path='ConfirmationPage' element = {<Confirmation />} />
                <Route path='ContactUSPage' element = {<ContactUs />} />
              </Routes>

        <ShowFooter>
          <Footer />
        </ShowFooter>
      </BrowserRouter> 
  </div>
  );
}

export default App;
