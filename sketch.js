let len = 200;
let level = 4;
let colorNames = ['蓝色', '紫色', '粉色', '橙色', '绿色', '红色'];
let colors = [
    [0, 102, 255],    // 蓝色
    [255, 0, 255],     // 紫色
    [255, 192, 203],   // 粉色
    [255, 165, 0],     // 橙色
    [50, 205, 50],     // 绿色
    [255, 0, 0]        // 红色
];
let currentColorIndex = 0;
let buttons = [];

function setup() {
    createCanvas(800, 900); // 增加画布高度以容纳按钮
    background(255);
    
    // 创建颜色按钮
    let buttonWidth = 100;
    let buttonHeight = 40;
    let startX = (width - (buttonWidth * 6 + 50)) / 2;
    let buttonY = 30;
    
    for(let i = 0; i < colors.length; i++) {
        buttons[i] = {
            x: startX + i * (buttonWidth + 10),
            y: buttonY,
            width: buttonWidth,
            height: buttonHeight,
            color: colors[i],
            name: colorNames[i]
        };
    }
    
    drawScene();
}

function drawScene() {
    background(255);
    
    // 绘制按钮
    for(let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        fill(b.color[0], b.color[1], b.color[2]);
        stroke(0);
        rect(b.x, b.y, b.width, b.height, 5);
        
        // 按钮文字
        fill(0);
        noStroke();
        textSize(16);
        textAlign(CENTER, CENTER);
        text(b.name, b.x + b.width/2, b.y + b.height/2);
    }
    
    // 绘制Koch雪花
    push();
    translate(width/2, height/2);
    stroke(colors[currentColorIndex][0], colors[currentColorIndex][1], colors[currentColorIndex][2]);
    noFill();
    
    for (let i = 0; i < 3; i++) {
        koch(len, level);
        rotate(TWO_PI / 3);
    }
    pop();
}

function mousePressed() {
    // 检查是否点击了按钮
    for(let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        if(mouseX > b.x && mouseX < b.x + b.width && 
           mouseY > b.y && mouseY < b.y + b.height) {
            currentColorIndex = i;
            drawScene();
            break;
        }
    }
}

function koch(len, level) {
    if (level === 0) {
        // 添加渐变效果
        let c = colors[currentColorIndex];
        let gradient = drawingContext.createLinearGradient(0, 0, len, 0);
        gradient.addColorStop(0, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1)`);
        gradient.addColorStop(0.5, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.8)`);
        gradient.addColorStop(1, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1)`);
        
        // 添加阴影效果
        drawingContext.shadowBlur = 5;
        drawingContext.shadowColor = `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.5)`;
        drawingContext.shadowOffsetX = 2;
        drawingContext.shadowOffsetY = 2;
        
        // 设置线条样式
        drawingContext.strokeStyle = gradient;
        drawingContext.lineWidth = 2;
        
        line(0, 0, len, 0);
        translate(len, 0);
        return;
    }
    
    len /= 3;
    
    koch(len, level - 1);
    rotate(-PI / 3);
    koch(len, level - 1);
    rotate(2 * PI / 3);
    koch(len, level - 1);
    rotate(-PI / 3);
    koch(len, level - 1);
}