import { useState,useEffect } from "react";

export default function Content() {
    //all county currency value accepted by apiUrl
    let currencies = [
        "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
        "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
        "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
        "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
        "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
        "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
        "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
        "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
        "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
        "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
        "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
        "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
        "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
        "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
        "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES",
        "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW",
        "ZWL"
    ];
    const [conversionAmt,setConversionAmt]=useState('');
    const [fromCurr,setFromCurr]=useState('USD');
    const [toCurr,setToCurr]=useState('NPR');
    const [conversionRate,setConversionRate]=useState(0);
    const [startCode,setStartCode]=useState(false);

    let apiKey = import.meta.env.VITE_API_KEY;
    let apiUrl= `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurr}/${toCurr}`;

    function handleFrom(e){
        setFromCurr(e.target.value);
        //when user change option then direct conversion occurs giving effect of live change
        //here condition statement becz when we change option without first button click then conversion should not be initiated
        if(startCode){
            getData();
        }
    }

    function handleTo(e){
        setToCurr(e.target.value);
         //when user change option then direct conversion occurs giving effect of live change
         //here condition statement becz when we change option without first button click then conversion should not be initiated
         if(startCode){
             getData();
         }
    }

    function handleConversionAmt(e){
        setConversionAmt(e.target.value);
    }
 
    //just good practise to call it from useEffect
    useEffect(()=>{
        //Due to strict mode on it initially calls getData() 2 times so to prevent that true/false is set
        if(startCode){
            getData();
        }
    },[])

    async function getData(){
         //Due to strict mode on it initially calls getData() 2 times so to prevent that true/false is set
        setStartCode(true);
        
        try{
            let response = await fetch(apiUrl);
            if(!response.ok){
                console.log("error");
            }
            // console.log(response);
            let data = await response.json();
           // console.log(data);
           // console.log(data.conversion_rate  * conversionAmt);
            setConversionRate((data.conversion_rate * conversionAmt).toFixed(2));

        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <div className="home">
                <h1 className="heading">Currency Convertor</h1><hr />
                <div className="convert-sec">
                    <div className="from-sec">
                        <h1 className="from-head">From :</h1>
                        <select className="drop-down" onChange={(e)=> handleFrom(e)} value={fromCurr}>
                            {currencies.map((ele)=>(
                                <option value={ele} key={ele}>{ele}</option>
                            ))}
                        </select>
                        <div className="conversion">
                            <img src={`https://flagsapi.com/${fromCurr.slice(0,2)}/flat/64.png`} alt="flag" />
                            <input type="number" placeholder="Enter Price" value={conversionAmt} onChange={(e)=> handleConversionAmt(e)} required />
                        </div>
                    </div>
                    <div className="to-sec">
                        <h1 className="to-head">To :</h1>
                        <select className="drop-down"  onChange={(e)=> handleTo(e)} value={toCurr}>
                            {currencies.map((ele)=>(
                                <option value={ele} key={ele}>{ele}</option>
                            ))}
                        </select>
                        <div className="conversion">
                            <img src={`https://flagsapi.com/${toCurr.slice(0,2)}/flat/64.png`} alt="flag" />
                            <h1 className="result">{conversionRate}</h1>
                        </div>
                    </div>
                </div>
                <div className="btn-sec">
                    <button onClick={getData}>Convert</button>
                </div>
            </div>
            {/* <h1>{fromCurr} {toCurr}</h1> */}
        </>
    );
}