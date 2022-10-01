let selectedtext = document.querySelectorAll("select"),
    btn = document.querySelector("#btn"),
    from_text = document.querySelector("#from_text"),
    to_text = document.querySelector("#to_text"),
    changeicon = document.querySelector(".change"),
    addicon = document.querySelectorAll(".addicon");

console.log(changeicon);

selectedtext.forEach((tag, id) => {
    for (const counter in countries) {
        let selected;
        if (id == 0 && counter == "ar-SA") {
            selected = "selected";
        } else if (id == 1 && counter == "en-GB") {
            selected = "selected";
        }
        let option = `<option value="${counter}" ${selected}>${countries[counter]}</option>`;
        tag.insertAdjacentHTML('beforeend', option);
        //console.log(countries[counter]);
    }

});

//exchange icon translate
changeicon.addEventListener("click", () => {
    let textarea = from_text.value;
    let iconchange = selectedtext[0].value;
    from_text.value = to_text.value;
    selectedtext[0].value = selectedtext[1].value;
    to_text.value = textarea;
    selectedtext[1].value = iconchange;
});

btn.addEventListener("click", () => {
    let data = from_text.value,
        translatefrom = selectedtext[0].value,
        translateto = selectedtext[1].value;
    let url = `https://api.mymemory.translated.net/get?q=${data} &langpair=${translatefrom}|${translateto}`;
    fetch(url).then((res) => res.json()).then((respon) => {
        to_text.value = respon.responseData.translatedText;
    })

});

addicon.forEach((icon) => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(from_text.value);
            } else {
                navigator.clipboard.writeText(to_text.value);
            }
        } else {
            let voice;
            if (target.id == "from") {
                voice = new SpeechSynthesisUtterance(from_text.value);
                voice.lang = selectedtext[0].value;
            } else {
                voice = new SpeechSynthesisUtterance(to_text.value);
                voice.lang = selectedtext[1].value;
            }
            speechSynthesis.speak(voice);
        }
    });
})