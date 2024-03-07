import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import HomePage from './Pages/HomePage';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import MoviesPage from './Pages/MoviesPage';
import SeriesPage from './Pages/SeriesPage';
import WatchPage from './Pages/WatchPage';
import MyListPage from './Pages/MyListPage';
import { HelmetProvider } from 'react-helmet-async'
import {  UserProvider } from './Context/user.tsx'
import SearchPage from './Pages/SearchPage.tsx';
import NavBar from './Components/shared/NavBar.tsx';

const App=()=> {

  
  return (
    <UserProvider>
    <HelmetProvider>
    <BrowserRouter>
      <ToastContainer position="top-right" />

      <main className='bg-zinc-900 overflow-x-hidden min-h-screen'>

        <NavBar/>
        <Routes>          
        <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/series" element={<SeriesPage />}></Route>
          <Route path="/mylist" element={<MyListPage />}></Route>
          <Route path="/watch/:id" element={<WatchPage />}></Route>
          <Route path="/search/:title" element={<SearchPage />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
    </HelmetProvider>
  </UserProvider>
  )
}

export default App
