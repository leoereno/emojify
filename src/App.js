import './App.css';
import { useEffect, useState } from 'react';
import { emojifyText, emojifyWithRandom } from './services/emojify';
import RadioContainer from './components/RadioContainer';
import Footer from './components/Footer';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [oldText, setOldText] = useState('');
  const [selectedAmmount, setSelectedAmmount] = useState('low');
  const [copied, setCopied] = useState(false);
 
  const updateText = (event) => {
    setOldText(inputText);
    setInputText(event.target.value);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if(inputText === '') {
      alert('Please type something!');
      return;
    }
    setResult('loading...');
    let text = await emojifyWithRandom(inputText, selectedAmmount);
    setResult(text);
  }

  const clearInput = (e) => {
    e.preventDefault();
    setInputText('');
    setResult('');
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
  }

  // useEffect(() => {
  //   //const oldText = inputText;
  //   async function checkOldText(oldText) {
  //     setTimeout(() => {
  //       return inputText === oldText;
  //     }, "1000");
  //     const isTextSame = await checkOldText(oldText);
  //     return isTextSame;
  //   }

  //   const isTextSame = checkOldText();

  //   // if(isTextSame) {
  //   //   let text = await emojifyText(inputText);
  //   //   setResult(text);
  //   // }
  // }, [inputText])


  return (
    <>
      <div className='container'>
        <form onSubmit={submitHandler} className='input-form'>
          <textarea value={inputText} onChange={updateText} className='form-item' placeholder='Type something...' rows="4" cols="50">
          </textarea>
          {/* <RadioContainer selectedAmmount={selectedAmmount} setSelectedAmmount={setSelectedAmmount}/> */}
          <div className='btn-container'>
            <button type='submit' className='form-item go-btn btn'>Emojify!</button>
            <button className='form-item cancel-btn btn' onClick={clearInput}>Clear</button>
          </div>

          <textarea defaultValue={result} rows="4" cols="50">
          </textarea>
        </form>
        <p className='copied' style={copied ? {} : {display: 'none'}}>copied to clipboard!</p>
        <button className='btn-copy' onClick={copyToClipboard}>Copy to clipboard</button>
      </div>
      <Footer />
    </>
  );
}

export default App;
