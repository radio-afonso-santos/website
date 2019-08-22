/*
 * @description Script para manipulação do reprodutor da transmissão da Rádio Afonso Santos
 *
 * Website para a Rádio Afonso Santos
 * https://github.com/radio-afonso-santos/website
 *
 * Uma rádio criada com ajuda do software Open Source AzuraCast
 * https://azuracast.com
 * https://github.com/AzuraCast/AzuraCast
 *
 * @author Afonso Santos
 * http://afonsosantos-dev.tk
 * https://github.com/afonsosantos
 *
 * Criado em 07/2019
 *
 * @license Apache-2.0
 */

$(document).ready(function() {
  /*
   *  Variáveis Globais
   */

  const url = 'https://painel.radio-afonsosantos.tk/radio/8000/64k.aac?1566497775';

  // Controlo do reprodutor através do ícone
  let status = 'off';

  // Controlo do reprodutor através do teclado
  const cod_tecla = 80;
  let pausa = true;

  /*
   *  Elementos da DOM
   */

  const reprodutor = document.getElementById('reprodutor');
  const icone = document.getElementById('icone');

  /*
   * Tarefas inciais
   * Origem do áudio, volume e ícone padrão
   */

  // Define a origem do áudio
  reprodutor.src = url;

  // Volume do reprodutor
  reprodutor.volume = 1; // @todo - implementar atalho de teclado para aumentar/diminuir o volume

  // Ícone da overlay do reprodutor (valor padrão - botão Play)
  $(icone).addClass('fa-play');

  /*
   * Funções para manipulação da reprodução
   * (reproduzir e parar)
   */

  function reproduzir() {
    $(icone).removeClass('fa-play');
    reprodutor.play();
    status = 'on';
    $(icone).addClass('fa-pause');
    pausa = false;
  }

  function parar() {
    $(icone).removeClass('fa-pause');
    reprodutor.pause();
    reprodutor.src = reprodutor.src;
    status = 'off';
    $(icone).addClass('fa-play');
    pausa = true;
  }

  /*
   *  Controlo do reprodutor através do ícone
   */

  $(icone).click(function() {
    if (status === 'off') {
      reproduzir();
    } else if (status === 'on') {
      parar();
    }
  });

  /*
   *  Controlo do reprodutor através do teclado
   */

  document.onkeydown = function(e) {
    if (e.keyCode == cod_tecla) {
      if (pausa == true) {
        reproduzir();
      } else {
        parar();
      }
    }
  };
});
