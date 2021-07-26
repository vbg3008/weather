window.addEventListener('load',() => {
    let long =0;
    let lat =0;
    const tempratureDescription = document.querySelector('.temprature-description')
    const tempratureDegree = document.querySelector('.temprature-degree')
    const locationTimezon = document.querySelector('.location-timezone')
    const wIcon = document.querySelector('.icon')


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
                tempratureDegree.innerHTML = temp;
                tempratureDescription.innerHTML = description;
                locationTimezon.textContent = regionNames.of(country);
                console.log(icon)
                var iLink = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                wIcon.setAttribute('src' , iLink);


            })
        });

       
    }
});






// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={4d7a206d3a3ea18c99504164770a53d0}