window.addEventListener('load',() => {
    let long =0;
    let lat =0;
    const tempratureDescription = document.querySelector('.temprature-description')
    const tempratureDegree = document.querySelector('.temprature-degree')
    const locationTimezon = document.querySelector('.location-timezone')
    const wIcon = document.querySelector('.icon')
    const degreeSection = document.querySelector('.degree-section')
    const degreeSectionSpan = document.querySelector('.degree-section span')



    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4d7a206d3a3ea18c99504164770a53d0&units=metric`

            fetch(api)
            .then(responce =>{
                return responce.json();
            })
            .then(data =>{
                console.log(data);
                const {temp } = data.main
                const {description , main , icon} = data.weather[0]
                const {country} = data.sys

                let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

                
                // console.log(description);
                // console.log(main);

                //set dom elements
                tempratureDegree.textContent = Math.floor(temp) + '°';
                tempratureDescription.textContent = description;
                locationTimezon.textContent = regionNames.of(country);
                console.log(icon)
                var iLink = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                wIcon.setAttribute('src' , iLink);

                let celcius = temp;
                let farenheight = Math.floor((celcius *(9/5)) + 32);
                console.log(farenheight)

                // click temp change
                degreeSection.addEventListener('click' , () => {

                    if(degreeSectionSpan.textContent==='C'){
                        // Celcius Section
                    tempratureDegree.textContent = farenheight + '°';
                    degreeSectionSpan.textContent = 'F';

                    }
                    else {
                          // farenheight  Section
                        tempratureDegree.textContent= Math.floor(temp) + '°';
                        degreeSectionSpan.textContent = 'C';
                    }
                });


            })
        });

       
    }
});






// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={4d7a206d3a3ea18c99504164770a53d0}