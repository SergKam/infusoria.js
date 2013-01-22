define(function(require){
        
    var Point = require('geometry/Point');
    var Box = require('geometry/Box');
    var Places = require('Places');
        var places = new Places();
        
        var testBox = new Box(
            new Point(-0.5,-0.2),
            new Point(0.5,0.2)
        );
        
        var emptyBox = new Box(
            new Point(-0.99,-0.2),
            new Point(-0.6,0.2)
        );

        module('Places');
        test('Create', function(){
            ok(places.places,'Created');
            
        });
    
        test('poolToPlaces', function(){
            
            var newBox = places.poolToPlaces(testBox);
            ok(newBox instanceof Box,'poolToPlaces return Box');
            ok(newBox !== testBox,'poolToPlaces return new Box');
            ok(newBox.leftTop.x === 5,'poolToPlaces x1');
            ok(newBox.leftTop.y === 8,'poolToPlaces x1');
            ok(newBox.rightBottom.x === 15,'poolToPlaces x1');
            ok(newBox.rightBottom.y === 12,'poolToPlaces x1');
        });
    
        test('setBox/eachInBox', function(){
            places.setBox(testBox, 5);
        
            expect(40);
            places.eachInBox(testBox, function(place, x ,y){
                    
                    ok(place[5], 'each has key 5 ok x:'+x+' y:'+y)
            });
        
        });
    
        test('getBox', function(){
            ok('5' == places.getBox(testBox)[0], 'get intersect ["5"]');
            ok( undefined === places.getBox(emptyBox)[0],'not get intersect');
        });
        
        test('removeBox', function(){
            places.removeBox(testBox, 5)
            ok(undefined === places.getBox(testBox)[0], ' intersect removed');
        });
        
    });
