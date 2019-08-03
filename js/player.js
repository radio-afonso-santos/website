/*
 * Script para manipulação do reprodutor
 * da transmissão da Rádio Afonso Santos
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
 * Licença: Apache-2.0
 */

$(document).ready(function() {
  /*
   *  Variáveis Globais
   */

  const url =
    'https://painel.radio-afonsosantos.tk/radio/8000/radio.mp3?1562112982';

  /*
   *  Elementos da DOM
   */

  const reprodutor = document.getElementById('reprodutor');
  const icone = document.getElementById('icone');
  var status = 'off';

  /*
   * Tarefas inciais
   * Origem do áudio, volume e ícone padrão
   */

  // Define a origem do áudio
  reprodutor.src = url;

  // Volume do reprodutor
  // (este será o valor padrão enquanto não for implementada
  // uma maneira de definir o volume manualmente)
  reprodutor.volume = 0.5;

  // Ícone padrão
  $(icone).addClass('fa-play');

  /*
   * Funções para manipulação da reprodução
   * reproduzir e parar
   */

  // Reproduzir e Parar
  $(icone).click(function play_pause() {
    if (status === 'off') {
      // Reproduzir
      $(icone).removeClass('fa-play');
      reprodutor.play();
      status = 'on';
      $(icone).addClass('fa-pause');
      // console.log('Play');
    } else if (status === 'on') {
      // Parar
      $(icone).removeClass('fa-pause');
      reprodutor.pause();
      reprodutor.src = reprodutor.src;
      status = 'off';
      $(icone).addClass('fa-play');
      // console.log('Pause');
    }
  });

  $(document).keydown(function(e) {
    if (e === 13) {
      console.log('enter');
    } else {
    }
  });
});
