const playlists = [
	{
		name: '2 hearts',
		artist: 'Phil Colins',
		image: './images/2 Hearts.jpg',
		src: './song/2_hearts.mp3'
	},
	{
		name: 'Be Free',
		artist: 'Vidya Vox',
		image: './images/Be Free.jpg',
		src: './song/be_free.mp3'
	},
	{
		name: 'Dil cheez tujhe dedi',
		artist: 'Arijit Singh',
		image: './images/Dil Cheez Tujhe Dedi.jpg',
		src: './song/Dil Cheez Tujhe Dedi.mp3'
	}
]

const music = document.querySelector('audio');
const image = document.querySelector('img');
const playButton = document.querySelector('.fa-play-circle');
const nextButton = document.querySelector('.fa-forward');
const previousButton = document.querySelector('.fa-backward');
const musicTitle = document.querySelector('h2');
const artistName = document.querySelector('h6');

const musicTime = document.getElementsByClassName('initialTime')[0];
const totalMusicTime = document.getElementsByClassName('totalTime')[0];

const musicProgress = document.getElementsByClassName('musicProgress')[0];
const musicBar = document.getElementsByClassName('musicBar')[0];

let canPlayMusic = false;
let pauseTime = false;

let songIndex = 0;

playButton.addEventListener('click', function() {
	
	// Pause music
	if(playButton.classList.contains('fa-pause-circle')) {
		playButton.classList.remove('fa-pause-circle');
		playButton.classList.add('fa-play-circle');
		canPlayMusic = false;
		pauseTime = music.currentTime;
		pauseMusic();
	} 

	// Play music
	else {
		playButton.classList.remove('fa-play-circle');
		playButton.classList.add('fa-pause-circle');
		canPlayMusic = true;

		loadMusic(playlists[songIndex]);
	}
	
});

function playMusic() {
	music.play();
	image.classList.add('animation');
}

function pauseMusic() {
	music.pause();
	image.classList.remove('animation');
}

function loadMusic(song) {
	music.src = song.src;

	if(song.image === '')
		image.src = './images/music.png';
	else
		image.src = song.image;

	musicTitle.innerText = song.name;
	artistName.innerText = song.artist;

	if(pauseTime)
		music.currentTime = pauseTime;

	if(canPlayMusic)
		playMusic();

	pauseTime = false;
}

function nextMusic() {
	songIndex = (songIndex + 1) % playlists.length;

	loadMusic(playlists[songIndex]);
}

function previousMusic() {
	songIndex = ((songIndex - 1) + playlists.length) % playlists.length;

	loadMusic(playlists[songIndex]);
}

nextButton.addEventListener('click', nextMusic);

previousButton.addEventListener('click', previousMusic)

music.addEventListener('timeupdate', (e) => {
	
	let currentTime = e.srcElement.currentTime;
	let currentTime_min = Math.floor(currentTime / 60);
	let currentTime_sec = Math.floor(currentTime % 60);

	const duration = e.srcElement.duration;
	let duration_min = Math.floor(duration / 60);
	let duration_sec = Math.floor(duration % 60);

	if(currentTime_sec < 10) {
		currentTime_sec = `0${currentTime_sec}`;
	}

	if(duration_sec < 10) {
		currentTime_sec = `0${duration_sec}`;
	}

	if(currentTime)   //for NaN issue
		musicTime.textContent = `${currentTime_min}:${currentTime_sec}`;
	
	if(duration)  //for NaN issue
		totalMusicTime.textContent = `${duration_min}:${duration_sec}`;

	let progress = Math.floor((currentTime / duration) * 100);
	
	musicBar.style.width = `${progress}%`;

	if(e.srcElement.ended) {
		setTimeout(() => {
			musicBar.style.width = '0%';
		}, 1000);

		setTimeout(nextMusic, 2000);
		// nextMusic()
	}
})

musicProgress.addEventListener('click', (e) => {
	let userTime = e.offsetX;
	let totalduration = e.srcElement.clientWidth;

	const { currentTime, duration } = music;

	let musicTime = Math.floor((userTime / totalduration) * duration);

	music.currentTime = musicTime;

})