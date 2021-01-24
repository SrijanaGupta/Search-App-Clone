export const getSearchTerm = () =>{
    const rawSearchTerm = document.getElementById("search").value.trim();
    const regEx = /[]{2,}/gi; //looks for more than one space
    const searchTerm = rawSearchTerm.replaceAll(regEx," ");
    return searchTerm;
}

export const fetchSearchResult = async (searchTerm) =>{
    const wikiSearchStr = getWikiSearchStr(searchTerm);
    console.log(wikiSearchStr);
    const wikiSearchResults = await requestData(wikiSearchStr);
    let resultArr = [];
    if(wikiSearchResults.hasOwnProperty('query')){
        resultArr = processResults(wikiSearchResults.query.pages);
    }
    return resultArr;
}

const getWikiSearchStr = (searchTerm) =>{
    const maxChars = getMaxChars(); //to get as many results as can accomodate in the viewport width
    const rawSearchStr = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    const searchStr = encodeURI(rawSearchStr);
    console.log(searchStr);
    return searchStr;
}

const getMaxChars = () =>{
    const width = window.innerWidth || document.body.clientWidth;
    let maxchars;
    if(width < 414) maxchars = 65;
    if(width >= 414 && width < 1400) maxchars = 100;
    if(width >= 1400) maxchars = 130;
    return maxchars;
}

const requestData = async (searchStr) =>{
    try{
        const response = await fetch(searchStr);
        const data = await response.json();
        console.log(data);
        return data;
    } catch(err){
        console.log(err);
    }
}

const processResults = (results) =>{
    const resultArray = [];
    Object.keys(results).forEach(key =>{
        const id = key;
        const title = results[key].title;
        const text = results[key].extract;
        const img = results[key].hasOwnProperty("thumbnail")
                    ? results[key].thumbnail.source : null;
        const item = {
            id:id,
            title: title,
            img: img,
            text:text
        };
        resultArray.push(item);
    });
    return resultArray;
}