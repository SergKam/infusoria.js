define(function(require) {
    'use strict';

    function Vector(angle, length)
    {
        this.angle = angle;
        this.length = length;
    }

    Vector.prototype = {
        rotate: function(angle)
        {
            this.angle = Vector.normalizeAngle(this.angle + angle);
            return this;
        },
        clone: function()
        {
            return new Vector(this.angle, this.length);
        }
    }


    /** 2 &pi;. */
    Vector.TWO_PI = 2 * Math.PI;
    /**
     * Normalize an angle in a0- 2&pi wide interval 
     */
    Vector.normalizeAngle = function(angle)
    {
        if (angle >= 0 && angle < Vector.TWO_PI)
        {
            return angle;
        }

        return angle - Vector.TWO_PI * Math.floor(angle / Vector.TWO_PI);
    }


    return Vector;

});


