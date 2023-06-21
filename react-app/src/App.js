import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ProductDetail from "./components/Products/ProductDetail";
import CreateProduct from "./components/Products/CreateProduct";
import EditProductModal from "./components/Products/EditProductModal";
import UserProfile from "./components/UserProfile/UserProfile";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/products/new'>
            <CreateProduct />
          </Route>
          <Route path='/products/:productId/edit'>
            <EditProductModal />
          </Route>
          <Route path='/products/:productId'>
            <ProductDetail />
          </Route>
          <Route path='/users'>
            <UserProfile />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
