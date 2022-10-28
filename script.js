document.addEventListener('DOMContentLoaded', ()=>{
    let fromInput = document.getElementById('from')
    let toInput = document.getElementById('to')
    let fromList = document.querySelector('.currencyConverter__fromList')
    let toList = document.querySelector('.currencyConverter__toList')
    let output = document.querySelector('.currencyConverter__result')
    
    let countriesSymbols = [ "AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LA","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL"]

    // Program to get country name from `from input tag`
    fromInput.addEventListener('keyup', ()=>{
        removeUnmatchedFromCountry();

        for(let countrySymbol of countriesSymbols){
            if(countrySymbol.toLowerCase().startsWith(fromInput.value.toLowerCase()) && fromInput.value != ''){
                let item = document.createElement('li')
                item.classList.add('from-list-item')
                item.style.cursor = 'pointer'
                item.style.backgroundColor = 'white'
                item.style.padding = '10px'

                // item.setAttribute("onclick", "displayInputName('" + countrySymbol + " ')")
                item.setAttribute("onclick","displayFromName")
                item.onclick = function() {
                    displayFromName(countrySymbol)
                    fromList.innerHTML = ''
                }

                let word = "<b>"+ countrySymbol.substring(0, fromInput.value.length) +"</b>"
                word += countrySymbol.substring(fromInput.value.length)

                item.innerHTML = word

                fromList.appendChild(item)

            }
        }
    })

    function displayFromName(value){
        fromInput.value = value;
    }
    
    function removeUnmatchedFromCountry(){
        document.querySelectorAll('.from-list-item').forEach(item => {
            item.remove()
        })
    }


    // Program to get country name from `to input tag`
    toInput.addEventListener('keyup', ()=>{
        removeUnmatchedToCountry();

        for(let countrySymbol of countriesSymbols){
            if(countrySymbol.toLowerCase().startsWith(toInput.value.toLowerCase()) && toInput.value != ''){
                let item = document.createElement('li')
                item.classList.add('to-list-item')
                item.style.cursor = 'pointer'
                item.style.backgroundColor = 'white'
                item.style.padding = '10px' 

                item.setAttribute("onclick","displayToName")
                item.onclick = function() {
                    displayToName(countrySymbol)
                    toList.innerHTML = ''
                }

                let word = "<b>"+ countrySymbol.substring(0, toInput.value.length) +"</b>"
                word += countrySymbol.substring(toInput.value.length)

                item.innerHTML = word

                toList.appendChild(item)

            }
        }
    })

    function displayToName(value){
        toInput.value = value;
    }
    
    function removeUnmatchedToCountry(){
        document.querySelectorAll('.to-list-item').forEach(item => {
            item.remove()
        })
    }







    // Currency exchange rate
    document.querySelector('.currencyConverter__form').addEventListener('submit', (event)=>{
        event.preventDefault();


        // APIs
        let headers = new Headers();
        // headers.append('apikey', 'xY1hptQB1I5ZiGtqCm4MggjZMXegBYjX')
        headers.append('apikey', 'm3GCQtNiEttM6nVwBixCoyPW8YEEnoVQ')
        
        
        let requestOptions = {
        method : 'GET',
        redirect: 'follow',
        headers: headers
        }
        
   
    
        let {target : {to, from, amount}} = event;
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to.value}&from=${from.value}&amount=${amount.value}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            
            if(to.value != '' && from.value != '' && amount.value != ''){
                output.textContent = `As per the exchange rate ${data.info.rate.toFixed(2)} for ${data.date}, converted value in ${data.query.to} is ${data.result.toFixed(2)} `
            }else{
                output.textContent = 'There is some error'
            }
        })
        .catch(error => console.log('error', error));
    
    })  























































































})


