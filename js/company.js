
// console.log(window.location.search.replace("?symbol=", ""))


const titleText = window.location.search.replace("?symbol=", "");

const url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" + titleText;

// console.log(url);

let imageCompany = document.getElementById("companyImage");
const companySymbol = document.getElementById("companySymbol");
const companyName = document.getElementById("companyName");
const companyWrapper = document.getElementById("companyWrapper");
const companyWebsite = document.getElementById("companyWebsite");


fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${titleText}`)
.then((response) => response.json()
.then((data) => {
    // console.log(data);
    const percentagesChecked = data.profile.changesPercentage;
    imageCompany.src = data.profile.image;
    companySymbol.append(titleText);
    companyName.append(data.profile.companyName);
    companyWebsite.href = data.profile.website;
    stockPrice.append(data.profile.price);
    percentages.append(percentagesChecked);
    companyDescription.append(data.profile.description);


    if(percentagesChecked > 0) {
        percentages.classList.remove("negative")
        percentages.classList.add("positive");
    } else {
        percentages.classList.remove("positive");
        percentages.classList.add("negative");
    } 

    if(percentagesChecked == 0.0 || percentagesChecked == 0) {
        percentages.classList.remove("negative")
        percentages.classList.add("no-change");
    } 

})
);


function imgError() {
    imageCompany.src = '../img/img_not_found.jpg';
   }


    const datesHistoryX = [];
    const pricesHistorY = []; 
fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${titleText}?serietype=line`)
.then((response) => response.json()
.then((data) => {
    for(let i = 0; i <= 29; i++){

     datesHistoryX.push(data["historical"][i]["date"]);
     pricesHistorY.push(data["historical"][i]["close"]);

    }

    let datesHistoryXreversed = datesHistoryX.reverse();

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datesHistoryXreversed,
            datasets: [{
                label: 'Stock Price History',
                data: pricesHistorY,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
              
                ],
                borderWidth: 1
            }]
        },
    });    

})
);



