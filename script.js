/* =====================================================
   JRV RÁDIO WEB
   JAVASCRIPT COMPLETO
===================================================== */

"use strict";


/* =====================================================
   CONFIGURAÇÃO
===================================================== */

const RADIO_STREAM =
    "https://stream.zeno.fm/elhz4znig9wuv";

const RECONNECT_TIME =
    5000;


/* =====================================================
   ELEMENTOS
===================================================== */

const audio =
    document.getElementById("radioAudio");

const playButton =
    document.getElementById("playButton");

const muteButton =
    document.getElementById("muteButton");

const volumeControl =
    document.getElementById("volumeControl");

const shareButton =
    document.getElementById("shareButton");

const player =
    document.querySelector(".player");

const playerMessage =
    document.getElementById("playerMessage");

const musicTitle =
    document.getElementById("musicTitle");

const musicArtist =
    document.getElementById("musicArtist");

const menuButton =
    document.getElementById("menuButton");

const menu =
    document.getElementById("menu");

const toast =
    document.getElementById("toast");

const year =
    document.getElementById("year");


/* =====================================================
   VERIFICAÇÃO
===================================================== */

if (!audio) {

    console.error(
        "JRV Rádio Web: elemento de áudio não encontrado."
    );

}


/* =====================================================
   CONFIGURAÇÃO DO ÁUDIO
===================================================== */

if (audio) {

    audio.src =
        RADIO_STREAM;

    audio.volume =
        0.8;

    audio.preload =
        "none";

}


/* =====================================================
   ANO AUTOMÁTICO
===================================================== */

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =====================================================
   STATUS DO PLAYER
===================================================== */

function setPlayerMessage(message) {

    if (!playerMessage) {
        return;
    }

    playerMessage.textContent =
        message;
}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* =====================================================
   ATUALIZAR BOTÃO PLAY
===================================================== */

function updatePlayButton(isPlaying) {

    if (!playButton) {
        return;
    }

    if (isPlaying) {

        playButton.textContent =
            "❚❚";

        playButton.setAttribute(
            "aria-label",
            "Pausar rádio"
        );

    } else {

        playButton.textContent =
            "▶";

        playButton.setAttribute(
            "aria-label",
            "Tocar rádio"
        );

    }

}


/* =====================================================
   ATUALIZAR MUTE
===================================================== */

function updateMuteButton() {

    if (!muteButton || !audio) {
        return;
    }

    if (audio.muted || audio.volume === 0) {

        muteButton.textContent =
            "🔇";

        muteButton.setAttribute(
            "aria-label",
            "Ativar som"
        );

    } else {

        muteButton.textContent =
            "🔊";

        muteButton.setAttribute(
            "aria-label",
            "Desativar som"
        );

    }

}


/* =====================================================
   REPRODUZIR RÁDIO
===================================================== */

let reconnectTimer = null;


async function playRadio() {

    if (!audio) {
        return;
    }


    setPlayerMessage(
        "Conectando à transmissão..."
    );


    audio.src =
        RADIO_STREAM;


    try {

        await audio.play();


        if (player) {

            player.classList.add(
                "playing"
            );

        }


        updatePlayButton(true);


        setPlayerMessage(
            "Transmissão ao vivo conectada."
        );


        musicTitle.textContent =
            "JRV Rádio Web";


        musicArtist.textContent =
            "Forró, música e alegria";


    } catch (error) {

        console.error(
            "Erro ao iniciar a rádio:",
            error
        );


        if (player) {

            player.classList.remove(
                "playing"
            );

        }


        updatePlayButton(false);


        setPlayerMessage(
            "Não foi possível iniciar o áudio. Toque novamente."
        );


        showToast(
            "Não foi possível iniciar a transmissão."
        );

    }

}


/* =====================================================
   PAUSAR RÁDIO
===================================================== */

function pauseRadio() {

    if (!audio) {
        return;
    }


    audio.pause();


    if (player) {

        player.classList.remove(
            "playing"
        );

    }


    updatePlayButton(false);


    setPlayerMessage(
        "Transmissão pausada. Clique em ▶ para ouvir."
    );

}


/* =====================================================
   PLAY / PAUSE
===================================================== */

if (playButton) {

    playButton.addEventListener(
        "click",
        async () => {

            if (!audio) {
                return;
            }


            if (audio.paused) {

                await playRadio();

            } else {

                pauseRadio();

            }

        }
    );

}


/* =====================================================
   MUTE
===================================================== */

if (muteButton) {

    muteButton.addEventListener(
        "click",
        () => {

            if (!audio) {
                return;
            }


            audio.muted =
                !audio.muted;


            updateMuteButton();


            if (audio.muted) {

                showToast(
                    "Som desativado."
                );

            } else {

                showToast(
                    "Som ativado."
                );

            }

        }
    );

}


/* =====================================================
   VOLUME
===================================================== */

if (volumeControl) {

    volumeControl.addEventListener(
        "input",
        () => {

            if (!audio) {
                return;
            }


            const volume =
                Number(
                    volumeControl.value
                );


            audio.volume =
                volume;


            if (volume > 0) {

                audio.muted =
                    false;

            }


            updateMuteButton();

        }
    );

}


/* =====================================================
   EVENTO: PLAY
===================================================== */

if (audio) {

    audio.addEventListener(
        "play",
        () => {

            if (player) {

                player.classList.add(
                    "playing"
                );

            }


            updatePlayButton(true);


            setPlayerMessage(
                "JRV Rádio Web está no ar."
            );

        }
    );


/* =====================================================
   EVENTO: PAUSE
===================================================== */

    audio.addEventListener(
        "pause",
        () => {

            if (player) {

                player.classList.remove(
                    "playing"
                );

            }


            updatePlayButton(false);

        }
    );


/* =====================================================
   EVENTO: CARREGANDO
===================================================== */

    audio.addEventListener(
        "loadstart",
        () => {

            setPlayerMessage(
                "Conectando à JRV Rádio Web..."
            );

        }
    );


/* =====================================================
   EVENTO: ESPERANDO DADOS
===================================================== */

    audio.addEventListener(
        "waiting",
        () => {

            setPlayerMessage(
                "Carregando transmissão..."
            );

        }
    );


/* =====================================================
   EVENTO: TOCANDO
===================================================== */

    audio.addEventListener(
        "playing",
        () => {

            if (player) {

                player.classList.add(
                    "playing"
                );

            }


            updatePlayButton(true);


            setPlayerMessage(
                "🔴 AO VIVO • JRV Rádio Web"
            );

        }
    );


/* =====================================================
   EVENTO: ERRO
===================================================== */

    audio.addEventListener(
        "error",
        () => {

            console.error(
                "Erro no streaming da JRV.",
                audio.error
            );


            if (player) {

                player.classList.remove(
                    "playing"
                );

            }


            updatePlayButton(false);


            setPlayerMessage(
                "Falha na transmissão. Tentando reconectar..."
            );


            scheduleReconnect();

        }
    );


/* =====================================================
   EVENTO: FINALIZOU
===================================================== */

    audio.addEventListener(
        "ended",
        () => {

            if (player) {

                player.classList.remove(
                    "playing"
                );

            }


            updatePlayButton(false);


            setPlayerMessage(
                "A transmissão foi encerrada. Tentando reconectar..."
            );


            scheduleReconnect();

        }
    );

}


/* =====================================================
   RECONEXÃO
===================================================== */

function scheduleReconnect() {

    if (reconnectTimer) {
        return;
    }


    reconnectTimer =
        setTimeout(
            async () => {

                reconnectTimer =
                    null;


                if (
                    audio &&
                    !audio.paused
                ) {

                    await reconnectRadio();

                }

            },
            RECONNECT_TIME
        );

}


/* =====================================================
   RECONEXÃO DA RÁDIO
===================================================== */

async function reconnectRadio() {

    if (!audio) {
        return;
    }


    try {

        setPlayerMessage(
            "Reconectando à transmissão..."
        );


        audio.pause();


        audio.src =
            RADIO_STREAM;


        audio.load();


        await audio.play();


        if (player) {

            player.classList.add(
                "playing"
            );

        }


        updatePlayButton(true);


        setPlayerMessage(
            "🔴 AO VIVO • JRV Rádio Web"
        );


    } catch (error) {

        console.error(
            "Reconexão falhou:",
            error
        );


        if (player) {

            player.classList.remove(
                "playing"
            );

        }


        updatePlayButton(false);


        setPlayerMessage(
            "Não foi possível reconectar."
        );

    }

}


/* =====================================================
   COMPARTILHAMENTO
===================================================== */

if (shareButton) {

    shareButton.addEventListener(
        "click",
        async () => {

            const shareData = {

                title:
                    "JRV Rádio Web",

                text:
                    "Ouça a JRV Rádio Web - Forró, música e alegria!",

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

                } else {

                    await navigator.clipboard.writeText(
                        window.location.href
                    );


                    showToast(
                        "Link da rádio copiado!"
                    );

                }

            } catch (error) {

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

if (
    menuButton &&
    menu
) {

    menuButton.addEventListener(
        "click",
        () => {

            const opened =
                menu.classList.toggle(
                    "open"
                );


            menuButton.setAttribute(
                "aria-expanded",
                opened
            );

        }
    );


    const menuLinks =
        menu.querySelectorAll("a");


    menuLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove(
                        "open"
                    );


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}


/* =====================================================
   ATUALIZAÇÃO DO NOME DA MÚSICA
===================================================== */

/*
   Neste momento mostramos o nome da rádio.

   O stream da Zeno.fm pode fornecer metadados
   da música separadamente do áudio.

   Quando tivermos o endpoint de metadados da
   sua estação, esta função poderá atualizar:

   - Nome da música
   - Artista
   - Capa
*/


function updateNowPlaying(
    title,
    artist
) {

    if (musicTitle) {

        musicTitle.textContent =
            title || "JRV Rádio Web";

    }


    if (musicArtist) {

        musicArtist.textContent =
            artist || "Forró, música e alegria";

    }

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

updatePlayButton(false);

updateMuteButton();

updateNowPlaying(
    "JRV Rádio Web",
    "Forró, música e alegria"
);


/* =====================================================
   PREVENIR ERROS DE PROMISE
===================================================== */

window.addEventListener(
    "unhandledrejection",
    event => {

        console.warn(
            "JRV Rádio Web:",
            event.reason
        );

    }
);


/* =====================================================
   FINAL
===================================================== */

console.log(
    "🎙️ JRV Rádio Web carregada com sucesso!"
);

console.log(
    "📡 Stream:",
    RADIO_STREAM
);
