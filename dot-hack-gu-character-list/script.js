const characterListContainer = document.querySelector("#character-list");

const characters = [
	{ name: "Haseo", hp: 150 },
	{ name: "Atoli", hp: 110 },
	{ name: "Kuhn", hp: 140 },
	// Add more characters here
];

const showCharacters = function () {
	const markup = `
        ${characters
					.map((char, i) => {
						return `
        <div class="character-item bg-gray-200 p-4 rounded-lg" data-char-index="${i}">
            <span class="text-center">${char.name}</span>
            <span class="text-center">HP: ${char.hp}</span>
        </div>
        `;
					})
					.join("")}
    `;

	characterListContainer.insertAdjacentHTML("afterbegin", markup);
};

showCharacters();

// Functions
const getCharacterName = function (e) {
	if (e.target.classList.contains("character-item")) {
		const characterIndex = e.target.dataset.charIndex;
		const targetedCharacter = characters[characterIndex];
		console.log(`Character selected: ${targetedCharacter.name}`);
	}
};

// Events
characterListContainer.addEventListener("click", getCharacterName);
