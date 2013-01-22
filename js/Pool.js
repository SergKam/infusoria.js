define(function(require) {
    'use strict';

    var Microb = require('Microb');
    var Places = require('Places');
    var Box = require('geometry/Box');
    var Point = require('geometry/Point');
    function Pool()
    {
        this.lastId = 0;
        this.microbs = {};
        this.places = new Places();
    }
var poolBox = new Box(new Point(-1,-1), new Point(1,1));
    
    Pool.prototype = {
        init: function(count)
        {
            count = count || 100;

            for (var i = 0; i < count; i++)
            {
                var microb = new Microb(this);

                this.add(microb);
            }
        },
        add: function(microb)
        {
            this.microbs[this.lastId] = microb;
            microb.id = this.lastId;
            this.lastId++;
        },
        remove: function(microb)
        {
            delete this.microbs[microb.id];
        },
        update: function()
        {
            var count = 0;

            for (var id in this.microbs)
            {
                var microb = this.microbs[id];
                this.places.removeBox(microb.getContainerBox(), microb.id);
                microb.update();
                var newContainer = microb.getContainerBox();
                var collisions = this.places.getBox(newContainer);
                if(collisions.length){
                    //colision
               //     console.log(microb.id,'collision with',collisions);
                };
                
                this.places.setBox(newContainer,  microb.id);
                
                count++;
            }

            this.count = count;
        }

    }

    return Pool;
});