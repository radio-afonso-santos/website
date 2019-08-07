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
  let resposta;

  /*
   *  Elementos da DOM
   */

  // A Tocar
  const artista = document.getElementById('artista');
  const musica = document.getElementById('musica');
  const imagem = document.getElementById('imagem');
  const status = document.getElementById('status');
  const nome_dj = document.getElementById('nome-dj');
  const ouvintes = document.getElementById('ouvintes');

  // Vai Tocar
  const coluna_seguinte = document.getElementById('coluna-seguinte');
  const imagem_seguinte = document.getElementById('imagem-seguinte');
  const musica_seguinte = document.getElementById('musica-seguinte');
  const artista_seguinte = document.getElementById('artista-seguinte');

  // Playlists
  const playlist_variada = document.getElementById('playlist-variada');
  const playlist_synthwave = document.getElementById('playlist-synthwave');

  // Outros
  const lista_playlists = document.getElementById('lista-playlists');
  const mensagem_dj = document.getElementById('mensagem-dj');

  // Obtém os dados a partir da API (através do nChan)
  sub.on('message', function(message) {
    // Transforma a resposta da API num formato JSON padrão
    resposta = JSON.parse(message);

    /*
     *  Atualiza sempre estes dados abaixo
     */

    // A Tocar
    $(imagem).attr('src', resposta.now_playing.song.art);
    $(imagem_link).attr('href', resposta.now_playing.song.art);
    $(artista).text(resposta.now_playing.song.artist);
    $(musica).text(resposta.now_playing.song.title);

    // Vai Tocar
    $(imagem_seguinte).attr('src', resposta.playing_next.song.art);
    $(imagem_seguinte_link).attr('href', resposta.playing_next.song.art);
    $(artista_seguinte).text(resposta.playing_next.song.artist);
    $(musica_seguinte).text(resposta.playing_next.song.title);

    /*
     *  Funcionalidades condicionadas pela resposta
     *  da API da rádio
     */

    // Verifica se algum DJ está a transmitir
    if (resposta.live.is_live == true) {
      /*
       *  DJ Online
       */

      // Altera o status para 'DJ ao Vivo'
      $(status).text('DJ ao Vivo');

      // Altera a cor da badge
      $(status).removeClass('badge-primary');
      $(status).addClass('badge-danger');

      // Mostra e preenche o nome do DJ
      $(nome_dj).show();
      $(nome_dj).text(resposta.live.streamer_name);

      // Esconde a coluna da música seguinte
      $(coluna_seguinte).hide();

      // Esconde a lista de playlists e mostra a mensagem das playlists
      $(lista_playlists).hide();
      $(mensagem_dj).show();
    } else {
      /*
       *  Transmissão Normal (aka Auto DJ)
       */

      // Altera a cor da badge
      $(status).removeClass('badge-danger');
      $(status).addClass('badge-primary');

      // Mostra o texto 'A Tocar'
      $(status).text('A Tocar');

      // Esconde o nome do DJ
      $(nome_dj).hide();

      // Volta a mostrar a coluna da música seguinte
      $(coluna_seguinte).show();

      // Mostra a lista de playlists e esconde a mensagem
      $(lista_playlists).show();
      $(mensagem_dj).hide();
    }

    /*
     *  Verifica o número de ouvintes e atualiza
     *  o texto de acordo
     */
    if (resposta.listeners.current > 1) {
      // Caso sejam mais que 1 ouvinte
      $(ouvintes).text(resposta.listeners.unique + ' ouvintes');
    } else if (resposta.listeners.current == 1) {
      // Caso seja apenas 1 ouvinte
      $(ouvintes).text(resposta.listeners.unique + ' ouvinte');
    } else if (resposta.listeners.unique == 0) {
      // Caso não haja ouvintes
      $(ouvintes).text('Nenhum Ouvinte');
    }

    /*
     *  Adiciona a classe 'active' ao horário respetivo
     *  de acordo com o nome da a sua playlist
     */

    let playlist_atual = resposta.now_playing.playlist;

    // Verifica a o nome da playlist e seleciona o elemento correto
    if (playlist_atual == 'Músicas - Variadas') {
      $(playlist_synthwave).removeClass('active');
      $(playlist_variada).addClass('active');
    } else if (playlist_atual == 'Músicas - Synthwave') {
      $(playlist_variada).removeClass('active');
      $(playlist_synthwave).addClass('active');
    }
  });

  // Inicia o nchan para obter dados da API
  sub.start();
});
