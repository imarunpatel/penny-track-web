
import { RouterProvider } from 'react-router-dom'
import './App.scss'
import router from './router/router'
import { toastConfig } from 'react-simple-toasts'
import 'react-simple-toasts/dist/style.css';
import { setupIonicReact } from '@ionic/react';
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
// import 'react-simple-toasts/dist/theme/dark.css';
import '@ionic/react/css/core.css';555
import { IonApp } from '@ionic/react'


setupIonicReact();

toastConfig({ theme: 'dark', position: 'bottom-center'})
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function App() {
  return (
    <IonApp>
      <RouterProvider router={router}></RouterProvider>
    </IonApp>
  )
}

export default App
