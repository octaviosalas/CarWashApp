import './App.css'
import MainCleaningData from './components/Main/MainCleaningData';
import Navbar from './components/Navbar/Navbar';

function App() {

     

  return (
    
      <div className='flex flex-col items-center  h-screen justify-center text-center w-full'>
          <div className='w-[1400px]'>
                 <Navbar/>
            </div>
          <MainCleaningData/>
      </div>
  )
}

export default App
