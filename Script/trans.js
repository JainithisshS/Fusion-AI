let langOption = document.querySelectorAll('select');
let fromText = document.querySelector('.fromtext');
let transText = document.querySelector('.toTranslate');
langOption.forEach((get, i) =>{
    for(let countryCode in language){

        let selected;
        if(i == 0 && countryCode == "en-GB"){
            selected = "selected";
        }
        else if(i == 1 && countryCode == "fr-FR"){
            selected = 'selected';
        }
        let option = `<option value="${countryCode}"${selected}>${language[countryCode]}</option>`;
        console.log(option)
        get.insertAdjacentHTML('beforeend',option);
    }
})
fromText.addEventListener('input',function(){
    let content = fromText.value;
    fromContent = langOption[0].value;
    transContent = langOption[1].value;

    let transLINK = `https://api.mymemory.translated.net/get?q=${content}&langpair=${fromContent}|${transContent}`; 

    fetch(transLINK).then(translate => translate.json()).then(data =>{
        if(content == "")
            transText.value = "";
        else
            transText.value = data.responseData.translatedText;
    })
})