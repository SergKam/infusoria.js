define(function(require) {
    'use strict';
    var Point = require('geometry/Point');
    var Box = require('geometry/Box');
    var Vector = require('geometry/Vector');
    var Leg = require('Leg');

    function Microb(pool)
    {
        this.id = 0;
        this.pool = pool;
        this.dna = 'xfgdsgdsddsfg.,jdghsb gksbcs';
        this.size = Math.random() / 100;
        this.color = 'rgba(' + Math.round(Math.random() * 255) + ',' +
                Math.round(Math.random() * 255) + ',' +
                Math.round(Math.random() * 255) + ',100)';

        this.position = new Point(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5);
        this.vector = new Vector(Math.random() * Math.PI * 2, Math.random() / 200);
        this.legs = [];
        this.initLegs();
        this.updateSize();
    }
    var poolBox = new Box(new Point(-0.7,-0.7), new Point(0.7,0.7));
    
    Microb.prototype = {

        update: function()
        {
            this.move();
        },
        move: function()
        {
            var newPosition = this.position.clone();

            newPosition.addVector(this.vector);
            
            if (!this.getContainerBox(newPosition).isInside(poolBox))
            {
                this.vector.rotate(Math.PI);
                
                this.vector.length = 0.2;
                this.updateSize();
                
                this.move();
                this.vector.length = Math.random() / 200;
                
                return;
            }
           // this.vector.rotate((Math.random() - 0.5) / 10);

            this.position = newPosition;

        },
        collisionTest: function(target)
        {
            var distance = this.position.getDistace(target.position);

            if (distance < target.size + this.size)
            {
                if (target.size > 0.03 && this.size > 0.03)
                {
                    this.born(target);
                    return;
                }

                if (target.size < this.size)
                {
                    this.eat(target);
                }
                else
                {
                    target.eat(this);
                }

            }
        },
        eat: function(target)
        {
            var s = Math.PI * target.size * target.size + Math.PI * this.size * this.size;
            this.size = Math.sqrt(s / Math.PI);
            target.die();
        },
        born: function(target)
        {
            var self = this;
            if (this.isPregnant)
            {
                return;
            }

            this.isPregnant = true;
            var child = new Microb(this.pool);

            child.position = this.position.clone();

            child.color = this.color;
            setTimeout(function()
            {
                self.pool.add(child);
                self.isPregnant = false;
            }, 1000);

        },
                
        die: function()
        {
            this.pool.remove(this);
        },
        updateSize: function()
        {
             var box = new Box();
             var angle = this.vector.angle;
             for(var i=0; i < this.legs.length; i+=1)
             {
                 var legVector = this.legs[i].vector;
                 var endPoint = new Point(0,0);
                 endPoint.addVector(legVector.clone().rotate(angle));
                 box.extend(endPoint);
                                
             }
             this.box = box;
        },
        initLegs: function()
        {
            var legsCount = Math.round(Math.random() * 20);

            for (var i = 0; i < legsCount; i++)
            {
                var leg = new Leg();
                leg.vector = new Vector(Math.random() * Math.PI * 2, Math.random() / 10);
                leg.type = Math.round(Math.random() * 5);

                this.legs.push(leg);
            }
        },
        getContainerBox: function(position)
        {
            return this.box.clone().moveTo(position || this.position);
        }

    };

    return Microb;
});