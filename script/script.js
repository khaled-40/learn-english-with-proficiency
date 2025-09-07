// Lesson section Funtionality 

// fetched the lesson data 
const lessonLoad = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all").
        then(response => response.json()).
        then(json => displayData(json.data))
}
lessonLoad();

// Load the lesson button data in UI 
const lessonContainer = document.getElementById("lesson-container");
lessonContainer.innerHTML = "";
const displayData = (lessons) => {
    lessons.forEach((lesson) => {
        const div = document.createElement('div');
        div.innerHTML = `
    <button id = "btn-${lesson.level_no}" onclick = "fetchWords(${lesson.level_no})" class=" btn btn-outline btn-primary"><i class="fa-solid fa-book"></i>Lesson - ${lesson.level_no}</button>
    `
        lessonContainer.appendChild(div)
    });

}
// fetch the data of the cards 
const fetchWords = (level) => {
    const unmark = document.getElementsByClassName('btns');
    const markLesson = document.getElementById(`btn-${level}`);
    markLesson.classList.add('active');
    console.log(markLesson)
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadWordCards(data.data))
}

// Load The word card on clicking the lesson buttons 
const loadWordCards = (cards) => {
    const wordsContainer = document.getElementById("words-container");
    wordsContainer.innerHTML = "";
    if (cards.length == 0) {
        wordsContainer.innerHTML = `
        <div class = "text-center py-16  md:col-span-2 xl:col-span-3">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="font-bangla mb-8">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h3 class="text-3xl font-bold">নেক্সট Lesson এ যান</h3>
        </div>
        `
    }
    cards.forEach((element) => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white space-y-5 text-center py-10 rounded-xl">
                <h3 class="text-2xl font-bold">${element.word}</h3>
                <p class="font-normal">Meaning / Pronunciation</p>
                <div class="text-2xl font-bangla font-semibold text-[#18181B]">${element.meaning} / ${element.pronunciation}</div>
                <div class="flex justify-between items-center px-10">
                    <button class="bg-[#1A91FF10] rounded-lg p-2 hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="bg-[#1A91FF10] rounded-lg p-2 hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
    `
        wordsContainer.appendChild(card)
    })
}
