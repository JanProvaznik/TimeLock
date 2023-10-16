const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeBlocks = [
    '00:00-01:00',
    '01:00-02:00',
    '02:00-03:00',
    '03:00-04:00',
    '04:00-05:00',
    '05:00-06:00',
    '06:00-07:00',
    '07:00-08:00',
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
    '18:00-19:00',
    '19:00-20:00',
    '20:00-21:00',
    '21:00-22:00',
    '22:00-23:00',
    '23:00-24:00'
];


function createScheduleTable() {
    const table = document.getElementById('schedule-table');

    days.forEach(day => {
        const row = table.insertRow();

        const dayCell = row.insertCell(0);
        dayCell.textContent = day;

        timeBlocks.forEach(time => {
            const timeCell = row.insertCell();
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'schedule-checkbox';
            checkbox.dataset.day = day;
            checkbox.dataset.timeBlock = time;
            timeCell.appendChild(checkbox);
        });
    });
}

document.getElementById('save').addEventListener('click', function () {
    const url = document.getElementById('url').value;
    const schedule = {};

    document.querySelectorAll('.schedule-checkbox').forEach(checkbox => {
        if (checkbox.checked) {
            const day = checkbox.dataset.day;
            const timeBlock = checkbox.dataset.timeBlock;

            if (!schedule[day]) schedule[day] = [];
            schedule[day].push(timeBlock);
        }
    });

    chrome.storage.local.set({ [url]: schedule });
});
function loadScheduleForCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const url = new URL(tabs[0].url);
        const hostname = url.hostname;

        // Populate the URL input field
        document.getElementById('url').value = hostname;
        console.log("got hostname")
        // Fetch the schedule for this hostname from storage
        chrome.storage.local.get(hostname, function(result) {
            console.log('getting schedule to reload')
            console.log(result);
            const schedule = result[hostname];
            if (schedule) {
                for (const day in schedule) {
                    schedule[day].forEach(timeBlock => {
                        const checkbox = document.querySelector(`.schedule-checkbox[data-day="${day}"][data-timeBlock="${timeBlock}"]`);
                        if (checkbox) {
                            checkbox.checked = true;
                        }
                    });
                }
            }
        });
    });
}

createScheduleTable();
// log
console.log('table created');
loadScheduleForCurrentTab();
