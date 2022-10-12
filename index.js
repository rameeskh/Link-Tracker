//to store links myleads
let myLeads=[];
const inputbtn=document.getElementById("input-btn");
const inputEl=document.getElementById("input-el");
const ulEl=document.getElementById("ul-el");

const deletebtn=document.getElementById("delete-btn");
//get from localstorage
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));

const tabbtn=document.getElementById("tab-btn");
// console.log(leadsFromLocalStorage)



//print myleads as ul element 
if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage;
    render(myLeads);
}

tabbtn.addEventListener("click",()=>{
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
    })
    
})
//creating ul element
function render(leads){
    let list="";
    for(let i=0 ;i<leads.length;i++){
        // list+="<li><a target='_blank' href='"+myLeads[i]+"'>"+myLeads[i]+"</a></li>";
        list+=`<li>
        <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
        </li>`;
    }
    ulEl.innerHTML=list
}

deletebtn.addEventListener("click", function(){
   localStorage.clear();
   myLeads=[];
   render(myLeads);
})

inputbtn.addEventListener("click", ()=>{
   myLeads.push(inputEl.value)
   inputEl.value="";

   localStorage.setItem("myLeads",JSON.stringify(myLeads))

    render(myLeads);
});






