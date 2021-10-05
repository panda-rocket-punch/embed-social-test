window.addEventListener( 'load', (event) => {

  document.head.innerHTML += '<link href="https://panda-rocket-punch.github.io/embed-social-test/docs/index.css" rel="stylesheet" />';
  document.head.innerHTML += '<script src="https://panda-rocket-punch.github.io/embed-social-test/index.js" />';

  const iDiv = document.createElement('div');
  iDiv.id = 'noodle-social-chat';
  document.body.appendChild(iDiv);
});
