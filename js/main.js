const dashPage = document.querySelector(".content");
const sidebarItems = document.querySelectorAll(".nav-item");
const bellBtn = document.querySelector(".bell");
const sidebarBtn = document.querySelector(".sidebar-icon");
const monthYearDisplay = document.querySelector(".monthYearDisplay");
const daysOfMonthDisplay = document.querySelector(".days-of-month");
const calenderBtn = document.querySelector(".calender-icon");
const calenderCancel = document.querySelector(".calender-btn.cancel");
const prevMonth = document.querySelector(".prevMonth");
const nextMonth = document.querySelector(".nextMonth");
const todayBtn = document.getElementById("today");
// applications vars
const appBtn = document.querySelectorAll(".app-btn");
const dropdownBtn = document.querySelectorAll(".menu-btn");
// profile vars
const langsList = document.querySelector("#langs-list .dropdown-menu");
const selectedLang = document.querySelector(".selected-lang");
const timezonesList = document.querySelector("#timezones-list .dropdown-menu");
const selectedTimezone = document.querySelector(".selected-timezone");
const currencyList = document.querySelector("#currency-list .dropdown-menu");
const selectedFlag = document.querySelector(".selected-flag img");
const selectedCurrency = document.querySelector(".selected-currency");
const editIcons = document.querySelectorAll(".edit-icon");
const info = document.querySelector(".info");
const preferences = document.querySelector(".preferences");

// sidebar
sidebarItems.forEach((item) => {
	item.addEventListener("click", () => {
		sidebarItems.forEach((i) => i.classList.remove("active"));
		item.classList.toggle("active");
	});
});

sidebarBtn.addEventListener("click", () => {
	document.querySelector(".sidebar").classList.toggle("show");
});

// notification
bellBtn.addEventListener("click", () => {
	document.querySelector(".notifications-panel").classList.toggle("show");
});

// calender window
if (calenderBtn) {
	calenderBtn.addEventListener("click", () => {
		calenderBtn.classList.toggle("active");
		calenderBtn.parentElement.classList.toggle("show");
	});
}

if (calenderBtn) {
	calenderCancel.addEventListener("click", () => {
		calenderBtn.classList.remove("active");
		calenderBtn.parentElement.classList.remove("show");
	});
}

// calender code
const today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

function calenderGenerator(month, year) {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

	// erase days of chose month
	daysOfMonthDisplay.textContent = "";

	const firstDay = new Date(year, month).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const daysInPrevMonth = new Date(year, month, 0).getDate();

	for (let i = 0; i < firstDay; i++) {
		const div = document.createElement("div");
		div.classList.add("day-of-month", "day-of-prev-month");
		div.textContent = daysInPrevMonth - i;
		daysOfMonthDisplay.appendChild(div);
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const isToday =
			day === today.getDate() &&
			month === today.getMonth() &&
			year === today.getFullYear();
		daysOfMonthDisplay.innerHTML += `<div class="day-of-month ${
			isToday ? "current-day" : ""
		}">${day}</div>`;
	}
}

calenderGenerator(month, year);

// calenders' buttons handling
if (prevMonth) {
	prevMonth.addEventListener("click", () => {
		month--;
		if (month < 0) {
			month = 11;
			year--;
		}
		calenderGenerator(month, year);
	});
}

if (nextMonth) {
	nextMonth.addEventListener("click", () => {
		month++;
		if (month > 11) {
			month = 0;
			year++;
		}
		calenderGenerator(month, year);
	});
}

if (todayBtn) {
	todayBtn.addEventListener("click", () => {
		calenderGenerator(new Date().getMonth(), new Date().getFullYear());
	});
}

// application page*
if (appBtn) {
	appBtn.forEach((btn) => {
		btn.addEventListener("click", () => {
			btn.parentElement.classList.add("show");
		});
	});
}
if (dropdownBtn) {
	dropdownBtn.forEach((btn) => {
		btn.addEventListener("click", () => {
			btn.parentElement.parentElement.classList.remove("show");
		});
	});
}

// Profile Page*

// lists handling
let langs = [];

if (timezonesList && langsList) {
	fetch("https://restcountries.com/v3.1/all")
		.then((res) => res.json())
		.then((countries) => {
			countries.forEach((country) => {
				timezoneListFun(country);
				currencyListFun(country);
				// langs filteration and remove redundancy
				if (country.languages !== undefined) {
					if (
						!langs.includes(
							Object.values(country.languages)[0]
						)
					) {
						langs.push(
							Object.values(country.languages)[0]
						);
					}
				}
			});
			langsListFun(langs);
		});
}

const timezoneListFun = (country) => {
	const li = document.createElement("li");
	const option = document.createElement("a");

	option.classList.add(
		"dropdown-item",
		"height-45",
		"d-flex",
		"align-items-center"
	);
	option.href = "#";
	option.textContent = country.timezones[0];

	li.appendChild(option);

	option.addEventListener("click", () => {
		selectedTimezone.textContent = country.timezones[0];
	});

	timezonesList.appendChild(li);
};

const langsListFun = (langs) => {
	langs.forEach((lang) => {
		const li = document.createElement("li");
		const option = document.createElement("a");

		option.classList.add(
			"dropdown-item",
			"height-45",
			"d-flex",
			"align-items-center"
		);
		option.href = "#";
		option.textContent = lang;

		li.appendChild(option);

		option.addEventListener("click", () => {
			selectedLang.textContent = lang;
		});

		langsList.appendChild(li);
	});
};

const currencyListFun = (country) => {
	const li = document.createElement("li");
	const option = document.createElement("a");
	const img = document.createElement("img");
	const span = document.createElement("span");

	img.classList.add("width-35");
	img.src = country.flags.svg;
	img.alt = "flag";

	option.classList.add(
		"dropdown-item",
		"height-45",
		"d-flex",
		"align-items-center",
		"gap-3"
	);
	option.href = "#";

	if (country.currencies !== undefined) {
		span.textContent = Object.keys(country.currencies)[0];
	}

    option.appendChild(img);
    option.appendChild(span);
    li.appendChild(option);

	option.addEventListener("click", () => {
		selectedFlag.innerHTML = "";
		selectedFlag.src = country.flags.svg;
		selectedCurrency.textContent = span.innerHTML;
        document.querySelector(".currency-sign").textContent = span.innerHTML;
        document.querySelector(".currency-symbol").textContent = Object.values(country.currencies)[0].symbol;
	});

	currencyList.appendChild(li);
};

// JS for profile edit mode
editIcons.forEach((icon) => {
	icon.addEventListener("click", () => {
		if (icon.dataset.field === "info") {
			info.classList.toggle("edit");

			if (info.classList.contains("edit")) {
				document
					.querySelectorAll(".info .field")
					.forEach((input) => {
						input.removeAttribute("readonly");
					});
			} else {
				document
					.querySelectorAll(".info .field")
					.forEach((input) => {
						input.setAttribute("readonly", true);
					});
			}
		}

		if (icon.dataset.field === "preferences") {
			preferences.classList.toggle("edit");

			if (preferences.classList.contains("edit")) {
				document
					.querySelectorAll(".preferences input")
					.forEach((input) => {
						input.removeAttribute("readonly");
					});
			} else {
				document
					.querySelectorAll(".preferences input")
					.forEach((input) => {
						input.setAttribute("readonly", true);
					});
			}
		}
	});
});
