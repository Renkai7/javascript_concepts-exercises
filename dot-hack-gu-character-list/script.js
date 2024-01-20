const characterListContainer = document.querySelector("#character-list");

const showCharacters = function () {
	const characters = [
		{ name: "Haseo", hp: 150 },
		{ name: "Atoli", hp: 110 },
		{ name: "Kuhn", hp: 140 },
		// Add more characters here
	];
	const markup = `
        ${characters
					.map((char) => {
						return `
        <div class="bg-gray-200 p-4 rounded-lg">
            <p class="text-center">${char.name}</p>
            <p class="text-center">HP: ${char.hp}</p>
        </div>
        `;
					})
					.join("")}
    `;

	characterListContainer.insertAdjacentHTML("afterbegin", markup);
};

showCharacters();
