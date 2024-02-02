// Model
const issues = [];

// const newIssue = {
// 	title: "New issue",
// 	description: "This is a new issue",
// };

// issues.push(newIssue);
// console.log(issues);
// Controller

// View
const parentElement = document.querySelector(".upload");
const issueListParentElement = document.querySelector(".issue-list");

parentElement.addEventListener("submit", function (e) {
	e.preventDefault();
	const dataArr = [...new FormData(this)];
	const data = Object.fromEntries(dataArr);
	const newIssue = {
		title: data.issueTitle,
		description: data.issueDescription,
	};
	console.log(newIssue);
	const markup = `
    <div class="bg-gray-700 p-4 rounded-lg">
                    <h2 class="text-lg font-semibold mb-2">${newIssue.title}</h2>
                    <p class="text-gray-400 mb-2">${newIssue.description}</p>
                    <div class="flex">
                        <button class="px-2 py-1 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Edit</button>
                        <button class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded">Delete</button>
                    </div>
                </div>
    `;
	issueListParentElement.insertAdjacentHTML("beforeend", markup);
});

// Init
