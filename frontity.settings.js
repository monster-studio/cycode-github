const settings = {
  "name": "cycode-github",
  "state": {
    "frontity": {
      "url": "https://cycode-github.ussl.co.il",
      "title": "Cycode-Github",
      "description": "Github organization repositories and contributors."
    }
  },
  "packages": [
    {
      "name": "@frontity/mars-theme",
      "state": {
        "theme": {
          "menu": [
            [
              "Home",
              "/"
            ],
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://cycode-github.ussl.co.il"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
