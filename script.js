const songs = [
  { title: "888", artist: "Cavetown", cover: "covers/Lemon Boy cover.jpg", audio: "songs/888.mp3", lyrics: "lyrics/888.txt" },
  { title: "a million bucks on a queen motel bed", artist: "Eric Hutchinson", cover: "covers/Modern Happiness cover.jpg", audio: "songs/a million bucks on a queen motel bed.mp3", lyrics: "lyrics/a million bucks on a queen motel bed.txt" },
  { title: "Alexander Hamilton", artist: "Lin-Manuel Miranda", cover: "covers/Hamilton (Original Broadway Cast Recording) cover.jpg", audio: "songs/Alexander Hamilton.mp3", lyrics: "lyrics/Alexander Hamilton.txt" },
  { title: "Back to Where I Was", artist: "Eric Hutchinson", cover: "covers/Sounds Like This cover.jpg", audio: "songs/Back to Where I Was.mp3", lyrics: "lyrics/Back to Where I Was.txt" },
  { title: "Boys Will Be Bugs", artist: "Cavetown", cover: "covers/Animal Kingdom cover.jpg", audio: "songs/Boys Will Be Bugs.mp3", lyrics: "lyrics/Boys Will Be Bugs.txt" },
  { title: "Call off Your Dogs", artist: "Lake Street Dive", cover: "covers/Side Pony cover.jpg", audio: "songs/Call off Your Dogs.mp3", lyrics: "lyrics/Call off Your Dogs.txt" },
  { title: "Castle on the Hill", artist: "Ed Sheeran", cover: "covers/÷ cover.jpg", audio: "songs/Castle on the Hill.mp3", lyrics: "lyrics/Castle on the Hill.txt" },
  { title: "drinking games", artist: "Silver", cover: "covers/Drinking Games cover.jpg", audio: "songs/drinking games.mp3", lyrics: "lyrics/drinking games.txt" },  
  { title: "It Hasn't Been Long Enough", artist: "Eric Hutchinson", cover: "covers/Sounds Like This cover.jpg", audio: "songs/It Hasn't Been Long Enough.mp3", lyrics: "lyrics/It Hasn't Been Long Enough.txt" },
  { title: "Line Without a Hook", artist: "Ricky Montgomery", cover: "covers/Montgomery Ricky cover.jpg", audio: "songs/Line Without a Hook.mp3", lyrics: "lyrics/Line Without a Hook.txt" },
  { title: "Louder Than Words", artist: "Andrew Garfield", cover: "covers/Tick Tick Boom cover.jpg", audio: "songs/Louder Than Words.mp3", lyrics: "lyrics/Louder Than Words.txt" },
  { title: "Money Game, Pt. 2", artist: "Ren", cover: "covers/Demos (Do Not Share), Vol 1 cover.jpg", audio: "songs/Money Game, Pt. 2.mp3", lyrics: "lyrics/Money Game, Pt. 2.txt" },
  { title: "Raspberry", artist: "Grouplove", cover: "covers/Spreading Rumours cover.jpg", audio: "songs/Raspberry.mp3", lyrics: "lyrics/Raspberry.txt" },
  { title: "Sad Songs", artist: "Eric Hutchinson", cover: "covers/Sad Songs cover.jpg", audio: "songs/Sad Songs (feat. Allen Stone, Clyde Lawrence, Huntertones).mp3", lyrics: "lyrics/Sad Songs.txt" },
  { title: "Say My Name", artist: "Alex Brightman", cover: "covers/Beetlejuice (Original Broadway Cast Recording) cover.jpg", audio: "songs/Say My Name.mp3", lyrics: "lyrics/Say My Name.txt" },
  { title: "Semolina", artist: "Blackaby", cover: "covers/Semolina cover.jpg", audio: "songs/Semolina.mp3", lyrics: "lyrics/Semolina.txt" },
  { title: "Sing Along With Me", artist: "Eric Hutchinson", cover: "covers/SING ALONG! with Eric Hutchinson cover.jpg", audio: "songs/Sing Along With Me.mp3", lyrics: "lyrics/Sing Along With Me.txt" },
  { title: "The People I Know", artist: "Eric Hutchinson", cover: "covers/Moving Up Living Down cover.jpg", audio: "songs/The People I Know.mp3", lyrics: "lyrics/The People I Know.txt" },
  { title: "What Do I Know", artist: "Ed Sheeran", cover: "covers/÷ cover.jpg", audio: "songs/What Do I Know.mp3", lyrics: "lyrics/What Do I Know.txt" },
];

const albumCover = document.getElementById("album-cover");
const lyricsElement = document.getElementById("lyrics");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const loopBtn = document.getElementById("loop-btn");
const playlistBtn = document.getElementById("playlist-btn");
const playlistElement = document.getElementById("playlist");
const songListElement = document.getElementById("song-list");
const closePlaylistBtn = document.getElementById("close-playlist-btn");
const progressBar = document.querySelector(".progress-bar");
const progressCurrent = document.querySelector(".progress-bar .current");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const currentCover = document.getElementById("current-cover");
const currentTitle = document.getElementById("current-title");
const currentArtist = document.getElementById("current-artist");;
const fullscreenBtn = document.getElementById("fullscreen-btn");

let audio = null;
let lyrics = [];
let lyricsIndex = 0;
let currentSongIndex = 0;
let isLooping = false;

// Crear lista de canciones dinámicamente
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.dataset.index = index;
  li.classList.add("flex", "items-center", "space-x-4", "text-white", "cursor-pointer", "hover:bg-zinc-600", "p-2", "group", "focusable");

  // Crear contenedor para la portada y la información de la canción
  const songInfo = document.createElement("div");
  songInfo.classList.add("song-info", "flex", "items-center", "space-x-4");

  // Crear contenedor para la portada con overlay
  const coverContainer = document.createElement("div");
  coverContainer.classList.add("relative", "group");

  // Crear la portada de la canción
  const coverImg = document.createElement("img");
  coverImg.src = song.cover;
  coverImg.alt = "Cover";
  coverImg.classList.add("w-16", "h-16", "rounded-md", "object-cover");

  // Crear capa de oscurecimiento en hover
  const overlay = document.createElement("div");
  overlay.classList.add("absolute", "top-0", "left-0", "w-full", "h-full", "bg-black", "opacity-0", "group-hover:opacity-50", "transition-opacity", "rounded-md");

  // Crear el ícono de "play" que aparecerá sobre la portada
  const playIcon = document.createElement("i");
  playIcon.classList.add("fa-solid", "fa-play", "text-white", "absolute", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "text-2xl", "opacity-0", "group-hover:opacity-100", "transition-opacity");

  // Agregar la portada, el overlay y el ícono de "play" al contenedor
  coverContainer.appendChild(coverImg);
  coverContainer.appendChild(overlay);
  coverContainer.appendChild(playIcon);

  // Crear el título y el artista
  const textContainer = document.createElement("div");
  const title = document.createElement("p");
  title.textContent = song.title;
  title.classList.add("text-sm");
  
  const artist = document.createElement("p");
  artist.textContent = song.artist;
  artist.classList.add("text-sm", "text-gray-400", "group-hover:text-white"); // Cambio de color en hover

  // Agregar todo al contenedor de la canción
  textContainer.appendChild(title);
  textContainer.appendChild(artist);
  songInfo.appendChild(coverContainer);
  songInfo.appendChild(textContainer);
  
  // Agregar la canción con la portada y el texto a la lista
  li.appendChild(songInfo);
  
  // Añadir el evento para cargar la canción al hacer clic
  li.addEventListener("click", () => {
    loadSong(index);
    playSong();
    closePlaylist(); // Cierra la lista al seleccionar una canción
  });
  
  songListElement.appendChild(li);
});

function loadSong(index) {
  const selectedSong = songs[index];
  
  // Detener la canción actual si hay una reproduciéndose
  if (audio) audio.pause();
  
  // Crear un nuevo objeto de audio para la canción seleccionada
  audio = new Audio(selectedSong.audio);
  
  // Agregar evento para reproducir la siguiente canción al terminar
  audio.addEventListener("ended", () => {
    nextSong();
  });

  // Actualizar la portada del álbum
  albumCover.src = selectedSong.cover;
  albumCover.classList.remove("hidden");
  
  // Actualizar la información de la canción en la barra de control
  currentCover.src = selectedSong.cover;
  currentTitle.textContent = selectedSong.title;
  currentArtist.textContent = selectedSong.artist;

  // Cambiar el fondo usando Vibrant.js
  albumCover.onload = () => {
    const vibrant = new Vibrant(albumCover);
    const swatches = vibrant.swatches();
    if (swatches.DarkVibrant) {
      document.body.style.backgroundColor = swatches.DarkVibrant.getHex(); // Fondo vibrante
    }
  };

  // Cargar la letra de la canción
  loadLyrics(selectedSong.lyrics);
  
  // Actualizar el índice de la canción actual
  currentSongIndex = index;
  
  // Resaltar la canción en la lista
  highlightCurrentSong(index);
}

// Cambiar el color de la canción actual
function highlightCurrentSong(index) {
  const songItems = songListElement.querySelectorAll("li");
  songItems.forEach((item, i) => {
    const title = item.querySelector("p.text-sm"); // Seleccionar el título de la canción
    if (i === index) {
      title.classList.add("text-green-500"); // Resaltar la canción en reproducción
    } else {
      title.classList.remove("text-green-500"); // Restablecer el color
    }
  });
}

// Función para cerrar la lista de canciones
function closePlaylist() {
  playlistElement.classList.add("hidden");
}

// Mostrar lista de reproducción
playlistBtn.addEventListener("click", () => {
  playlistElement.classList.remove("hidden");
});

// Cerrar la lista con el botón de la equis
closePlaylistBtn.addEventListener("click", closePlaylist);

// Función para cargar las letras de una canción
function loadLyrics(filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      lyrics = parseLyrics(data);
      lyricsIndex = 0;
      lyricsElement.textContent = lyrics.length ? lyrics[0].text : "No hay letras disponibles.";
    });
}

// Función para parsear las letras
function parseLyrics(lyricsText) {
  return lyricsText.split("\n").map(line => {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.+)/);
    if (match) {
      const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
      return { time, text: match[3] };
    }
    return null;
  }).filter(item => item);
}

// Reproducir canción
function playSong() {
  audio.play();
  playBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
  syncLyrics();
  updateProgress();
}

// Función para sincronizar las letras con la canción
function syncLyrics() {
  audio.addEventListener("timeupdate", () => {
    // Si el tiempo de la canción ha avanzado
    if (audio.currentTime >= lyrics[lyricsIndex].time) {
      while (lyricsIndex < lyrics.length - 1 && audio.currentTime >= lyrics[lyricsIndex + 1].time) {
        lyricsIndex++;
      }
    }
    // Si el tiempo de la canción ha retrocedido
    else if (audio.currentTime < lyrics[lyricsIndex].time && lyricsIndex > 0) {
      while (lyricsIndex > 0 && audio.currentTime < lyrics[lyricsIndex].time) {
        lyricsIndex--;
      }
    }

    // Actualizar las letras visibles
    lyricsElement.innerHTML = lyrics
      .map((line, index) => {
        // Crear una línea de letra con un evento click
        const isCurrent = index === lyricsIndex;
        const isPrevious = index === lyricsIndex - 1 || index === lyricsIndex - 2;
        const isNext = index === lyricsIndex + 1 || index === lyricsIndex + 2;

        let classNames = "m-3 font-bold cursor-pointer text-xl ";
        if (isCurrent) {
          classNames += "text-white text-2xl";
        } else if (isPrevious) {
          classNames += "text-slate-300";
        } else if (isNext) {
          classNames += "text-black";
        } else {
          return ""; // Si la letra no está cerca, no se muestra
        }

        return `
          <div 
            class="${classNames}" 
            data-time="${line.time}" 
            onclick="seekToTime(${line.time})">
            ${line.text}
          </div>
        `;
      })
      .join("");
  });
}

// Nueva función para saltar a un tiempo específico de la canción
function seekToTime(time) {
  audio.currentTime = time; // Cambiar la posición del audio
  syncLyrics(); // Sincronizar las letras con la nueva posición
}

// Actualizar barra de progreso
function updateProgress() {
  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    
    // Actualizar la barra de progreso
    progressCurrent.style.width = `${percent}%`;

    // Mover el círculo junto con la barra de progreso
    const progressCircle = document.getElementById("progress-circle");
    progressCircle.style.left = `calc(${percent}% - 8px)`; // Ajustamos la posición del círculo (restando la mitad del tamaño del círculo para centrarlo)

    // Actualizar el tiempo actual y total
    currentTime.textContent = formatTime(audio.currentTime);
    totalTime.textContent = formatTime(audio.duration);
  });
}

// Formatear tiempo
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

// Hacer clic sobre la barra de progreso para ir a un tiempo específico
progressBar.addEventListener("click", (event) => {
  // Obtener la posición del clic sobre la barra
  const clickPosition = event.offsetX;
  
  // Calcular el porcentaje de la barra que fue clickeada
  const percentage = clickPosition / progressBar.offsetWidth;
  
  // Calcular el tiempo correspondiente basado en el porcentaje
  const newTime = percentage * audio.duration;
  
  // Establecer el nuevo tiempo de la canción
  audio.currentTime = newTime;
  
  // Actualizar la barra de progreso
  updateProgress();
});

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong(); // Asegura que la siguiente canción se reproduzca automáticamente
}

// Alternar el modo de pantalla completa
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenBtn.innerHTML = '<i class="fa fa-compress"></i>'; // Cambiar ícono al de salir de pantalla completa
  } else {
    document.exitFullscreen();
    fullscreenBtn.innerHTML = '<i class="fa fa-expand"></i>'; // Cambiar ícono al de entrar a pantalla completa
  }
});

// Controlar la reproducción/pausa con la tecla de espacio
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // Evita que la página se desplace hacia abajo al presionar la barra espaciadora

    if (audio) {
      if (audio.paused) {
        playSong();
      } else {
        audio.pause();
        pauseBtn.classList.add("hidden");
        playBtn.classList.remove("hidden");
      }
    }
  }
});

// Obtener todos los elementos interactivos (botones y canciones)
const focusableElements = Array.from(document.querySelectorAll(".focusable"));
let focusedIndex = 0; // Índice del elemento actualmente enfocado

// Inicializar el primer elemento enfocado
focusableElements[focusedIndex].classList.add("focused");

let fadeTimeout;

function togglePlaylistVisibility() {
  const focusedElement = document.querySelector(".focusable.focused");
  const playlistIsOpen = !playlistElement.classList.contains("hidden");

  if (focusedElement && playlistElement.contains(focusedElement)) {
    // Abrir la playlist si no está abierta
    if (!playlistIsOpen) {
      playlistElement.classList.remove("hidden");
    }
  } else {
    // Cerrar la playlist si está abierta y el foco está fuera de ella
    if (playlistIsOpen) {
      playlistElement.classList.add("hidden");
    }
  }
}

// Mover el foco al siguiente o anterior elemento
function moveFocus(direction) {
  clearTimeout(fadeTimeout); // Evita que el temporizador anterior afecte al nuevo foco

  const currentFocused = focusableElements[focusedIndex];
  currentFocused.classList.remove("focused", "fading"); // Quitar estilos previos

  if (direction === "down") {
    focusedIndex = (focusedIndex + 1) % focusableElements.length;
  } else if (direction === "up") {
    focusedIndex = (focusedIndex - 1 + focusableElements.length) % focusableElements.length;
  }

  const newFocused = focusableElements[focusedIndex];
  newFocused.classList.add("focused"); // Agregar clase de foco
  
  // Asegurarse de que el elemento esté visible en la lista
  newFocused.scrollIntoView({ block: "nearest", behavior: "smooth" });

  // Configurar desvanecimiento después de un tiempo
  fadeTimeout = setTimeout(() => {
    newFocused.classList.add("fading");
  }, 2000); // 2 segundos antes de desvanecer

  // Lógica para abrir o cerrar la playlist
  togglePlaylistVisibility();
}


// Ejecutar la acción del elemento enfocado
function activateFocusedElement() {
  focusableElements[focusedIndex].click(); // Simula un clic en el elemento
}

// Manejar los eventos de teclado
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowDown":
      moveFocus("down");
      break;
    case "ArrowUp":
      moveFocus("up");
      break;
    case "ArrowRight":
    case "ArrowLeft":
      moveFocus(event.code === "ArrowRight" ? "right" : "left");
      break;
    case "Enter":
      activateFocusedElement();
      break;
    default:
      break;
  }
});

// Botones
loopBtn.addEventListener("click", () => {
  isLooping = !isLooping;
  audio.loop = isLooping;
  loopBtn.classList.toggle("text-green-500", isLooping);
});

playBtn.addEventListener("click", playSong);

pauseBtn.addEventListener("click", () => {
  audio.pause();
  pauseBtn.classList.add("hidden");
  playBtn.classList.remove("hidden");
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

shuffleBtn.addEventListener("click", () => {
  currentSongIndex = Math.floor(Math.random() * songs.length);
  loadSong(currentSongIndex);
});

// Cargar la primera canción
loadSong(0);
