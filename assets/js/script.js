const reportButtons = document.querySelectorAll('.dashboard-report-btn')
const cards = document.querySelectorAll(".card")

function primaryData(){
    getInformation()   
}
primaryData()


for (let i = 0; i < reportButtons.length; i++) {
    reportButtons[i].addEventListener("click", function handleclick(e ,id) {
      let current = document.getElementsByClassName("button-active");
      current[0].classList.remove("button-active")
      this.className += " button-active";
      let butttonId=e.currentTarget.id;
      getInformation(butttonId)
    });
}

async function getInformation(butttonId){
    let response= await fetch('data.json');
    if(!response.ok) return console.log('Oops! Something went wrong.');
    let data= await response.json();
    populateDOM(data ,butttonId);  
}

function populateDOM(data ,butttonId){
    for (const item of data) {
        appendItem(item ,butttonId);
    }
}

function appendItem(item ,butttonId){
    for (const element of cards) {
        const cardTitle= element.querySelector('.card .card-info .card-header .card-title').innerText;
        if(item.title === cardTitle){
           const currentTime= element.querySelector('.card .card-time-tracking .card-current-time')
           const previousTime= element.querySelector('.card .card-time-tracking .card-previous-time .previous-time')
           const previousTimeFrame= element.querySelector('.card .card-time-tracking .card-previous-time .previous-time-frame')
            if(!butttonId){
                currentTime.innerText= item.timeframes.weekly.current + 'hrs';
                previousTime.innerText= item.timeframes.weekly.previous + 'hrs';
                previousTimeFrame.innerText='Week' 
            }else{
                currentTime.innerText= item.timeframes[butttonId].current + 'hrs';
                previousTime.innerText= item.timeframes[butttonId].previous + 'hrs';
                if(butttonId=== 'daily'){ previousTimeFrame.innerText='Day'}
                if(butttonId=== 'weekly'){ previousTimeFrame.innerText='Week'}
                if(butttonId=== 'monthly'){ previousTimeFrame.innerText='Month'} 
            }
        }
    }
}

