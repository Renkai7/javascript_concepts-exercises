// Model
const stats = {
	Health: 100,
	Attack: 10,
	Defense: 5,
};

const updateStats = function (stat, newStats) {
	stats[stat] = newStats;
};

// View
class StatsView {
	_data;
	_parentElement = document.querySelector(".rpg-stats");

	render(data) {
		this._data = data;
		const markup = this._generateMarkup();
		this._clear();
		this._parentElement.insertAdjacentHTML("beforeend", markup);
	}

	addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}

	addHandlerUpdateStats(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn--update-stat");
			if (!btn) return;
			const { updateTo, statName } = btn.dataset;
			console.log(statName, updateTo);

			handler(statName, +updateTo);
		});
	}

	_clear() {
		this._parentElement.innerHTML = "";
	}

	_generateMarkup() {
		return Object.entries(this._data)
			.map(
				([statName, currentValue]) => `
      <div class="flex items-center">
        <button id="${statName.toLowerCase()}-minus" class="bg-red-500 text-white px-2 py-1 rounded-full mr-2 btn--update-stat" data-update-to="${
					currentValue - 1
				}" data-stat-name="${statName}">-</button>
        <span id="${statName.toLowerCase()}" class="text-lg font-semibold">${statName}: ${currentValue}</span>
        <button id="${statName.toLowerCase()}-plus" class="bg-green-500 text-white px-2 py-1 rounded-full ml-2 btn--update-stat" data-update-to="${
					currentValue + 1
				}" data-stat-name="${statName}">+</button>
      </div>
    `
			)
			.join("");
	}
}

// Controller
const statsView = new StatsView();

const controlCharacterSheet = function () {
	statsView.render(stats);
};

const controlStats = function (stat, newStats) {
	updateStats(stat, newStats);
	statsView.render(stats);
};

// Init
const init = function () {
	statsView.addHandlerRender(controlCharacterSheet);
	statsView.addHandlerUpdateStats(controlStats);
};

init();
