
        document.addEventListener('DOMContentLoaded', () => {
        const timeSlots = document.getElementsByClassName('time-slot');
        const eventsContainer = document.getElementById('events');
        const colors = ['#BFE9E2', '#E9BFD9', '#BFD1E9', '#D3BFE9'];
        const defaultEvents = [
            {time: '12 AM', description: "Pooja's Birthday"},
            {time: '6 AM', description: 'Exercise'},
            {time: '11 AM', description: 'Sports club'},
            { time: '9 AM', description: 'Morning Meeting' },
            { time: '1 PM', description: 'Lunch with Team' },
            { time: '3 PM', description: 'HCI Project submission' },
        ];
        defaultEvents.forEach((event,index) => {
                for (let i = 0; i < timeSlots.length; i++) {
                if (timeSlots[i].innerText === event.time) {
                    const offsetLeft = timeSlots[i].offsetLeft;
                    const newEvent = document.createElement('div');
                    newEvent.className = 'event';
                    newEvent.style.left = `${offsetLeft}px`;
                    newEvent.style.backgroundColor = colors[index % colors.length];

                    const iconElement = document.createElement('i');
                    iconElement.className ='fa-solid fa-circle-check';
                    //iconElement.style.marginRight = '5px';
                    //const description = document.createTextNode(event.description);
                    const description = document.createElement('span');
                    description.innerText = event.description;
                    newEvent.appendChild(iconElement);
                    newEvent.appendChild(description);
                    eventsContainer.appendChild(newEvent);
                    break;
                }
            }
        });
    });

        const currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        updateMonthYearDisplay();

        function generateCalendar(month, year) {
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const calendarBody = document.getElementById("calendar").tBodies[0];
            calendarBody.innerHTML = "";

            let row = document.createElement("tr");
            calendarBody.appendChild(row);

            for (let i = 0; i < firstDay; i++) {
                const cell = document.createElement("td");
                row.appendChild(cell);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                if (row.children.length == 37) {
                    row = document.createElement("tr");
                    calendarBody.appendChild(row);
                }
                const cell = document.createElement("td");
                cell.textContent = day;
                cell.onclick = () => selectDate(day);
                row.appendChild(cell);

                // Mark today's date
                if (day === currentDate.getDate() && month === currentDate.getMonth()) {
                    cell.classList.add("today");
                }
            }
        }

    
        function createEvent(time,description) {
            const eventCell = document.createElement('td');
            eventCell.classList.add('event');
            eventCell.textContent = `${time}\n${description}`;
            return eventCell;
        }

        function updateMonthYearDisplay() {
            const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE","JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
            document.getElementById("month").textContent = monthNames[currentMonth] + " " ;
            document.getElementById("year").textContent = currentYear;

            document.getElementById("prev").textContent = monthNames[(currentMonth - 1 + 12) % 12];
            document.getElementById("next").textContent = monthNames[(currentMonth + 1) % 12];
            generateCalendar(currentMonth, currentYear);
        }
        const yearElement = document.getElementById("year");
        yearElement.addEventListener("click", () => {
            window.location.href = `year.html?year=${currentYear}`;
        });
      
        function previousMonth() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateMonthYearDisplay();
            document.getElementById("prev").innerHTML = monthNames[currentMonth];
        }

        function nextMonth() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateMonthYearDisplay();
        }
        function selectDate(day) {
            const selectedMessage = document.getElementById("selected-message");
            highlightSelectedDate(day);
        }

        function highlightSelectedDate(day) {
            const calendarBody = document.getElementById("calendar").tBodies[0];
            for (let row of calendarBody.rows) {
                for (let cell of row.cells) {
                    if (cell.textContent == day) {
                        cell.classList.add("selected");
                    } else {
                        cell.classList.remove("selected");
                    }
                }
            }
        }
        function getMonthName(monthIndex) {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return monthNames[monthIndex];
        }
        function openModal() {
            const modal = document.getElementById('eventModal');
            modal.style.display = 'flex';
        }

        function closeModal() {
            const modal = document.getElementById('eventModal');
            modal.style.display = 'none';
        }
        function openremainder() {
            const calendar = document.getElementById('set');
            if (calendar.style.display === 'none' || !calendar.style.display) {
                calendar.style.display = 'block';
                setTimeout(() => document.addEventListener('click', closeOnClickOutside), 0);
            } else {
                calendar.style.display = 'none';
                document.removeEventListener('click', closeOnClickOutside);
            }
        }
        function addEvent() {
            const time = document.getElementById('eventTime').value;
            const description = document.getElementById('eventDescription').value;
            const colors = ['#BFE9E2', '#E9BFD9', '#BFD1E9', '#D3BFE9'];

            if (time && description) {
                const timeline = document.getElementById('timeline');
                const timeSlots = timeline.getElementsByClassName('time-slot');
                const eventsContainer = document.getElementById('events');
                const eventCount = eventsContainer.getElementsByClassName('event').length;

                for (let i = 0; i < timeSlots.length; i++) {
                    if (timeSlots[i].innerText === time) {
                        const offsetLeft = timeSlots[i].offsetLeft;

                        const newEvent = document.createElement('div');
                        newEvent.className = 'event';
                        newEvent.style.left = `${offsetLeft}px`;
                        newEvent.style.backgroundColor = colors[eventCount % colors.length];
                        newEvent.innerText = description;

                        eventsContainer.appendChild(newEvent);
                        break;
                    }
                }

                closeModal(); // Close the modal after adding the event
            } else {
                alert("Please enter both time and event description.");
            }
        }