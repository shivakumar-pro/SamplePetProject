import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { AddPets, Home, ListPets, Login, Website, SignUP, Edit, Dashboard, Customer, Custlist } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/home" element={<Home />}>
          <Route path="list" element={<ListPets />} />
          <Route path="add" element={<AddPets />} />
          <Route path="edit/:petid" element={<Edit />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="custlist" element={<Custlist />} />


        </Route>
        <Route path="/" element={<Website />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
