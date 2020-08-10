module.exports={
    build: {
      src: "src",
      dist: "release",
      temp: ".tmp",
      public: "public",
      paths: {
        styles: "assets/styles/*.scss",
        scripts: "assets/scripts/*.js",
        pages: "*.html",
        images: "assets/images/**",
        fonts: "assets/fonts/**",
      }
    },
    data:{
      menus: [
        {
          name: "Home",
          icon: "aperture",
          link: "index.html",
        },
        {
          name: "About",
          link: "about.html",
        }
      ],
      pkg: require("./package.json"),
      date: new Date(),
    }
  }