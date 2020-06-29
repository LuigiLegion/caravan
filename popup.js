// Initializations
// Update DOM with requested data
function setDOMData(data) {
  if (data) {
    document.getElementById('source').href = data.url;

    for (let key in data) {
      if (data.hasOwnProperty(key) && key !== 'url') {
        const divs = document.getElementById(key).children;
        divs[1].textContent = data[key].price;

        if (key !== 'average' && data[key].price[0] === '$') {
          divs[2].textContent = data[key].date;
        }
      }
    }
  } else {
    const parent = document.getElementById('container');
    parent.innerHTML = '';

    const messages = [
      'Hello there!',
      'Please visit a product page on Amazon.com to utilize me.',
      'If you are currently viewing a product on Amazon.com, it has no price history on camelcamelcamel.com',
    ];
    messages.forEach(function(message) {
      const child = document.createElement('div');
      child.className = 'containee';
      child.textContent = message;

      parent.appendChild(child);
    });
  }
}

// Listeners
// Listen for DOM content load completion
window.addEventListener('DOMContentLoaded', function() {
  // Query for active tab
  browser.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function(tabs) {
      // Send request for DOM data
      browser.tabs.sendMessage(
        tabs[0].id,
        {
          from: 'popup',
          subject: 'DOMData',
        },
        // Specify callback to be invoked from receiving end (content script)
        setDOMData
      );
    }
  );
});
