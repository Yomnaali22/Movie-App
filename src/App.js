import React from 'react';
//Routing 
import { BrowserRouter as Router, 
Route, 
Routes
} from 'react-router-dom';
import Header from './components/Header/header'
import Home from './components/pages/Home';
import Movie from './/components/pages/Movie'
import NotFound from './/components/pages/NotFound'


//styles
import { GlobalStyle } from './GlobalStyle'



const App = () => (
<Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:movieId' element={<Movie/>}/>
        <Route path='/*' element={<NotFound />}/>
      </Routes>
      <GlobalStyle />
      </Router>
)

export default App;