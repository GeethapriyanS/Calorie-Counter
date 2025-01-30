import NutritionInfo from './components/functionalComponents/NutritionInfo';
import {BrowserRouter ,Routes ,Route} from 'react-router-dom';
import SignUp from "./components/functionalComponents/SignUp";
import Login from './components/functionalComponents/Login';
import MealsContainer from './components/functionalComponents/Meal';
import Goals from './components/functionalComponents/Goals';
import Home from './components/functionalComponents/Home'

const App = () => {
    return (
      <>
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/meals" element={<MealsContainer />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/goals" element={<Goals />}></Route>
        <Route path="/nutrition-info" element={<NutritionInfo />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;