define(function(require){
        
    var Point = require('geometry/Point');
    var Vector = require('geometry/Vector');
    var Box = require('geometry/Box');
    var Microb = require('Microb');
    var     Leg = require('Leg');

    var microb = null;
    var poolMock = {
        add: function(){},
        remove: function(){},
        
    }
        
    module('Microb');
   
    

    asyncTest('Create', function(){
        microb = new Microb(poolMock);
        microb.position = new Point(0,0);
        microb.vector = new Vector(0,0.1);
        var leg = new Leg();
        leg.vector = new Vector(0,0.05);
        microb.legs = [leg];
        microb.updateSize();
        ok(microb.pool, 'Created');
        start();
   });
    
    asyncTest('getContainerBox', function(){
        var microbBox = new Box(new Point(0,0),new Point(0.05,0));
        deepEqual(microbBox, microb.getContainerBox());
        start();
    });

    asyncTest('update', function(){
        var microbBox = new Box(new Point(0.1,0),new Point(0.1+0.05,0));
        microb.update()
        deepEqual(microbBox, microb.getContainerBox());
        start();
    });

});
