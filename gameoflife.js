function make2dArray(rows,cols){
    out=new Array(cols);
    for(let i=0;i<out.length,i++){
        out[i]=new Array(rows);
    }
    return out;
}
let cols,rows;
let scl=50;
let cells=;
let gameState=false;


function setup(){
    createCanvas(500,500);
    fill('red');
    rect(15,450,5,5);

    cols=width/scl;
    rows=height/scl;
    cells=make2dArray(cols);
    for(let j=0;j<rows;j++){
        for(let i=0;i<cols;i++){
            cells[i][j]=new Cell(i*scl,j*scl,scl);
            
        }
    }
    cells[1][1].alive=true;
    cells[2][1].alive=true;
    frameRate(5);
}

function draw(){
    background(255);
    for(let j=0;j<rows;j++){
        for(let i=0;i<cols;i++){
            cells[i][j].show();
            
        }
    }
    if(gameState){
        let nextState=make2dArray(rows,cols);
        for(let j=0;j<rows;j++){
            for(let i=0;i<cols;i++){
                let curr=cells[i][j];
                let nCount=countN(cells,i,j);
                if(!cells[i][j].alive && nCount==3){
                    nextState[i][j]=new Cell(i* scl,j*scl,scl);
                    nextState[i][j].alive=true;
                    console.log('new grid alive!!');
                }
                else if(cells[i][j].alive && nCount<2 || nCount>3){
                    nextState[i][j]=new Cell(i* scl,j*scl,scl);
                    nextState[i][j].alive=false
                }
                else{
                    nextState[i][j]=curr;
                }

                    
            }
        }
    }
}
function countN(arr,x,y){
    let sum=0;
    for(let i=-1;i<2;i++){
        for(let j=0;j<2;j++){
            let cl=(x+i+cols)%cols;
            let rw=(y+j+rows)%rows;
            if(arr[cl][rw].alive){
                sum+=1;
            }
        }
    }
    if(arr[x][y].alive){
        sum-=1;
    }
    return sum;
}


function Cell(x,y,scale){
    this.x=x;
    this.y=y;
    this.size=scale;
    this.alive=false;
    this.show=function(){
        if(this.alive){
            fill(0);
        }
        else{
            nofill();
        }
        
        stroke(0);
        rect(this.x,this.y,this.size,this.size);
    }
}

function mousePressed(){
    for(let j=0;j<rows;j++){
        for(let i=0;i<cols;i++){
            if(mouseX>cells[i][j].x && mouseX<cells[i][j].x+scl&& mouseY <cells[i][j].y+scl && mouseY>cells[i][j].y){
                cells[i][j].alive=true;
            }

        }
    }
}
function keyPressed(){
    if(keyCode==ENTER){
        console.log("ENTER");
        gameState=true;
    }
}

