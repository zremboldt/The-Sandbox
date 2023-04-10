var img_url_to_data = function(path, callback){
  var img = document.createElement("img")
  img.src = path
  img.onload = function(e){
    console.log(this.width, this.height)
    var c = document.createElement("canvas")
    c.width = this.width
    c.height = this.height
    var ctx = c.getContext("2d")
    ctx.drawImage(this,0,0)
    callback(ctx.getImageData(0,0,this.width,this.height))
  }
}