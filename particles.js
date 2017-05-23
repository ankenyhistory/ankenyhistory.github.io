Particles = [];
var pi = Math.PI;
var colors = ['#0088cc', '#c0de22', '#F0A626', '#26F08B', '#F0263A', '#8D49F2', '#49BFF2', '#8AF249'];
var blood = ["#BF0A0A", "#E62C2C", "#F55858"];
var explosion = ["#E88707", "#D93D1A", "#242424"];
var nuclear = ["#A7F558", "#E88707", "#D93D1A", "#242424", "#F55859", "#00CCFF"]
function pop(x, y, radius=15, speed=4, shades=colors, durationFactor=0.9){
  var particles = 16;
  var dir = ['N', 'NnE', 'NE', 'NeE', 'E', 'SeE', 'SE', 'SsE', 'S', 'SsW', 'SW', 'SwW', 'W', 'NwW', 'NW', 'NnW'];

  for(var i = 0; i < particles; i++){
    rc = shades[Math.round(Math.random()*(shades.length-1))];
    current_dir = dir[i];
    var x_pos = x;
    var y_pos = y;
    var rad = radius;
    var sp = speed;
    Particles.push({
      x: x_pos,
      y: y_pos,
      radius: rad,
      dir: current_dir,
      color: rc,
      speed: sp,
      go: true,
      health: 1,
      opacity: 1,
      fadeColors: false,
      df: durationFactor,

      fade: function(){
        this.opacity -= 0.025;
        this.fadeColors = true;
      },

      update: function(){
        if(this.opacity <= 0){
          this.health = 0;
        }

        if(this.go){
          this.speed *= this.df;
          if(this.speed <= 0.5){
            this.fade();
          }
          //console.log(this.x, this.y)
          switch(this.dir){
            case "N":
              this.y -= this.speed;
              break;
            case "E":
              this.x += this.speed;
              break;
            case "S":
              this.y += this.speed;
              break;
            case "W":
              this.x -= this.speed;
              break;

            case "NW":
              this.y -= this.speed*0.75;
              this.x -= this.speed*0.75;
              break;
            case "SE":
              this.y += this.speed*0.75;
              this.x += this.speed*0.75;
              break;
            case "SW":
              this.y += this.speed*0.75;
              this.x -= this.speed*0.75;
              break;
            case "NE":
              this.y -= this.speed*0.75;
              this.x += this.speed*0.75;
              break;



            case "NnE":
              this.y -= this.speed*1;
              this.x += this.speed*0.375;
              break;
            case "NeE":
              this.y -= this.speed*0.375;
              this.x += this.speed*1;
              break;
            case "SeE":
              this.y += this.speed*0.375;
              this.x += this.speed*1;
              break;
            case "SsE":
              this.y += this.speed*1;
              this.x += this.speed*0.375;
              break;

            case "NnW":
              this.y -= this.speed*1;
              this.x -= this.speed*0.375;
              break;
            case "NwW":
              this.y -= this.speed*0.375;
              this.x -= this.speed*1;
              break;
            case "SsW":
              this.y += this.speed*1;
              this.x -= this.speed*0.375;
              break;
            case "SwW":
              this.y += this.speed*0.375;
              this.x -= this.speed*1;
              break;
            default:
              throw new Error("Direction is Not Assigned to Particle: " + this.dir);
          }
        }
      },
      draw: function(){
        if(!((this.x-this.radius) < 0 || (this.x+this.radius) > WIDTH || (this.y-this.radius) < 0 || (this.y+this.radius) > HEIGHT)){
          ctx.beginPath();
          ctx.arc((this.x), (this.y), this.radius, 0, 2 * pi);
          if(this.fadeColors){
            var fc;
            switch (this.color) {
              case "#BF0A0A":
                fc = "rgba(191, 10, 10, " + this.opacity + ")";
                break;
              case "#E62C2C":
                fc = "rgba(230, 44, 44, " + this.opacity + ")";
                break;
              case "#F55858":
                fc = "rgba(245, 88, 88, " + this.opacity + ")";
                break;

              case "#E88707":
                fc = "rgba(232, 135, 7, " + this.opacity + ")";
                break;
              case "#D93D1A":
                fc = "rgba(217, 61, 26, " + this.opacity + ")";
                break;
              case "#242424":
                fc = "rgba(36, 36, 36, " + this.opacity + ")";
                break;

              case "#A7F558":
                fc = "rgba(167, 245, 88, " + this.opacity + ")";
                break;
              case "#F55859":
                fc = "rgba(245, 88, 88, " + this.opacity + ")";
                break;
              case "#00CCFF":
                fc = "rgba(0, 204, 255, " + this.opacity + ")";
                break;



              default:
                fc = this.color;
            }
            ctx.fillStyle = fc;
          } else {ctx.fillStyle = this.color;}
          ctx.fill();
        } else {
          this.go = false
        }
      }
    })
  }
}
