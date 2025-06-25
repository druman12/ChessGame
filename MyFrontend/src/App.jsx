import { BrowserRouter , Route , Routes} from "react-router-dom"
import Landing from "./screens/Landing"
import Game from "./screens/Game"
import './App.css'

function App() {
  
  return (
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/game' element={<Game />} />
				</Routes>
			</BrowserRouter>
  )
}

export default App
