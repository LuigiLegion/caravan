// Initializations
const productId = window.location.pathname.split('/dp/')[1].split('/')[0];
let prices = null;

if (productId) {
  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    try {
      prices = Array.from(
        this.responseXML.getElementsByClassName('product_pane')[0].children[1]
          .children
      ).reduce(
        function(acc, tr) {
          const tds = tr.children;
          const type = tds[0].innerText.split(' ')[0].toLowerCase();

          acc[type] = {
            price: tds[1].innerText,
            date: tds[2].innerText,
          };

          return acc;
        },
        { url: 'https://camelcamelcamel.com/product/' + productId }
      );
    } catch (error) {
      console.error(error);
    }
  };

  xhr.onerror = function() {
    console.error('Error!');
  };

  xhr.open('GET', 'https://camelcamelcamel.com/product/' + productId, true);

  xhr.responseType = 'document';
  xhr.send();
}

// Notify background script that active tab should have page action
browser.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
});

// Listeners
// Listen for messages from popup script
browser.runtime.onMessage.addListener(function(message, _, response) {
  // Validate message structure
  if (message.from === 'popup' && message.subject === 'DOMData') {
    // Respond to popup script with necessary data using specified callback
    response(prices);
  }
});
