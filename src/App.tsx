import './App.css';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import { emojifyWithRandom } from './services/emojify';
import { AmmountLabel } from './types/AmmountLabel';
import { FaRedoAlt } from "react-icons/fa";
import Button from './components/Button/Button';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [oldText, setOldText] = useState('');
  const [selectedAmmount, setSelectedAmmount] = useState<AmmountLabel>("low");
  const [copied, setCopied] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
 
  const updateText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOldText(inputText);
    setInputText(event.target.value);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if(inputText === '') {
      alert('Please type something!');
      return;
    }
    setResult('loading...');
    let text = await emojifyWithRandom(inputText, selectedAmmount);
    setResult(text);
    setLoading(false);
  }

  const clearInput = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setInputText('');
    setResult('');
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
  }


  const toggleModal = () => {
    setModal(!modal);
  }

  useEffect(() => {
      setInterval(() => {
        if(copied)
          setCopied(false)
      }, 5000)
  }, [copied])

  return (
    <>

      <div className='m-8 mx-auto p-8 bg-gray-800 flex flex-col lg:max-w-fit flex-nowrap rounded-xl border-2 border-indigo-700 justify-center'>
        <h1 className='text-4xl text-center text-indigo-600 font-semibold tracking-wide'>🇪mojify!</h1>
        {/* <button className='text-slate-400 text-center text-sm' onClick={toggleModal}>About</button> */}
        <form onSubmit={(e) => submitHandler(e)} className='flex flex-col justify-center m-16 gap-6'>
          <textarea value={inputText} onChange={(e) => updateText(e)} className='rounded-md p-2' placeholder='Type something...' rows={4} cols={50}>
          </textarea>
          {/* <RadioContainer selectedAmmount={selectedAmmount} setSelectedAmmount={setSelectedAmmount}/> */}
          <div className='flex justify-center'>
            <Button color='green' key={'1'} type='submit'>              
              Emojify! 😱     
            </Button>
            {/* <button type='submit' className='bg-green-400 transition duration-200 hover:bg-green-300 font-bold text-xl p-2 rounded-lg m-2 shadow-md'></button> */}
            {result != '' && !loading && <Button type='submit' color='yellow'><FaRedoAlt className='text-white'/></Button>}
            <button className='bg-red-400 transition duration-200 hover:bg-red-300 font-bold text-xl p-2 rounded-lg m-2 shadow-md' onClick={(e) => clearInput(e)}>Clear ❌</button>
          </div>

          <textarea defaultValue={result} rows={4} cols={50} className='rounded-md p-2' disabled>
          </textarea>
        </form>
        <div className='flex flex-col max-w-fit justify-center self-center'>
          <p className='text-green-400 text-center text-opacity-80' style={copied ? {} : {display: 'none'}}>copied to clipboard!</p>
          <button className='rounded-lg m-2 bg-gray-200 shadow-md text-slate-700 p-1 w-auto' onClick={copyToClipboard}>Copy to clipboard</button>
        </div>  
      </div>
      <footer className=' py-4 px-2'>
        <div className='container mx-auto flex justify-center items-center text-center'>
          <div className='text-white text-md flex flex-col gap-2'>
            <p>Emojify 1.0 by Leonardo Ereno</p>
            <p className='font-bold hover:text-gray-400 transition duration-300'><a href="http://github.com/leoereno/emojify" target='_blank'>Github</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
