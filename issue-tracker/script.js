// Model
const issues = [
	{
		title: "Issue 1",
		description: "This is a new issue",
	},
	{
		title: "Issue 2",
		description: "This is also a new issue",
	},
];

const createIssueObject = function (data) {
	return {
		title: data.issueTitle,
		description: data.issueDescription,
	};
};

const uploadIssue = function (newIssue) {
	const data = createIssueObject(newIssue);
	issues.push(data);
};

// Controller
const controlIssues = function () {
	issueView.render(issues);
};

const controlAddIssue = function (newIssue) {
	uploadIssue(newIssue);
	issueView.render(issues);
};

// View
class View {
	_data;

	render(data) {
		this._data = data;

		const markup = this._generateMarkup();

		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	_clear() {
		this._parentElement.innerHTML = "";
	}
}

// Displays UI for Issues
class IssuesView extends View {
	_parentElement = document.querySelector(".issue-list");

	addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}

	_generateMarkup() {
		return `
			${this._data.map(this._generateMarkupIssue).join("")}
		`;
	}

	_generateMarkupIssue(issue) {
		return `
		<div class="bg-gray-700 p-4 rounded-lg">
			<h2 class="text-lg font-semibold mb-2">${issue.title}</h2>
			<p class="text-gray-400 mb-2">${issue.description}</p>
			<div class="flex">
				<button class="px-2 py-1 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Edit</button>
				<button class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded">Delete</button>
			</div>
		</div>
	`;
	}
}

// Add Issue form
class AddIssueView extends View {
	_parentElement = document.querySelector(".upload");

	addHandlerAddIssue(handler) {
		this._parentElement.addEventListener("submit", function (e) {
			e.preventDefault();
			const dataArr = [...new FormData(this)];
			const data = Object.fromEntries(dataArr);

			handler(data);
		});
	}
}

const issueView = new IssuesView();
const addIssueView = new AddIssueView();

// Init
const init = function () {
	issueView.addHandlerRender(controlIssues);
	addIssueView.addHandlerAddIssue(controlAddIssue);
};

init();
