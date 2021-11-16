const urlMarquee = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list";


fetch(urlMarquee)
.then((response) => response.json()
.then((data) => {

    const marqueeContent = document.getElementById("marqueeContent");

    for(let i = 0; i <= 50; i++) {
    
        const marqueeItem = document.createElement("div");
        marqueeItem.classList.add("marquee-item");

        marqueeItem.innerHTML = `<div>` + data[i]["symbol"] + ": " + `</div>` + `<div class="marquee-price">` + "$" + data[i]["price"] + `</div>`;
    
        marqueeContent.appendChild(marqueeItem);

    }
})
);

