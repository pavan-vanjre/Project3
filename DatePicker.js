class DatePicker {
    constructor(id, callbackFunction) {
      this.id = id;
      this.callbackFunction = callbackFunction;
      this.div = document.getElementById(id);
      this.currentDate = new Date();
    }
  
    render(date, defaultSelectedDate) {
      this.currentDate = date;
  
      // Clear the contents of the div
      this.div.innerHTML = "";
  
      // Create a container for the header and navigation controls
      const headerContainer = document.createElement("div");
  
      // Create the month and year header with navigation controls
      const monthYearHeader = document.createElement("div");
      monthYearHeader.classList.add("month-year-header");
  
      // Create the previous month button
      const previousMonthButton = document.createElement("button");
      previousMonthButton.innerHTML = "&lt;";
      previousMonthButton.classList.add("nav-button");
      previousMonthButton.addEventListener("click", () =>
        this.render(
          new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() - 1,
            1
          )
        )
      );
  
      // Create the next month button
      const nextMonthButton = document.createElement("button");
      nextMonthButton.innerHTML = "&gt;";
      nextMonthButton.classList.add("nav-button");
      nextMonthButton.addEventListener("click", () =>
        this.render(
          new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() + 1,
            1
          )
        )
      );
  
      // Create the month and year text
      const monthYearText = document.createElement("span");
      monthYearText.innerText =
        this.getMonthName(this.currentDate.getMonth()) +
        " " +
        this.currentDate.getFullYear();
  
      // Append the previous month button, month name, and next month button to the header
      monthYearHeader.appendChild(previousMonthButton);
      monthYearHeader.appendChild(document.createTextNode(" "));
      monthYearHeader.appendChild(monthYearText);
      monthYearHeader.appendChild(document.createTextNode(" "));
      monthYearHeader.appendChild(nextMonthButton);
  
      // Append the month and year header to the container
      headerContainer.appendChild(monthYearHeader);
  
      // Append the container to the div
      this.div.appendChild(headerContainer);
        const calendarBodyContainer = document.createElement("div");
        calendarBodyContainer.classList.add("calendar-container");
        this.div.appendChild(calendarBodyContainer);
      // Create the header row
        const headerRow = document.createElement("tr");
        calendarBodyContainer.appendChild(headerRow);
      for (let i = 0; i < 7; i++) {
        const headerCell = document.createElement("th");
        headerCell.innerText = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][i];
        headerRow.appendChild(headerCell);
      }
  
      // Create the calendar body
      const calendarBody = document.createElement("tbody");
      const daysInMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      ).getDate();
      const firstDayOfMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      ).getDay();
      const lastDayOfMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      ).getDay();
  
      let currentWeek = document.createElement("tr"); // Initialize the current week
  
      // Add the days of the week leading up to the first day of the month
      if (firstDayOfMonth > 0) {
        for (let i = 0; i < firstDayOfMonth; i++) {
          const calendarCell = document.createElement("td");
          calendarCell.classList.add("dimmed");
          const prevMonthDate = new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() - 1,
            31 - (firstDayOfMonth - i - 1)
          );
          calendarCell.innerText = prevMonthDate.getDate();
          currentWeek.appendChild(calendarCell);
        }
      }
  
      // Add the days of the month
      for (let i = 1; i <= daysInMonth; i++) {
        const calendarCell = document.createElement("td");
        calendarCell.innerText = i;
  
        // Compare to the 'date' parameter, not 'this.currentDate'
        if (
          date.getFullYear() === this.currentDate.getFullYear() &&
          date.getMonth() === this.currentDate.getMonth() &&
          date.getDate() === i &&
          date === defaultSelectedDate
        ) {
          calendarCell.classList.add("selected");
        }
  
        currentWeek.appendChild(calendarCell);
  
        // Start a new row (week) if it's the last day of the week or the last day of the month
        if (currentWeek.children.length === 7 || i === daysInMonth) {
          calendarBody.appendChild(currentWeek);
          currentWeek = document.createElement("tr");
        }
      }
  
      // Add the days of the week following the last day of the month
      if (lastDayOfMonth < 6) {
        for (let i = lastDayOfMonth + 1; i < 7; i++) {
          const calendarCell = document.createElement("td");
          calendarCell.classList.add("dimmed");
          const nextMonthDate = new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() + 1,
            1 + (i - lastDayOfMonth - 1)
          );
          calendarCell.innerText = nextMonthDate.getDate();
          currentWeek.appendChild(calendarCell);
        }
      }
  
      // Append the header row and calendar body to the div
      this.div.appendChild(headerRow);
      this.div.appendChild(calendarBody);
  
          // Add a click listener to each day cell
      const calendarCells = this.div.querySelectorAll("tbody td");
      calendarCells.forEach((calendarCell) => {
        calendarCell.addEventListener("click", () => {
          // Check if the clicked cell is dimmed (from the previous month)
          if (calendarCell.classList.contains("dimmed")) {
            return; // Do nothing for dimmed cells
          }
  
          // Remove the "selected" class from all date cells
          calendarCells.forEach((cell) => {
            cell.classList.remove("selected");
          });
  
          // Add the "selected" class to the clicked cell
          calendarCell.classList.add("selected");
  
          // Extract the selected date from the clicked cell
          const day = parseInt(calendarCell.innerText);
          const month = this.currentDate.getMonth() + 1; // Adjust month to be 1-based
          const year = this.currentDate.getFullYear();
  
          // Invoke the callback function with the selected date
          this.callbackFunction(this.id, { day, month, year });
        });
      });
  
      // Highlight the defaultSelectedDate if provided
      if (defaultSelectedDate) {
        const { day, month, year } = defaultSelectedDate;
        const selectedCell = Array.from(calendarCells).find(
          (cell) =>
            parseInt(cell.innerText) === day &&
            this.currentDate.getMonth() + 1 === month &&
            this.currentDate.getFullYear() === year
        );
        if (selectedCell) {
          selectedCell.classList.add("selected");
        }
      }
    }
  
    getMonthName(monthIndex) {
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
  
      return monthNames[monthIndex];
    }
  }
  
