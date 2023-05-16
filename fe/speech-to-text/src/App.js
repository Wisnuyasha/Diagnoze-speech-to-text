import React, { useState, useEffect } from 'react'
import axios from 'axios';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = ('en-US','id-ID')

export default function App() {
  const [isListen, setIsListen] = useState(false)
  const [diagnoze, setDiagnoze] = useState(null)
  const [savedDiagnoze, setSavedDiagnoze] = useState([])
  const [medicine, setMedicine] = useState(null)

  async function getData(query) {
    console.log("quiery" + query)
    await axios.get('http://localhost:5000/api/buy-medicine/products/search', {
      params: {
        query: query
      }
    })
    .then(response => {
      console.log(response);
      console.log(response.data)
      console.log(response.data.result)
      console.log("apakah object" + typeof response.data.result)
      const api = response.data.result;
      setMedicine(api);
      console.log("medicine"+medicine)
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    console.log("useEffect", medicine);
  }, [medicine]);

  useEffect(() => {
    handleListen();
    // const fetchData = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await axios.get('https://example.com/api/data');
    //     setData(response.data);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchData();
  }, [isListen])

  const handleListen = () => {
    if (isListen) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setDiagnoze(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveDiagnoze = async () => {
    await getData(diagnoze);
    console.log(medicine)
    // if (Array.isArray(result)) {
    //   setMedicine(result);
    // } else {
    //   setMedicine([]);
    // } // ganti penggunaan fungsi didalam handlesave, ganti pake state
    setSavedDiagnoze([...savedDiagnoze, diagnoze])
    setDiagnoze('')
  }

  return (
    <div className='min-h-screen w-full p-5'>
      <h1 className='font-semibold text-center text-2xl mb-4'>Diagnoze</h1>
      <div className="h-full w-full flex flex-col lg:flex-row lg:justify-center gap-8">
        <div className="h-64 w-full max-w-lg shadow-md border-gray-200 border-[1px]  mx-auto lg:mx-2 p-2">
            <h2 className='font-medium text-center text-lg mb-3'>Tell your condition</h2>
          <div className='w-full flex flex-col justify-center '>
          {isListen ? <div className='w-fit p-8 mx-auto border-gray-200 border-[1px]'>
              <p className='text-center'>{diagnoze}</p>
            </div> : <span></span>
          }
            {isListen ? <span>▶️<span className='text-gray-400'>Speak now</span></span> : <span></span>}
            <button onClick={() => setIsListen(prevState => !prevState)}>
            {isListen ? <span className='px-2 py-1 rounded-lg bg-slate-200 font-semibold text-xs'>Off</span> : <span className='px-2 py-1 rounded-lg bg-slate-200 font-semibold text-xs '>ON</span>}
            </button>
            <button onClick={async () => await handleSaveDiagnoze()} disabled={!diagnoze} >
              Save Diagnoze
            </button>
          </div>
        </div>
        <div className="h-64 w-full max-w-lg shadow-md border-gray-200 border-[1px] mx-auto lg:mx-2 p-2">
          <h2 className='font-medium text-center text-lg'>Diagnoze</h2>
          {savedDiagnoze.map(n => (
            <p key={n}>{n}</p>
          ))}
          {/* {typeof medicine == Object || Array.isArray(medicine) ? Object.keys(medicine).map(key => (
            <div key={key}>
              <p>{medicine[key].name}</p>
              <img src={medicine[key].image_url} alt={medicine[key].name} />
              <p>Range Harga: {medicine[key].min_price} - {medicine[key].base_price}</p>
            </div>
          )) : <p>No medicine found</p>} */}
        </div>
      </div>
      <div className='w-full h-full mt-3 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-7 p-2 px-7 '>
        {medicine ? medicine.map(med => ( 
              <div className=' p-4 shadow-md border-gray-200 border-[1px]' key={med.external_id}>
                <p>{med.name}</p>
                <img src={med.image_url} alt={med.name} className='w-40 mx-auto' />
                <p>Range Harga: Rp.{med.min_price} - Rp.{med.base_price}</p>
              </div> 
            )) : 
            ""
        }
      </div>
    </div>
  )
}