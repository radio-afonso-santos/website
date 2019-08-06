/*
 * Script para obtenção de dados
 * a partir da API da Rádio Afonso Santos
 *
 * Website para a Rádio Afonso Santos
 * https://github.com/radio-afonso-santos/website
 *
 * Uma rádio criada com ajuda do software Open Source AzuraCast
 * https://azuracast.com
 * https://github.com/AzuraCast/AzuraCast
 *
 * Afonso Santos
 * http://afonsosantos-dev.tk
 * https://github.com/afonsosantos
 *
 * Criado em 07/2019
 *
 * Licença: Apache-2.0
 */

$(document).ready(function() {
  /*
   *  Variáveis Globais
   */

  const sub = new NchanSubscriber('https://painel.radio-afonsosantos.tk/api/live/nowplaying/radioafonsosantos');
  var resposta;

  /*
   *  Elementos da DOM
   */

  // A Tocar
  const artista = document.getElementById('artista');
  const musica = document.getElementById('musica');
  const imagem = document.getElementById('imagem');
  const status = document.getElementById('status');
  const ouvintes = document.getElementById('ouvintes');

  // Vai Tocar
  const imagem_seguinte = document.getElementById('imagem-seguinte');
  const musica_seguinte = document.getElementById('musica-seguinte');
  const artista_seguinte = document.getElementById('artista-seguinte');

  // Obtém os dados apartir da Websocket
  sub.on('message', function(message) {
    // Resposta da API
    resposta = JSON.parse(message);

    /*
     *  Atualiza sempre estes dados abaixo
     */

    // A Tocar
    $(imagem).attr('src', resposta.now_playing.song.art);
    $(artista).text(resposta.now_playing.song.artist);
    $(musica).text(resposta.now_playing.song.title);

    // Vai Tocar
    $(imagem_seguinte).attr('src', resposta.playing_next.song.art);
    $(artista_seguinte).text(resposta.playing_next.song.artist);
    $(musica_seguinte).text(resposta.playing_next.song.title);

    /*
     *  Funcionalidades condicionadas pela resposta
     *  da API da rádio
     */

    // Verifica se algum DJ está a transmitir
    if (resposta.live.is_live == true) {
      // DJ Online
      $(status).text('DJ ao Vivo');
      // Mostra o nome do DJ
      $(status).addClass('badge-danger');
      $(status).text(resposta.live.streamer_name);
    } else {
      // Transmissão Normal
      // Esconde o nome do DJ, depois de terminar a transmissão
      $(status).addClass('badge-primary');
      $(status).text('A Tocar');
    }

    // Verifica se é 'ouvinte' ou 'ouvintes'
    if (resposta.listeners.current > 1) {
      $(ouvintes).text(resposta.listeners.unique + ' ouvintes');
    } else if (resposta.listeners.current == 1) {
      $(ouvintes).text(resposta.listeners.unique + ' ouvinte');
    } else if (resposta.listeners.unique == 0) {
      $(ouvintes).text('Nenhum Ouvinte');
    }

    /*
     *  Adiciona a classe 'active' ao horário respetivo
     *  de acordo com o nome da a sua playlist
     */

    // Playlists
    const playlist_variada = document.getElementById('playlist-variada');
    const playlist_synthwave = document.getElementById('playlist-synthwave');
    var playlist_atual = resposta.now_playing.playlist;

    // Verifica a o nome da playlist e seleciona o elemento correto
    if (playlist_atual == 'Músicas - Variadas') {
      $(playlist_synthwave).removeClass('active');
      $(playlist_variada).addClass('active');
    } else if (playlist_atual == 'Músicas - Synthwave') {
      $(playlist_variada).removeClass('active');
      $(playlist_synthwave).addClass('active');
    }
  });

  // Inicia o nchan
  sub.start();
});
