"use strict"

//? recurrent method

//#region 

window.onload=(event) => {
    document.getElementById("loadingPage").classList.add("disapear");
};

window.addEventListener("scroll", ()=> {
    if(window.scrollY < 10 && clientOrientation() === "landscape"){
        document.getElementById("searchBarSpec").style.top = "1.45vw";
    }else{
        document.getElementById("searchBarSpec").style.top = "0%";
    }
} )

const strNoAccent = (string) => {
    let accent="áàâäãåçèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
        noAccent="aaaaaaceeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
        result="";
    for(let i = 0; i < string.length; i++) {
      let temp = string.substr(i, 1);
      result += (accent.indexOf(temp) !== -1) ? noAccent.substr(accent.indexOf(temp), 1) : temp;
    }
    return result;
}

let clientOrientation = () => {
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;
    if(clientWidth >= clientHeight){
        return "landscape"
    }else{
        return "portrait"
    }
}

//#endregion

//? recurrent method

  const divTabFilm = document.getElementById("filmTabDivRow1"),
        divTabFilm2 = document.getElementById("filmTabDivRow2"),
        divTabFilm3 = document.getElementById("filmTabDivRow3"),
        divTabFilm4 = document.getElementById("filmTabDivRow4"),
        divTabFilm5 = document.getElementById("filmTabDivRow5")

let tabDiv = [];

let onlineMode = false;



let tabFilm = [];
let categoryFilm = [

];
let likedFilm = [];
let dislikedFilm = [];

let actualPage =0;

let userCollection = [
    
];


// Tableau qui sera affiché dans 100% des cas
let displayTab = []
// Tableau qui sera affiché dans 100% des cas


let tabRecommend = []
let tabCarousselDivRecommend = [];
let countCaroussel = 0;



// ! *****************************************
// !!!! // FILM TAB CREATION *****************
// ! *****************************************

//#region 

const createTable = (tab) => {
    divTabFilm.innerHTML = "";
    divTabFilm2.innerHTML = "";
    divTabFilm3.innerHTML = "";
    divTabFilm4.innerHTML = "";
    divTabFilm5.innerHTML = "";
    tabDiv = [];
    checkDelCategory();
    document.getElementById("numberPageShow").style.display = "flex"
    document.getElementById("goUpInPage").style.display = "none"
    if(tab.length<1){
        document.getElementById("numberPageShow").style.display = "none"
    }
    for(let i = 0+(25*actualPage); i < 5+(25*actualPage); i++)
    {
        if(tab[i]!==undefined){
            AddInRow(tab[i], i, divTabFilm);
        }else{
            break;
        }
    }
    for(let k = 5+(25*actualPage); k < 10+(25*actualPage); k++)
    {
        if(tab[k]!==undefined){
            AddInRow(tab[k], k, divTabFilm2);
        }else{
            break;
        }
    }
    for(let l = 10+(25*actualPage); l < 15+(25*actualPage); l++)
    {
        if(tab[l]!==undefined){
            AddInRow(tab[l], l, divTabFilm3);
            document.getElementById("goUpInPage").style.display = "flex"
        }else{
            break;
        }
    }
    for(let m = 15+(25*actualPage); m < 20+(25*actualPage); m++)
    {
        if(tab[m]!==undefined){
            AddInRow(tab[m], m, divTabFilm4);
        }else{
            break;
        }
    }
    for(let y = 20+(25*actualPage); y < 25+(25*actualPage); y++)
    {
        if(tab[y]!==undefined){
            AddInRow(tab[y], y, divTabFilm5);
        }else{
            break;
        }
    }
}

    //#region //* Navigation

    const refreshNavpage = () => {
        actualPage = 0;
        if(displayTab.length>25)
        {
            document.getElementById("goNextPage").classList.remove("disappear")
            document.getElementById("goBackPage").classList.add("disappear")
        }else{
            document.getElementById("goNextPage").classList.add("disappear")
            document.getElementById("goBackPage").classList.add("disappear")
        }
    }

    const goNextPage = () => {
        if(displayTab.length>(25+(25*actualPage))){
            console.log("test");
            actualPage += 1;
            createTable(displayTab);
            document.getElementById("numberPageTxT").innerHTML = "Page " + (actualPage+1);
            document.getElementById("goBackPage").classList.remove("disappear")
            if(displayTab.length<(25+(25*actualPage))){
                document.getElementById("goNextPage").classList.add("disappear")
                document.getElementById("goBackPage").classList.remove("disappear")
            }
        }else{
            document.getElementById("goNextPage").classList.add("disappear")
        }
    }

    const goBackPage = () => {
        actualPage -= 1;
        if(actualPage<=0){
            actualPage = 0;
            document.getElementById("numberPageTxT").innerHTML = "Page " + (actualPage+1);
            createTable(displayTab);
            document.getElementById("goBackPage").classList.add("disappear")
            document.getElementById("goNextPage").classList.remove("disappear")
        }else{
            document.getElementById("numberPageTxT").innerHTML = "Page " + (actualPage+1);
            createTable(displayTab);
            document.getElementById("goNextPage").classList.remove("disappear")
        }

    }

    const goPage1 = () => {
        actualPage = 0;
        document.getElementById("numberPageTxT").innerHTML = "Page " + (actualPage+1);
        refreshNavpage();
    }

    document.getElementById("goNextPage").addEventListener("click", goNextPage);
    document.getElementById("goBackPage").addEventListener("click", goBackPage);

    //#endregion //* Navigation

const urlEmbed = (i) => {
    let newUrl = displayTab[i].video.slice(tabFilm[i].video.length-11,tabFilm[i].video.length);
    return "https://www.youtube.com/embed/" + newUrl;
}

const obtainCategory = (tab) => {
    for(let i = 0; i < categoryFilm.length;i++)
    {
        if(tab.category == categoryFilm[i].id)
        {
            return categoryFilm[i].name;
        }
    }
}

// Special factorisation LaGoutte industry
let durationAnim = 750;
// Special factorisation LaGoutte industry

const setActiveTab = (filmCard, i) => {
    let limit = document.documentElement.clientHeight;
            let offSetTop = filmCard.offsetTop / limit * 100;
            filmCard.style.top = offSetTop+"%";
            for(let j = 0; j<tabDiv.length;j++){
                if(j !== i){
                    tabDiv[j].classList.remove("active")
                }
            }
            filmCard.addEventListener('click', function specEvent(e){
                if(e.target === filmCard){
                    setActiveTab(filmCard,i);
                    filmCard.removeEventListener("click", specEvent);
                }
            })
            filmCard.style.transitionDuration = durationAnim +"ms";
            filmCard.classList.toggle("active");
            
}

const unsetActiveTab =()=>{
    for(let j = 0; j<tabDiv.length;j++){
        if(j !== i){
            tabDiv[j].classList.remove("active")
        }
    }
}


    //#region // * Like Region

    const likeFilm = (movieID) => {
        likedFilm.push(movieID);
        if(onlineMode === true){
        let url = "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/" + movieID+"/like";
        axios.patch(url)
            .then(res => {
                fetchTable();
            })
            .catch(error =>{
                console.log(error);
            })
        }else{
            for(let k = 0; k<tabFilm.length ;k++)
            {
                if(tabFilm[k].id === movieID){
                    tabFilm[k].likes++;
                }
            }
            setTable();
            saveOfflineTab();
        }
        localStorage.setItem("likeTab", JSON.stringify(likedFilm))
    }

    const dislikeFilm = (movieID) => {
        dislikedFilm.push(movieID);
        if(onlineMode === true){
        let url = "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/" + movieID +"/dislike";
        axios.patch(url)
            .then(res => {
                fetchTable();
            })
            .catch(error =>{
                console.log(error);
            })
        }else{
            for(let k = 0; k<tabFilm.length ;k++)
            {
                if(tabFilm[k].id === movieID){
                    tabFilm[k].dislikes++;
                }
            }
            setTable();
            saveOfflineTab();
        }
        localStorage.setItem("dislikeTab", JSON.stringify(dislikedFilm))
    }

    const setLikeRatio = (like, dislike) => {
        if(like>dislike){
            return Math.floor((like - dislike)/like*100);
        }else if(like<dislike){
            let temp = Math.floor(((dislike - like)/dislike)*100);
            temp = -temp;
            return temp;
        }
        return 0   
    }

    //#endregion // * Like Region

const AddInRow=(tabMovie, i, divTab)=>{
    let filmCard = divTab.appendChild(document.createElement("div"));
        filmCard.classList.add("filmCase");
        filmCard.style.backgroundImage = "url(" + tabMovie.img + ")";
        filmCard.addEventListener('mousemove', (e) => {
            if(!filmCard.classList.contains("active") && clientOrientation() === "landscape"){
                let offYTemp = filmCard.getBoundingClientRect().top
                let offXTemp = filmCard.getBoundingClientRect().left
                let filmCardWidth = filmCard.clientWidth;
                let filmCardHeight = filmCard.clientHeight;
                var mouseX = (e.clientX-offXTemp) / filmCardWidth * 100;
                var mouseY = (e.clientY-offYTemp) / filmCardHeight *100;
                mouseX = mouseX -50;
                mouseY = mouseY - 50;
                filmCard.style.transition = "transform 0s all 1s";
                
                filmCard.style.transform = "rotateX("+mouseY/4+"deg)" + " rotateY("+mouseX/4+"deg)";
            }
        });
        filmCard.addEventListener('mouseout', (event) => {
            filmCard.style.transition = "transform 1s all 1s";
            filmCard.style.transform = "rotateY("+0+"deg)" + " rotateX("+0+"deg)";
            
        });
        let embed = filmCard.appendChild(document.createElement("iframe"));
        embed.allowFullscreen = "true";
        embed.classList.add("embedYT");
        filmCard.addEventListener('click', function specEvent(e){
            if(e.target === filmCard){
                setTimeout(() => {
                    embed.src = urlEmbed(i);
                }, durationAnim);
                
                
                embed.frameBorder = "0px";
                //embed.onload = (e) => {
                    setActiveTab(filmCard,i);
                    filmCard.removeEventListener("click", specEvent);
                //}
            }
        })
        tabDiv.push(filmCard);
        let gradientCard = filmCard.appendChild(document.createElement("div"));
        gradientCard.classList.add("gradient");
        let titlePrevu = filmCard.appendChild(document.createElement("div"));
        titlePrevu.classList.add("titleMoviePrev");
        titlePrevu.innerHTML = strNoAccent(tabMovie.name);
        let title = filmCard.appendChild(document.createElement("div"));
        title.classList.add("titleMovie");
        title.innerHTML = strNoAccent(tabMovie.name) + "<br><span> un film de " + tabMovie.author + "</span>" + "<br><span class= \u0022Category\u0022 >" + obtainCategory(tabMovie) + "</span>";
        let description = filmCard.appendChild(document.createElement("div"));
        description.classList.add("descriptionMovie");
        description.innerHTML = strNoAccent(tabMovie.description);
        let likeButton = filmCard.appendChild(document.createElement("div"));
        likeButton.classList.add("likeButton");
        let dislikeButton = filmCard.appendChild(document.createElement("div"));
        dislikeButton.classList.add("dislikeButton");
        let percentOfLike = filmCard.appendChild(document.createElement("div"));
        percentOfLike.classList.add("percentOfLike");
        percentOfLike.innerHTML = setLikeRatio(tabMovie.likes, tabMovie.dislikes) +" %";
        let percentOfLikePreview = filmCard.appendChild(document.createElement("div"));
        percentOfLikePreview.classList.add("percentOfLikePreview");
        percentOfLikePreview.innerHTML = setLikeRatio(tabMovie.likes, tabMovie.dislikes) +" % <br><span>LIKE RATIO</span>";

        if(likedFilm.includes(tabMovie.id) === true)
            {
                likeButton.classList.add("active");
            }else{
                likeButton.addEventListener("click", (e)=>{
                    if(dislikedFilm.includes(tabMovie.id) === true)
                    {
                        return;
                    }
                    likeButton.classList.add("active");
                    likeFilm(tabMovie.id);
                })
            }

        if(dislikedFilm.includes(tabMovie.id) === true)
            {
                dislikeButton.classList.add("active");
            }else{
                dislikeButton.addEventListener("click", (e)=>{
                    if(likedFilm.includes(tabMovie.id) === true)
                    {
                        return;
                    }
                    dislikeButton.classList.add("active");
                    dislikeFilm(tabMovie.id);
                })
            }
    

        let deleteMenu = filmCard.appendChild(document.createElement("div"));
        deleteMenu.classList.add("deleteThisFilm");
        let doYouWantTo = deleteMenu.appendChild(document.createElement("h1"));
        doYouWantTo.innerHTML = "Voulez vous vraiment supprimer " + tabMovie.name;

        let deleteChoice = deleteMenu.appendChild(document.createElement("div"));
        deleteChoice.classList.add("deleteChoice");
        let yesChoice = deleteChoice.appendChild(document.createElement("div"));
        yesChoice.classList.add("yesChoice");
        yesChoice.innerHTML = "oui";
        yesChoice.addEventListener("click", (e) => {
            deleteFilm(tabMovie);
        })
        let noChoice = deleteChoice.appendChild(document.createElement("div"));
        noChoice.classList.add("noChoice");
        noChoice.innerHTML = "non";
        noChoice.addEventListener("click", (e) => {
            deleteMenu.classList.toggle("active");
        })
        
        let deleteButton = filmCard.appendChild(document.createElement("div"));
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", (e) => {
            deleteMenu.classList.toggle("active");
        })

        let modifyButton = filmCard.appendChild(document.createElement("div"));
        modifyButton.classList.add("modifyButtonIn");
        modifyButton.addEventListener("click", (e) => {
            document.getElementById("filmIDToModify").value = tabMovie.id;
            document.getElementById("filmNameToModify").value = tabMovie.name;
            document.getElementById("filmAuthorToModify").value = tabMovie.author;
            document.getElementById("filmCategoryToModify").value = tabMovie.category;
            document.getElementById("filmDescToModify").value = tabMovie.description;
            document.getElementById("filmTrailerToModify").value = tabMovie.video;
            document.getElementById("filmImageToModify").value = tabMovie.img;
            openModify2();
        })

        let addToCollection = filmCard.appendChild(document.createElement("div"));
        addToCollection.classList.add("addToCollection");
        addToCollection.addEventListener("click", (e) => {
            document.getElementById("collectionListSpec").classList.add("active")
            addInColl(tabMovie);
        })

        if(tabMovie.actualInfo)
        {
            let infoSearch = filmCard.appendChild(document.createElement("div"));
            infoSearch.classList.add("infoSearch");
            infoSearch.innerHTML = tabMovie.actualInfo;
        }

}

//#endregion

// ! *****************************************
// !!!! // FILM TAB CREATION *****************
// ! *****************************************



// ? *****************************************
// ???? // FILM TAB RECOMMEND ****************
// ? *****************************************

//#region 

const createRecommandation = () => {
    let getCaroussel = document.getElementById("carousselRecommend");
    getCaroussel.innerHTML = "";
    for(let i = 0;i<tabRecommend.length;i++)
    {
        let actualPageCaroussel = getCaroussel.appendChild(document.createElement("div")) 
        actualPageCaroussel.classList.add("slideCar");
        actualPageCaroussel.style.position = "absolute";
        actualPageCaroussel.style.width = "100%"
        actualPageCaroussel.style.height = "100%"
        actualPageCaroussel.style.right = (100*i)+"%";
        let imgCaroussel = actualPageCaroussel.appendChild(document.createElement("div")) 
        imgCaroussel.classList.add("imageRecommend");
        imgCaroussel.style.backgroundImage = "url("+tabRecommend[i].img+")"
        let imgCaroussel2 = actualPageCaroussel.appendChild(document.createElement("div")) 
        imgCaroussel2.classList.add("imageRecommend2");
        imgCaroussel2.style.backgroundImage = "url("+tabRecommend[i].img+")"

        let textDiv = actualPageCaroussel.appendChild(document.createElement("div")) ;
        textDiv.classList.add("textDiv");

        let bgPage = actualPageCaroussel.appendChild(document.createElement("div"));
        bgPage.style.backgroundImage = "url("+tabRecommend[i].img+")"
        bgPage.classList.add("specBGReco");

        let nameCaroussel = textDiv.appendChild(document.createElement("div")) 
        nameCaroussel.innerHTML = strNoAccent(tabRecommend[i].name);
        nameCaroussel.classList.add("nameDivReco")
        let categoryCaroussel = textDiv.appendChild(document.createElement("div")) 
        categoryCaroussel.innerHTML = obtainCategory(tabRecommend[i]) 
        categoryCaroussel.classList.add("categoryDivReco")
        let buttonSearchCaroussel = textDiv.appendChild(document.createElement("div")) 
        buttonSearchCaroussel.classList.add("buttonSearchSpec")
        buttonSearchCaroussel.innerHTML = "RECHERCHER"
        buttonSearchCaroussel.addEventListener("click", ()=>{
            document.getElementById("searchValue").value = tabRecommend[i].name;
            Search();
        })
    }
}

const slideCaroussel = () => {
    let Caroussel = document.getElementById("carousselRecommend");
    setTimeout(() => {
        if(countCaroussel > 4){
            countCaroussel = 0
        }
        Caroussel.style.transform = "translateX("+100*countCaroussel+"%)";
        countCaroussel++;
        slideCaroussel();
    }, 5000);
}

slideCaroussel()

const createRecommandationTab = () => {
    tabRecommend = [];

    if(userCollection.length > 0)
    {
        let dominantCategory = domCategoryInCollection()[0].category;
        let tempTabSpec = []

        for(let k = 0; k < 5; k++)
        {
            
            for(let p = 0; p< tabFilm.length;p++){
                if(obtainCategory(tabFilm[p]) === dominantCategory){
                    tempTabSpec.push(tabFilm[p]);
                }
            }
            let rdmTempFilm = tempTabSpec[Math.floor(Math.random() * tempTabSpec.length)];
            if(tabRecommend.includes(rdmTempFilm)){
                rdmTempFilm = tempTabSpec[Math.floor(Math.random() * tempTabSpec.length)];
            }
            tabRecommend.push(rdmTempFilm)
            
        }

    }else{
        for(let i = 0; i < 5; i++)
        {
            tabRecommend.push(tabFilm[Math.floor(Math.random() * tabFilm.length)])
        }
    }
    
    createRecommandation()
}

const domCategoryInCollection = () => {
    let categoryTemp = []
        for(let j = 0 ;j<userCollection.length;j++)
        {
            let tempCanAdd = true;
            let tempID;

            if(categoryTemp.length > 0){
                for(let k = 0; k < categoryTemp.length;k++)
                {
                    if(categoryTemp[k].category === obtainCategory(userCollection[j]))
                    {
                        tempCanAdd = false;
                        tempID = k;
                    }
                }
            }

            if(tempCanAdd){
                categoryTemp.push({
                    category : obtainCategory(userCollection[j]),
                    count : 1
                });
            }else{
                categoryTemp[tempID].count ++;
            }
        }
        console.log(categoryTemp);
        return categoryTemp = sortArrayByCount(categoryTemp);
}

const sortArrayByCount  = (array) => {
    return array.sort((a, b) => {
        if (a.count < b.count)
           return 1;
        if (a.count > b.count )
           return -1;
        return 0;
      });
    }

//! Reload Recommandation

//#region 

let isReloading = false;

    document.getElementById("recommendReload").addEventListener("click", function Reload(){
        if(!isReloading){
            isReloading = true;
            createRecommandationTab();
            document.getElementById("recommendReload").style.animation = "reload 1s"
            setTimeout(() => {
                document.getElementById("recommendReload").style.animation = "none 1s ";
                isReloading = false;
            }, 1000);
        }
    })

//#endregion

//! Reload Recommandation

//#endregion

// ? *****************************************
// ???? // FILM TAB RECOMMEND ****************
// ? *****************************************



// TODO **************************************
// TODO // CATEGORY FUNC *********************
// TODO **************************************

//#region 

//Create selection slide
const addSubCategoryToCreateFilm = () => {
    checkDelCategory();
    let filmCategorOption = document.getElementById("filmCategory");
    let filmCategorOptionSearch = document.getElementById("filmCategoryToSearch");
    let filmCategorOptionModify = document.getElementById("filmCategoryToModify");
    let categorOptionModify = document.getElementById("CategoryToModify");
    filmCategorOption.innerHTML = "";
    filmCategorOptionSearch.innerHTML = "";
    filmCategorOptionModify.innerHTML = "";
    categorOptionModify.innerHTML = "";
    let OptionAll2 = filmCategorOptionSearch.appendChild(document.createElement("option"));
    OptionAll2.value = "all";
    OptionAll2.innerHTML = "Everything";
    for(let i = 0; i< categoryFilm.length;i++)
    {
        let Option = filmCategorOption.appendChild(document.createElement("option"));
        Option.value = categoryFilm[i].id;
        Option.innerHTML = categoryFilm[i].name;
        let Option2 = filmCategorOptionSearch.appendChild(document.createElement("option"));
        Option2.value = categoryFilm[i].id;
        Option2.innerHTML = categoryFilm[i].name;
        let Option3 = filmCategorOptionModify.appendChild(document.createElement("option"));
        Option3.value = categoryFilm[i].id;
        Option3.innerHTML = categoryFilm[i].name;
        let Option4 = categorOptionModify.appendChild(document.createElement("option"));
        Option4.value = categoryFilm[i].id;
        Option4.innerHTML = categoryFilm[i].name;
    }
}

const createCategory = () => {
    let newCat = document.getElementById("filmCategoryToAdd").value;
    if(onlineMode === true){ 
        let url = "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories";
        axios.post(url, {
            name: newCat })
            .then(res => {
                fetchTable();
                document.getElementById("filmCategoryToAdd").value = " ";
            })
            .catch(error =>{
                console.log(error);
            })
        }else{
            categoryFilm.push({
                name: document.getElementById("filmCategoryToAdd").value,
                id : setRandomID()
            })
            saveOfflineTab();
            setTab();
            addSubCategoryToCreateFilm();
        }
    
    
}

const checkDelCategory = () => {
    let filmCategoryToDeleteSelector = document.getElementById("filmCategoryToDelete");
    filmCategoryToDeleteSelector.innerHTML = " ";
    let categoryUsed = [];
    for(let k = 0;k<tabFilm.length;k++)
    {
        if(!categoryUsed.includes(tabFilm[k].category)){
            categoryUsed.push(tabFilm[k].category)
        }
    }
    for(let i = 0;i<categoryFilm.length;i++)
    {
        if(!categoryUsed.some((e) => e === categoryFilm[i].id)){
            let deleteCat = filmCategoryToDeleteSelector.appendChild(document.createElement("option"));
            deleteCat.value = categoryFilm[i].id;
            deleteCat.innerHTML = categoryFilm[i].name;
        }
    }
}

const delCategory = () => {
    let deletecat = document.getElementById("filmCategoryToDelete").value;
    if(onlineMode === true){
        let url = "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories/" + deletecat;
        console.log(url);
        axios.delete(url)
            .then(e => {
                document.getElementById("filmCategoryToDelete").value = " ";
                fetchTable();
                console.log("delete success");
            })
            .catch(error => {
                console.log(error);
            })
    }else{
        for(let i = 0; i<categoryFilm.length;i++)
        {
            if(categoryFilm[i].id === deletecat){
                categoryFilm.splice(i,1);
            }
        }
        saveOfflineTab()
        setTab()
        addSubCategoryToCreateFilm();
    }
}

const modifNameCategory = () => {
    if(onlineMode === true)
    {
        let url = "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories/" + document.getElementById("CategoryToModify").value;
        console.log(url);
        axios.put(url, {
            name : document.getElementById("filmCategoryToModifyName").value
        })
        .then(res => {
            console.log("easy");
        })
        .then(res => {
            fetchCategory();
        })
        .catch(error => {
            console.log(error);
        })
        
    }else{
        for(let i = 0; i < categoryFilm.length; i++)
        {
            if(document.getElementById("CategoryToModify").value === categoryFilm[i].id)
            {
                console.log(document.getElementById("CategoryToModify").value)
                console.log(categoryFilm[i].name)
                categoryFilm[i].name = document.getElementById("filmCategoryToModifyName").value
            }
        }
        saveOfflineTab();
        refreshTab();
    }
}

//?OpenUI
//#region 

const openDelCategory = () => {
    document.getElementById("addFilmMenu").classList.remove("active");
    document.getElementById("specificSearchMenu").classList.remove("active");
    document.getElementById("modifyFilmMenu").classList.remove("active");
    document.getElementById("addCategoryMenu").classList.remove("active");
    document.getElementById("deleteCategoryMenu").classList.toggle("active");
    document.getElementById("modifyCategoryMenu").classList.remove("active");
}

const openModifyCatName = () => {
    document.getElementById("addFilmMenu").classList.remove("active");
    document.getElementById("specificSearchMenu").classList.remove("active");
    document.getElementById("modifyFilmMenu").classList.remove("active");
    document.getElementById("addCategoryMenu").classList.remove("active");
    document.getElementById("modifyCategoryMenu").classList.toggle("active");
    document.getElementById("deleteCategoryMenu").classList.remove("active");
}

const openModifyCat = () => {
    document.getElementById("addFilmMenu").classList.remove("active");
    document.getElementById("specificSearchMenu").classList.remove("active");
    document.getElementById("modifyFilmMenu").classList.remove("active");
    document.getElementById("addCategoryMenu").classList.toggle("active");
    document.getElementById("deleteCategoryMenu").classList.remove("active");
    document.getElementById("modifyCategoryMenu").classList.remove("active");
}

//#endregion
//?OpenUI

document.getElementById("openCategoryMenu").addEventListener("click",openModifyCat);
document.getElementById("openDeleteCategoryMenu").addEventListener("click",openDelCategory);
document.getElementById("openModifyCategoryMenu").addEventListener("click", openModifyCatName);


document.getElementById("submitCategory").addEventListener("click", createCategory);
document.getElementById("deleteCategory").addEventListener("click", delCategory);
document.getElementById("submitModifyCategory").addEventListener("click", modifNameCategory);

//#endregion

// TODO **************************************
// TODO // CATEGORY FUNC *********************
// TODO **************************************



// *******************************************
// **** // ADD FILM **************************
// *******************************************

//#region 

const addFilm = () => {

    if(!document.getElementById("filmTrailer").value.includes("youtube") && document.getElementById("filmTrailer").value.slice(0,5) !== "https"){
        return;
    }
    if(!document.getElementById("filmImage").value.slice(0,5) === "https"){
        return;
    }

    if(onlineMode === true){

        axios.post("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies", {
            name: document.getElementById("filmNameToAdd").value,
            author: document.getElementById("filmAuthor").value,
            img: document.getElementById("filmImage").value,
            category : document.getElementById("filmCategory").value,
            description: document.getElementById("filmDescToAdd").value,
            video: document.getElementById("filmTrailer").value
        })
        .then(res => {
            actualPage = 0;
            fetchTable();
            document.getElementById("filmTrailer").value = "";
            document.getElementById("filmDescToAdd").value = "";
            document.getElementById("filmCategory").value = "";
            document.getElementById("filmImage").value = "";
            document.getElementById("filmAuthor").value = "";
            document.getElementById("filmNameToAdd").value = "";
        })
        .catch(error =>{
            console.log(error);
        })
    }else{
        let tempFilm = {
            id: setRandomID(),
            name: document.getElementById("filmNameToAdd").value,
            author: document.getElementById("filmAuthor").value,
            img: document.getElementById("filmImage").value,
            category : document.getElementById("filmCategory").value,
            description: document.getElementById("filmDescToAdd").value,
            video: document.getElementById("filmTrailer").value,
            likes : 0,
            dislikes : 0
        }
        console.log(tempFilm);
        tabFilm.push(tempFilm);
        saveOfflineTab();
        setTable()
        document.getElementById("filmTrailer").value = "";
        document.getElementById("filmDescToAdd").value = "";
        document.getElementById("filmCategory").value = "";
        document.getElementById("filmImage").value = "";
        document.getElementById("filmAuthor").value = "";
        document.getElementById("filmNameToAdd").value = "";
    }
}

document.getElementById("submitCreate").addEventListener("click", addFilm)

document.getElementById("openAddMenu").addEventListener("click", (e)=>{
    document.getElementById("modifyFilmMenu").classList.remove("active");
    document.getElementById("addFilmMenu").classList.toggle("active");
    document.getElementById("specificSearchMenu").classList.remove("active");
    document.getElementById("addCategoryMenu").classList.remove("active");
    document.getElementById("deleteCategoryMenu").classList.remove("active");
    document.getElementById("modifyCategoryMenu").classList.remove("active");
})

document.getElementById("createYourOwn").addEventListener("click", (e)=>{
    document.getElementById("addFilmMenu").classList.add("active");
    document.getElementById("specificSearchMenu").classList.remove("active");
    document.getElementById("addCategoryMenu").classList.remove("active");
    document.getElementById("deleteCategoryMenu").classList.remove("active");
    document.getElementById("modifyFilmMenu").classList.remove("active");
    document.getElementById("modifyCategoryMenu").classList.remove("active");
})

//#endregion

// *******************************************
// **** // ADD FILM **************************
// *******************************************



// ? *****************************************
// ???? // MODIFY FILM ***********************
// ? *****************************************

//#region 

const setRandomID = () => {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let tempID = "a";
    for ( let i = 0; i < 19; i++ ) {
        tempID += characters.charAt(Math.floor(Math.random() * (characters.length-1)));
    }
    return tempID;
}

const ModifyFilm = () => {
    if(onlineMode === true){
        if(!document.getElementById("filmIDToModify").length > 8){
            return;
        }
        let url = "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/" + document.getElementById("filmIDToModify").value;
        axios.patch(url, {
            name: document.getElementById("filmNameToModify").value,
            author: document.getElementById("filmAuthorToModify").value,
            img: document.getElementById("filmImageToModify").value,
            category : document.getElementById("filmCategoryToModify").value,
            description: document.getElementById("filmDescToModify").value,
            video: document.getElementById("filmTrailerToModify").value
        })
        .then(res => {
            fetchTable();
            document.getElementById("filmTrailerToModify").value = "";
            document.getElementById("filmDescToModify").value = "";
            document.getElementById("filmCategoryToModify").value = "";
            document.getElementById("filmImageToModify").value = "";
            document.getElementById("filmAuthorToModify").value = "";
            document.getElementById("filmNameToModify").value = "";
            openModify();
        })
        .then(res =>{
            addSubCategoryToCreateFilm();
        })
        .catch(error =>{
            console.log(error);
        })
    }else{
        for(let i = 0;i<tabFilm.length;i++){
            if(tabFilm[i].id === document.getElementById("filmIDToModify").value)
            {
                console.log("CEST LE FILM" + tabFilm[i])
                tabFilm[i]={
                    id:document.getElementById("filmIDToModify").value,
                    name: document.getElementById("filmNameToModify").value,
                    author: document.getElementById("filmAuthorToModify").value,
                    img: document.getElementById("filmImageToModify").value,
                    category : document.getElementById("filmCategoryToModify").value,
                    description: document.getElementById("filmDescToModify").value,
                    video: document.getElementById("filmTrailerToModify").value,
                    likes:tabFilm[i].likes,
                    dislikes:tabFilm[i].dislikes,
                }
            }
        }
        document.getElementById("filmIDToModify").value= "";
        document.getElementById("filmTrailerToModify").value = "";
        document.getElementById("filmDescToModify").value = "";
        document.getElementById("filmCategoryToModify").value = "";
        document.getElementById("filmImageToModify").value = "";
        document.getElementById("filmAuthorToModify").value = "";
        document.getElementById("filmNameToModify").value = "";
        console.log(tabFilm);
        saveOfflineTab();
        setTable();
    }
}

const deleteFilm = (movie) => {
    if(onlineMode){
        let url = "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/"+movie.id
        axios.delete(url)
        .then(res => {
            console.log("okay");
            fetchTable();
        })
        .catch(error => {
            console.log("error")
        })
    }else{
        for(let i =0;i<tabFilm.length;i++){
            console.log("boucle")
            if(tabFilm[i].id === movie.id)
            {
                console.log("boucle encore")
                tabFilm.splice(i,1);
                saveOfflineTab();
                setTab();
            }
        }
    }
}

const openModify = () => {
    document.getElementById("addFilmMenu").classList.remove("active");
    document.getElementById("specificSearchMenu").classList.remove("active");
    document.getElementById("modifyFilmMenu").classList.toggle("active");
    document.getElementById("addCategoryMenu").classList.remove("active");
    document.getElementById("deleteCategoryMenu").classList.remove("active");
    document.getElementById("modifyCategoryMenu").classList.remove("active");
}

const openModify2 = () => {
    document.getElementById("addFilmMenu").classList.remove("active");
    document.getElementById("specificSearchMenu").classList.remove("active");
    document.getElementById("modifyFilmMenu").classList.add("active");
    document.getElementById("addCategoryMenu").classList.remove("active");
    document.getElementById("modifyCategoryMenu").classList.remove("active");
    document.getElementById("deleteCategoryMenu").classList.remove("active");
}

document.getElementById("submitModify").addEventListener("click", ModifyFilm);
document.getElementById("openModifyMenu").addEventListener("click", openModify);

//#endregion

// ? *****************************************
// ???? // MODIFY FILM ***********************
// ? *****************************************



// TODO **************************************
// TODO // SEARCH BAR ************************
// TODO **************************************

//#region 

const sortArrayByRatio = (array) => {
    return array.sort((a, b) => {
        if (setLikeRatio(a.likes, a.dislikes) < setLikeRatio(b.likes, b.dislikes))
        {
            return 1;
        }
        if (setLikeRatio(a.likes, a.dislikes) > setLikeRatio(b.likes, b.dislikes))
        {
            return -1;
        }
        return 0;
      });
}

const sortArray = (array) => {
    return array.sort((a, b) => {
        if (a.name < b.name)
           return -1;
        if (a.name > b.name )
           return 1;
        return 0;
      });
}

const Search = () => {
    let tempTab = [];
    if(document.getElementById("searchValue").value !== ""){
        document.getElementById("homeMovie").style.display = "none"
    }
        for(let i = 0; i < tabFilm.length;i++){
            if(tabFilm[i].name.toLowerCase().includes(document.getElementById("searchValue").value.toLowerCase()) 
            || tabFilm[i].author.toLowerCase().includes(document.getElementById("searchValue").value.toLowerCase())
            || tabFilm[i].description.toLowerCase().includes(document.getElementById("searchValue").value.toLowerCase())
            ){
                let newFilm = {
                    id: tabFilm[i].id,
                    name: tabFilm[i].name,
                    description:tabFilm[i].description,
                    author: tabFilm[i].author,
                    video:tabFilm[i].video,
                    category:tabFilm[i].category,
                    img:tabFilm[i].img,
                    likes:tabFilm[i].likes,
                    dislikes:tabFilm[i].dislikes,
                    actualInfo: setSearchInfoForFilm(tabFilm[i])
                }
                tempTab.push(newFilm);
            }
        }
        goPage1();
        displayTab = tempTab;
        if(displayTab.length === 0)
        {
            noResult();
        }else{
            document.getElementById("resultText").style.display = "initial";
            document.getElementById("resultText").innerHTML = displayTab.length + " results";
            document.getElementById("noResult").style.display = "none";
        }
        if(document.getElementById("searchValue").value === ""){
            displayTab = [...tabFilm];
            document.getElementById("noResult").style.display = "none";
            document.getElementById("resultText").style.display = "none";
        }
        refreshNavpage();
        createTable(displayTab);
}

const setSearchInfoForFilm = (film) => {
    if(film.name.toLowerCase().includes(document.getElementById("searchValue").value.toLowerCase())){
            return "Name"
    }else if(film.author.toLowerCase().includes(document.getElementById("searchValue").value.toLowerCase())){
            return "Author"
    }else if(film.description.toLowerCase().includes(document.getElementById("searchValue").value.toLowerCase())){
            return  "Description"
    }
}

const SpecificSearch = () => {
    let resultTab = [];
    let checkCategory = sortEverything(document.getElementById("filmCategoryToSearch").value.toLowerCase());
    for(let i = 0; i < tabFilm.length;i++){
        if(tabFilm[i].name.toLowerCase().includes(document.getElementById("filmNameToSearch").value.toLowerCase()) 
            && checkCategory
            && tabFilm[i].author.toLowerCase().includes(document.getElementById("filmAuthorToSearch").value.toLowerCase())
            && tabFilm[i].description.toLowerCase().includes(document.getElementById("filmDescToSearch").value.toLowerCase())
        ){
            resultTab.push(tabFilm[i]);
        }else if(
            tabFilm[i].name.toLowerCase().includes(document.getElementById("filmNameToSearch").value.toLowerCase()) 
            && tabFilm[i].category.toLowerCase().includes(document.getElementById("filmCategoryToSearch").value.toLowerCase())
            && tabFilm[i].author.toLowerCase().includes(document.getElementById("filmAuthorToSearch").value.toLowerCase())
            && tabFilm[i].description.toLowerCase().includes(document.getElementById("filmDescToSearch").value.toLowerCase())
            && !checkCategory
        ){
            resultTab.push(tabFilm[i]);
        }
        
    }

    resultTab = TriageSearch(resultTab, document.getElementById("Triage").value);
    document.getElementById("searchValue").value = " ";
    document.getElementById("resultText").style.display = "none";
    console.log(resultTab.length);
    displayTab = [...resultTab];
    goPage1();
    refreshNavpage();
    createTable(displayTab);
}

const sortEverything = (value) => {
    if(value === "all"){
        return true
    }else{
        return false
    }
}

const TriageSearch=(tab, triage)=>{
    if(triage ==="A - Z"){
        return sortArray(tab);
    }else if(triage === "Z - A"){
        return sortArray(tab).reverse();
    }else if(triage === "like"){
        console.log("here");
        return sortArrayByRatio(tab);
    }else if(triage === "dislike"){
        return sortArrayByRatio(tab).reverse();
    }else if(triage === "none"){

    }
    return tab;
}

const noResult = () => {
    document.getElementById("resultText").style.display = "none";
    document.getElementById("noResult").style.display = "initial";
    document.getElementById("createYourOwn").style.display = "initial";
}

document.getElementById("openSearchMenu").addEventListener("click", (e)=>{
    document.getElementById("addFilmMenu").classList.remove("active");
    document.getElementById("specificSearchMenu").classList.toggle("active");
    document.getElementById("modifyFilmMenu").classList.remove("active");
    document.getElementById("modifyCategoryMenu").classList.remove("active");
    document.getElementById("deleteCategoryMenu").classList.remove("active");
    document.getElementById("addCategoryMenu").classList.remove("active");
})

document.getElementById("searchValue").addEventListener("input", () => {
    Search();
    if(document.getElementById("searchValue").value !== ""){
        document.getElementById("homeMovie").style.display = "none"
    }else{
        document.getElementById("homeMovie").style.display = "block"
    }
})

document.getElementById("submitSearchSpec").addEventListener("click", SpecificSearch)
document.getElementById("submitSearch").addEventListener("click", Search)
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    Search();
})

//#endregion

// TODO **************************************
// TODO // SEARCH BAR ************************
// TODO **************************************



// ! *****************************************
// !!!! // LOCAL STORAGE TABLE ***************
// ! *****************************************

//#region 

const fetchTable = () => {
    fetch("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies")
        .then(res => res.json())
        .then(res => JSON.stringify(res))
        .then(res => 
        {
            localStorage.setItem("tabAPI", res);
            setTab();
            setTable();
            setCollectionTab();
            createRecommandationTab();
        })
        .catch(error => {
            console.log(error);
            setOfflineApi();
        })
    fetch("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories")
        .then(res => res.json())
        .then(res => JSON.stringify(res))
       .then(res => 
        {
            localStorage.setItem("categoryAPI", res);
        })
        .then(res => {
            setTab();
        })
        .then(res => {
            addSubCategoryToCreateFilm();
            checkDelCategory();
        })
}

const fetchCategory = () => {
    fetch("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories")
        .then(res => res.json())
        .then(res => JSON.stringify(res))
       .then(res => 
        {
            localStorage.setItem("categoryAPI", res);
        })
        .then(res => {
            setTab();
        })
        .then(res => {
            addSubCategoryToCreateFilm();
            checkDelCategory();
        })
}

const setTable = () => {
    if(onlineMode === true){
        let tempTab = JSON.parse(localStorage.getItem("tabAPI"));
        tabFilm = tempTab;
    }
    displayTab = [...tabFilm]
    goPage1();
    refreshNavpage();
    createTable(displayTab);
}

//#endregion

// ! *****************************************
// !!!! // LOCAL STORAGE TABLE ***************
// ! *****************************************



// *******************************************
// **** // Collection Function ***************
// *******************************************

//#region 

const createCollection = () => {
    let displayColl = document.getElementById("collectionContent");
    displayColl.innerHTML = " ";
    for(let i = 0; i < userCollection.length;i++)
    {
        let newFrame = displayColl.appendChild(document.createElement("div"));
        newFrame.classList.add("frameColl");
        newFrame.style.backgroundImage = "url(" + userCollection[i].img + ")";
        newFrame.addEventListener("click", (e) => {
            if(e.target === newFrame){
                SearchCollection(userCollection[i].name);
            }
        })
        let gradient = newFrame.appendChild(document.createElement("div"));
        gradient.classList.add("gradientFrame");
        let titleFilm = gradient.appendChild(document.createElement("h1"));
        titleFilm.classList.add("title");
        titleFilm.innerHTML = userCollection[i].name;
        let crossRetire = gradient.appendChild(document.createElement("div"));
        crossRetire.classList.add("crossRetire");
        crossRetire.addEventListener("click", (e) => {
            retireOfCollection(i);
        })
    }
    saveCollection();
}

const addInColl = (array) => {
    if(userCollection.some((element) => element.id === array.id))
    {
        return;
    }else{
        userCollection.push(array);
        createCollection()
    }
    createRecommandationTab();
}

const SearchCollection = (name) => {
    document.getElementById("searchValue").value = name;
    Search();
}

const retireOfCollection = (i) => {
    userCollection.splice(i,1);
    createCollection()
    createRecommandationTab();
}

document.getElementById("showColl").addEventListener("click", ()=>{
    document.getElementById("collectionListSpec").classList.toggle("active")
})

//#endregion

// *******************************************
// **** // Collection Function ***************
// *******************************************



// TODO **************************************
// TODO // ALL ABOUT OFFLINE & ONLINE MOD SWAP
// TODO **************************************

//#region 

const setTab = () => {
        if(localStorage.getItem("tabAPI")!==null && onlineMode === true)
        {
            tabFilm=JSON.parse(localStorage.getItem("tabAPI"));
            displayTab = [...tabFilm];
        }else{
            if(localStorage.getItem("offlineTabAPI")===null)
            {
                localStorage.setItem("offlineTabAPI", JSON.stringify(offlineTab));
            }
            tabFilm=JSON.parse(localStorage.getItem("offlineTabAPI"));
            displayTab = [...tabFilm];
        }

        if(localStorage.getItem("categoryAPI")!==null && onlineMode === true)
    {
        categoryFilm=JSON.parse(localStorage.getItem("categoryAPI"));
        }else{
        if(localStorage.getItem("offlineCatTabAPI")===null)
        {
            localStorage.setItem("offlineCatTabAPI", JSON.stringify(categoryTab));
        }
        categoryFilm = JSON.parse(localStorage.getItem("offlineCatTabAPI"));
        }

        if(localStorage.getItem("likeTab")!==null){
            likedFilm=JSON.parse(localStorage.getItem("likeTab"));
        }
        if(localStorage.getItem("dislikeTab")!==null){
            dislikedFilm=JSON.parse(localStorage.getItem("dislikeTab"));
        }

createTable(displayTab);

}

const setCollectionTab = () => {
    if(onlineMode){
        if(localStorage.getItem("collectionOnline")!==null){
            userCollection = JSON.parse(localStorage.getItem("collectionOnline"));
        }else{
            userCollection = [];
        }
    }else if(localStorage.getItem("collectionOffline")!==null){
        userCollection = JSON.parse(localStorage.getItem("collectionOffline"));
    }
    createCollection();
}

const saveCollection = () => {
    if(onlineMode){
        localStorage.setItem("collectionOnline", JSON.stringify(userCollection))
    }else{
        localStorage.setItem("collectionOffline", JSON.stringify(userCollection))
    }
    createRecommandation();
}

const setMode = () => {
    if(onlineMode === true){
        document.getElementById("sliderOnline").classList.add("active");
        document.body.classList.remove("light");
    }else{
        document.getElementById("sliderOnline").classList.remove("active");
        document.body.classList.add("light");
    }
}

const refreshTab = () => {
    addSubCategoryToCreateFilm();
    createTable(displayTab);
}

const saveOfflineTab = () => {
    localStorage.setItem("offlineTabAPI", JSON.stringify(tabFilm));
    localStorage.setItem("offlineCatTabAPI", JSON.stringify(categoryFilm));
}   

const swapModeApi = () => {
    if(onlineMode === true){
        onlineMode = false;
        refreshNavpage();
        setCollectionTab();
        setTab();
        goPage1();
        createRecommandationTab();
    }else{
        onlineMode = true;
        refreshNavpage();
        fetchTable();
        goPage1();
        
    }
}

const setOfflineApi = () => {
    onlineMode = false;
    refreshNavpage();
    setTab();
    setCollectionTab();
    goPage1();
    setMode();
}

document.getElementById("sliderOnline").addEventListener("click", () => {
    swapModeApi();
    setMode()
})

//#endregion

// TODO **************************************
// TODO // ALL ABOUT OFFLINE & ONLINE MOD SWAP
// TODO **************************************



setTab();
setCollectionTab();
createCollection();
addSubCategoryToCreateFilm();
refreshNavpage();
createRecommandationTab();



