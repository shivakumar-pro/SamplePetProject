import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {AddPets, Home, ListPets, Login, Website, EditPets} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="list" element={<ListPets />} />
          <Route path="add" element={<AddPets />} />
          <Route path="edit/:id" element={<EditPets />} />
        </Route>
        <Route path="/" element={<Website />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
