async function getTokens(offset) {
    const data = await fetch(`https://api.opensea.io/api/v1/assets?asset_contract_address=0x0ac066d015ca2855bbd2dcbf92f7e4d2d3f6ee92&order_direction=asc&offset=${offset}&limit=16`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const response = await data.json();
    console.log(response);
    display_images(response);
  }
  function display_images(response) {
    response.assets.forEach((asset) => {
      const photo = document.createElement("div");
      photo.classList.add("pixellation-div");
      photo.setAttribute('id', `${asset.token_id}`);
      photo.innerHTML = `<img src=${asset.image_url}>`;
      document.querySelector(".galaxy-wrapper").appendChild(photo);
    });
  }
  function delay() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 1500);
    })
  }
  async function makeRequest(i) {
    console.log(`Getting NFTs with an offset of ${i}`);
    getTokens(i);
    const result = await delay();
    console.log(result);
  }
  async function getAllTokens() {
    for (i = 0; i < 112; i += 16) {
      await makeRequest(i);
    };
  }
  getAllTokens();
