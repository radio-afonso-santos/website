/*
 * Script para obtenção de dados
 * apartir da API da Rádio Afonso Santos
 *
 * Website para a Rádio Afonso Santos
 * https://github.com/radio-afonso-santos/website
 *
 * Uma rádio criada com ajuda do software Open Source AzuraCast
 * https://azuracast.com
 * https://github.com/AzuraCast/AzuraCast
 *
 * Afonso Santos
 * http://afonsosantos.x10.mx
 * https://github.com/afonsosantos
 *
 * Criado em 07/2019
 *
 * Licença: MIT
 */

$(document).ready(function() {
  /*
   *  Variáveis Globais
   */

  const sub = new NchanSubscriber(
    'https://painel.radio-afonsosantos.tk/api/live/nowplaying/radioafonsosantos'
  );
  var resposta;

  /*
   *  Elementos da DOM
   */

  // A Tocar
  const artista = document.getElementById('artista');
  const musica = document.getElementById('musica');
  const imagem = document.getElementById('imagem');
  const status = document.getElementById('status');
  const dj = document.getElementById('dj');
  const ouvintes = document.getElementById('ouvintes');

  // Vai Tocar
  const vai_tocar_1 = document.getElementById('vai-tocar-1');
  const vai_tocar_2 = document.getElementById('vai-tocar-2');
  const imagem_seguinte = document.getElementById('imagem-seguinte');
  const musica_seguinte = document.getElementById('musica-seguinte');
  const artista_seguinte = document.getElementById('artista-seguinte');

  // Obtém os dados apartir da Websocket
  sub.on('message', function(message) {
    resposta = JSON.parse(message);
    // Verifica se algum DJ está a transmitir
    if (resposta.live.is_live == true) {
      // DJ Online
      $(status).text('DJ ao Vivo');
      // Mostra o nome do DJ
      $(dj).show();
      $(dj).text(resposta.live.streamer_name);
      // Oculta os elementos do Vai Tocar, para prevenir informação errada
      $(vai_tocar_1).hide();
      $(vai_tocar_2).hide();
    } else {
      // Transmissão Normal
      // Esconde o nome do DJ, depois de terminar a transmissão
      $(dj).hide();
      $(status).text('A Tocar');
      // Mostra os elementos do Vai Tocar
      $(vai_tocar_1).show();
      $(vai_tocar_2).show();
    }

    // Verifica se é "ouvinte" ou "ouvintes"
    if (resposta.listeners.current > 1) {
      $(ouvintes).text(resposta.listeners.unique + ' ouvintes');
    } else if (resposta.listeners.current == 1) {
      $(ouvintes).text(resposta.listeners.unique + ' ouvinte');
    } else if (resposta.listeners.unique == 0) {
      $(ouvintes).text('Nenhum Ouvinte');
    }

    // Atualiza sempre estes dados abaixo

    // A Tocar
    $(imagem).attr('src', resposta.now_playing.song.art);
    $(artista).text(resposta.now_playing.song.artist);
    $(musica).text(resposta.now_playing.song.title);

    // Vai Tocar
    $(imagem_seguinte).attr('src', resposta.playing_next.song.art);
    $(artista_seguinte).text(resposta.playing_next.song.artist);
    $(musica_seguinte).text(resposta.playing_next.song.title);
  });

  // Inicia o nchan
  sub.start();

  // Adiciona a classe 'active' ao horário respetivo
  // de acordo com a playlist que está a tocar

  /*
   *  Playlists
   */
  const playlist_variada = document.getElementById('playlist-variada');
  const playlist_synthwave = document.getElementById('playlist-synthwave');

  /*
   *  Hora
   */
  var now = new Date(Date.now());
  var hora = now.getHours() + ':' + now.getMinutes();
  console.log(hora);

  // Verifica a hora atual e adiciona a classe 'active'
  // à playlist correta
  if (hora >= '23:00' && hora <= '4:00') {
    $(playlist_variada).removeClass('active');
    $(playlist_synthwave).addClass('active');
  } else if (hora >= '4:00' && hora < '23:00') {
    $(playlist_synthwave).removeClass('active');
    $(playlist_variada).addClass('active');
  }
});
