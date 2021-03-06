module.exports={
    build: {
      src: "src",
      dist: "dist",
      temp: "temp",
      public: "public",
      paths: {
        styles: "assets/styles/*.scss",
        scripts: "assets/scripts/*.js",
        pages: "*.html",
        images: "assets/images/**",
        fonts: "assets/fonts/**",
        dist:'dist/**/*'
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