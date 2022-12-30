
const main = document.getElementById('main');
const titlesRow = document.getElementsByClassName('titles-row');
const infoBox = document.getElementById('infoBox');

const posterNames = ['posters/greenknightposter.jpeg', 'posters/ladybirdposter.jpeg', 'posters/babydriverposter.jpeg', 'posters/moneyballposter.jpeg', 'posters/thesocialnetworkposter.jpeg', 'posters/fightclubposter.jpeg', 'posters/bansheesposter.jpeg'];

for (let i = 0; i < titlesRow.length; i++) {
    const titleRow = titlesRow[i];

    for (let x = 0; x < titleRow.children.length; x++) {
        const child = titleRow.children[x];

        child.style.background = "url('" + posterNames[x] + "') no-repeat";
        child.style.backgroundSize = 'cover';

        child.addEventListener('click', function () {
            window.location.href = 'pages/playpage.htm';
            
            localStorage.setItem('currentlyPlaying', child.title);
        });
    }
}
