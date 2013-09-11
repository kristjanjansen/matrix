var fs = require('fs')

var fs = require('fs'),
    PNG = require('pngjs').PNG;

function readPng(file, callback) {

fs.createReadStream(file)
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
        sprite = []
        for (var y = 0; y < this.height; y++) {
            row = []
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;
                if (this.data[idx] < 255 || this.data[idx+1] < 255 || this.data[idx+2] < 255) {
                  row.push(1)
                } else {
                  row.push(0)
                }
            }
            sprite.push(row)
        
        }

        callback(sprite)
        

    });

}

readPng('test.png', function(sprite) {
  
  var format = ['. ', 'o ']

//  sprites = sprites.map(function(sprite) {
    sprite = sprite.map(function(row) {
      return row.map(function(el) {
        return format[el]
      }).join('')
    }).join('\n')
//  }).join('\n\n')
  
  console.log(sprite)
  
})

