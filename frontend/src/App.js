import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import Profile from "./pages/User/Profile";
import NavBar from "./components/NavBar";
import { UserProvider } from './context/UserContext'
import Container from './components/Container'
import AddBook from './pages/Books/AddBook'
import BookDetails from './pages/Books/BookDetails'
import MyAdoptions from "./pages/Books/MyAdoptions";
import MyBooks from "./pages/Books/MyBooks";


function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <NavBar />
          <Container>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/user/profile" element={<Profile />} />
              <Route exact path="/books/create" element={<AddBook />} />
              <Route exact path="/books/:id" element={<BookDetails />} />
              <Route exact path="/books/myadoptions" element={<MyAdoptions />} />
              <Route exact path="/books/mybooks" element={<MyBooks />} />
            </Routes>
          </Container>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
