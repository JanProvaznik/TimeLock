function overlayWebsite() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = '#000'; // Fully black color
    document.body.appendChild(overlay);
}

function getCurrentTimeBlock() {
    const currentHour = new Date().getHours();
    return `${currentHour}:00-${currentHour + 1}:00`;
}

chrome.storage.local.get(window.location.hostname, function(result) {
    const schedule = result[window.location.hostname];
    console.log(schedule);
    console.log('hello getting works');
    const dayz = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentDay = dayz[new Date().getDay() - 1];
    const currentTimeBlock = getCurrentTimeBlock();
    console.log(currentTimeBlock);
    console.log(schedule && schedule[currentDay] && schedule[currentDay].includes(currentTimeBlock))
    if (schedule && schedule[currentDay] && schedule[currentDay].includes(currentTimeBlock)) {
        console.log('overlaying website')
        overlayWebsite();
    }
});
