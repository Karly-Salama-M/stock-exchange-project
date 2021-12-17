let userInput = document.querySelector('#userInput');
const searchButton = document.getElementById("searchButton");
const loader = document.querySelector(".loading-spinner");

//reference: https://dev.to/vaishnavme/displaying-loading-animation-on-fetch-api-calls-1e5m
//showing loader
function displayLoading() {
  loader.classList.add("display");

  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}
// hiding loader 
function hideLoading() {
  loader.classList.remove("display");
}


const getList = () => {
  displayLoading();
  const fieldInput = userInput.value;
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${fieldInput}&limit=10&exchange=NASDAQ`;

  
fetch(url)
.then((response) => response.json()
.then((data) => {

  
	for (let i = 0; i <= data.length-1; i++) {
        const listItem = document.createElement("a");
        listItem.href = `./html/company.html?symbol=${data[i].symbol}`;
        listItem.classList.add("listlink")
        
        const companiesList = document.querySelector('#companies-list');


        const urlimage = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`;

        fetch(urlimage)
        .then((otherresponse) => otherresponse.json()
        .then((anotherdata) => {

          
          listItem.innerHTML = `<img src="${anotherdata.profile.image}" class="list-item-company-image" onerror="this.src='./img/img_not_found_32.jpg'">` 
           + `<p class="list-item-company-name">`
           + data[i].name + `</p>` 
           + " " + data[i].symbol + `</p>`  
           + `<p id="indexPercentages" class="no-change">`
           + anotherdata.profile.changesPercentage + `</p>` 
           ;

          companiesList.appendChild(listItem);

        }
        ))
  }
  hideLoading();
}));
};

searchButton.addEventListener("click", getList);

























