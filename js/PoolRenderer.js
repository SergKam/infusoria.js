define(function(require) {
    'use strict';
    var Point = require('point');
    var Leg = require('Leg');
    var Vector = require('Vector');
    
    function PoolRenderer(canvas)
    {
        this.canvas = canvas;
    }

    PoolRenderer.prototype = {
        width: 500,
        height: 500,
        ratio: 250, //1=250px,

        poolToCanvas: function(point)
        {
            return new Point((point.x + 1) * this.ratio,
                    (point.y + 1) * this.ratio);

        },
        render: function(pool)
        {
            this.canvas.clearRect(0, 0, this.width, this.height);

            for (var id in pool.microbs)
            {
                this.renderMicrob(pool.microbs[id]);
            }
        },
        renderMicrob: function(microb)
        {

            //ctx.strokeStyle = this.color;
            var center = this.poolToCanvas(microb.position);
            var radius = microb.size * this.ratio;

            this.canvas.fillStyle = microb.color//this.color;
            this.canvas.beginPath();
            this.canvas.arc(center.x, center.y, radius, 0, Vector.TWO_PI);
            this.canvas.fill();
            this.renderLegs(center, microb);

        },
        renderLegs: function(center, microb)
        {
            for (var i = 0, len = microb.legs.length; i < len; i++)
            {

                var leg = microb.legs[i];

                var legVector = leg.vector.clone().rotate(microb.vector.angle);
                var legEnd = microb.position.clone().addVector(legVector);

                var legEndPos = this.poolToCanvas(legEnd);
                this.canvas.beginPath();
                this.canvas.strokeStyle = PoolRenderer.legTypeToColor[leg.type];
                this.canvas.moveTo(center.x, center.y);
                this.canvas.lineTo(legEndPos.x, legEndPos.y);
                this.canvas.stroke();

            }
        }

    }
    PoolRenderer.legTypeToColor = {};
    PoolRenderer.legTypeToColor[Leg.NONE] = 'black';
    PoolRenderer.legTypeToColor[Leg.FIGHT] = 'red';
    PoolRenderer.legTypeToColor[Leg.CONNECT] = 'green';
    PoolRenderer.legTypeToColor[Leg.MOVE] = 'blue';
    PoolRenderer.legTypeToColor[Leg.TOUCH] = 'yellow';
    PoolRenderer.legTypeToColor[Leg.SEX] = 'magenta';

    return PoolRenderer;

});