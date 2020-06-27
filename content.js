const queryStr = window.location.search;
const urlParams = new URLSearchParams(queryStr);

if (urlParams.has('pd_rd_i')) {
  const searchQuery = urlParams.get('pd_rd_i');
  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    const prices = Array.from(
      Array.from(
        this.responseXML.getElementsByClassName('product_pane')
      )[0].getElementsByTagName('tr')
    ).reduce(
      function(acc, tr, idx) {
        if (idx > 0) {
          const tds = Array.from(tr.getElementsByTagName('td'));
          const type = tds[0].innerText.split(' ')[0];

          acc[type.toLowerCase()] = {
            type,
            price: tds[1].innerText,
            date: tds[2].innerText,
          };
        }

        return acc;
      },
      { url: 'https://camelcamelcamel.com/product/' + searchQuery }
    );

    applyPrices(prices);
  };

  xhr.onerror = function() {
    console.error('Error!');
  };

  xhr.open('GET', 'https://camelcamelcamel.com/product/' + searchQuery, true);

  xhr.responseType = 'document';
  xhr.send();
}

function applyPrices(prices) {
  console.log({ prices });
}
