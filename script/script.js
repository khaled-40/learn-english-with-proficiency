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
    <button id = "btn-${lesson.level_no}" onclick = "fetchWords(${lesson.level_no})" class=" btn btn-outline btn-primary lesson-btns"><i class="fa-solid fa-book"></i>Lesson - ${lesson.level_no}</button>
    `
        lessonContainer.appendChild(div)
    });

}
// fetch the data of the cards 
const fetchWords = (level) => {
    const unmark = document.querySelectorAll('.lesson-btns');
    unmark.forEach((remove => {
        remove.classList.remove('active')
    }))
    const markLesson = document.getElementById(`btn-${level}`);
    markLesson.classList.add('active');
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadWordCards((data.data)))
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
                <h3 class="text-2xl font-bold">${element.word? element.word : 'শব্দ পাওয়া যায় নি'}</h3>
                <p class="font-normal">Meaning / Pronunciation</p>
                <div class="text-2xl font-bangla font-semibold text-[#18181B]">${element.meaning? element.meaning:'(অর্থ পাওয়া যায় নি)!!'} / ${element.pronunciation? element.pronunciation: 'উচ্চারণ পাওয়া যায় নি'}</div>
                <div class="flex justify-between items-center px-10">
                    <button onclick="fetchWordDetails(${element.id})" class="bg-[#1A91FF10] rounded-lg p-2 hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="bg-[#1A91FF10] rounded-lg p-2 hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
    `
        wordsContainer.appendChild(card)
    })
}

// fetch the word details 
const fetchWordDetails =async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    loadWordDetails(details.data)
}

// Show word details as Modal 
const loadWordDetails = (details) => {
    const detailBox = document.getElementById('detail-box');
    
    detailBox.innerHTML = `
    <h3 class="font-bold text-3xl">${details.word? details.word : 'শব্দ পাওয়া যায় নি'} ( <i class="fa-solid fa-microphone"></i>  :${details.pronunciation? details.pronunciation: 'উচ্চারণ পাওয়া যায় নি'})</h3>
                <div>
                    <h3 class="font-semibold text-2xl">Meaning</h3>
                    <p>${details.meaning? details.meaning: 'অর্থ পাওয়া যায় নি'}</p>
                </div>
                <div>
                    <h3 class="font-semibold text-2xl">Example</h3>
                    <p>${details.sentence? details.sentence : 'বাক্য পাওয়া যায় নি'}</p>
                </div>
                <div>
                    <h3 class="font-medium font-bangla text-2xl">সমার্থক শব্দ গুলো</h3>
                    <span class="btn">btn-1</span>
                    <span class="btn">btn-2</span>
                    <span class="btn">btn-3</span>
                </div>
    `;
    
    document.getElementById('word_details').showModal();

}