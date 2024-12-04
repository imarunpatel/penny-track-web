import { render } from '@testing-library/react';
import App from './App';


jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        RouterProvider: ({ } : { router : any}) => <div>Mock RouterProvider</div>
    }
})

describe('Should render the App component', () => {
    it('renders the App component', () => {
        render(<App />)
    })
})