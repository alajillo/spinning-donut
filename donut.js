    // constants
    const h = document.documentElement.clientHeight;
    const w = document.documentElement.clientWidth;
    const COLOR_BG = "black";
    const COLOR_CUBE = "royalblue";
    const R2 = Math.min(w,h) * 1/3; // 도넛 반경
    const R1 = R2 * 1/2; // 도넛 두께
    const DISTANCE = 500;
    let Zoom = 1;
    const SPACE = 0.1;
    const SPEED = 0.02;
    const SIZE = 200;
    // set up the canvas and context
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    window.addEventListener('wheel',(e)=>{
         if(e.deltaY > 0) Zoom += 10;
         if(e.deltaY < 0) Zoom -= 10;

    })
    // dimensions
    canvas.height = h;
    canvas.width = w;
    function rotateX(point,theta){
        const {x,y,z} = point;
            point.y = Math.cos(theta) * y - Math.sin(theta) * z;
            point.z = Math.sin(theta) * y + Math.cos(theta) * z;
    }
    function rotateY(point,theta){
        const {x,y,z} = point;
            point.x = Math.cos(theta) * x + Math.sin(theta) * z;
            point.z = Math.cos(theta) * z - Math.sin(theta) * x; 
    }
    function rotateZ(point,theta){
            const {x,y,z} = point;
            point.x = Math.cos(theta) * x - Math.sin(theta) * y;
            point.y = Math.sin(theta) * x + Math.cos(theta) * y;
    }
    const points = [];
    for(let theta = 0; theta < Math.PI * 2; theta += SPACE){
        const x =  R2 + R1 * (Math.cos(theta));
        const y =  R1 * Math.sin(theta);
        const z = 0;
        for(let t2 = 0; t2 < Math.PI * 2; t2 += SPACE){
            const point = {x,y,z};
            rotateY(point,t2);
            points.push(point);
        }
    }    
    requestAnimationFrame(render);
    function render() {
        ctx.fillStyle = COLOR_BG;
        ctx.fillRect(0, 0, w, h);
        for (let point of points) {
            rotateX(point,SPEED);
            rotateY(point,SPEED);
            rotateZ(point,SPEED);
            const {z} = point;
            ctx.fillStyle = COLOR_CUBE;
            const {x,y} = convert3D(point);
            ctx.fillRect(x + w/2,y + h /2,(SIZE - z) / 100, (SIZE - z) / 100);
        }
        requestAnimationFrame(render);
    }
    function convert3D({x,y,z}){
        z = z + Zoom;
        return {
            x : (x/(z+DISTANCE)) * DISTANCE,
            y : (y/(z+DISTANCE)) * DISTANCE,
        }
    }