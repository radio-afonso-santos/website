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
  const reproduzir = document.getElementById('reproduzir');
  const parar = document.getElementById('parar');
  const volume = document.getElementById('volume');

  /*
   * Tarefas inciais
   * Origem do áudio, volume inicial e botão parar desativado
   */

  // Define a origem do áudio
  reprodutor.src = url;

  // Volume inicial
  reprodutor.volume = 0.2;

  // Botão parar desativado
  parar.disabled = true;
  reproduzir.disabled = false;

  /*
   * Funções para manipulação da stream
   * reproduzir, parar e controlo do volume
   */

  // Reproduzir
  reproduzir.addEventListener('click', function() {
    reprodutor.play();
    reproduzir.disabled = true;
    parar.disabled = false;
  });

  // Parar
  parar.addEventListener('click', function() {
    reprodutor.pause();
    reprodutor.src = reprodutor.src;
    reproduzir.disabled = false;
    parar.disabled = true;
  });

  // Controla o volume do reprodutor
  volume.addEventListener('change', function() {
    reprodutor.volume = this.value;
  });
});
