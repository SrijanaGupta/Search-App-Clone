import {setTheFocus, showclearTextButton, clearSearchText,clearPushListner} from "./searchBar.js";
import {getSearchTerm,fetchSearchResult} from './dataFunc.js';
import {deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine} from './searchResults.js';

document.addEventListener('readystatechange',(event)=>{
    if(event.target.readyState==='complete'){
        initApp();
    }
});

const initApp = () => {
    //set the focus
    setTheFocus();

    //3 listeners around clear text
    const search = document.getElementById("search");
    search.addEventListener("input", showclearTextButton);

    const clear = document.getElementById("clear");
    clear.addEventListener("click",clearSearchText);

    clear.addEventListener("keydown",clearPushListner);

    const form = document.getElementById("searchBar");
    form.addEventListener('submit',submitTheSearch);
}

//Procedural workflow function
const submitTheSearch = (event) => {
    event.preventDefault();
    //delete search results to display the new search results
    deleteSearchResults();
    //process the search
    processTheSearch();
    //set the focus
    setTheFocus();
}

const processTheSearch = async () => {
    //clear the stats line 
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const resultArr = await fetchSearchResult(searchTerm);
    if(resultArr.length) 
        //build search results
        buildSearchResults(resultArr);
    //set stat lines
    setStatsLine(resultArr.length);
    {}
}