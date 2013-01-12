function Leg()
{    
    this.vector = new Vector(0.0, 0.01);
    this.type = Leg.MOVE;
    
}
Leg.NONE = 0;
Leg.MOVE = 1;
Leg.TOUCH = 2;
Leg.FIGHT = 3;
Leg.SEX = 4;
Leg.CONNECT = 5;
