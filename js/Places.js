define(function(require){
    'use strict';
    var Point = require('geometry/Point');
    var Box = require('geometry/Box');
    
    function Places()
    {
        this.places = [];
        this.init();
    }
    
    Places.prototype = {
        init: function()
        {
            for (var y = 0; y < 20; y++)
            {
                var row = [];
                this.places.push(row);//add row
                for (var x = 0; x < 20; x++)
                {
                    row.push({});//add cell
                }
            }
        },
        getBox: function(box)
        {
            var result = {};
            this.eachInBox(box, function(place, x,y){
                for(var id in place)
                {
                    result[id] = true;
                }
            });
        
            return Object.keys(result);
        },
        setBox: function(box, id)
        {   
            this.eachInBox(box, function(place){
                place[id] = true;
            });           
        },
        removeBox : function(box, id)
        {
            this.eachInBox(box, function(place){
                delete place[id];
            });
        },
        poolToPlaces: function(box)
        {
            if(box.leftTop.x<=-1|| box.leftTop.x>=1||
               box.leftTop.y<=-1|| box.leftTop.y>=1||
               box.rightBottom.x<=-1|| box.rightBottom.x>=1||
               box.rightBottom.y<=-1|| box.rightBottom.y>=1
                ){
                    throw new Error('Bounds error');
                }
            return new Box(
                    new Point(
                        Math.round( box.leftTop.x*10) + 10,
                        Math.round( box.leftTop.y*10) + 10
                    ),
                    new Point(
                        Math.round( box.rightBottom.x*10) + 10,
                        Math.round( box.rightBottom.y*10) + 10
                    )    
                    
            );
            
            
             
        },
        eachInBox: function(box, func)
        {
            var placeBox = this.poolToPlaces(box);
            for(var y = placeBox.leftTop.y; y < placeBox.rightBottom.y; y++)
            {
                for(var x = placeBox.leftTop.x; x < placeBox.rightBottom.x; x++)
                {
                    func.apply(this, [this.places[x][y], x, y]);
                }
            }
        }
    };
    
    return Places;
});
