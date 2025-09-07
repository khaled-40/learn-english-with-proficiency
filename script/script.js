// Lesson section Funtionality 

// fetched the lesson data 
const lessonLoad = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all").
        then(response => response.json()).
        then(json => displayData(json.data))
}
lessonLoad();

// Load data in UI 
const lessonContainer = document.getElementById("lesson-container");
lessonContainer.innerHTML = "";
const displayData = (lessons) => {
    console.log(lessons)
    lessons.forEach((lesson) => {
        const div = document.createElement('div');
        div.innerHTML = `
    <button class="btn btn-outline btn-primary"><i class="fa-solid fa-question"></i>Lesson - ${lesson.level_no}</button>
    `
    lessonContainer.appendChild(div)
    });

}
