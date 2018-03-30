export default () => {
  const signature = `                                                                     
          _ _            _                 _                          
    _ __ (_(_)_   _  ___| |__   ___   __ _| |__    ___ ___  _ __ ___  
   | '_ \\| | | | | |/ _ | '_ \\ / _ \\ / _\` | '_ \\  / __/ _ \\| '_ \` _ \\ 
   | | | | | | |_| |  __| |_) | (_) | (_| | | | || (_| (_) | | | | | |
   |_| |_|_|_|\\__, |\\___|_.__/ \\___/ \\__,_|_| |_(_\\___\\___/|_| |_| |_|
              |___/                                                                                                                                       
  `;
  console.info(signature);
  document.querySelector("html").insertAdjacentHTML(
    "afterbegin",
    `
      <!--
      ${signature}
      -->
    `
  );
};
