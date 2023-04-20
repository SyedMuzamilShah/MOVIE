let searchForm = document.getElementById("SearchForm");
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const generValue = document.querySelector('#MovieType').value;
    const yearValue = document.querySelector('#Year').value;
    const languageValue = document.querySelector('#Language').value;
    const rantingValue = document.querySelector('#Ranting').value;

    let response = await fetch('data.json');
    let data = await response.json();
    let items = [];

    for (let index in data) {
        const type = data[index].genres;
        const language = data[index].original_language;
        const release = data[index].release_date.slice(0, 4);
        if (release === yearValue) {
            items.push(data[index]);
        }
        if (language === languageValue) {
            items.push(data[index]);
        }
        if (type[0] === generValue) {
            items.push(data[index]);
        }
    }
    
    var SreachItemsPlace = document.getElementById('placesreachitems')
    var next = document.getElementById('place')
    next.innerHTML = '';
    
    items.forEach((item, index) => {
        
        const { runtime, poster_path, title, certification, genres, homepage, release_date } = item;
        console.log(release_date)
        var copy = SreachItemsPlace.cloneNode(true);
        copy.querySelector('#rankid').innerText = index + 1;
        copy.querySelector('#imageid').src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        copy.querySelector('#titleid').textContent = title;
        copy.querySelector('#certificateid').textContent = certification;
        copy.querySelector('#movietypeid').textContent = genres
        copy.querySelector('#playtimeid').textContent = timecal({ runtime });
        copy.querySelector('#likeid').href = homepage;
        copy.querySelector('#yearid').textContent = release_date;
        
        next.appendChild(copy);
    });
    items = []
    }
);

function timecal(cal) {
    const totalMinutes = cal.runtime;
    const hours = Math.floor(totalMinutes / 60); // 1
    const minutes = totalMinutes % 60; // 46
    const formattedTime = `${hours}h ${minutes}min`;
    return formattedTime;
}
