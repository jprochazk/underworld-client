import { h, Component, createRef } from "preact";
import * as Core from "core";
import "./Game.css";
import AYAYA from "./img/icon_128x128.png";

// TODO: hook up https://github.com/jprochazk/underworld-assets.git as submodule, pull on build/dev
// TODO: sprite (only holds texture and animation info)
// TODO: load + render sprites/animations from aseprite
// TODO: load + render maps from Tiled
// TODO: collisions
// TODO: ECS (maybe can do without it? - maybe its not worth it, and composition architecture would be better)

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

        const viewport = new Core.Viewport(this.gl);
        const camera = new Core.Camera(viewport);

        const renderer = new Core.Renderer(this.gl);

        const texture = new Core.Texture(this.gl, AYAYA);

        let scale = [200, 200] as [number, number];
        let rot = 15;
        let pos = [500, 500] as [number, number];
        let vel = [1, 0];

        const loop = () => {
            rot = (rot + 0.5) % 360;
            if (pos[0] > 1000 || pos[0] < 500) {
                vel[0] *= -1;
            }
            pos[0] += vel[0];

            renderer.begin(camera);
            renderer.draw(texture, [0, 0], [1, 1], pos, Math.rad(rot), scale);
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
