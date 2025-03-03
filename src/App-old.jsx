import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Buttons'
function App() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    alert("Button Clicked!");
  };
  return (
    <>
      <div className="container bg-gray-200">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4">
          {/* <div class="bg-red-500 text-white col-span-3 p-4">1</div> */}
          <div class="bg-blue-500 col-span-8 text-white p-4">
            <div class="grid grid-cols-12">
              <div class="bg-red-300 col-span-3 text-white p-4">
                Left
              </div>
              <div class="bg-red-500 col-span-9 text-white p-4">
                Right
              </div>
            </div>
          </div>
          <div class="bg-green-500 text-white col-span-4 p-4">3</div>
        </div>
        <div className="pt-[200px]"></div>
        <div className="space-y-4 p-6 hidden">
          {/* Normal Button */}
          <Button variant="primary" size="md" onClick={handleClick}>
            Click Me
          </Button>

          {/* Large Secondary Button */}
          <Button variant="secondary" size="lg" onClick={() => console.log("Secondary Button Clicked")}>
            Console Log Button
          </Button>

          {/* Outline Button */}
          <Button variant="outline" onClick={() => alert("Outline Button Clicked!")}>
            Outline Button
          </Button>

          {/* Using as an Anchor Link (No Click Event) */}
          <Button as="a" href="https://example.com" target="_blank" variant="primary">
            Visit Website
          </Button>

          {/* Anchor Link with Click Event */}
          <Button as="a" href="#" variant="danger" onClick={(e) => {
            e.preventDefault();
            alert("Anchor Link Clicked!");
          }}>
            Prevent Link Click
          </Button>
        </div>
        <h1>Test</h1>
        <div class="customCLass hidden">
          <h4 className="text-[30px] bg-[#ff4]">Text</h4>
        </div>
        <div className='hidden hover:bg-amber-700'>
            <h5 className='font-bold text-2xl bg-gradient-to-r from-purple-500 to-orange-500 text-transparent bg-clip-text'>Gradient</h5>
        </div>
      </div>
      
    </>
  )
}

export default App
