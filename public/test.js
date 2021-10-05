//Test file for Administrator
const rolebackColorAdministrator = "red";
const titlePrefixAdministrator = "CUSTOM";

window.addEventListener( 'load', (event) => {
  document.body.style.backgroundColor = rolebackColorAdministrator;

  console.log( "Changed background colour to " + rolebackColorAdministrator );
  document.title = titlePrefixAdministrator + " - " + document.title;
  console.log( "Added " + titlePrefixAdministrator + " to title" );
})
