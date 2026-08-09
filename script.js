
```javascript
/* =====================================================
   NTP RÁDIO WEB
   PLAYER + MENU + COMPARTILHAMENTO
===================================================== */

const audio = document.getElementById("radioAudio");

const playButton =
    document.getElementById("playButton");

const muteButton =
    document.getElementById("muteButton");

const volumeControl =
    document.getElementById("volumeControl");

const shareButton =
    document.getElementById("shareButton");

const playerMessage =
    document.getElementById("playerMessage");

const toast =
    document.getElementById("toast");

const menuButton =
    document.getElementById("menuButton");

const menu =
    document.getElementById("menu");

const musicTitle =
    document.getElementById("musicTitle");

const musicArtist =
    document.getElementById("musicArtist");


/* =====================================================
   ANO AUTOMÁTICO
===================================================== */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
        window.ntpToastTimer
    );

    window.ntpToastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* =====================================================
   ATUALIZAR BOTÃO
===================================================== */

function updatePlayButton() {

    if (!audio || !playButton) return;

    if (audio.paused) {

        playButton.textContent = "▶";

    } else {

        playButton.textContent = "Ⅱ";

    }

}


/* =====================================================
   TOCAR / PAUSAR RÁDIO
===================================================== */

if (playButton) {

    playButton.addEventListener(
        "click",
        async function () {

            if (!audio) return;


            if (audio.paused) {

                try {

                    playerMessage.textContent =
                        "Conectando à transmissão...";

                    await audio.play();

                    playerMessage.textContent =
                        "Você está ouvindo a NTP Rádio Web.";

                    updatePlayButton();

                }

                catch (error) {

                    console.error(
                        "Erro ao iniciar rádio:",
                        error
                    );

                    playerMessage.textContent =
                        "Não foi possível iniciar a transmissão.";

                    showToast(
                        "Não foi possível iniciar a rádio."
                    );

                    updatePlayButton();

                }

            } else {

                audio.pause();

                playerMessage.textContent =
                    "Transmissão pausada.";

                updatePlayButton();

            }

        }
    );

}


/* =====================================================
   EVENTOS DO PLAYER
===================================================== */

if (audio) {

    audio.addEventListener(
        "play",
        function () {

            updatePlayButton();

            playerMessage.textContent =
                "Você está ouvindo a NTP Rádio Web.";

        }
    );


    audio.addEventListener(
        "playing",
        function () {

            updatePlayButton();

            playerMessage.textContent =
                "NTP Rádio Web está AO VIVO.";

        }
    );


    audio.addEventListener(
        "pause",
        function () {

            updatePlayButton();

            playerMessage.textContent =
                "Transmissão pausada.";

        }
    );


    audio.addEventListener(
        "waiting",
        function () {

            playerMessage.textContent =
                "Aguardando o sinal da rádio...";

        }
    );


    audio.addEventListener(
        "stalled",
        function () {

            playerMessage.textContent =
                "Reconectando à transmissão...";

        }
    );


    audio.addEventListener(
        "error",
        function () {

            playerMessage.textContent =
                "Erro na transmissão. Tente novamente.";

            showToast(
                "Verifique o sinal da rádio."
            );

            updatePlayButton();

        }
    );

}


/* =====================================================
   MUTE
===================================================== */

if (muteButton) {

    muteButton.addEventListener(
        "click",
        function () {

            if (!audio) return;

            audio.muted =
                !audio.muted;

            muteButton.textContent =
                audio.muted
                    ? "🔇"
                    : "🔊";

        }
    );

}


/* =====================================================
   VOLUME
===================================================== */

if (volumeControl) {

    volumeControl.addEventListener(
        "input",
        function () {

            if (!audio) return;

            audio.volume =
                Number(
                    volumeControl.value
                );

            if (
                audio.volume > 0 &&
                audio.muted
            ) {

                audio.muted = false;

                muteButton.textContent =
                    "🔊";

            }

        }
    );

}


/* =====================================================
   CONFIGURAÇÃO INICIAL
===================================================== */

if (audio) {

    audio.volume = 0.8;

}


/* =====================================================
   COMPARTILHAR
===================================================== */

if (shareButton) {

    shareButton.addEventListener(
        "click",
        async function () {

            const shareData = {

                title:
                    "NTP Rádio Web",

                text:
                    "Ouça a NTP Rádio Web ao vivo!",

                url:
                    window.location.href

            };


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        shareData
                    );

                }

                else {

                    await navigator.clipboard.writeText(
                        window.location.href
                    );

                    showToast(
                        "Link da rádio copiado!"
                    );

                }

            }

            catch (error) {

                console.log(
                    "Compartilhamento cancelado."
                );

            }

        }
    );

}


/* =====================================================
   MENU MOBILE
===================================================== */

if (menuButton && menu) {

    menuButton.addEventListener(
        "click",
        function () {

            menu.classList.toggle(
                "open"
            );

        }
    );


    const links =
        menu.querySelectorAll("a");


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    menu.classList.remove(
                        "open"
                    );

                }
            );

        }
    );

}


/* =====================================================
   ATUALIZAR MÚSICA
=====================================================

   Esta função fica preparada para quando você
   conectar uma API de metadados do Zeno.fm.

   Exemplo:

   updateNowPlaying(
       "Nome da música",
       "Nome do artista"
   );

===================================================== */

function updateNowPlaying(
    title,
    artist
) {

    if (musicTitle) {

        musicTitle.textContent =
            title ||
            "NTP Rádio Web";

    }


    if (musicArtist) {

        musicArtist.textContent =
            artist ||
            "Sua rádio na internet";

    }

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

updatePlayButton();


console.log(
    "NTP Rádio Web carregada com sucesso."
);

console.log(
    "Stream:",
    "https://stream.zeno.fm/elhz4znig9wuv"
);
```
