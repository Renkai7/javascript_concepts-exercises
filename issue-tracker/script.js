// Model
const issues = [
	{
		id: 1,
		title: "Issue 1",
		description: "This is a new issue",
	},
	{
		id: 2,
		title: "Issue 2",
		description: "This is also a new issue",
	},
	{
		id: 4,
		title: "Issue 3",
		description: "So many issues!",
	},
];

// Generate ID for new Issues
const generateUniqueID = function (issues) {
	const existingIDs = new Set(issues.map((issue) => issue.id));

	let firstAvailableID = 1;
	while (existingIDs.has(firstAvailableID)) {
		firstAvailableID++;
	}

	return firstAvailableID;
};

const createIssueObject = function (data) {
	return {
		id: generateUniqueID(issues),
		title: data.issueTitle,
		description: data.issueDescription,
	};
};

const uploadIssue = function (newIssue) {
	const data = createIssueObject(newIssue);
	issues.push(data);
	console.log(issues);
};

const getIssueById = function (issueId) {
	const issueSelected = issues.find((issue) => issue.id === issueId);
	return issueSelected;
};

// TODO: UPDATE ISSUE IN LIST BASED ON ISSUE ID
const editIssue = function (issueId) {};

// Controller
const controlIssues = function () {
	issueView.render(issues);
};

const controlAddIssue = function (newIssue) {
	uploadIssue(newIssue);
	issueView.render(issues);
};

const controlPopulateEditIssue = function (issueId) {
	// 1) Get id from issue view
	const issue = getIssueById(issueId);

	// 2) Populate Edit view with data
	editIssueView.render(issue);
};

// TODO: CREATE CONTROLLER TO UPDATE ISSUE BY ID
const controlUpdateIssue = function (updatedIssue) {
	editIssue(updatedIssue);
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

	addHandlerGetIssueId(handler) {
		this._parentElement.addEventListener("click", function (e) {
			e.preventDefault();
			const btn = e.target.closest(".btn--edit-issue");
			if (!btn) return;
			const { id } = btn.dataset;

			handler(+id);
		});
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
				<button class="px-2 py-1 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded btn--edit-issue" data-id="${issue.id}">Edit</button>
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

// Edit Issue form
class EditIssueView extends View {
	_parentElement = document.querySelector(".edit");

	render(issue) {
		this._data = issue;
		this._clear();
		this._parentElement.insertAdjacentHTML(
			"afterbegin",
			this._generateMarkup()
		);
	}

	addHandlerEditIssue(handler) {
		this._parentElement.addEventListener("submit", function (e) {
			e.preventDefault();
			const dataArr = [...new FormData(this)];
			const data = Object.fromEntries(dataArr);
			console.log(data);
			handler(data);
		});
	}

	_generateMarkup() {
		console.log("edit view", this._data);

		return `
			<div class="mb-4">
                    <label for="issueTitle" class="block text-gray-400">Issue Title</label>
                    <input value="${this._data.title}" type="text" name="issueTitle" id="editIssueTitle"
                        class="w-full px-3 py-2 bg-gray-800 text-gray-200 rounded focus:outline-none focus:ring focus:border-blue-300"
                        required>
                </div>
                <div class="mb-4">
                    <label for="issueDescription" class="block text-gray-400">Issue Description</label>
                    <textarea name="issueDescription" rows="4"
                        class="w-full px-3 py-2 bg-gray-800 text-gray-200 rounded focus:outline-none focus:ring focus:border-blue-300"
                        required>${this._data.description}</textarea>
                </div>
				<button type="submit" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">Update
                    Issue</button>
		`;
	}
}

const issueView = new IssuesView();
const addIssueView = new AddIssueView();
const editIssueView = new EditIssueView();

// Init
const init = function () {
	issueView.addHandlerRender(controlIssues);
	issueView.addHandlerGetIssueId(controlPopulateEditIssue);
	addIssueView.addHandlerAddIssue(controlAddIssue);
	editIssueView.addHandlerEditIssue(controlUpdateIssue);
};

init();
