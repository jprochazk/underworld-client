import { h, Component, createRef } from "preact";
import * as Core from "core";
import "./Game.css";
import { v2 } from "core";

// TODO: collisions
// TODO: load + render maps from Tiled
// TODO: net connection

export default class Game extends Component {
    canvasRef = createRef<HTMLCanvasElement>();
    gl!: WebGL2RenderingContext;

    componentDidMount() {
        if (!this.canvas) throw new Error(`Failed to initialize Game`);
        this.gl = Core.getContext(this.canvas, "webgl2", {
            alpha: false,
            depth: false,
            stencil: false,
        });

        const spritesheet = new Core.Spritesheet(this.gl, "assets/sprites/slime.json");

        const viewport = new Core.Viewport(this.gl);
        const camera = new Core.Camera(viewport);

        const renderer = new Core.Renderer(this.gl);

        const sprite = new Core.Sprite(spritesheet);

        let rot = 0;
        let pos = [500, 500] as [number, number];

        let keys: { [x: string]: boolean } = {};

        window.addEventListener("keydown", (evt) => {
            keys[evt.code] = true;
        });
        window.addEventListener("keyup", (evt) => {
            keys[evt.code] = false;
        })

        let vel = v2();
        let g = 0.09;

        const loop = () => {
            vel[1] -= g;
            vel[0] = 0;
            //if (keys["KeyW"]) vel[1] += 1;
            //if (keys["KeyS"]) vel[1] -= 1;
            if (keys["KeyA"]) vel[0] -= 1;
            if (keys["KeyD"]) vel[0] += 1;
            if (keys["Space"]) vel[1] = 1;
            v2.add(pos, vel);

            if (pos[0] > this.gl.canvas.width - 50) pos[0] = this.gl.canvas.width - 50;
            if (pos[0] < 50) pos[0] = 50;
            if (pos[1] > this.gl.canvas.height - 50) pos[1] = this.gl.canvas.height - 50;
            if (pos[1] < 50) pos[1] = 50;
            //rot = (rot + 0.5) % 360;
            //if (pos[0] > 1000 || pos[0] < 500) {
            //    vel[0] *= -1;
            //}
            //pos[0] += vel[0];

            renderer.begin(camera);
            sprite.draw(renderer, 0, pos, Math.rad(rot), [2, 2]);
            renderer.end();

            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    render() {
        return <canvas ref={this.canvasRef} tabIndex={-1} class="noselect"></canvas>;
    }

    get canvas() {
        return this.canvasRef.current;
    }
}
