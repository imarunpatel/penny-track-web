
import { RouterProvider } from 'react-router-dom'
import './App.scss'
import router from './router/router'
import { toastConfig } from 'react-simple-toasts'
import 'react-simple-toasts/dist/style.css';
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
// import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({ theme: 'dark', position: 'bottom-center'})
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
