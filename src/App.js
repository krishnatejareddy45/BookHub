import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Protected from './components/Protected'
import Bookshelves from './components/Bookshelves'
import BookItemDetails from './components/BookItemDetails'
import NotFound from './components/NotFound'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Protected exact path="/" component={Home} />
      <Protected exact path="/shelf" component={Bookshelves} />
      <Protected exact path="/books/:id" component={BookItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
