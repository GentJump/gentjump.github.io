
		
				<script type="text/processing" data-processing-target="mycanvas">
			var road, chara, time, income, costOfLiving, sceneTime, keyTouch, coinTime, youLost; 
			var boxes = {};
			var townhouses = {};
			var cones = {};
			var condos = {};
			var coins = {}; 

void setup()
{
	size(800,500); 
	background(0, 102, 153);
	income = 90; 
	costOfLiving = 90; 
	time = millis();
	sceneTime = millis();
	coinTime = millis(); 
	keyTouch = false; 
	youLost = false; 
	road = new Road(0, 450);
	chara = new Character(60, 440);
	var box = 0;
	for(var i = 0; i < 7; i++)
	{
		boxes.push(new Box(box, 100, -2));
		box += 200;
	}
	var town = 0; 
	for(var k = 0; k < 8; k++)
	{
		townhouses.push(new Townhouse(town, 75, -3, [random(0, 255), random(0,255), random(0, 100)]));
		town += 121; 
		
	}
	var cone = 0; 
	for(var l =0; l < 5; l++)
	{
		cones.push(new Cone(cone, 480, -1));
		cone += 180;
	}
	var coin = 0; 
	for(var p = 0; p < 10; p++)
	{
		coins.push(new Coin(coin, 390, -1));
		coin += random(50,100);
	}
	var condo = 0; 
	for(var m = 0; m < 3; m++)
	{
		condos.push(new Condo(condo, 165, -3));
		condo += 300;
	}
	
	
}

void draw()
{
	background(71,145,181);
	 fill(255,255,0); 
	ellipse(70,70,50,50);
	for(var h = 0; h < townhouses.length; h++)
	{
		townhouses[h].drawTownhouse(); 
		townhouses[h].moveTownhouse();
	}
	if(millis() - sceneTime >= 40000)
	{
		for(var i = 0; i < condos.length; i++)
		{
			condos[i].drawCondo(); 
			condos[i].moveCondo(); 
		}
	}
	road.drawRoad();
	
	for(var k = 0; k < boxes.length; k++)
	{
		boxes[k].drawBox();
		boxes[k].moveBox(); 
	}
	for(var p = 0; p < coins.length;p++)
	{
		coins[p].drawCoin(); 
		coins[p].moveCoin();
		if(coins[p].xPosition === (chara.x + 30) && (coins[p].yPosition-20) === chara.y)
		{
			coins.splice(p, 1);
			income+= 5; 
			
		}
	}
	
	if(millis() - sceneTime >= 10000)
	{
		for(var c = 0; c < cones.length; c++)
		{
			cones[c].drawCone();
			cones[c].moveCone(); 
			if(cones[c].xPosition === chara.x && (cones[c].yPosition-40) === chara.y)
			{
				income-= 3;
				//println("CONE");
				//println(cones.length);
				//println("CONES  " + cones[c].yPosition);
				
			}
		} 
	}
	chara.drawCharacter();
	chara.jump(); 
	//println("Character Yposition  " + chara.y);
	textFont("monospace", 25);
	text("Income: " + income, 530, 30); 
	text("Cost Of Living: " + costOfLiving, 530, 60);

		if(millis() - time >= 2000)
		{
			costOfLiving += 2; 
			time = millis(); 
		}
		
		if(millis() - coinTime >= 6000)
		{
			coins.push(new Coin(random(800,850), 390, -1));
			coinTime = millis(); 
		}
		if(income <= costOfLiving * (2/3))
		{
			///alert("YOUR INCOME DROPPED TOO MIUCH!!!! SORRY you have been DISPLACED!!!!");
			background(0,0,0); 
			textSize(70);
			text("YOU LOST", 200, 300); 
			noLoop(); 
		}
		if(income > costOfLiving)
		{
			background(255,255,255);
			fill(0,0,0);
			textSize(70);
			text("YOU WON!", 200, 300);
			noLoop(); 
		}

}




class Character 
{
	var x, y, jumpState, height, inity, time; 
	Character(xps, yps)
	{
		x = xps; 
		y = yps;
		inity = yps; 
		jumpState = 0; 
		height = 390; 
		time = millis(); 
	}
	
	void drawCharacter()
	{
		noStroke();
		fill(255, 255, 255); 
		rect(x, y, 50, 50); 
	}
	
	void changeState(var k)
	{
		jumpState = k;
	}
	
	void jump()
	{ 
		//println("JUMPING " + jumpState);
		//jumping
		if(jumpState == 1 && y >= height)
		{
			y -= 70; 
		} else if (y <= height)
		{
			jumpState = 2;
		}
		
		//delay();
		
		//waitasec();
		//falling
		if(millis() - time >= 1400)
		{
			if(jumpState == 2 && y <= height)
			{
				y = inity;
				keyTouch = false; 
			}
			else if (y >= height)
			{
				jumpState = 0;
				
			}
		time = millis(); 
		}
		
		
		
	
		//println("UP" + y);
		//this.drawCharacter();
	}
	void resetTime()
	{
		time = millis(); 
	}
		
}

	/*void waitasec()
	{
		var minutes = minute();
	   var seconds = second();
	   var hour = hour();
	   var starttime = (hour * 3600) + (minutes * 60) + seconds;
	   var finaltime = starttime + 3;

	   while (starttime < finaltime) {

		   minutes = minute();
		   seconds = second();
		   starttime = (hour * 3600) + (minutes * 60) + seconds;
	   }
	}*/


//('#canvas').addEventListener("keypressed", jump, false);


class Box 
		{
			var xPosition;
			var yPosition;
			var speedX;
				
			Box(xPos, yPos, xSpeed)
			{
				xPosition = xPos;
				yPosition = yPos;
				speedX = xSpeed;
			}
			
		void drawBox()
			{
				noStroke();
				fill(230, 186, 76);
				rect(xPosition+10,yPosition+310, 60,60); //the actual yellow box
				//arrow for box
				fill(18, 1, 1);
				rect(xPosition+35,yPosition+340,10,30); //arrow's stick
				triangle(xPosition+25,yPosition+350,xPosition+55,yPosition+350,xPosition+40,yPosition+330); //triangle of the arrow
			}
			
			
			void moveBox()
			{
				xPosition = xPosition + speedX;
				
				if(xPosition < -40)//when the house is off the screen
				{
				xPosition= 850;//move it to the right of the screen
				}
					
			}
		
		
		}
		
		class Townhouse 
		{
			var xPosition;
			var yPosition;
			var speedX;
			var r;
			var g;
			var b;
				
			Townhouse(xPos, yPos, xSpeed,color)
			{
				xPosition = xPos;
				yPosition = yPos;
				speedX = xSpeed;
				r= color[0];
				g= color[1];
				b= color[2];
			}
			
		void drawTownhouse()
			{
				//line(-20, 376, 418, 376);
				noStroke(); 

				fill (r, g, b);
				triangle(xPosition+26, yPosition+161, xPosition+147, yPosition+161, xPosition+87, yPosition+137); //triangle

				fill (r, g, b);
				rect(xPosition+26, yPosition+173, 121, 201); //red building

				fill(77, 77, 77);
				rect(xPosition+28, yPosition+163, 116, 7); //top


				rect(xPosition+36, yPosition+181, 24, 40); //top left window

				rect(xPosition+73, yPosition+181, 24, 40); //top middle window

				
				rect(xPosition+110, yPosition+181, 24, 40); //top right window

		
				rect(xPosition+36, yPosition+228, 24, 40); //middle left building

				
				rect(xPosition+73, yPosition+228, 24, 40); //middle middle window

			
				rect(xPosition+110, yPosition+228, 24, 40); // middle right window

				
				rect(xPosition+36, yPosition+275, 24, 40); //bottom left window

				
				rect(xPosition+73, yPosition+275, 24, 40); //bottom middle window

				
				rect(xPosition+110, yPosition+275, 24, 40); //bottom right window

				
				rect(xPosition+36, yPosition+323, 24, 40); //ground left window

				
				rect(xPosition+73, yPosition+323, 24, 40); //ground middle window

				fill(44, 136, 138); 
				rect(xPosition+108, yPosition+322, 29, 52); //door

				fill(0, 0, 0);
				ellipse(xPosition+113, yPosition+352, 2, 2); //door knob
			}
			
			void moveTownhouse()
			{
				xPosition = xPosition + speedX;
				
				if(xPosition < -130)//when the house is off the screen
				{
				xPosition=850;//move it to the right of the screen
				}
					
			}
		}	
		
		class Car
			{
			var r;
			var g;
			var b;
			var Xpos;
			var Ypos;
			var speedX;
			Car(color,xp,yp,sp)
			{
				r= color[0];
				g= color[1];
				b= color[2];
				Xpos= xp;
				Ypos= yp;
				speedX= sp;
			}
		
			void drawCar()
			{
			noStroke();
			fill(r,g,b);
			rect(Xpos,Ypos,100,30);
			arc(Xpos+50,Ypos-7,75,70,180,360);
			fill(128,128,128);
			ellipse(Xpos+20,Ypos+30,25,25);
			ellipse(Xpos+80,Ypos+30,25,25);
			}
		
			void moveCar()
			{
			Xpos = Xpos+ speedX;
				if(Xpos < -130)
				{
				  Xpos = 880;
				}
			}
		}
		
	class Coin 
		{
			var xPosition;
			var yPosition;
			var speedX;
				
			Coin(xPos, yPos, xSpeed)
			{
				xPosition = xPos;
				yPosition = yPos;
				speedX = xSpeed;
			}
			
		void drawCoin()
			{
				//coins
				stroke(222, 192, 40); //orange border
				strokeWeight(2); //size of the orange border
				fill(225, 255, 0);
				ellipse(xPosition,yPosition,20,20); //yellow circle
			}
			
			
			void moveCoin()
			{
				xPosition = xPosition + speedX;
				
				if(xPosition < -10)//when the house is off the screen
				{
				xPosition= 850;//move it to the right of the screen
				}
					
			}
		
		}
		class Condo{
			var xPos;
			var yPpos;
			var speedX;
			Condo(xp,yp,sp)
			{
				xPos= xp;
				yPos= yp;
				speedX= sp;
			}
		
			void drawCondo()
			{
				noStroke();
				fill(204, 194, 194);
				rect(xPos,yPos,175,300);//building
				//fill(141, 138, 150);
				//quad(xPos,yPos,xPos-10,yPos-20,xPos+185,yPos-20,xPos+175,yPos);//roof
				//stroke(56, 64, 94);
				//strokeWeight(2);
				fill(119, 137, 156);
				rect(xPos+20,yPos+20,50,40);//windows
				rect(xPos+100,yPos+20,50,40);//windows
				rect(xPos+20,yPos+80,50,40);//windows
				rect(xPos+100,yPos+80,50,40);//windows
				rect(xPos+20,yPos+140,50,40);//windows
				rect(xPos+100,yPos+140,50,40);//windows
				//stroke(91, 99, 117);
				//strokeWeight(2);
				rect(xPos+57.5,yPos+227,30,70);//doors
				rect(xPos+90.5,yPos+227,30,70);//doors
				//stroke(92, 173, 94);
				//strokeWeight(1.75);
				fill(32, 153, 36);
				ellipse(xPos+30,yPos+285,45,45);//bush
			}
		
			void moveCondo()
			{
			xPos = xPos+ speedX;
				if(xPos < -170)
				{
				  xPos = 950;
				}
			}
		}
		
		class Cone 
		{
			var xPosition;
			var yPosition;
			var speedX;
				
			Cone(xPos, yPos, xSpeed)
			{
				xPosition = xPos;
				yPosition = yPos;
				speedX = xSpeed;
			}
			
		void drawCone()
			{
				fill(255, 102, 0);
				triangle(xPosition,yPosition,xPosition+41,yPosition,xPosition+19,yPosition-45); //cone's triangle

				stroke(232, 202, 111);//
				strokeWeight(1.6); //yellow line's width

				fill(196, 94, 4);
				ellipse(xPosition+20,yPosition+4,50,13);//bottom of the cone

				noStroke();
			}
			
			
			void moveCone()
			{
				xPosition = xPosition + speedX;
				
				if(xPosition < -100)//when the house is off the screen
				{
				xPosition=850;//move it to the right of the screen
				}
					
			}
		
		
		}

	class Road
	{

		var xpos, ypos; 
		Road(x, y)
		{
			xpos = x; 
			ypos = y; 
		}

		void drawRoad()
		{

			fill(0, 0, 0); 
			rect(xpos, ypos, 800, 100); 
			fill(255,255,0); 
			for(var i = 30; i < 850; i+=100)
			{
				rect(i, ypos + 20 , 50, 10); 

			}
		}
	}
				
	
void keyPressed()
{
if(keyTouch == false)
{
	if(keyCode == 38)//up key
	{
		keyTouch = true; 
		chara.changeState(1); 
		chara.resetTime();
		//println("UP PRESSED");
	}
}

}

