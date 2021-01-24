export const deleteSearchResults = () =>{
    const parent = document.getElementById("searchResults");
    console.log(parent);
    let child = parent.lastElementChild;
    while(child){
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}

export const buildSearchResults = (resultArr) =>{
    resultArr.forEach((item)=>{
        const result = createResultItem(item);
        const resultContent = document.createElement("div");
        resultContent.classList.add('resultContents');
        if(item.img){
            const resultImage = createResultImage(item);
            resultContent.append(resultImage);
        }
        const resultText = createResultText(item);
        resultContent.append(resultText);
        result.append(resultContent);
        const searchResults = document.getElementById("searchResults");
        searchResults.append(result);
    })
}

const createResultItem = (result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("resultItem");
    const resultTitle = document.createElement("div");
    resultTitle.classList.add('resultTitle');
    const link = document.createElement("a");
    link.href = `https://en.wikipedia.org/?curid=${result.id}`;
    link.textContent = result.title;
    link.target = `_blank`;
    resultTitle.append(link);
    resultItem.append(resultTitle);
    return resultItem;
};


const createResultImage = (result) => {
    const resultImage = document.createElement("div");
    resultImage.classList.add("resultImage");
    const img = document.createElement('img');
    img.src = result.img;
    img.alt = result.title;
    resultImage.append(img);
    return resultImage;
};

const createResultText = (result) => {
    const resultText = document.createElement("div");
    resultText.classList.add("resultText");
    const desc = document.createElement("p");
    desc.classList.add("resultDesc");
    desc.textContent = result.text;
    resultText.append(desc);
    return resultText;
};

export const clearStatsLine = () => {
    document.getElementById("stats").textContent = "";
}

export const setStatsLine = (noOfResults) => {
    const setStats = document.getElementById("stats");
    if(noOfResults){
        setStats.textContent = `Displaying ${noOfResults} results.`;
    }
    else{
        setStats.textContent = 'Sorry, no results.';
    }
}
