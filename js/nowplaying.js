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
  // Variáveis globais
  var url = 'https://painel.radio-afonsosantos.tk/api/nowplaying/1';
  // 5000 = 5 segundos
  var tempo = 5000;

  // Elementos da DOM

  // A Tocar
  var artista = document.getElementById('artista');
  var musica = document.getElementById('musica');
  var imagem = document.getElementById('imagem');
  var status = document.getElementById('status');
  var dj = document.getElementById('dj');
  var ouvintes = document.getElementById('ouvintes');

  // Vai Tocar
  var imagem_seguinte = document.getElementById('imagem-seguinte');
  var musica_seguinte = document.getElementById('musica-seguinte');
  var artista_seguinte = document.getElementById('artista-seguinte');

  // Executa a cada 5 segundos
  setInterval(function() {
    $.get(url).done(function(resposta) {
      // Verifica se algum DJ está a transmitir
      if (resposta.live.is_live == true) {
        // DJ Online
        $(status).text('DJ ao Vivo');
        $(dj).text(resposta.live.streamer_name);
      } else {
        // Transmissão Normal
        $(status).text('A Tocar');
      }

      // Verifica se é "ouvinte" ou "ouvintes"
      if (resposta.listeners.current > 1) {
        $(ouvintes).text(resposta.listeners.unique + ' ouvintes');
      } else if (resposta.listeners.current == 1) {
        $(ouvintes).text(resposta.listeners.unique + ' ouvinte');
      } else if (resposta.listeners.unique == 0) {
        $(ouvintes).text('Nenhum ouvinte');
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
  }, tempo);
});
