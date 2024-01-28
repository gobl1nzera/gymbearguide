document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('text-input');
    textInput.addEventListener('input', convertToLowercase);
    textInput.addEventListener('keyup', handleKeyUp);
});

async function searchExercise() {
    const muscleSearch = document.getElementById('text-input').value;

    const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + muscleSearch,
        params: { limit: '50' },
        headers: {
            'X-RapidAPI-Key': 'ac4a0b9821msh3e8627d96d7f0b2p12f1f0jsn30848489f307',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const exerciseDataList = response.data;

        const shuffledExercises = shuffleArray(exerciseDataList);

        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            if (index < shuffledExercises.length) {
                const cardImage = card.querySelector('.card-image');
                const cardName = card.querySelector('.card-name');

                cardImage.src = shuffledExercises[index].gifUrl;
                cardImage.alt = shuffledExercises[index].name;

                cardName.textContent = shuffledExercises[index].name.toUpperCase(); // Define o texto do nome do exercício
            }
        });

    } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
    }
}

function handleKeyUp(event) {
    if (event.key === 'Enter') {
        // A tecla "Enter" foi pressionada, chama a função searchExercise
        searchExercise();
    }
}

function convertToLowercase() {
    const textInput = document.getElementById('text-input');
    textInput.value = textInput.value.toLowerCase();
}

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
